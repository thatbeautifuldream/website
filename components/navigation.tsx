'use client';

import { motion } from 'motion/react';
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
    </nav>
  );
};
