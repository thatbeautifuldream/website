'use client';

import { CalendarIcon, MapPinIcon, XIcon } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { calculateDuration, formatDate } from '@/lib/experience';
import { getFavicon } from '@/lib/favicon';
import { Link } from './link';
import { Section } from './section';

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
  isExpanded?: boolean;
  onClose?: () => void;
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
  isExpanded = false,
  onClose,
}: ExperienceItemProps) => {
  const duration = calculateDuration(startDate, endDate);
  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = endDate ? formatDate(endDate) : 'Present';

  // Get favicon from Google
  const faviconSrc = getFavicon(url);

  // Compact view for timeline
  if (!isExpanded) {
    return (
      <div className="group relative flex gap-2 rounded-lg p-4 transition-all hover:bg-accent/5">
        {/* Timeline line */}
        <div className="flex flex-col items-center">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full border-2 bg-background ${current ? 'animate-pulse border-green-500' : 'border-border'
              }`}
          >
            <motion.div layoutId={`favicon-${company}-${startDate}`}>
              <Image
                alt=""
                className="rounded-sm"
                height={16}
                src={faviconSrc}
                unoptimized
                width={16}
              />
            </motion.div>
          </div>
          <div className="w-px grow bg-border" />
        </div>

        {/* Content */}
        <div className="flex-1 space-y-2">
          <div className="flex flex-col">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <motion.h3
                className="font-medium text-foreground transition-colors hover:text-foreground-light"
                layoutId={`company-${company}-${startDate}`}
                layout="position"
              >
                {company}
              </motion.h3>
              <motion.div
                className="flex items-center gap-2 text-foreground-lighter text-sm"
                layoutId={`dates-${company}-${startDate}`}
              >
                <CalendarIcon size={12} />
                <span>
                  {formattedStartDate} - {formattedEndDate}
                </span>
                <span>•</span>
                <span>{duration}</span>
              </motion.div>
            </div>

            <motion.div
              className="font-medium text-foreground text-sm"
              layout="position"
              layoutId={`position-${company}-${startDate}`}
            >
              {position}
            </motion.div>
          </div>

          <motion.p
            className="overflow-hidden text-foreground-lighter text-sm leading-relaxed"
            layoutId={`summary-${company}-${startDate}`}
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {summary}
          </motion.p>
        </div>
      </div>
    );
  }

  // Expanded view for modal
  return (
    <div className="space-y-4 p-6">
      {/* Header with close button */}
      <Section delay={0}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <motion.div layoutId={`favicon-${company}-${startDate}`}>
              <Image
                alt=""
                className="rounded-lg"
                height={48}
                src={faviconSrc}
                unoptimized
                width={48}
              />
            </motion.div>
            <div className="flex flex-col gap-1">
              <motion.h2
                className="font-medium text-foreground"
                layoutId={`company-${company}-${startDate}`}
                layout="position"
              >
                {company}
              </motion.h2>
              <motion.div
                className="font-medium text-foreground text-sm"
                layout="position"
                layoutId={`position-${company}-${startDate}`}
              >
                {position}
              </motion.div>
            </div>
          </div>

          {onClose && (
            <button
              className="rounded-lg p-2 text-foreground-lighter transition-colors hover:bg-accent/20 hover:text-foreground"
              onClick={onClose}
              type="button"
            >
              <XIcon size={20} />
            </button>
          )}
        </div>
      </Section>

      {/* Details */}
      <div className="space-y-4">
        <Section delay={0.05}>
          <div className="flex flex-col gap-4 text-sm sm:flex-row sm:items-center">
            <motion.div
              className="flex items-center gap-2 text-foreground-lighter"
              layoutId={`dates-${company}-${startDate}`}
            >
              <CalendarIcon size={16} />
              <span>
                {formattedStartDate} - {formattedEndDate} • {duration}
              </span>
            </motion.div>

            <div className="flex items-center gap-2 text-foreground-lighter">
              <MapPinIcon size={16} />
              <span>{location}</span>
            </div>
          </div>
        </Section>

        <Section delay={0.1}>
          <motion.div
            className="space-y-2"
            layoutId={`summary-${company}-${startDate}`}
          >
            <p className="text-foreground-lighter text-sm leading-relaxed">
              {summary}
            </p>
          </motion.div>
        </Section>

        {/* Highlights section */}
        {highlights.length > 0 && (
          <Section className="space-y-3" delay={0.15}>
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-foreground">Key Achievements</h4>
              <span className="rounded-full bg-accent/20 px-2 py-1 text-foreground-lighter text-xs">
                {highlights.length} achievements
              </span>
            </div>

            <ul className="space-y-2">
              {highlights.map((highlight, index) => (
                <Section
                  delay={0.2 + index * 0.03}
                  key={highlight.slice(0, 50)}
                >
                  <li className="flex gap-3 text-foreground-light text-sm leading-relaxed">
                    <span className="font-bold text-accent">•</span>
                    <span>{highlight}</span>
                  </li>
                </Section>
              ))}
            </ul>
          </Section>
        )}

        {/* Company link */}
        <Section delay={0.25 + highlights.length * 0.03}>
          <div className="border-border border-t pt-4">
            <Link
              className="inline-flex items-center gap-2 text-foreground-lighter text-sm transition-colors hover:text-foreground"
              href={url}
            >
              Visit {company} →
            </Link>
          </div>
        </Section>
      </div>
    </div>
  );
};
