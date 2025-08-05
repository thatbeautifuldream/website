'use client';

import { Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const themes = [
    {
      key: 'light',
      icon: Sun,
      label: 'Light theme',
    },
    {
      key: 'dark',
      icon: Moon,
      label: 'Dark theme',
    },
  ];

  const handleThemeChange = (themeKey: string) => {
    setTheme(themeKey);
  };

  return (
    <div
      className={cn(
        'fixed right-5 bottom-4 flex h-7 rounded-full p-0.5 ring-1 ring-border transition-all bg-secondary/80',
        'max-w-[100px]',
        theme === 'light' && 'justify-start',
        theme === 'dark' && 'justify-end'
      )}
    >
      {themes.map(({ key, icon: Icon, label }) => {
        const isActive = theme === key;

        return (
          <button
            aria-label={label}
            className="relative size-6 shrink-0 cursor-pointer rounded-full"
            key={key}
            onClick={() => handleThemeChange(key)}
            type="button"
          >
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-full bg-secondary border border-border/80"
                layoutId="activeTheme"
                transition={{ type: 'spring', duration: 0.5 }}
              />
            )}
            <Icon
              className={cn(
                'relative m-auto h-4 w-4',
                isActive ? 'text-foreground' : 'text-foreground-lighter'
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
