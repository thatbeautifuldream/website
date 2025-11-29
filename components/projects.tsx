'use client';

import Image from 'next/image';
import type { ReactNode } from 'react';
import { ViewTransition } from 'react';
import { Link } from '@/components/link';
import { cn } from '@/lib/utils';

export type TProject = {
  slug: string;
  title: string;
  description?: string;
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

export const ProjectCard = ({ project, children }: TProjectCardProps) => {
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
