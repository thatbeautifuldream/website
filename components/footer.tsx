import { Link } from './link';
import { Section } from './section';

export const Footer = () => (
  <Section delay={0.1}>
    <footer
      className="text-foreground-lighter text-sm leading-relaxed"
    >
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
    </footer>
  </Section>
);
