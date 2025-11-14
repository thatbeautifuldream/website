import { ArrowLeftToLineIcon } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { FC } from 'react';
import { Link } from '@/components/link';
import { Section } from '@/components/section';
import { createMetadata } from '@/lib/metadata';
import { getSlideById, slides } from '@/lib/slides';
import { cn } from '@/lib/utils';

type PageProperties = {
  readonly params: Promise<{
    id: string;
  }>;
};

export const runtime = 'nodejs';

export const generateMetadata = async ({
  params,
}: PageProperties): Promise<Metadata> => {
  const { id } = await params;
  const slide = getSlideById(id);

  if (!slide) {
    return {};
  }

  return createMetadata({
    title: slide.title,
    description: slide.description || '',
    image: `https://milindmishra.com/og?title=${encodeURIComponent(slide.title)}`,
  });
};

export const generateStaticParams = (): { id: string }[] =>
  slides.map((slide) => ({
    id: slide.id,
  }));

const Page: FC<PageProperties> = async ({ params }) => {
  const { id } = await params;
  const slide = getSlideById(id);

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
              Published on{' '}
              {new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(
                slide.date
              )}
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
