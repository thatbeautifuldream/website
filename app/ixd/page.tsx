import type { Metadata } from 'next';
import { Section } from '@/components/section';
import { createMetadata } from '@/lib/metadata';
import { DailyChallengeSubmissions } from './_components/daily-challenge-submissions';
import { submissions } from './_components/submissions';

const page = {
  title: 'Interaction Design Challenge',
  description: `Milind's submissions for the Peerlist's week long IxD challenge`,
};

export const metadata: Metadata = createMetadata({
  title: page.title,
  description: page.description,
  image: `/og?title=${encodeURIComponent(page.title)}&description=${encodeURIComponent(page.description)}`,
});

const InteractionDesignChallengePage = () => (
  <>
    <Section className="gap-0 text-center" delay={0}>
      <h1 className="font-light font-serif text-4xl">{page.title}</h1>
      <p className="text-foreground-lighter">{page.description}</p>
    </Section>
    <article>
      <DailyChallengeSubmissions submissions={submissions} />
    </article>
  </>
);

export default InteractionDesignChallengePage;
