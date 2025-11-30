'use client';

import { ArrowLeftToLineIcon, ExternalLinkIcon } from 'lucide-react';
import Image from 'next/image';
import { ViewTransition } from 'react';
import { Link } from '@/components/link';
import { Section } from '@/components/section';
import type { TTalk } from '@/components/talks';
import { cn } from '@/lib/utils';

type TTalkContentProperties = {
  readonly talk: TTalk;
};

export function TalkContent({ talk }: TTalkContentProperties) {
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
          href="/about"
        >
          <ArrowLeftToLineIcon size={12} />
          About
        </Link>
      </Section>
      <Section className="gap-1">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <ViewTransition name={`talk-header-${talk.slug}`}>
              <div className="inline-block">
                <div className="inline-block bg-black/85 px-3 py-2 md:px-5 md:py-3 dark:bg-white/90">
                  <div>
                    <h1 className="font-bold text-2xl text-white leading-tight md:text-3xl dark:text-black">
                      {talk.title}
                    </h1>
                    {talk.date && (
                      <p className="mt-0.5 text-white/90 text-xs dark:text-black/80">
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
          <div className="flex items-center gap-3">
            {talk.url && (
              <div className="inline-block">
                <div className="inline-block bg-black/85 px-4 py-2 transition-opacity hover:opacity-80 dark:bg-white/90">
                  <Link
                    className="flex cursor-pointer items-center gap-2 text-sm text-white dark:text-black"
                    href={talk.url}
                  >
                    Event
                    <ExternalLinkIcon size={16} />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
        <ViewTransition name={`talk-description-${talk.slug}`}>
          <div className="space-y-2">
            <p className="text-foreground-lighter text-sm leading-relaxed">
              {talk.description}
            </p>
            {talk.event && (
              <p className="text-foreground-lighter text-xs leading-relaxed">
                Presented at <span className="font-medium">{talk.event}</span>
              </p>
            )}
          </div>
        </ViewTransition>
      </Section>
      {talk.image && (
        <Section>
          <ViewTransition name={`talk-image-${talk.slug}`}>
            <Image
              alt={talk.title}
              className="w-full overflow-hidden rounded-lg border border-border/50"
              height={600}
              src={talk.image}
              width={800}
            />
          </ViewTransition>
        </Section>
      )}
    </>
  );
}
