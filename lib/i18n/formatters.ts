import { type Locale } from './config';

export const formatDateLong = (date: Date, locale: Locale) =>
  new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(date);

export const formatDateShort = (date: Date, locale: Locale) =>
  new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(date);

export const formatMonthYear = (date: Date, locale: Locale) =>
  new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
  }).format(date);
