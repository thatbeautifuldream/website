import { allStars } from 'content-collections';
import type { Metadata } from 'next';
import { StarItem } from '@/components/star-item';
import { Section } from '@/components/section';
import { createMetadata } from '@/lib/metadata';

const starsByYear = allStars
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .reduce(
        (acc, star) => {
            const year = star.date.getFullYear();
            if (!acc[year]) {
                acc[year] = [];
            }
            acc[year].push(star);
            return acc;
        },
        {} as Record<number, typeof allStars>
    );

const title = 'Stars';
const description = 'All Situations, Tasks, Actions, Results.';

export const metadata: Metadata = createMetadata({
    title,
    description,
    ogText: 'My stars — All Situations, Tasks, Actions, Results.',
});

const Posts = () => (
    <>
        <Section className="gap-0">
            <h1>{title}</h1>
            <p className="text-foreground-lighter">{description}</p>
        </Section>
        {Object.entries(starsByYear)
            .sort(([a], [b]) => Number(b) - Number(a))
            .map(([year, stars], index) => (
                <Section delay={(index + 1) * 0.2} key={year}>
                    <h2 className="font-normal text-foreground-lighter text-sm">
                        {year}
                    </h2>
                    <ul className="grid gap-6">
                        {stars.map((star) => (
                            <li key={star._meta.path}>
                                <StarItem {...star} />
                            </li>
                        ))}
                    </ul>
                </Section>
            ))}
    </>
);

export default Posts; 