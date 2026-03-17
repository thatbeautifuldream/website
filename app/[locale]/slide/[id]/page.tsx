import { ArrowLeftToLineIcon } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { FC } from 'react';
import { Link } from '@/components/link';
import { Section } from '@/components/section';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { formatDateLong } from '@/lib/i18n/formatters';
import { isLocale } from '@/lib/i18n/config';
import { createMetadata } from '@/lib/metadata';
import { getSlideById, slides } from '@/lib/slides';
import { cn } from '@/lib/utils';

type PageProperties = {
  readonly params: Promise<{
    locale: string;
    id: string;
  }>;
};

export const runtime = 'nodejs';

export const generateMetadata = async ({
  params,
}: PageProperties): Promise<Metadata> => {
  const { locale, id } = await params;
  const slide = getSlideById(id);

  if (!slide) {
    return {};
  }

  return createMetadata({
    title: slide.title,
    description: slide.description || '',
    image: `https://milindmishra.com/og?title=${encodeURIComponent(slide.title)}`,
    locale: isLocale(locale) ? locale : 'en',
  });
};

export const generateStaticParams = () =>
  slides.map((slide) => ({
    locale: 'en',
    id: slide.id,
  }));

const Page: FC<PageProperties> = async ({ params }) => {
  const { locale, id } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const slide = getSlideById(id);
  const dictionary = getDictionary(locale);

  if (!slide) {
    notFound();
  }

  return (
    <>
      <Section
        className="-ml-28 absolute mt-1 hidden select-none lg:block"
        delay={0.6}
      >
        <Link
          className={cn(
            'flex items-center gap-2 text-nowrap text-foreground-lighter text-xs transition-colors',
            'hover:text-foreground'
          )}
          href="/slide"
        >
          <ArrowLeftToLineIcon size={12} />
          Slides
        </Link>
      </Section>
      <Section className="gap-1">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1>{slide.title}</h1>
            <p className="text-foreground-lighter text-xs">
              {dictionary.common.publishedOn} {formatDateLong(slide.date, locale)}
            </p>
          </div>
        </div>
      </Section>
      <Section delay={0.2}>
        <div className="flex items-center justify-center">
          <div className="w-full max-w-5xl">
            <div className="relative aspect-[960/569] w-full overflow-hidden rounded-lg border border-neutral-200 shadow-xl dark:border-neutral-800">
              <iframe
                allowFullScreen
                className="absolute inset-0 h-full w-full"
                src={slide.embedUrl}
                title={slide.title}
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Page;
