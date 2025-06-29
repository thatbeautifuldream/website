'use client';

import { CalendarIcon, MapPinIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { calculateDuration, formatDate } from '@/lib/experience';
import { getFavicon } from '@/lib/favicon';
import { Link } from './link';

type ExperienceItemProps = {
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string | null;
    url: string;
    summary: string;
    highlights: string[];
    current?: boolean;
};

export const ExperienceItem = ({
    company,
    position,
    location,
    startDate,
    endDate,
    url,
    summary,
    highlights,
    current = false,
}: ExperienceItemProps) => {
    const [showHighlights, setShowHighlights] = useState(false);
    const duration = calculateDuration(startDate, endDate);
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = endDate ? formatDate(endDate) : 'Present';

    // Get favicon from Google
    const faviconSrc = getFavicon(url);

    return (
        <div className="group relative flex gap-4 pb-8">
            {/* Timeline line */}
            <div className="flex flex-col items-center">
                <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 bg-background ${current ? 'animate-pulse border-green-500' : 'border-border'
                        }`}
                >
                    <Image
                        alt=""
                        className="rounded-sm"
                        height={16}
                        src={faviconSrc}
                        unoptimized
                        width={16}
                    />
                </div>
                <div className="w-px grow bg-border" />
            </div>

            {/* Content */}
            <div className="flex-1 space-y-2 pb-4">
                <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <Link
                            className="font-medium text-foreground transition-colors hover:text-foreground-light"
                            href={url}
                        >
                            {company}
                        </Link>
                        <div className="flex items-center gap-2 text-foreground-lighter text-sm">
                            <CalendarIcon size={12} />
                            <span>
                                {formattedStartDate} - {formattedEndDate}
                            </span>
                            <span>•</span>
                            <span>{duration}</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <h3 className="font-medium text-foreground">{position}</h3>
                        <div className="flex items-center gap-1 text-foreground-lighter text-sm">
                            <MapPinIcon size={12} />
                            <span>{location}</span>
                        </div>
                    </div>
                </div>

                <p className="text-foreground-lighter text-sm leading-relaxed">
                    {summary}
                </p>

                {highlights.length > 0 && (
                    <div className="space-y-2">
                        <button
                            className="text-foreground-lighter text-sm transition-colors hover:text-foreground"
                            onClick={() => setShowHighlights(!showHighlights)}
                            type="button"
                        >
                            {showHighlights ? 'Hide achievements' : 'Show achievements'} (
                            {highlights.length})
                        </button>

                        {showHighlights && (
                            <ul className="space-y-1 text-foreground-lighter text-sm">
                                {highlights.map((highlight) => (
                                    <li
                                        className="flex gap-2 leading-relaxed"
                                        key={highlight.slice(0, 50)}
                                    >
                                        <span className="text-foreground-lighter">•</span>
                                        <span>{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
