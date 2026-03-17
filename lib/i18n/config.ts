export const locales = ['en', 'hi'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';
export const localeCookieName = 'preferred-locale';
export const localeHeaderName = 'x-locale';

export const isLocale = (value: string): value is Locale =>
  locales.includes(value as Locale);

export const getLocaleLabel = (locale: Locale) =>
  locale === 'hi' ? 'Hindi' : 'English';
