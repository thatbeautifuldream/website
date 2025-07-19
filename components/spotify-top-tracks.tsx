/** biome-ignore-all lint/performance/noImgElement: spotify album image */
'use client';

// import { useQuery } from '@tanstack/react-query';
import {
    AnnoyedIcon,
    ExternalLink,
    // Loader2Icon,
    // Music,
    TrendingUp,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { ImageZoom } from './image-zoom';
import { Link } from './link';
import { Section } from './section';

// type TSpotifyTopTrack = {
//     name: string;
//     artists: {
//         name: string;
//         url: string;
//     }[];
//     album: {
//         name: string;
//         image?: string;
//     };
//     url: string;
//     previewUrl?: string;
//     duration: number;
//     popularity: number;
//     explicit: boolean;
//     id: string;
// };

// type TSpotifyTopTracksResponse = {
//     tracks: TSpotifyTopTrack[];
//     total: number;
// };

// const fetchSpotifyTopTracks = async (): Promise<TSpotifyTopTracksResponse> => {
//     const response = await fetch('/api/spotify/top-5');
//     if (!response.ok) throw new Error('Failed to fetch Spotify top tracks');
//     return response.json();
// };

const formatDuration = (ms: number): string => {
    const minutes = Math.floor(ms / 60_000);
    const seconds = Math.floor((ms % 60_000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const topTracksData = {
    tracks: [
        {
            name: 'Dame Un Grrr',
            artists: [
                {
                    name: 'Fantomel',
                    url: 'https://open.spotify.com/artist/5KSiZki8gCESiSq0z35Ald',
                },
                {
                    name: 'Kate Linn',
                    url: 'https://open.spotify.com/artist/2b01rwtcqW5LyfVBMzIFQ4',
                },
            ],
            album: {
                name: 'Dame Un Grrr',
                image:
                    'https://i.scdn.co/image/ab67616d0000b2735e939b31aa485a3613d516f0',
            },
            url: 'https://open.spotify.com/track/7ih7pYSRZgWCTXuOmrnXjX',
            previewUrl: null,
            duration: 133_220,
            popularity: 81,
            explicit: false,
            id: '7ih7pYSRZgWCTXuOmrnXjX',
        },
        {
            name: 'Lose My Mind (feat. Doja Cat) [From F1® The Movie]',
            artists: [
                {
                    name: 'Don Toliver',
                    url: 'https://open.spotify.com/artist/4Gso3d4CscCijv0lmajZWs',
                },
                {
                    name: 'Doja Cat',
                    url: 'https://open.spotify.com/artist/5cj0lLjcoR7YOSnhnX0Po5',
                },
                {
                    name: 'F1 The Album',
                    url: 'https://open.spotify.com/artist/3aly4xJOy3LVznzvRIvFYC',
                },
            ],
            album: {
                name: 'Lose My Mind (feat. Doja Cat) [From F1® The Movie]',
                image:
                    'https://i.scdn.co/image/ab67616d0000b273bed9c7b9e33025a81d4d02e4',
            },
            url: 'https://open.spotify.com/track/02BcXEH1zJYbXSabPtNlKf',
            previewUrl: null,
            duration: 209_051,
            popularity: 87,
            explicit: false,
            id: '02BcXEH1zJYbXSabPtNlKf',
        },
        {
            name: 'Jhoom',
            artists: [
                {
                    name: 'Ali Zafar',
                    url: 'https://open.spotify.com/artist/3cKNppGLfcxdt9CtoHEZmQ',
                },
            ],
            album: {
                name: 'Jhoom',
                image:
                    'https://i.scdn.co/image/ab67616d0000b2733392b659e4df144331eb05c8',
            },
            url: 'https://open.spotify.com/track/1gAnghtUQIOKS6ZnyDPwut',
            previewUrl: null,
            duration: 389_213,
            popularity: 54,
            explicit: false,
            id: '1gAnghtUQIOKS6ZnyDPwut',
        },
        {
            name: 'No Love',
            artists: [
                {
                    name: 'Shubh',
                    url: 'https://open.spotify.com/artist/5r3wPya2PpeTTsXsGhQU8O',
                },
            ],
            album: {
                name: 'No Love',
                image:
                    'https://i.scdn.co/image/ab67616d0000b2732a46046339bd779f95a8cf8b',
            },
            url: 'https://open.spotify.com/track/08Isz2ETWSBhvIl8UpKYsp',
            previewUrl: null,
            duration: 170_387,
            popularity: 76,
            explicit: false,
            id: '08Isz2ETWSBhvIl8UpKYsp',
        },
        {
            name: 'Dancing With Your Ghost',
            artists: [
                {
                    name: 'Sasha Alex Sloan',
                    url: 'https://open.spotify.com/artist/4xnihxcoXWK3UqryOSnbw5',
                },
            ],
            album: {
                name: 'Dancing With Your Ghost',
                image:
                    'https://i.scdn.co/image/ab67616d0000b273141cf717cd3993690358a60c',
            },
            url: 'https://open.spotify.com/track/1TQXIltqoZ5XXyfCbAeSQQ',
            previewUrl: null,
            duration: 197_732,
            popularity: 79,
            explicit: false,
            id: '1TQXIltqoZ5XXyfCbAeSQQ',
        },
    ],
    total: 108,
};

const isLoading = false;
const error = false;

export const SpotifyTopTracks = () => {
    // const {
    //     data: topTracksData,
    //     isLoading,
    //     error,
    // } = useQuery({
    //     queryKey: ['spotify-top-tracks'],
    //     queryFn: fetchSpotifyTopTracks,
    //     staleTime: 30 * 60 * 1000,
    //     refetchOnWindowFocus: false,
    // });

    const [expanded, setExpanded] = useState(false);

    if (isLoading) {
        return (
            <Section className="gap-2">
                <div className="flex items-center gap-2">
                    <TrendingUp className="size-4 text-green-500" />
                    <span className="font-medium text-foreground">Top Tracks</span>
                </div>
                <div className="flex items-center justify-center p-8">
                    <div className="flex items-center gap-3">
                        <div className="animate-pulse text-foreground-lighter text-sm">
                            Curating top 5 tracks...
                        </div>
                    </div>
                </div>
            </Section>
        );
    }

    if (error) {
        return (
            <Section className="gap-2">
                <div className="flex items-center gap-2">
                    <TrendingUp className="size-4 text-green-500" />
                    <span className="font-medium text-foreground">Top Tracks</span>
                </div>
                <div className="flex items-center gap-3 rounded-lg border-destructive bg-destructive/10 p-3 transition-all hover:bg-destructive/20">
                    <div className="flex items-center gap-2 text-destructive text-sm">
                        <AnnoyedIcon className="size-4" />
                        <span>Spotify lost the beat—top tracks not found!</span>
                    </div>
                </div>
            </Section>
        );
    }

    if (!topTracksData?.tracks || topTracksData.tracks.length === 0) {
        return null;
    }

    // Compact view: all album covers in one row
    if (!expanded) {
        return (
            <Section className="gap-2">
                <div className="mb-2 flex items-center gap-2">
                    <TrendingUp className="size-4 text-green-500" />
                    <span className="font-medium text-foreground">Top Tracks</span>
                    <span className="text-foreground-lighter text-sm">(All Time)</span>
                </div>
                <motion.div
                    className="flex cursor-pointer justify-center gap-4"
                    layout
                    onClick={() => setExpanded(true)}
                >
                    {topTracksData.tracks.map((track, index) => (
                        <motion.div
                            className="relative"
                            key={track.id}
                            layout="position"
                            layoutId={`album-cover-${track.id}`}
                            whileHover={{ scale: 1.05 }}
                        >
                            <img
                                alt={`${track.album.name} cover`}
                                className="size-16 rounded-md border border-border object-cover"
                                height={64}
                                src={track.album.image}
                                width={64}
                            />
                            <motion.div
                                className="-right-2 -bottom-2 absolute flex size-6 items-center justify-center rounded-full border border-border/20 bg-background/90 shadow-lg backdrop-blur-sm"
                                layoutId={`album-rank-${track.id}`}
                            >
                                <span className="select-none font-black text-foreground text-lg">
                                    {index + 1}
                                </span>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
                <div className="mt-4 text-center text-foreground-lighter text-xs">
                    Click to reveal top tracks
                </div>
            </Section>
        );
    }

    // Expanded view: full track list
    return (
        <AnimatePresence>
            <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
                exit={{ opacity: 0, y: 20 }}
                initial={{ opacity: 0, y: 20 }}
                layout
            >
                <Section className="gap-2">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="size-4 text-green-500" />
                        <span className="font-medium text-foreground">Top Tracks</span>
                        <span className="text-foreground-lighter text-sm">(All Time)</span>
                        <button
                            className="ml-auto rounded px-2 py-1 text-foreground-lighter text-xs hover:bg-accent/10"
                            onClick={() => setExpanded(false)}
                            type="button"
                        >
                            Collapse
                        </button>
                    </div>
                </Section>
                <div className="space-y-3">
                    {topTracksData.tracks.map((track, index) => (
                        <Section className="gap-0" delay={index * 0.1} key={track.id}>
                            <motion.div
                                className="flex items-center gap-3 rounded-lg p-3 transition-colors"
                                layout="position"
                                layoutId={`album-cover-${track.id}`}
                            >
                                <div className="relative flex items-center gap-3">
                                    {track.album.image && (
                                        <div className="relative">
                                            <ImageZoom>
                                                <motion.img
                                                    alt={`${track.album.name} cover`}
                                                    className="size-16 rounded-md object-cover"
                                                    height={64}
                                                    src={track.album.image}
                                                    whileHover={{ scale: 1.05 }}
                                                    width={64}
                                                />
                                            </ImageZoom>
                                            <motion.div
                                                className="-right-3 absolute bottom-0 flex size-8 items-center justify-center rounded-full border border-border/20 bg-background/90 shadow-lg backdrop-blur-sm"
                                                layoutId={`album-rank-${track.id}`}
                                            >
                                                <span className="select-none font-black text-2xl text-foreground">
                                                    {index + 1}
                                                </span>
                                            </motion.div>
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 space-y-1">
                                    <Link
                                        className="line-clamp-1 font-medium text-foreground text-sm transition-colors hover:text-foreground-light"
                                        href={track.url}
                                    >
                                        {track.name}
                                        {track.explicit && (
                                            <span className="ml-1 text-foreground-lighter text-xs">
                                                E
                                            </span>
                                        )}
                                    </Link>
                                    <div className="flex items-center gap-1 text-foreground-lighter text-xs">
                                        <span>by</span>
                                        {track.artists.map((artist, artistIndex) => (
                                            <span key={`${track.id}-artist-${artistIndex}`}>
                                                <Link
                                                    className="hover:text-foreground-light"
                                                    href={artist.url}
                                                >
                                                    {artist.name}
                                                </Link>
                                                {artistIndex < track.artists.length - 1 && ', '}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="text-foreground-lighter text-xs">
                                        <div>on {track.album.name}</div>
                                        <div className="mt-0.5 flex items-center gap-2">
                                            <span>{formatDuration(track.duration)}</span>
                                            <span>•</span>
                                            <span>{track.popularity}% popularity</span>
                                        </div>
                                    </div>
                                </div>
                                <Link
                                    className="flex items-center gap-1 text-foreground-lighter text-xs transition-colors hover:text-foreground-light"
                                    href={track.url}
                                >
                                    <ExternalLink className="size-3" />
                                    <span>Spotify</span>
                                </Link>
                            </motion.div>
                        </Section>
                    ))}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
