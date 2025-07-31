import { Link } from './link';
import { Section } from './section';

const routes = [
  { href: '/presence', label: 'Presence' },
  { href: '/wakatime', label: 'Wakatime' },
  { href: '/guestbook', label: 'Guestbook' },
];

export const Footer = () => (
  <Section delay={0.1}>
    <footer className="text-foreground-lighter text-sm leading-relaxed">
      <div className="flex flex-col space-y-2">
        <div className="flex flex-wrap items-center text-xs">
          {routes.map((route, index) => (
            <div key={route.href} className="flex items-center">
              <Link
                href={route.href}
                className="hover:text-foreground transition-colors"
              >
                {route.label}
              </Link>
              {index < routes.length - 1 && (
                <span className="text-foreground-muted mx-1">•</span>
              )}
            </div>
          ))}
        </div>
        <p>
          &copy; {new Date().getFullYear()} Milind Mishra. My little corner on the internet.
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
