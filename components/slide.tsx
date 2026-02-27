import { Link } from '@/components/link';
import { dateFormatterShort } from '@/lib/date-formatters';
import type { TSlide } from '@/lib/slides';

type SlideProps = Pick<TSlide, 'id' | 'title' | 'date'>;

export const Slide = ({ id, title, date }: SlideProps) => (
  <Link
    className="group flex flex-col gap-1 border-none text-sm sm:flex-row sm:items-center sm:gap-2"
    href={`/slide/${id}`}
  >
    <p className="text-foreground">{title}</p>
    <span className="hidden h-px grow bg-border transition-colors group-hover:bg-border-dark sm:block" />
    <p className="text-foreground-lighter transition-colors group-hover:text-foreground-light">
      {dateFormatterShort.format(date)}
    </p>
  </Link>
);
