'use client';

import { SearchIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Link } from '@/components/link';
import { cn } from '@/lib/utils';
import { useCommandPalette } from './command-palette-provider';
import { Section } from './section';
import { Sign } from './sign';

const links = [
  {
    href: '/',
    label: 'Home',
    active: (pathname: string) => pathname === '/',
  },
  {
    href: '/about',
    label: 'About',
    active: (pathname: string) => pathname.startsWith('/about'),
  },
  {
    href: '/work',
    label: 'Work',
    active: (pathname: string) => pathname.startsWith('/work'),
  },
  {
    href: '/gist',
    label: 'Gist',
    active: (pathname: string) => pathname.startsWith('/gist'),
  },
  {
    href: '/blog',
    label: 'Blog',
    active: (pathname: string) => pathname.startsWith('/blog'),
  },
];

export const Navigation = () => {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { toggle } = useCommandPalette();

  return (
    <Section delay={0.05}>
      <nav className="flex items-center justify-between text-xs">
        <Link aria-label="Home" href="/">
          <Sign className="size-12" color="currentColor" />
        </Link>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center justify-center rounded-lg border-none p-2 transition-colors hover:bg-secondary/50"
            onClick={toggle}
            title="Search commands (⌘K)"
            type="button"
          >
            <SearchIcon className="h-4 w-4 text-foreground-lighter transition-colors hover:text-foreground" />
          </button>
          <ul className="flex items-center gap-1 rounded-xl bg-secondary/30 p-1">
            {links.map(({ href, label, active }, index) => {
              const isActive = active(pathname);
              const isHovered = hoveredIndex === index;

              return (
                <li key={href}>
                  <Link
                    className={cn(
                      'relative rounded-lg border-none px-3 py-1.5 font-medium text-xs transition-colors duration-200',
                      isActive || (isHovered && 'text-foreground')
                    )}
                    href={href}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {(isActive || isHovered) && (
                      <motion.span
                        animate={{ opacity: 1 }}
                        aria-label={`Navigate to ${label}`}
                        className="absolute inset-0 rounded-lg border bg-secondary"
                        initial={{ opacity: 0 }}
                        layoutId="nav-pill"
                        transition={{
                          duration: 0.2,
                          ease: 'easeInOut',
                        }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </Section>
  );
};
