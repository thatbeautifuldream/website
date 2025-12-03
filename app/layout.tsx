import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';
import type { Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { Background } from '@/components/background';
import ClarityInit from '@/components/clarity-init';
import { Footer } from '@/components/footer';
import { JsonLd } from '@/components/json-ld';
import { LayoutDebug } from '@/components/layout-debug';
import { LayoutWrapper } from '@/components/layout-wrapper';
import { Navigation } from '@/components/navigation';
import { CommandPaletteProvider } from '@/components/providers/command-palette-provider';
import { LevaProvider } from '@/components/providers/leva-provider';
import { QueryClientProviderWrapper } from '@/components/providers/query-client-provider';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { mono, sans, serif } from '@/lib/fonts';
import { cn } from '@/lib/utils';

import '@/styles/globals.css';

type RootLayoutProps = {
  children: ReactNode;
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      className={cn(
        sans.geist.variable,
        mono.geistMono.variable,
        serif.instrumentSerif.variable
      )}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <script
          async
          crossOrigin="anonymous"
          src="https://tweakcn.com/live-preview.min.js"
        />
      </head>
      <body
        className={cn('bg-background font-sans leading-relaxed antialiased')}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <QueryClientProviderWrapper>
            <CommandPaletteProvider>
              <LayoutWrapper>
                <div className="mx-auto grid max-w-2xl gap-12 px-4 py-8 pb-12 sm:px-8">
                  <Navigation />
                  {children}
                  <Footer />
                </div>
              </LayoutWrapper>
            </CommandPaletteProvider>
            <Background />
            <Toaster />
            <ThemeSwitcher />
            <JsonLd />
            <LayoutDebug />
            <ClarityInit />
            <GoogleAnalytics gaId="G-W9JFLQ2YJR" />
            <Analytics />
            <LevaProvider />
          </QueryClientProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
