'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { experience } from '@/lib/experience';
import { ExperienceItem } from './experience-item';
import { Section } from './section';

type TExperience = (typeof experience)[0];

export const Timeline = () => {
  const [activeExperience, setActiveExperience] = useState<TExperience | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref as React.RefObject<HTMLElement>, () => {
    setActiveExperience(null);
  });

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActiveExperience(null);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <AnimatePresence>
        {activeExperience ? (
          <motion.div
            className="fixed top-8 z-50 mx-auto max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-border bg-background shadow-lg"
            layoutId={`experience-${activeExperience.company}-${activeExperience.startDate}`}
            ref={ref}
            style={{ borderRadius: 12 }}
          >
            <ExperienceItem
              {...activeExperience}
              isExpanded={true}
              onClose={() => setActiveExperience(null)}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="relative space-y-2">
        {experience.slice(0, 3).map((exp, index) => (
          <Section delay={index * 0.1} key={`${exp.company}-${exp.startDate}`}>
            <motion.div
              className="cursor-pointer"
              layoutId={`experience-${exp.company}-${exp.startDate}`}
              onClick={() => setActiveExperience(exp)}
              style={{ borderRadius: 8 }}
            >
              <ExperienceItem {...exp} isExpanded={false} />
            </motion.div>
          </Section>
        ))}
      </div>
    </>
  );
};
