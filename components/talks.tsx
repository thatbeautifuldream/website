'use client';

import type { ReactNode } from 'react';
import { ViewTransition } from 'react';
import { Link } from '@/components/link';
import { MediaFallback, RemoteMediaImage } from '@/components/media-frame';
import { Section } from '@/components/section';
import { cn } from '@/lib/utils';

export type TTalk = {
  slug: string;
  event: string;
  title: string;
  description: string;
  image?: string;
  url?: string;
  date?: Date;
};

type TTalkCardProps = {
  talk: TTalk;
  children?: ReactNode;
  priority?: boolean;
};

type TTalkGridProps = {
  talks?: TTalk[];
  children?: ReactNode;
};

export const TalkCard = ({ talk, children, priority = false }: TTalkCardProps) => {
  const talkContent = talk.image ? (
    <ViewTransition name={`talk-image-${talk.slug}`}>
      <RemoteMediaImage alt={talk.title} priority={priority} src={talk.image} />
    </ViewTransition>
  ) : (
    <ViewTransition name={`talk-image-${talk.slug}`}>
      <MediaFallback title={talk.title} />
    </ViewTransition>
  );

  return (
    <Link
      aria-label={talk.title}
      className="group relative block outline-none transition-transform duration-200 ease-out hover:scale-[1.025] focus-visible:outline active:scale-100"
      href={`/talk/${talk.slug}`}
    >
      <div
        className={cn(
          'relative w-full overflow-clip rounded-lg transition-shadow duration-200 ease-out group-hover:shadow-lg group-active:shadow-none dark:shadow-none'
        )}
      >
        {children || (
          <>
            {talkContent}
            <div className="absolute inset-0 rounded-lg ring-1 ring-black/10 ring-inset dark:ring-white/10" />
            <div className="absolute right-0 bottom-0 left-0 p-4 md:p-6">
              <ViewTransition name={`talk-header-${talk.slug}`}>
                <div className="inline-block">
                  <div className="inline-block bg-black/85 px-3 py-2 md:px-5 md:py-3">
                    <div>
                      <h2 className="font-bold text-lg text-white leading-tight md:text-2xl">
                        {talk.title}
                      </h2>
                      {talk.date && (
                        <p className="mt-0.5 text-[0.625rem] text-white/90 md:text-xs">
                          {new Intl.DateTimeFormat('en-US', {
                            month: 'long',
                            year: 'numeric',
                          }).format(talk.date)}
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

export const TalkGrid = ({ talks, children }: TTalkGridProps) => {
  if (children) {
    return <div className="grid gap-6">{children}</div>;
  }

  if (!talks || talks.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-6">
      {talks.map((talk, index) => (
        <Section delay={0.12 + index * 0.04} key={talk.slug}>
          <TalkCard priority={index < 3} talk={talk} />
        </Section>
      ))}
    </div>
  );
};
