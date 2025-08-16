'use client';

import { ExternalLinkIcon, RefreshCwIcon } from 'lucide-react';
import { useState } from 'react';
import {
  WebPreview,
  WebPreviewBody,
  WebPreviewNavigation,
  WebPreviewNavigationButton,
  WebPreviewUrl,
} from './ai-elements/web-preview';
import { Section } from './section';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

type TResumeDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ResumeDialog = ({ isOpen, onClose }: TResumeDialogProps) => {
  const [key, setKey] = useState(0);
  const resumeUrl = 'https://resume.milind.app/';

  const handleRefresh = () => {
    setKey((prev) => prev + 1);
  };

  const handleOpenExternal = () => {
    window.open(resumeUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent
        className="h-[90vh] w-[95vw] max-w-6xl p-0"
        showCloseButton={false}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Milind Mishra's Resume</DialogTitle>
          <DialogDescription>
            Interactive resume preview with navigation controls
          </DialogDescription>
        </DialogHeader>

        <Section className="h-full">
          <WebPreview
            className="h-full rounded-lg border-0"
            defaultUrl={resumeUrl}
          >
            <WebPreviewNavigation>
              <WebPreviewNavigationButton
                onClick={handleRefresh}
                tooltip="Refresh"
              >
                <RefreshCwIcon className="h-4 w-4" />
              </WebPreviewNavigationButton>

              <WebPreviewUrl readOnly />

              <WebPreviewNavigationButton
                onClick={handleOpenExternal}
                tooltip="Open in new tab"
              >
                <ExternalLinkIcon className="h-4 w-4" />
              </WebPreviewNavigationButton>
            </WebPreviewNavigation>

            <WebPreviewBody key={key} />
          </WebPreview>
        </Section>
      </DialogContent>
    </Dialog>
  );
};
