import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';
import type { Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';
import { Toaster } from 'sonner';
import ClarityInit from '@/components/clarity-init';
import { CommandPaletteProvider } from '@/components/command-palette-provider';
import { Footer } from '@/components/footer';
import { JsonLd } from '@/components/json-ld';
import { LayoutDebug } from '@/components/layout-debug';
import { LayoutWrapper } from '@/components/layout-wrapper';
import { MeshGradientBG } from '@/components/mesh-gradient-bg';
import { Navigation } from '@/components/navigation';
import { QueryClientProviderWrapper } from '@/components/query-client-provider';
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
    <html className="scroll-smooth" lang="en" suppressHydrationWarning>
      <body
        className={cn(
          sans.geist.variable,
          mono.geistMono.variable,
          serif.instrumentSerif.variable,
          'bg-background font-sans text-foreground-light leading-relaxed antialiased'
        )}
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
            <MeshGradientBG />
            <Toaster />
            <ThemeSwitcher />
            <JsonLd />
            <LayoutDebug />
            <ClarityInit />
            <GoogleAnalytics gaId="G-W9JFLQ2YJR" />
            <Analytics />
          </QueryClientProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
