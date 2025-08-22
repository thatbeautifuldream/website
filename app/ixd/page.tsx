import type { Metadata } from 'next';
import { PeerlistEmbed } from '@/components/peerlist-embed';
import { Section } from '@/components/section';
import { createMetadata } from '@/lib/metadata';

const page = {
  title: 'Interaction Design',
  description: `Peerlist's Interaction Design Challenge Submissions | Milind's Submission for the week long interaction design challenge from Peerlist`,
};

export const metadata: Metadata = createMetadata({
  title: page.title,
  description: page.description,
  image: `/og?title=${encodeURIComponent(page.title)}&description=${encodeURIComponent(page.description)}`,
});

const AboutPage = () => (
  <>
    <Section className="gap-0 text-center" delay={0}>
      <h1 className="font-light font-serif text-4xl">{page.title}</h1>
      <p className="text-foreground-lighter">
        {page.description.split('|')[0]}
      </p>
    </Section>
    <article>
      <Section delay={1}>
        <PeerlistEmbed postId="ACTHEOG6L6JEPLP7839NNORRMN8LLG" />
      </Section>
    </article>
  </>
);

export default AboutPage;
