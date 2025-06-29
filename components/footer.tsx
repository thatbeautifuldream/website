import { Link } from './link';

export const Footer = () => (
  <footer className="text-foreground-lighter text-sm leading-relaxed">
    <p>&copy; {new Date().getFullYear()} Milind Mishra. All rights reserved.</p>
    <p>
      View the{' '}
      <Link href="https://github.com/thatbeautifuldream/website">
        source code
      </Link>
      .
    </p>
  </footer>
);
