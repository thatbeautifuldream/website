import type { Viewport } from 'next';
import { headers } from 'next/headers';
import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { JsonLd } from '@/components/json-ld';
import { LayoutDebug } from '@/components/layout-debug';
import { AnalyticsProviders } from '@/components/providers/analytics-providers';
import { CommandPaletteProvider } from '@/components/providers/command-palette-provider';
import { QueryClientProviderWrapper } from '@/components/providers/query-client-provider';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { mono, sans, serif } from '@/lib/fonts';
import { defaultLocale, isLocale, localeHeaderName } from '@/lib/i18n/config';
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

export default async function RootLayout({ children }: RootLayoutProps) {
  const headerStore = await headers();
  const requestedLocale = headerStore.get(localeHeaderName);
  const locale =
    requestedLocale && isLocale(requestedLocale)
      ? requestedLocale
      : defaultLocale;

  return (
    <html
      className={cn(
        sans.googleSansFlex.variable,
        mono.geistMono.variable,
        serif.instrumentSerif.variable
      )}
      lang={locale}
      suppressHydrationWarning
    >
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
              {children}
            </CommandPaletteProvider>
            <Toaster />
            <ThemeSwitcher />
            <JsonLd />
            <LayoutDebug />
            <AnalyticsProviders />
          </QueryClientProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
