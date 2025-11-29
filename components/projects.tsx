'use client';

import Image from 'next/image';
import type { ReactNode } from 'react';
import { ViewTransition } from 'react';
import { Link } from '@/components/link';
import { cn } from '@/lib/utils';

export type TProject = {
  slug: string;
  title: string;
  description: string;
  image?: string;
  video?: string;
  externalUrl?: string;
  githubUrl?: string;
  date?: Date;
  tags?: string[];
};

type TProjectCardProps = {
  project: TProject;
  children?: ReactNode;
};

type TProjectGridProps = {
  projects?: TProject[];
  children?: ReactNode;
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

// Generate a deterministic rotation based on slug
const getStripRotation = (slug: string): number => {
  const hash = slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return -3 + (hash % 7); // Random rotation between -3 and 3 degrees
};

export const ProjectCard = ({ project, children }: TProjectCardProps) => {
  const stripRotation = getStripRotation(project.slug);
  let projectContent: ReactNode;

  if (project.video) {
    projectContent = (
      <ViewTransition name={`project-image-${project.slug}`}>
        <video
          autoPlay
          className="size-full object-cover object-top"
          loop
          muted
          playsInline
          poster={project.image}
        >
          <source src={project.video} type={getVideoMimeType(project.video)} />
        </video>
      </ViewTransition>
    );
  } else if (project.image) {
    projectContent = (
      <ViewTransition name={`project-image-${project.slug}`}>
        <Image
          alt={project.title}
          className="size-full object-cover object-top"
          fill
          src={project.image}
        />
      </ViewTransition>
    );
  } else {
    projectContent = (
      <ViewTransition name={`project-image-${project.slug}`}>
        <div className="flex size-full items-center justify-center bg-linear-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900">
          <span className="font-medium text-lg text-neutral-400">
            {project.title}
          </span>
        </div>
      </ViewTransition>
    );
  }

  return (
    <Link
      aria-label={project.title}
      className="group relative block outline-none transition-transform duration-200 ease-out hover:scale-[1.025] focus-visible:outline active:scale-100"
      href={`/project/${project.slug}`}
    >
      <div
        className={cn(
          'relative w-full overflow-clip rounded-lg transition-shadow duration-200 ease-out group-hover:shadow-lg group-active:shadow-none dark:shadow-none',
          project.video ? '' : 'aspect-16/10'
        )}
      >
        {children || (
          <>
            {projectContent}
            <div className="absolute inset-0 rounded-lg ring-1 ring-black/10 ring-inset dark:ring-white/10" />
            <div className="absolute right-0 bottom-0 left-0 p-4 md:p-6">
              <ViewTransition name={`project-title-${project.slug}`}>
                <div className="inline-block">
                  <div
                    className="inline-block bg-black/80 px-3 py-1.5 md:px-4 md:py-2"
                    style={{
                      transform: `rotate(${stripRotation}deg)`,
                    }}
                  >
                    <h2
                      className="font-bold text-lg text-white md:text-2xl"
                      style={{
                        transform: `rotate(${-stripRotation}deg)`,
                      }}
                    >
                      {project.title}
                    </h2>
                  </div>
                </div>
              </ViewTransition>
              {project.date && (
                <ViewTransition name={`project-date-${project.slug}`}>
                  <div className="mt-1.5 inline-block md:mt-2">
                    <div
                      className="inline-block bg-black/80 px-2 py-0.5 md:px-3 md:py-1"
                      style={{
                        transform: `rotate(${stripRotation}deg)`,
                      }}
                    >
                      <p
                        className="text-[0.625rem] text-white md:text-xs"
                        style={{
                          transform: `rotate(${-stripRotation}deg)`,
                        }}
                      >
                        {new Intl.DateTimeFormat('en-US', {
                          month: 'long',
                          year: 'numeric',
                        }).format(project.date)}
                      </p>
                    </div>
                  </div>
                </ViewTransition>
              )}
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export const ProjectGrid = ({ projects, children }: TProjectGridProps) => {
  if (children) {
    return <div className="grid gap-6">{children}</div>;
  }

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
};
