import { allPages } from 'content-collections';
import type { Metadata } from 'next';
import { Mdx } from '@/components/mdx';
import { Section } from '@/components/section';
import { createMetadata } from '@/lib/metadata';

const page = allPages.find((p) => p._meta.fileName === 'talk.mdx');

if (!page) {
  throw new Error('Talk page not found');
}

export const metadata: Metadata = createMetadata({
  title: page.title,
  description: page.description,
  image: `/og?title=${encodeURIComponent(page.title)}&description=${encodeURIComponent(page.description)}`,
});

const TalkPage = () => (
  <>
    <Section className="gap-0" delay={0.04}>
      <h1>{page.title}</h1>
      <p className="text-foreground-lighter">{page.description}</p>
    </Section>
    <article>
      <Section delay={0.1}>
        <Mdx code={page.body} />
      </Section>
    </article>
  </>
);

export default TalkPage;
