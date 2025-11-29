import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { FC } from 'react';
import { PROJECTS } from '@/lib/data/projects';
import { createMetadata } from '@/lib/metadata';
import { ProjectContent } from './_components/project-content';

type PageProperties = {
  readonly params: Promise<{
    slug: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: PageProperties): Promise<Metadata> => {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return {};
  }

  return createMetadata({
    title: project.title,
    description: project.description || '',
    image: `/og?title=${encodeURIComponent(project.title)}`,
  });
};

export const generateStaticParams = (): { slug: string }[] =>
  PROJECTS.map((project) => ({
    slug: project.slug,
  }));

const Page: FC<PageProperties> = async ({ params }) => {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectContent project={project} />;
};

export default Page;
