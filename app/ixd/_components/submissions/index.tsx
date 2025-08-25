import { AnimatedAvatarStack } from './animated-avatar-stack';

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
];
