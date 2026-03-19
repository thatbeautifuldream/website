'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ResumeDialog } from './resume-dialog';

type ResumeLinkProps = {
  children?: ReactNode;
  className?: string;
};

export const ResumeLink = ({
  children = 'Resume',
  className,
}: ResumeLinkProps) => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <>
      <button
        className={cn(
          'cursor-pointer transition-colors hover:text-foreground',
          className
        )}
        onClick={() => setIsResumeOpen(true)}
        type="button"
      >
        {children}
      </button>
      <ResumeDialog
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </>
  );
};
