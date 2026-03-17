import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Section } from '@/components/section';
import { Slide } from '@/components/slide';
import { isLocale } from '@/lib/i18n/config';
import { createMetadata } from '@/lib/metadata';
import { slides } from '@/lib/slides';

const slidesByYear = slides
  .sort((a, b) => b.date.getTime() - a.date.getTime())
  .reduce(
    (acc, slide) => {
      const year = slide.date.getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(slide);
      return acc;
    },
    {} as Record<number, typeof slides>
  );

type SlideIndexProps = {
  params: Promise<{
    locale: string;
  }>;
};

const title = 'Slides';
const description = 'Presentations and talks.';

export const generateMetadata = async ({
  params,
}: SlideIndexProps): Promise<Metadata> => {
  const { locale } = await params;

  return createMetadata({
    title,
    description,
    image: `https://milindmishra.com/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
    locale: isLocale(locale) ? locale : 'en',
  });
};

const Slides = async ({ params }: SlideIndexProps) => {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <>
      <Section className="gap-0">
        <h1>{title}</h1>
        <p className="text-foreground-lighter">{description}</p>
      </Section>
      {Object.entries(slidesByYear)
        .sort(([a], [b]) => Number(b) - Number(a))
        .map(([year, yearSlides], index) => (
          <Section delay={(index + 1) * 0.2} key={year}>
            <h2 className="font-normal text-foreground-lighter text-sm">
              {year}
            </h2>
            <ul className="grid gap-6">
              {yearSlides.map((slide) => (
                <li key={slide.id}>
                  <Slide {...slide} locale={locale} />
                </li>
              ))}
            </ul>
          </Section>
        ))}
    </>
  );
};

export default Slides;
