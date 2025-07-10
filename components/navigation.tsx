'use client';

import { AnimatePresence, motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Link } from '@/components/link';
import { cn } from '@/lib/utils';
import { Sign } from './sign';

const links = [
  {
    href: '/',
    label: 'Home',
    active: (pathname: string) => pathname === '/',
  },
  // {
  //   href: '/about',
  //   label: 'About',
  //   active: (pathname: string) => pathname.startsWith('/about'),
  // },
  {
    href: '/work',
    label: 'Work',
    active: (pathname: string) => pathname.startsWith('/work'),
  },
  // {
  //   href: '/projects',
  //   label: 'Projects',
  //   active: (pathname: string) => pathname.startsWith('/projects'),
  // },
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

  return (
    <nav className="flex items-center justify-between text-xs">
      <Link href="/">
        <Sign className="size-12" color="currentColor" />
      </Link>
      <ul className="flex items-center gap-1 rounded-full bg-secondary/30 p-1">
        {links.map(({ href, label, active }, index) => {
          const isActive = active(pathname);
          const isHovered = hoveredIndex === index;

          return (
            <li key={href}>
              <Link
                className={cn(
                  'relative rounded-full border-none px-3 py-1.5 font-medium text-xs transition-colors duration-200',
                  isActive || (isHovered && 'text-foreground')
                )}
                href={href}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <AnimatePresence mode="wait">
                  {(isActive || isHovered) && (
                    <motion.span
                      animate={{ opacity: 1, filter: 'blur(0px)' }}
                      className="absolute inset-0 rounded-lg border bg-secondary shadow-sm"
                      exit={{ opacity: 0, filter: 'blur(3px)' }}
                      initial={{ opacity: 0, filter: 'blur(3px)' }}
                      layoutId="nav-pill"
                      transition={{
                        duration: 0.3,
                        ease: 'easeInOut',
                      }}
                    />
                  )}
                </AnimatePresence>
                <span className="relative z-10">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
