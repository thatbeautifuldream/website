import { allPages } from 'content-collections';
import { ArrowLeftToLineIcon } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Mdx } from '@/components/mdx';
import { Section } from '@/components/section';
import { createMetadata } from '@/lib/metadata';
import { cn } from '@/lib/utils';

const page = allPages.find((p) => p._meta.fileName === 'spotify.mdx');

if (!page) {
  throw new Error('Spotify page not found');
}

export const metadata: Metadata = createMetadata({
  title: page.title,
  description: page.description,
  image: `/og?title=${encodeURIComponent(page.title)}&description=${encodeURIComponent(page.description)}`,
});

const SpotifyPage = () => (
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
        href="/"
      >
        <ArrowLeftToLineIcon size={12} />
        Home
      </Link>
    </Section>
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

export default SpotifyPage;
