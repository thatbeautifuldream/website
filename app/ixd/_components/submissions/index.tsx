import { AnimatedAvatarStack } from './animated-avatar-stack';
import { CardToPageTransition } from './card-to-page-transition';
import { InteractiveFolder } from './interactive-folder';
import { InteractiveOtpInput } from './interactive-otp-input';
import { ProgressiveInputStack } from './progressive-input-stack';
import { WarpOverlay } from './warp-overlay';

export type TSubmission = {
  id: string;
  title: string;
  slug: string;
  component: React.ReactNode;
  externalLink: string;
  date: string;
};

export const submissions: TSubmission[] = [
  {
    id: '1',
    title: 'Animated Avatar Stack',
    slug: 'animated-avatar-stack',
    component: <AnimatedAvatarStack />,
    externalLink: 'https://peerlist.io',
    date: '2025-08-25',
  },
  {
    id: '2',
    title: 'Interactive OTP Input',
    slug: 'interactive-otp-input',
    component: <InteractiveOtpInput />,
    externalLink: 'https://peerlist.io',
    date: '2025-08-26',
  },
  {
    id: '3',
    title: 'Card to Page Transition',
    slug: 'card-to-page-transition',
    component: <CardToPageTransition />,
    externalLink: 'https://peerlist.io',
    date: '2025-08-27',
  },
  {
    id: '4',
    title: 'Interactive Folder',
    slug: 'interactive-folder',
    component: <InteractiveFolder />,
    externalLink: 'https://peerlist.io',
    date: '2025-08-28',
  },
  {
    id: '5',
    title: 'Progressive Input Stack',
    slug: 'progressive-input-stack',
    component: <ProgressiveInputStack />,
    externalLink: 'https://peerlist.io',
    date: '2025-08-29',
  },
  {
    id: '6',
    title: 'Warp Overlay',
    slug: 'warp-overlay',
    component: <WarpOverlay />,
    externalLink: 'https://peerlist.io',
    date: '2025-08-30',
  },
];
