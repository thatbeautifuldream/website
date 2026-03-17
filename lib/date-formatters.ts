import { defaultLocale, type Locale } from '@/lib/i18n/config';

export const dateFormatterLong = (locale: Locale = defaultLocale) =>
  new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

export const dateFormatterShort = (locale: Locale = defaultLocale) =>
  new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });

export const dateFormatterMonthYear = (locale: Locale = defaultLocale) =>
  new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
  });

export const dateFormatterFull = (locale: Locale = defaultLocale) =>
  new Intl.DateTimeFormat(locale, {
    dateStyle: 'long',
  });

export const timeFormatter = (locale: Locale = defaultLocale) =>
  new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
  });
