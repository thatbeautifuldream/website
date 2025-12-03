'use client';

import { usePathname } from 'next/navigation';
import { Link } from './link';
import { ResumeLink } from './resume-link';
import { Section } from './section';

const routes = [
  { href: '/wakatime', label: 'Wakatime' },
  { href: '/spotify', label: 'Spotify' },
  // { href: '/ixd', label: 'Interaction Design Challenge' },
  // { href: '/guestbook', label: 'Guestbook' },
];

const HIDE_FOOTER_PATHS = ['/chat'];

export function Footer() {
  const currentPath = usePathname();

  if (HIDE_FOOTER_PATHS.includes(currentPath)) {
    return null;
  }

  return (
    <Section delay={0.1} layout layoutId="footer">
      <footer className="text-foreground-lighter text-sm leading-relaxed">
        <div className="flex flex-col space-y-2">
          <div className="flex flex-wrap items-center text-xs">
            <ResumeLink />
            <span className="mx-1 text-foreground-muted">•</span>
            {routes.map((route, index) => (
              <div className="flex items-center" key={route.href}>
                <Link
                  className="transition-colors hover:text-foreground"
                  href={route.href}
                >
                  {route.label}
                </Link>
                {index < routes.length - 1 && (
                  <span className="mx-1 text-foreground-muted">•</span>
                )}
              </div>
            ))}
          </div>
          <p>
            &copy; {new Date().getFullYear()} Milind Mishra. Welcome to my
            internet scratchpad.
          </p>
          <p className="text-xs">
            View the{' '}
            <Link href="https://github.com/thatbeautifuldream/website">
              source code
            </Link>
            .
          </p>
        </div>
      </footer>
    </Section>
  );
}
