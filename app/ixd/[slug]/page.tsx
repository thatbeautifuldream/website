import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Section } from '@/components/section';
import { createMetadata } from '@/lib/metadata';
import { submissions } from '../_components/submissions';

type TProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: TProps): Promise<Metadata> => {
  const { slug } = await params;
  const submission = submissions.find((s) => s.slug === slug);

  if (!submission) {
    return createMetadata({
      title: 'Not Found',
      description: 'Submission not found',
    });
  }

  return createMetadata({
    title: submission.title,
    description: `Milind's ${submission.title} submission for the Peerlist's week long interaction design challenge`,
    image: `/og?title=${encodeURIComponent(submission.title)}&description=${encodeURIComponent(`Milind's ${submission.title} submission for the Peerlist's week long interaction design challenge`)}`,
  });
};

const SubmissionPage = async ({ params }: TProps) => {
  const { slug } = await params;
  const submission = submissions.find((s) => s.slug === slug);

  if (!submission) {
    notFound();
  }

  return (
    <>
      <Section className="gap-0 text-center" delay={0}>
        <h1 className="font-light font-serif text-4xl">{submission.title}</h1>
        <p className="mt-2 text-foreground-lighter text-sm">
          {new Date(submission.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </Section>
      <article className="w-full">{submission.component}</article>
    </>
  );
};

export default SubmissionPage;
