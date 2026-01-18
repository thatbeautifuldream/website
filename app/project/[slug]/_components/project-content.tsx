'use client';

import { ArrowLeftToLineIcon, GithubIcon } from 'lucide-react';
import Image from 'next/image';
import { ViewTransition } from 'react';
import { Streamdown } from 'streamdown';
import { Link } from '@/components/link';
import { getStripRotation, type TProject } from '@/components/projects';
import { Section } from '@/components/section';
import { cn } from '@/lib/utils';

type TProjectContentProperties = {
  readonly project: TProject;
};

const getVideoMimeType = (videoUrl: string): string => {
  const extension = videoUrl.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'webm':
      return 'video/webm';
    case 'mp4':
      return 'video/mp4';
    case 'ogg':
      return 'video/ogg';
    default:
      return 'video/mp4';
  }
};

export function ProjectContent({ project }: TProjectContentProperties) {
  const stripRotation = getStripRotation(project.slug);

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
          href="/project"
        >
          <ArrowLeftToLineIcon size={12} />
          Projects
        </Link>
      </Section>
      <Section className="gap-1">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <ViewTransition name={`project-header-${project.slug}`}>
              <div className="inline-block">
                <div
                  className="inline-block bg-black/85 px-3 py-2 md:px-5 md:py-3 dark:bg-white/90"
                  style={{
                    transform: `rotate(${stripRotation}deg)`,
                  }}
                >
                  <div
                    style={{
                      transform: `rotate(${-stripRotation}deg)`,
                    }}
                  >
                    <h1 className="font-bold text-2xl text-white leading-tight md:text-3xl dark:text-black">
                      {project.title}
                    </h1>
                    {project.date && (
                      <p className="mt-0.5 text-white/90 text-xs dark:text-black/80">
                        {new Intl.DateTimeFormat('en-US', {
                          month: 'long',
                          year: 'numeric',
                        }).format(project.date)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </ViewTransition>
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
              <div className="inline-block">
                <div
                  className="inline-block bg-black/85 px-4 py-2 transition-opacity hover:opacity-80 dark:bg-white/90"
                  style={{
                    transform: `rotate(${stripRotation}deg)`,
                  }}
                >
                  <Link
                    className="flex cursor-pointer items-center gap-2 text-sm text-white dark:text-black"
                    href={project.externalUrl}
                    style={{
                      transform: `rotate(${-stripRotation}deg)`,
                    }}
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
                      <title>External link</title>
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
        <ViewTransition name={`project-description-${project.slug}`}>
          <p className="mt-6 text-foreground-lighter text-sm leading-relaxed">
            {project.description}
          </p>
        </ViewTransition>
        {project.tags && project.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <code
                className="whitespace-nowrap rounded-md border bg-secondary/40 px-3 py-1 text-xs"
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
                <source
                  src={project.video}
                  type={getVideoMimeType(project.video)}
                />
              </video>
            ) : (
              <Image
                alt={project.title}
                className="w-full overflow-hidden rounded-lg border border-border/50"
                height={600}
                // biome-ignore lint/style/noNonNullAssertion: fallback
                src={project.image!}
                width={800}
              />
            )}
          </ViewTransition>
        </Section>
      ) : null}
      {project.caseStudy ? (
        <Section>
          <Streamdown>{JSON.parse(project.caseStudy)}</Streamdown>
        </Section>
      ) : null}
    </>
  );
}
