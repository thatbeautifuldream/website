'use client';

import dynamic from 'next/dynamic';

const GoogleAnalytics = dynamic(
  () => import('@next/third-parties/google').then((mod) => mod.GoogleAnalytics),
  { ssr: false }
);

const VercelAnalytics = dynamic(
  () => import('@vercel/analytics/react').then((mod) => mod.Analytics),
  { ssr: false }
);

const ClarityProvider = dynamic(
  () => import('./clarity-provider').then((mod) => mod.ClarityProvider),
  { ssr: false }
);

export function AnalyticsProviders() {
  return (
    <>
      <ClarityProvider />
      <GoogleAnalytics gaId="G-W9JFLQ2YJR" />
      <VercelAnalytics />
    </>
  );
}
