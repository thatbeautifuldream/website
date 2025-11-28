'use client';

import { ArrowLeftToLineIcon, GithubIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import { use, ViewTransition } from 'react';
import { Link } from '@/components/link';
import { Section } from '@/components/section';
import { PROJECTS } from '@/lib/data/projects';
import { cn } from '@/lib/utils';

type PageProperties = {
  readonly params: Promise<{
    slug: string;
  }>;
};

export default function Page({ params }: PageProperties) {
  const { slug } = use(params);
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
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
      <Section className="gap-1">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <ViewTransition name={`project-title-${project.slug}`}>
              <h1>{project.title}</h1>
            </ViewTransition>
            {project.date && (
              <p className="text-foreground-lighter text-xs">
                {new Intl.DateTimeFormat('en-US', {
                  month: 'long',
                  year: 'numeric',
                }).format(project.date)}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <Link
                aria-label="View on GitHub"
                className="text-foreground-lighter transition-colors hover:text-foreground"
                href={project.githubUrl}
              >
                <GithubIcon size={20} />
              </Link>
            )}
            {project.externalUrl && (
              <Link
                className={cn(
                  'flex cursor-external items-center gap-2 rounded-full bg-foreground px-4 py-2 text-background text-sm transition-opacity',
                  'hover:opacity-80'
                )}
                href={project.externalUrl}
              >
                Visit
                <svg
                  fill="none"
                  height="16"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </Link>
            )}
          </div>
        </div>
        {project.description && (
          <ViewTransition name={`project-description-${project.slug}`}>
            <p className="text-foreground-lighter text-sm leading-relaxed">
              {project.description}
            </p>
          </ViewTransition>
        )}
        {project.tags && project.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <code
                className="whitespace-nowrap rounded-md bg-secondary px-3 py-1 text-xs"
                key={tag}
              >
                {tag}
              </code>
            ))}
          </div>
        )}
      </Section>
      {project.image || project.video ? (
        <Section>
          <ViewTransition name={`project-image-${project.slug}`}>
            {project.video ? (
              <video
                autoPlay
                className="w-full overflow-hidden rounded-lg border border-border/50"
                controls
                loop
                muted
                playsInline
                poster={project.image}
              >
                <source src={project.video} type="video/mp4" />
              </video>
            ) : (
              <img
                alt={project.title}
                className="w-full overflow-hidden rounded-lg border border-border/50"
                src={project.image}
              />
            )}
          </ViewTransition>
        </Section>
      ) : null}
    </>
  );
}
