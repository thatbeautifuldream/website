'use client';

import { useQuery } from '@tanstack/react-query';
import { AnnoyedIcon, ExternalLink, Mic, Music } from 'lucide-react';
import { ImageZoom } from './image-zoom';
import { motion } from 'motion/react';
import { Link } from './link';
import { Section } from './section';

type TSpotifyTrack = {
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
    isPlaying: boolean;
    progress: number;
    type: 'track';
};

type TSpotifyEpisode = {
    name: string;
    description: string;
    show: {
        name: string;
        publisher: string;
        image?: string;
    };
    image?: string;
    url: string;
    duration: number;
    isPlaying: boolean;
    progress: number;
    type: 'episode';
    releaseDate: string;
    resumePoint?: {
        fully_played: boolean;
        resume_position_ms: number;
    };
};

type TSpotifyResponse = {
    isPlaying: boolean;
    track?: TSpotifyTrack | null;
    episode?: TSpotifyEpisode | null;
    currentlyPlayingType?: string;
};

const fetchSpotifyData = async (): Promise<TSpotifyResponse> => {
    const response = await fetch('/api/spotify');

    if (!response.ok) {
        throw new Error('Failed to fetch Spotify data');
    }

    return response.json();
};

export const SpotifyNowPlaying = () => {
    const {
        data: spotifyData,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['spotify-now-playing'],
        queryFn: fetchSpotifyData,
        refetchInterval: 30_000, // Refetch every 30 seconds
        refetchIntervalInBackground: true,
        staleTime: 25_000, // Data is fresh for 25 seconds
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
                <div className="flex items-center gap-3 rounded-lg border-destructive bg-destructive/10 hover:bg-destructive/20 transition-all p-3">
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

    if (!(spotifyData.track || spotifyData.episode)) {
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
                            {/** biome-ignore lint/performance/noImgElement: spotify album image */}
                            <motion.img
                                alt={`${track.album.name} cover`}
                                className="size-16 rounded-md object-cover"
                                height={48}
                                src={track.album.image}
                                width={48}
                                whileHover={{ scale: 1.05 }}
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
    if (spotifyData.episode) {
        const { episode } = spotifyData;
        return (
            <Section className="gap-2">
                <div className="flex items-center gap-2">
                    <Mic className="size-4 text-green-500" />
                    <span className="font-medium text-foreground">Now Playing</span>
                </div>

                <div className="flex items-center gap-3 rounded-lg border bg-secondary/30 p-3 transition-colors hover:bg-secondary/40">
                    {(episode.image || episode.show.image) && (
                        <ImageZoom>
                            {/** biome-ignore lint/performance/noImgElement: spotify episode image */}
                            <img
                                alt={`${episode.show.name} cover`}
                                className="size-12 rounded-md object-cover"
                                height={48}
                                src={episode.image || episode.show.image}
                                width={48}
                            />
                        </ImageZoom>
                    )}

                    <div className="flex-1 space-y-1">
                        <Link
                            className="line-clamp-1 font-medium text-foreground text-sm transition-colors hover:text-foreground-light"
                            href={episode.url}
                        >
                            {episode.name}
                        </Link>

                        <div className="flex items-center gap-1 text-foreground-lighter text-xs">
                            <span>from</span>
                            <span className="font-medium">{episode.show.name}</span>
                        </div>

                        <div className="text-foreground-lighter text-xs">
                            by {episode.show.publisher}
                        </div>
                    </div>

                    <Link
                        className="flex items-center gap-1 text-foreground-lighter text-xs transition-colors hover:text-foreground-light"
                        href={episode.url}
                    >
                        <ExternalLink className="size-3" />
                        <span>Spotify</span>
                    </Link>
                </div>
            </Section>
        );
    }

    return null;
};
