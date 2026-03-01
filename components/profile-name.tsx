'use client';

import { useQuery } from '@tanstack/react-query';
import { TextMorph } from 'torph/react';
import { orpc } from '@/lib/orpc';

export function ProfileName() {
  const { data: spotifyData } = useQuery({
    ...orpc.spotify['currently-playing'].queryOptions(),
    refetchInterval: 30_000,
    refetchIntervalInBackground: true,
    staleTime: 25_000,
  });

  const isPlaying = spotifyData?.isPlaying && spotifyData?.track;

  return (
    <TextMorph className="font-medium text-foreground leading-normal">
      {isPlaying ? 'Milind is listening to...' : 'Milind Mishra'}
    </TextMorph>
  );
}
