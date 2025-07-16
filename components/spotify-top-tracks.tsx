'use client';

import { useQuery } from '@tanstack/react-query';
import { ExternalLink, Loader2Icon, Music, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageZoom } from './image-zoom';
import { Link } from './link';
import { Section } from './section';

type TSpotifyTopTrack = {
    name: string;
    artists: {
        name: string;
        url: string;
    }[];
    album: {
        name: string;
        image?: string;
    };
    url: string;
    previewUrl?: string;
    duration: number;
    popularity: number;
    explicit: boolean;
    id: string;
};

type TSpotifyTopTracksResponse = {
    tracks: TSpotifyTopTrack[];
    total: number;
};

const fetchSpotifyTopTracks = async (): Promise<TSpotifyTopTracksResponse> => {
    const response = await fetch('/api/spotify/top-5');

    if (!response.ok) {
        throw new Error('Failed to fetch Spotify top tracks');
    }

    return response.json();
};

const formatDuration = (ms: number): string => {
    const minutes = Math.floor(ms / 60_000);
    const seconds = Math.floor((ms % 60_000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const SpotifyTopTracks = () => {
    const {
        data: topTracksData,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['spotify-top-tracks'],
        queryFn: fetchSpotifyTopTracks,
        staleTime: 30 * 60 * 1000, // 30 minutes
        refetchOnWindowFocus: false,
    });

    if (isLoading) {
        return (
            <Section className="gap-2">
                <div className="flex items-center gap-2">
                    <TrendingUp className="size-4 text-green-500" />
                    <span className="font-medium text-foreground">Top Tracks</span>
                </div>
                <div className="flex items-center justify-center rounded-lg border bg-secondary/30 p-8">
                    <div className="flex items-center gap-3">
                        <Loader2Icon className="size-6 animate-spin" />
                        <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            className="text-foreground-lighter"
                            transition={{
                                duration: 1.5,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: 'easeInOut',
                            }}
                        >
                            <span className="text-sm">
                                Curating top 5 tracks...
                            </span>
                        </motion.div>
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
                <div className="flex items-center gap-3 rounded-lg border bg-secondary/30 p-3">
                    <div className="flex items-center gap-2 text-foreground-lighter text-sm">
                        <Music className="size-4" />
                        <span>Unable to load top tracks</span>
                    </div>
                </div>
            </Section>
        );
    }

    if (!topTracksData?.tracks || topTracksData.tracks.length === 0) {
        return null;
    }

    return (
        <div className="space-y-4">
            <Section className="gap-2">
                <div className="flex items-center gap-2">
                    <TrendingUp className="size-4 text-green-500" />
                    <span className="font-medium text-foreground">Top Tracks</span>
                    <span className="text-foreground-lighter text-sm">(All Time)</span>
                </div>
            </Section>

            <div className="space-y-3">
                {topTracksData.tracks.map((track, index) => (
                    <Section className="gap-0" delay={index * 0.1} key={track.id}>
                        <div className="flex items-center gap-3 rounded-lg border bg-secondary/30 p-3 transition-colors hover:bg-secondary/40">
                            <div className="relative flex items-center gap-3">
                                {track.album.image && (
                                    <div className="relative">
                                        <ImageZoom>
                                            {/** biome-ignore lint/performance/noImgElement: spotify album image */}
                                            <img
                                                alt={`${track.album.name} cover`}
                                                className="size-16 rounded-md object-cover"
                                                height={64}
                                                src={track.album.image}
                                                width={64}
                                            />
                                        </ImageZoom>
                                        <div className="-right-3 absolute bottom-0 flex size-8 items-center justify-center rounded-full border border-border/20 bg-background/90 shadow-lg backdrop-blur-sm">
                                            <span className="select-none font-black text-2xl text-foreground">
                                                {index + 1}
                                            </span>
                                        </div>
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
                        </div>
                    </Section>
                ))}
            </div>
        </div>
    );
};
