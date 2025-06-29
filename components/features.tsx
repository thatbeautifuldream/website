'use client';

import { useState } from 'react';
import { interviews, speaking } from '@/lib/live';
import { Link } from './link';

export const Features = () => {
  const [open, setOpen] = useState(false);
  const data = [...speaking, ...interviews].sort((a, b) => b.year - a.year);

  return (
    <>
      <div className="grid gap-3">
        {data.slice(0, open ? data.length : 5).map((feature) => (
          <Link
            className="group flex flex-col gap-1 overflow-hidden text-sm sm:flex-row sm:items-center sm:gap-2"
            href={feature.url}
            key={feature.name}
          >
            <span className="flex flex-col gap-1 truncate sm:flex-row sm:items-center sm:gap-2">
              <p className="truncate text-foreground">{feature.name}</p>
              <p className="shrink-0 text-foreground-lighter transition-colors group-hover:text-foreground-light">
                {feature.location}
              </p>
            </span>
            <div className="hidden h-px shrink-0 grow bg-border transition-colors group-hover:bg-border-dark sm:block" />
            <p className="shrink-0 text-foreground-lighter transition-colors group-hover:text-foreground-light">
              {feature.year}
            </p>
          </Link>
        ))}
      </div>
      {!open && (
        <button
          className="cursor-pointer text-left text-foreground-lighter text-sm hover:text-foreground"
          onClick={() => setOpen(true)}
          type="button"
        >
          and more...
        </button>
      )}
    </>
  );
};
