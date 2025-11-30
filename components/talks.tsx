'use client';

import Image from 'next/image';
import type { ReactNode } from 'react';
import { ViewTransition } from 'react';
import { Link } from '@/components/link';
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
};

type TTalkGridProps = {
  talks?: TTalk[];
  children?: ReactNode;
};

export const TalkCard = ({ talk, children }: TTalkCardProps) => {
  const talkContent = talk.image ? (
    <ViewTransition name={`talk-image-${talk.slug}`}>
      <Image
        alt={talk.title}
        className="w-full"
        height={600}
        src={talk.image}
        width={800}
      />
    </ViewTransition>
  ) : (
    <ViewTransition name={`talk-image-${talk.slug}`}>
      <div className="flex size-full items-center justify-center bg-linear-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900">
        <span className="font-medium text-lg text-neutral-400">
          {talk.title}
        </span>
      </div>
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
      {talks.map((talk) => (
        <TalkCard key={talk.slug} talk={talk} />
      ))}
    </div>
  );
};
