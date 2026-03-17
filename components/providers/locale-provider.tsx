'use client';

import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import { defaultLocale, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

type LocaleContextValue = {
  dictionary: Dictionary;
  locale: Locale;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export const LocaleProvider = ({
  children,
  dictionary,
  locale,
}: LocaleContextValue & { children: ReactNode }) => (
  <LocaleContext.Provider value={{ dictionary, locale }}>
    {children}
  </LocaleContext.Provider>
);

export const useLocale = () => {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error('LocaleProvider is missing');
  }

  return context;
};

export const useOptionalLocale = () =>
  useContext(LocaleContext) ?? {
    dictionary: getDictionary(defaultLocale),
    locale: defaultLocale,
  };
