'use client';

import { ExternalLink, Music } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Link } from './link';
import { Section } from './section';

type TSpotifyTrack = {
    name: string;
    artists: Array<{
        name: string;
        url: string;
    }>;
    album: {
        name: string;
        image?: string;
    };
    url: string;
    previewUrl?: string;
    isPlaying: boolean;
    progress: number;
};

type TSpotifyResponse = {
    isPlaying: boolean;
    track: TSpotifyTrack | null;
};

export const SpotifyNowPlaying = () => {
    const [spotifyData, setSpotifyData] = useState<TSpotifyResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSpotifyData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const response = await fetch('/api/spotify');

                if (!response.ok) {
                    throw new Error('Failed to fetch Spotify data');
                }

                const data = await response.json();
                setSpotifyData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setIsLoading(false);
            }
        };

        fetchSpotifyData();

        // Refresh every 30 seconds
        const interval = setInterval(fetchSpotifyData, 30_000);

        return () => clearInterval(interval);
    }, []);

    if (isLoading) {
        return (
            <Section className="gap-2">
                <div className="flex items-center gap-2">
                    <Music className="size-4 text-green-500" />
                    <h3 className="font-medium text-foreground">Now Playing</h3>
                </div>
                <div className="flex items-center gap-3 rounded-lg border bg-secondary/30 p-3">
                    <div className="h-12 w-12 animate-pulse rounded-md bg-accent" />
                    <div className="flex-1 space-y-2">
                        <div className="h-3 w-3/4 animate-pulse rounded bg-accent" />
                        <div className="h-2 w-1/2 animate-pulse rounded bg-accent" />
                    </div>
                </div>
            </Section>
        );
    }

    if (error) {
        return (
            <Section className="gap-2">
                <div className="flex items-center gap-2">
                    <Music className="size-4 text-green-500" />
                    <h3 className="font-medium text-foreground">Now Playing</h3>
                </div>
                <div className="flex items-center gap-3 rounded-lg border bg-secondary/30 p-3">
                    <div className="flex items-center gap-2 text-foreground-lighter text-sm">
                        <Music className="size-4" />
                        <span>Unable to load current track</span>
                    </div>
                </div>
            </Section>
        );
    }

    if (!(spotifyData?.isPlaying && spotifyData?.track)) {
        return (
            <Section className="gap-2">
                <div className="flex items-center gap-2">
                    <Music className="size-4 text-green-500" />
                    <h3 className="font-medium text-foreground">Now Playing</h3>
                </div>
                <div className="flex items-center gap-3 rounded-lg border bg-secondary/30 p-3">
                    <div className="flex items-center gap-2 text-foreground-lighter text-sm">
                        <Music className="size-4" />
                        <span>Not currently playing</span>
                    </div>
                </div>
            </Section>
        );
    }

    const { track } = spotifyData;

    return (
        <Section className="gap-2">
            <div className="flex items-center gap-2">
                <Music className="size-4 text-green-500" />
                <h3 className="font-medium text-foreground">Now Playing</h3>
                <div className="flex items-center gap-1">
                    <div className="size-2 animate-pulse rounded-full bg-green-500" />
                    <span className="text-foreground-lighter text-xs">Live</span>
                </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border bg-secondary/30 p-3 transition-colors hover:bg-secondary/40">
                {track.album.image && (
                    <Image
                        alt={`${track.album.name} cover`}
                        className="size-12 rounded-md object-cover"
                        height={48}
                        src={track.album.image}
                        width={48}
                    />
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
                                <Link className="hover:text-foreground-light" href={artist.url}>
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
};
