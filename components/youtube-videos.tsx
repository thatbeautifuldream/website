'use client';

import { CalendarIcon, ExternalLinkIcon } from 'lucide-react';
import { useState } from 'react';
import { type TYouTubeVideosResponse, videos } from '@/lib/videos';
import { Link } from './link';
import { Section } from './section';
import { Video } from './video';

type VideoItem = TYouTubeVideosResponse['items'][number];

const VideoCard = ({ video }: { video: VideoItem }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);

    const publishDate = new Date(video.snippet.publishedAt);
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
    }).format(publishDate);

    const truncatedDescription =
        video.snippet.description.length > 150
            ? `${video.snippet.description.slice(0, 150)}...`
            : video.snippet.description;

    return (
        <div className="space-y-4 pb-8">
            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <Link
                        className="line-clamp-2 font-medium text-foreground transition-colors hover:text-foreground-light"
                        href={`https://youtube.com/watch?v=${video.id.videoId}`}
                    >
                        {video.snippet.title}
                    </Link>
                    <div className="flex items-center gap-1 whitespace-nowrap text-foreground-lighter text-sm">
                        <CalendarIcon size={12} />
                        <span>{formattedDate}</span>
                    </div>
                </div>
            </div>

            <Video
                controls
                light={false}
                url={`https://youtube.com/watch?v=${video.id.videoId}`}
            />

            {video.snippet.description && (
                <div className="space-y-2">
                    <p className="text-foreground-lighter text-sm leading-relaxed">
                        {showFullDescription
                            ? video.snippet.description
                            : truncatedDescription}
                    </p>

                    {video.snippet.description.length > 150 && (
                        <button
                            className="text-foreground-lighter text-sm transition-colors hover:text-foreground"
                            onClick={() => setShowFullDescription(!showFullDescription)}
                            type="button"
                        >
                            {showFullDescription ? 'Show less' : 'Show more'}
                        </button>
                    )}
                </div>
            )}

            <div className="flex items-center gap-2">
                <Link
                    className="inline-flex items-center gap-1 text-foreground-lighter text-sm transition-colors hover:text-foreground"
                    href={`https://youtube.com/watch?v=${video.id.videoId}`}
                >
                    <ExternalLinkIcon size={12} />
                    Watch on YouTube
                </Link>
            </div>
        </div>
    );
};

export const YouTubeVideos = () => {
    const [showAll, setShowAll] = useState(false);

    // Sort videos by publish date (newest first)
    const sortedVideos = [...videos.items].sort(
        (a, b) =>
            new Date(b.snippet.publishedAt).getTime() -
            new Date(a.snippet.publishedAt).getTime()
    );

    // Show only first 6 videos by default
    const visibleVideos = showAll ? sortedVideos : sortedVideos.slice(0, 6);

    return (
        <Section className="space-y-6">
            <div>
                {visibleVideos.map((video) => (
                    <VideoCard key={video.id.videoId} video={video} />
                ))}
            </div>

            {!showAll && sortedVideos.length > 6 && (
                <button
                    className="cursor-pointer text-left text-foreground-lighter text-sm transition-colors hover:text-foreground"
                    onClick={() => setShowAll(true)}
                    type="button"
                >
                    Show {sortedVideos.length - 6} more videos...
                </button>
            )}
        </Section>
    );
}; 