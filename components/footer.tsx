import { Link } from './link';
import { ResumeLink } from './resume-link';
import { Section } from './section';

export const Footer = () => (
  <Section delay={0.1} layout layoutId="footer">
    <footer className="text-base text-foreground-lighter leading-relaxed sm:text-sm">
      <div className="flex flex-col space-y-2">
        <p className="text-pretty">
          &copy; {new Date().getFullYear()} Milind Mishra. Welcome to my
          internet scratchpad.
        </p>
        <div className="flex items-center gap-3 text-base sm:text-xs">
          <Link
            className="text-foreground/70 underline decoration-wavy underline-offset-2 transition-colors hover:text-foreground hover:underline-offset-[2.5px]"
            href="https://github.com/thatbeautifuldream/website"
          >
            GitHub
          </Link>
          <ResumeLink className="text-foreground/70 underline decoration-wavy underline-offset-2 transition-colors hover:text-foreground hover:underline-offset-[2.5px]">
            Resume
          </ResumeLink>
        </div>
      </div>
    </footer>
  </Section>
);
