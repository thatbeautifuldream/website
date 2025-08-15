import { allGists } from 'content-collections';
import type { Metadata } from 'next';
import { Gist } from '@/components/gist';
import { Section } from '@/components/section';
import { createMetadata } from '@/lib/metadata';

const gistsByYear = allGists
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .reduce(
        (acc, gist) => {
            const year = gist.date.getFullYear();
            if (!acc[year]) {
                acc[year] = [];
            }
            acc[year].push(gist);
            return acc;
        },
        {} as Record<number, typeof allGists>
    );

const title = 'Gists';
const description = 'Code snippets and quick solutions.';

export const metadata: Metadata = createMetadata({
    title,
    description,
    image: `https://milindmishra.com/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
});

const Gists = () => (
    <>
        <Section className="gap-0">
            <h1>{title}</h1>
            <p className="text-foreground-lighter">{description}</p>
        </Section>
        {Object.entries(gistsByYear)
            .sort(([a], [b]) => Number(b) - Number(a))
            .map(([year, gists], index) => (
                <Section delay={(index + 1) * 0.2} key={year}>
                    <h2 className="font-normal text-foreground-lighter text-sm">
                        {year}
                    </h2>
                    <ul className="grid gap-6">
                        {gists.map((gist) => (
                            <li key={gist._meta.path}>
                                <Gist {...gist} />
                            </li>
                        ))}
                    </ul>
                </Section>
            ))}
    </>
);

export default Gists; 