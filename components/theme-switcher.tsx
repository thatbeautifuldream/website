'use client';

import { Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const HIDE_THEME_SWITCHER_ON_PAGES = ['/chat'];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const currentPath = usePathname();

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

  if (HIDE_THEME_SWITCHER_ON_PAGES.includes(currentPath)) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed right-5 bottom-4 flex h-7 rounded-full bg-secondary/80 p-0.5 ring-1 ring-border transition-all',
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
                className="absolute inset-0 rounded-full border border-border/80 bg-secondary"
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
