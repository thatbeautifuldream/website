'use client';

import { useState } from 'react';
import { ResumeDialog } from './resume-dialog';

export const ResumeLink = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <>
      <div className="flex items-center">
        <button
          className="cursor-pointer transition-colors hover:text-foreground"
          onClick={() => setIsResumeOpen(true)}
          type="button"
        >
          Resume
        </button>
      </div>
      <ResumeDialog
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </>
  );
};
