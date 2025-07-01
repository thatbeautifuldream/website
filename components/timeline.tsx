'use client';

import { useState } from 'react';
import { experience } from '@/lib/experience';
import { ExperienceItem } from './experience-item';
import { Section } from './section';

export const Timeline = () => {
  const [showAll, setShowAll] = useState(false);

  const visibleCount = showAll ? experience.length : 4;

  return (
    <div className="space-y-2">
      <div className="relative">
        {/* All experiences with conditional rendering */}
        {experience.slice(0, visibleCount).map((exp, index) => (
          <Section
            delay={index * 0.1}
            key={`${exp.company}-${exp.startDate}`}
          >
            <ExperienceItem
              company={exp.company}
              current={exp.current}
              endDate={exp.endDate}
              highlights={exp.highlights}
              location={exp.location}
              position={exp.position}
              startDate={exp.startDate}
              summary={exp.summary}
              url={exp.url}
            />
          </Section>
        ))}

        {/* Remove the last timeline line */}
        {visibleCount > 0 && (
          <div className="absolute bottom-0 left-4 h-8 w-px bg-background" />
        )}
      </div>

      {!showAll && experience.length > 4 && (
        <Section delay={4 * 0.1}>
          <button
            className="cursor-pointer text-left text-foreground-lighter text-sm transition-colors hover:text-foreground"
            onClick={() => setShowAll(true)}
            type="button"
          >
            Show {experience.length - 4} more positions...
          </button>
        </Section>
      )}
    </div>
  );
};
