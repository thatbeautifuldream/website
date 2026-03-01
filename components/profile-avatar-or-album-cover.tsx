'use client';

import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import { ImageZoom } from './image-zoom';

const GITHUB_AVATAR_URL =
  'https://avatars.githubusercontent.com/u/28717686?v=4';

export function ProfileAvatarOrAlbumCover() {
  const { data: spotifyData } = useQuery({
    ...orpc.spotify['currently-playing'].queryOptions(),
    refetchInterval: 30_000,
    refetchIntervalInBackground: true,
    staleTime: 25_000,
  });

  const isPlaying = spotifyData?.isPlaying && spotifyData?.track;
  const albumImage = isPlaying ? spotifyData.track?.album?.image : null;
  const src = albumImage ?? GITHUB_AVATAR_URL;

  return (
    <ImageZoom key={src}>
      <motion.img
        alt={albumImage ? 'Currently playing album artwork' : 'Profile'}
        animate={{ filter: 'blur(0px)', opacity: 1 }}
        className="size-10 rounded-full object-cover transition-transform duration-200 ease-out hover:scale-110"
        height={40}
        initial={{ filter: 'blur(4px)', opacity: 0 }}
        src={src}
        transition={{ duration: 0.5 }}
        width={40}
      />
    </ImageZoom>
  );
}
