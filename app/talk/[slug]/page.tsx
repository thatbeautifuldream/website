import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { FC } from 'react';
import { TALKS } from '@/lib/data/talks';
import { createMetadata } from '@/lib/metadata';
import { TalkContent } from './_components/talk-content';

type PageProperties = {
  readonly params: Promise<{
    slug: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: PageProperties): Promise<Metadata> => {
  const { slug } = await params;
  const talk = TALKS.find((t) => t.slug === slug);

  if (!talk) {
    return {};
  }

  return createMetadata({
    title: talk.title,
    description: talk.description,
    image: `/og?title=${encodeURIComponent(talk.title)}&description=${encodeURIComponent(talk.description)}`,
  });
};

export const generateStaticParams = (): { slug: string }[] =>
  TALKS.map((talk) => ({
    slug: talk.slug,
  }));

const Page: FC<PageProperties> = async ({ params }) => {
  const { slug } = await params;
  const talk = TALKS.find((t) => t.slug === slug);

  if (!talk) {
    notFound();
  }

  return <TalkContent talk={talk} />;
};

export default Page;
