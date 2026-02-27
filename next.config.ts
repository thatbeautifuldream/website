/** biome-ignore-all lint/suspicious/useAwait: it's a redirect and is written acc to nextjs docs */
import { withContentCollections } from '@content-collections/next';
import type { NextConfig } from 'next';

const redirectsConfig = async () => {
  return [
    {
      source: '/resume',
      destination: 'https://resume.milind.app',
      permanent: true,
    },
    {
      source: '/json',
      destination: 'https://json.milind.app',
      permanent: true,
    },
    {
      source: '/canvas',
      destination: 'https://canvas.milind.app',
      permanent: true,
    },
    {
      source: '/notes',
      destination: 'https://notes.milind.app',
      permanent: true,
    },
    {
      source: '/linkedin',
      destination: 'https://linkedin.com/in/mishramilind',
      permanent: true,
    },
    {
      source: '/github',
      destination: 'https://github.com/thatbeautifuldream',
      permanent: true,
    },
    {
      source: '/x',
      destination: 'https://x.com/milindmishra_',
      permanent: true,
    },
    {
      source: '/instagram',
      destination: 'https://instagram.com/thatbeautifuldream',
      permanent: true,
    },
    {
      source: '/slides',
      destination: '/slide',
      permanent: true,
    },
    {
      source: '/blogs',
      destination: '/blog',
      permanent: true,
    },
    {
      source: '/gists',
      destination: '/gist',
      permanent: true,
    },
  ];
};

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.milind.app',
      },
    ],
  },
  webpack: (config) => {
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('@next/bundle-analyzer')({
        analyzerMode: 'static',
        openAnalyzer: false,
      });
      config.plugins.push(BundleAnalyzerPlugin);
    }
    return config;
  },
};

export default withContentCollections({
  ...nextConfig,
  redirects: redirectsConfig,
});
