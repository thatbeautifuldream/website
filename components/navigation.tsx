'use client';

import { SearchIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import useSound from 'use-sound';
import { Link } from '@/components/link';
import { cn } from '@/lib/utils';
import { useCommandPalette } from './providers/command-palette-provider';
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

  const [play] = useSound('/sounds/message-pop.mp3');

  return (
    <Section delay={0.05}>
      <nav className="flex items-center justify-between text-xs">
        <Link aria-label="Home" href="/" onClick={() => play()}>
          <Sign className="size-12" color="currentColor" />
        </Link>
        <ul className="flex items-center gap-1 rounded-xl border bg-muted/80 p-1 transition-colors duration-200">
          {links.map(({ href, label, active }, index) => {
            const isActive = active(pathname);
            const isHovered = hoveredIndex === index;
            const isActiveOrHovered = isActive || isHovered;

            return (
              <li key={href}>
                <Link
                  className={cn(
                    'relative rounded-lg border-none px-3 py-1.5 font-medium text-xs transition-colors duration-200',
                    isActive && 'text-foreground'
                  )}
                  href={href}
                  onClick={() => play()}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {isActiveOrHovered && (
                    <motion.span
                      animate={{ opacity: 1 }}
                      aria-label={`Navigate to ${label}`}
                      className="absolute inset-0 rounded-lg border bg-card"
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
          <li>
            <button
              className={cn(
                'relative flex items-center justify-center rounded-lg border-none px-3 py-1.5 font-medium text-xs transition-colors duration-200',
                hoveredIndex === links.length && 'text-foreground'
              )}
              onClick={toggle}
              onMouseEnter={() => setHoveredIndex(links.length)}
              onMouseLeave={() => setHoveredIndex(null)}
              title="Search commands (⌘K)"
              type="button"
            >
              {hoveredIndex === links.length && (
                <motion.span
                  animate={{ opacity: 1 }}
                  aria-label="Open search"
                  className="absolute inset-0 rounded-lg border bg-card"
                  initial={{ opacity: 0 }}
                  layoutId="nav-pill"
                  transition={{
                    duration: 0.2,
                    ease: 'easeInOut',
                  }}
                />
              )}
              <SearchIcon className="relative z-10 h-4 w-4" />
            </button>
          </li>
        </ul>
      </nav>
    </Section>
  );
};
