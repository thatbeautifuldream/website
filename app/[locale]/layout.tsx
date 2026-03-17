import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { Footer } from '@/components/footer';
import { LayoutWrapper } from '@/components/layout-wrapper';
import { Navigation } from '@/components/navigation';
import { LocaleProvider } from '@/components/providers/locale-provider';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { isLocale, locales } from '@/lib/i18n/config';

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<unknown>;
};

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = (await params) as { locale: string };

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);

  return (
    <LocaleProvider dictionary={dictionary} locale={locale}>
      <LayoutWrapper>
        <div className="mx-auto grid max-w-2xl gap-12 px-4 py-8 pb-12 sm:px-8">
          <Navigation />
          {children}
          <Footer />
        </div>
      </LayoutWrapper>
    </LocaleProvider>
  );
}
