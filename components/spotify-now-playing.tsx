'use client';

import { useQuery } from '@tanstack/react-query';
import { AnnoyedIcon, ExternalLink, Music } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageZoom } from './image-zoom';
import { Link } from './link';
import { Section } from './section';
import { orpc } from '@/lib/orpc';

export const SpotifyNowPlaying = () => {
    const { data: spotifyData, isLoading, error } = useQuery({
        ...orpc.spotify["currently-playing"].queryOptions(),
        refetchInterval: 30_000,
        refetchIntervalInBackground: true,
        staleTime: 25_000,
    });

    if (isLoading) {
        return null;
    }

    if (error) {
        return (
            <Section className="gap-2">
                <div className="flex items-center gap-2">
                    <Music className="size-4 text-green-500" />
                    <span className="font-medium text-foreground">Now Playing</span>
                </div>
                <div className='flex items-center gap-3 rounded-lg border-destructive bg-destructive/10 p-3 transition-all hover:bg-destructive/20'>
                    <div className="flex items-center gap-2 text-destructive text-sm">
                        <AnnoyedIcon className="size-4" />
                        <span>Unable to load current track</span>
                    </div>
                </div>
            </Section>
        );
    }

    if (!spotifyData?.isPlaying) {
        return null;
    }

    if (!spotifyData.track) {
        return null;
    }

    // Handle track
    if (spotifyData.track) {
        const { track } = spotifyData;
        return (
            <Section className="gap-2">
                <div className="flex items-center gap-2">
                    <Music className="size-4 text-green-500" />
                    <span className="font-medium text-foreground">Now Playing</span>
                </div>

                <div className="flex items-center gap-3 p-3">
                    {track.album.image && (
                        <ImageZoom>
                            <motion.img
                                alt={`${track.album.name} cover`}
                                className="size-16 rounded-md object-cover"
                                height={48}
                                src={track.album.image}
                                whileHover={{ scale: 1.05 }}
                                width={48}
                            />
                        </ImageZoom>
                    )}

                    <div className="flex-1 space-y-1">
                        <Link
                            className="line-clamp-1 font-medium text-foreground text-sm transition-colors hover:text-foreground-light"
                            href={track.url}
                        >
                            {track.name}
                        </Link>

                        <div className="flex items-center gap-1 text-foreground-lighter text-xs">
                            <span>by</span>
                            {track.artists.map((artist, index) => (
                                <span key={artist.name}>
                                    <Link
                                        className="hover:text-foreground-light"
                                        href={artist.url}
                                    >
                                        {artist.name}
                                    </Link>
                                    {index < track.artists.length - 1 && ', '}
                                </span>
                            ))}
                        </div>

                        <div className="text-foreground-lighter text-xs">
                            on {track.album.name}
                        </div>
                    </div>

                    <Link
                        className="flex items-center gap-1 text-foreground-lighter text-xs transition-colors hover:text-foreground-light"
                        href={track.url}
                    >
                        <ExternalLink className="size-3" />
                        <span>Spotify</span>
                    </Link>
                </div>
            </Section>
        );
    }

    // Handle episode
    // if (spotifyData.episode) {
    //     const { episode } = spotifyData;
    //     return (
    //         <Section className="gap-2">
    //             <div className="flex items-center gap-2">
    //                 <Mic className="size-4 text-green-500" />
    //                 <span className="font-medium text-foreground">Now Playing</span>
    //             </div>

    //             <div className="flex items-center gap-3 rounded-lg border bg-secondary/30 p-3 transition-colors hover:bg-secondary/40">
    //                 {(episode.image || episode.show.image) && (
    //                     <ImageZoom>
    //                         {/** biome-ignore lint/performance/noImgElement: spotify episode image */}
    //                         <img
    //                             alt={`${episode.show.name} cover`}
    //                             className="size-12 rounded-md object-cover"
    //                             height={48}
    //                             src={episode.image || episode.show.image}
    //                             width={48}
    //                         />
    //                     </ImageZoom>
    //                 )}

    //                 <div className="flex-1 space-y-1">
    //                     <Link
    //                         className="line-clamp-1 font-medium text-foreground text-sm transition-colors hover:text-foreground-light"
    //                         href={episode.url}
    //                     >
    //                         {episode.name}
    //                     </Link>

    //                     <div className="flex items-center gap-1 text-foreground-lighter text-xs">
    //                         <span>from</span>
    //                         <span className="font-medium">{episode.show.name}</span>
    //                     </div>

    //                     <div className="text-foreground-lighter text-xs">
    //                         by {episode.show.publisher}
    //                     </div>
    //                 </div>

    //                 <Link
    //                     className="flex items-center gap-1 text-foreground-lighter text-xs transition-colors hover:text-foreground-light"
    //                     href={episode.url}
    //                 >
    //                     <ExternalLink className="size-3" />
    //                     <span>Spotify</span>
    //                 </Link>
    //             </div>
    //         </Section>
    //     );
    // }

    return null;
};
