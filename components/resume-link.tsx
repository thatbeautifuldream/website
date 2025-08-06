'use client';

import { useState } from 'react';
import { ResumeDrawer } from './resume-drawer';

export const ResumeLink = () => {
    const [isResumeOpen, setIsResumeOpen] = useState(false);

    return (
        <>
            <div className="flex items-center">
                <button
                    onClick={() => setIsResumeOpen(true)}
                    className="hover:text-foreground transition-colors cursor-pointer"
                >
                    Resume
                </button>
            </div>
            <ResumeDrawer
                isOpen={isResumeOpen}
                onClose={() => setIsResumeOpen(false)}
            />
        </>
    );
}; 