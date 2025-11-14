import type { Metadata } from 'next';
import { Section } from '@/components/section';
import { Slide } from '@/components/slide';
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

const title = 'Slides';
const description = 'Presentations and talks.';

export const metadata: Metadata = createMetadata({
  title,
  description,
  image: `https://milindmishra.com/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
});

const Slides = () => (
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
                <Slide {...slide} />
              </li>
            ))}
          </ul>
        </Section>
      ))}
  </>
);

export default Slides;
