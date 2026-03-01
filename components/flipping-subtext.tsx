'use client';

import { useMemo } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

const FALLBACK_TEXT = 'Product Engineer, currently at Merlin AI.';

const easeOutQuart = [0.165, 0.84, 0.44, 1] as const;

export function FlippingSubtext() {
  const prefersReducedMotion = useReducedMotion();
  const { data: spotifyData } = useQuery({
    ...orpc.spotify['currently-playing'].queryOptions(),
    refetchInterval: 30_000,
    refetchIntervalInBackground: true,
    staleTime: 25_000,
  });

  const displayText = useMemo(() => {
    const isPlaying = spotifyData?.isPlaying && spotifyData?.track;
    const trackTitle = isPlaying ? spotifyData.track?.name : null;
    return trackTitle && trackTitle.length > 0 ? trackTitle : FALLBACK_TEXT;
  }, [spotifyData]);

  const transition = {
    duration: prefersReducedMotion ? 0 : 0.25,
    ease: easeOutQuart,
  };

  return (
    <div className="relative min-h-[1.5em] w-fit overflow-hidden text-foreground-lighter text-sm leading-normal">
      <span aria-hidden="true" className="invisible block whitespace-nowrap">
        {displayText}
      </span>
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={displayText}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="absolute inset-x-0 top-0 block whitespace-nowrap"
          exit={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0.6, y: '-100%' }
          }
          initial={
            prefersReducedMotion ? { opacity: 0 } : { opacity: 0.6, y: '100%' }
          }
          transition={transition}
        >
          {displayText}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
