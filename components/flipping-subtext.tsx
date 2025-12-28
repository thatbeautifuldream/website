'use client';

import { useQuery } from '@tanstack/react-query';
import { motion, useReducedMotion } from 'motion/react';
import { orpc } from '@/lib/orpc';
import { Link } from './link';

const PORTFOLIO_STATS_PROMO_END_DATE = new Date('2026-01-15');

export function FlippingSubtext() {
  const shouldReduceMotion = useReducedMotion();
  const shouldShowPromo = new Date() < PORTFOLIO_STATS_PROMO_END_DATE;

  const { data: spotifyData } = useQuery({
    ...orpc.spotify['currently-playing'].queryOptions(),
    refetchInterval: 30_000,
    refetchIntervalInBackground: true,
    staleTime: 25_000,
  });

  const isPlaying = spotifyData?.isPlaying && spotifyData?.track;
  const trackTitle = isPlaying ? spotifyData.track?.name : null;

  if (shouldShowPromo) {
    return (
      <p className="text-foreground-lighter text-sm leading-normal">
        Check out my{' '}
        <Link
          className="transition-colors hover:text-foreground"
          href="/portfolio-stats-2025"
        >
          Portfolio Stats 2025
        </Link>
        .
      </p>
    );
  }

  if (shouldReduceMotion || !isPlaying) {
    return (
      <p className="text-foreground-lighter text-sm leading-normal">
        Product Engineer, currently at{' '}
        <a href="https://getmerlin.in/chat">Merlin AI</a>.
      </p>
    );
  }

  return (
    <div className="relative h-5 overflow-hidden">
      <motion.div
        animate={{ y: isPlaying ? -24 : 0 }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
          type: 'tween',
          delay: isPlaying ? 3 : 0,
        }}
      >
        <p className="h-6 text-foreground-lighter text-sm leading-normal">
          Product Engineer, currently at{' '}
          <a href="https://getmerlin.in/chat">Merlin AI</a>.
        </p>
      </motion.div>

      <motion.div
        animate={{ y: isPlaying ? -24 : 0 }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
          type: 'tween',
          delay: isPlaying ? 3 : 0,
        }}
      >
        <p className="h-6 text-foreground-lighter text-sm leading-normal">
          <span className="text-green-500">♫</span>{' '}
          <Link
            className="transition-colors hover:text-foreground"
            href="/spotify"
          >
            {trackTitle}
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
