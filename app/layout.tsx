import { mono, sans } from '@/lib/fonts';
import './globals.css';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';
import type { Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { Footer } from '@/components/footer';
import { JsonLd } from '@/components/json-ld';
import { LayoutDebug } from '@/components/layout-debug';
import { Navigation } from '@/components/navigation';
import { QueryClientProviderWrapper } from '@/components/query-client-provider';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { cn } from '@/lib/utils';
import { GrainyBackground } from '@/components/grainy-bg';

type RootLayoutProps = {
  children: ReactNode;
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#eff1f5' },
    { media: '(prefers-color-scheme: dark)', color: '#1e1e2e' },
  ],
};

const RootLayout = ({ children }: RootLayoutProps) => (
  <html className="scroll-smooth" lang="en" suppressHydrationWarning>
    <body
      className={cn(
        sans.variable,
        mono.variable,
        'bg-background font-sans text-foreground-light leading-relaxed antialiased'
      )}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        disableTransitionOnChange
        enableSystem
      >
        <GrainyBackground />
        <QueryClientProviderWrapper>
          <div className="mx-auto grid max-w-2xl gap-12 px-4 py-8 pb-12 sm:px-8">
            <Navigation />
            {children}
            <Footer />
          </div>
          <Toaster />
          <ThemeSwitcher />
          <JsonLd />
          <LayoutDebug />
          <GoogleAnalytics gaId="G-W9JFLQ2YJR" />
          <Analytics />
        </QueryClientProviderWrapper>
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
