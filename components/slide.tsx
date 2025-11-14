import { Link } from '@/components/link';
import type { TSlide } from '@/lib/slides';

type SlideProps = Pick<TSlide, 'id' | 'title' | 'date'>;

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: '2-digit',
});

export const Slide = ({ id, title, date }: SlideProps) => (
  <Link
    className="group flex flex-col gap-1 border-none text-sm sm:flex-row sm:items-center sm:gap-2"
    href={`/slide/${id}`}
  >
    <p className="text-foreground">{title}</p>
    <span className="hidden h-px grow bg-border transition-colors group-hover:bg-border-dark sm:block" />
    <p className="text-foreground-lighter transition-colors group-hover:text-foreground-light">
      {dateFormatter.format(date)}
    </p>
  </Link>
);
