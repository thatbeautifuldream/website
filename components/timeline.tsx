'use client';

import { useState } from 'react';
import { experience } from '@/lib/experience';
import { ExperienceItem } from './experience-item';

export const Timeline = () => {
    const [showAll, setShowAll] = useState(false);

    // Show only first 4 experiences by default
    const visibleExperiences = showAll ? experience : experience.slice(0, 4);

    return (
        <div className="space-y-4">
            <div className="relative">
                {visibleExperiences.map((exp) => (
                    <ExperienceItem
                        company={exp.company}
                        current={exp.current}
                        endDate={exp.endDate}
                        highlights={exp.highlights}
                        key={`${exp.company}-${exp.startDate}`}
                        location={exp.location}
                        position={exp.position}
                        startDate={exp.startDate}
                        summary={exp.summary}
                        url={exp.url}
                    />
                ))}

                {/* Remove the last timeline line */}
                {visibleExperiences.length > 0 && (
                    <div className="absolute bottom-0 left-4 h-8 w-px bg-background" />
                )}
            </div>

            {!showAll && experience.length > 4 && (
                <button
                    className='cursor-pointer text-left text-foreground-lighter text-sm transition-colors hover:text-foreground'
                    onClick={() => setShowAll(true)}
                    type="button"
                >
                    Show {experience.length - 4} more positions...
                </button>
            )}
        </div>
    );
};
