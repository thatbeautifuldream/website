import { allPages } from 'content-collections';
import type { Metadata } from 'next';
import { Mdx } from '@/components/mdx';
import { Section } from '@/components/section';
import { createMetadata } from '@/lib/metadata';

const page = allPages.find((p) => p._meta.fileName === 'presence.mdx');

if (!page) {
    throw new Error('Presence page not found');
}

export const metadata: Metadata = createMetadata({
    title: page.title,
    description: page.description,
    image: `/og?title=${encodeURIComponent(page.title)}&description=${encodeURIComponent(page.description)}`,
});

const PresencePage = () => (
    <>
        <Section className="gap-0">
            <h1>{page.title}</h1>
            <p className="text-foreground-lighter">{page.description}</p>
        </Section>
        <article>
            <Section>
                <Mdx code={page.body} />
            </Section>
        </article>
    </>
);

export default PresencePage;
