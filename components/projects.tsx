'use client';

import { type ReactNode, ViewTransition } from 'react';
import { Link } from '@/components/link';
import {
  MediaFallback,
  RemoteMediaImage,
  RemoteMediaVideo,
} from '@/components/media-frame';
import { dateFormatterMonthYear } from '@/lib/date-formatters';
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
  caseStudy?: string;
};

type TProjectCardProps = {
  project: TProject;
  children?: ReactNode;
  priority?: boolean;
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

const rotationCache = new Map<string, number>();

export const getStripRotation = (slug: string): number => {
  if (rotationCache.has(slug)) {
    return rotationCache.get(slug) as number;
  }

  const hash = slug
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const value = hash % 6;
  const rotation = value < 3 ? value - 3 : value - 2;

  rotationCache.set(slug, rotation);
  return rotation;
};

export const ProjectCard = ({
  project,
  children,
  priority = false,
}: TProjectCardProps) => {
  const stripRotation = getStripRotation(project.slug);
  let projectContent: ReactNode;

  if (project.video) {
    projectContent = (
      <ViewTransition name={`project-image-${project.slug}`}>
        <RemoteMediaVideo
          autoPlay
          loop
          muted
          playsInline
          priority={priority}
          sourceType={getVideoMimeType(project.video)}
          src={project.video}
        />
      </ViewTransition>
    );
  } else if (project.image) {
    projectContent = (
      <ViewTransition name={`project-image-${project.slug}`}>
        <RemoteMediaImage
          alt={project.title}
          priority={priority}
          src={project.image}
        />
      </ViewTransition>
    );
  } else {
    projectContent = (
      <ViewTransition name={`project-image-${project.slug}`}>
        <MediaFallback title={project.title} />
      </ViewTransition>
    );
  }

  return (
    <Link
      aria-label={project.title}
      className="group relative block outline-none transition-transform duration-200 ease-out hover:scale-[1.025] focus-visible:outline active:scale-100"
      href={`/project/${project.slug}`}
    >
      <div className="sr-only">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        {project.tags && project.tags.length > 0 && (
          <p>Technologies: {project.tags.join(', ')}</p>
        )}
        {project.externalUrl && <p>Live: {project.externalUrl}</p>}
        {project.githubUrl && <p>Source code: {project.githubUrl}</p>}
      </div>
      <div
        className={cn(
          'relative w-full overflow-clip rounded-lg transition-shadow duration-200 ease-out group-hover:shadow-lg group-active:shadow-none dark:shadow-none'
        )}
      >
        {children || (
          <>
            {projectContent}
            <div className="absolute inset-0 rounded-lg ring-1 ring-black/10 ring-inset dark:ring-white/10" />
            <div className="absolute right-0 bottom-0 left-0 p-4 md:p-6">
              <ViewTransition name={`project-header-${project.slug}`}>
                <div className="inline-block">
                  <div
                    className="inline-block bg-black/85 px-3 py-2 md:px-5 md:py-3"
                    style={{
                      transform: `rotate(${stripRotation}deg)`,
                    }}
                  >
                    <div
                      style={{
                        transform: `rotate(${-stripRotation}deg)`,
                      }}
                    >
                      <h2 className="font-bold text-lg text-white leading-tight md:text-2xl">
                        {project.title}
                      </h2>
                      {project.date && (
                        <p className="mt-0.5 text-[0.625rem] text-white/90 md:text-xs">
                          {dateFormatterMonthYear.format(project.date)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </ViewTransition>
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
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} priority={index < 2} project={project} />
      ))}
    </div>
  );
};
