import type { Gist as GistType } from '@/.content-collections/generated';
import { Link } from '@/components/link';
import { dateFormatterShort } from '@/lib/date-formatters';
import type { Locale } from '@/lib/i18n/config';

type GistProps = Pick<GistType, 'pathname' | 'title' | 'date'> & {
  locale: Locale;
};

export const Gist = ({ pathname, title, date, locale }: GistProps) => (
  <Link
    className="group flex flex-col gap-1 border-none text-sm sm:flex-row sm:items-center sm:gap-2"
    href={pathname}
  >
    <p className="text-foreground">{title}</p>
    <span className="hidden h-px grow bg-border transition-colors group-hover:bg-border-dark sm:block" />
    <p className="text-foreground-lighter transition-colors group-hover:text-foreground-light">
      {dateFormatterShort(locale).format(date)}
    </p>
  </Link>
);
