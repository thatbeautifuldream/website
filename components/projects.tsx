import type { ReactNode } from 'react';
import { Link } from '@/components/link';

// Types
export type TProject = {
  slug: string;
  title: string;
  description?: string;
  image?: string;
  video?: string;
  externalUrl?: string;
};

type TProjectCardProps = {
  project: TProject;
  children?: ReactNode;
};

type TProjectGridProps = {
  projects?: TProject[];
  children?: ReactNode;
};

// ProjectCard Component
export const ProjectCard = ({ project, children }: TProjectCardProps) => {
  const href = project.externalUrl || `/${project.slug}`;
  const isExternal = Boolean(project.externalUrl);

  let projectContent: ReactNode;

  if (project.video) {
    projectContent = (
      <video
        autoPlay
        className="size-full object-cover object-top"
        loop
        muted
        playsInline
        poster={project.image}
      >
        <source src={project.video} type="video/mp4" />
      </video>
    );
  } else if (project.image) {
    projectContent = (
      // biome-ignore lint/performance/noImgElement: works
      <img
        alt={project.title}
        className="size-full object-cover object-top"
        src={project.image}
      />
    );
  } else {
    projectContent = (
      <div className="flex size-full items-center justify-center bg-linear-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900">
        <span className="font-medium text-lg text-neutral-400">
          {project.title}
        </span>
      </div>
    );
  }

  return (
    <Link
      aria-label={project.title}
      className="group relative block outline-none transition-transform duration-200 ease-out hover:scale-[1.025] focus-visible:outline active:scale-100"
      href={href}
      {...(isExternal && {
        rel: 'external',
        target: '_blank',
      })}
    >
      <div className="relative aspect-16/10 w-full overflow-clip rounded-2xl transition-shadow duration-200 ease-out group-hover:shadow-2xl group-active:shadow-none dark:shadow-none">
        {children || (
          <>
            {projectContent}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-black/10 ring-inset dark:ring-white/10" />
          </>
        )}
      </div>
    </Link>
  );
};

// ProjectGrid Component
export const ProjectGrid = ({ projects, children }: TProjectGridProps) => {
  if (children) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{children}</div>
    );
  }

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
};
