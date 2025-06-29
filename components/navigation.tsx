'use client';

import { usePathname } from 'next/navigation';
import { Link } from '@/components/link';
import { cn } from '@/lib/utils';
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
    href: '/projects',
    label: 'Projects',
    active: (pathname: string) => pathname.startsWith('/projects'),
  },
  {
    href: '/blog',
    label: 'Blog',
    active: (pathname: string) => pathname.startsWith('/blog'),
  },
  {
    href: '/resume',
    label: 'Resume',
    active: (pathname: string) => pathname.startsWith('/resume'),
  },
];

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between text-xs">
      <Link href="/">
        <Sign className="size-12" color="currentColor" />
      </Link>
      <ul className="flex gap-4">
        {links.map(({ href, label, active }) => (
          <li key={href}>
            <Link
              className={cn(active(pathname) ? 'text-primary' : 'border-none')}
              href={href}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
