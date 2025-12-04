'use client';

import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import { orpc } from '@/lib/orpc';
import { Link } from './link';

export function SpotifyNowPlayingText() {
  const {
    data: spotifyData,
    isLoading,
    error,
  } = useQuery({
    ...orpc.spotify['currently-playing'].queryOptions(),
    refetchInterval: 30_000,
    refetchIntervalInBackground: true,
    staleTime: 25_000,
  });

  if (isLoading || error || !spotifyData?.isPlaying || !spotifyData?.track) {
    return null;
  }

  const { track } = spotifyData;

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="text-foreground-lighter text-sm"
      initial={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.5 }}
    >
      <span className="text-green-500">♫</span>{' '}
      <Link className="transition-colors hover:text-foreground" href="/spotify">
        {track.name} by {track.artists.map((a) => a.name).join(', ')}
      </Link>
    </motion.div>
  );
}
