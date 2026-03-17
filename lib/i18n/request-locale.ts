import { cookies, headers } from 'next/headers';
import {
  defaultLocale,
  isLocale,
  localeCookieName,
  localeHeaderName,
  type Locale,
} from './config';

export const getRequestLocale = async (): Promise<Locale> => {
  const headerStore = await headers();
  const headerLocale = headerStore.get(localeHeaderName);

  if (headerLocale && isLocale(headerLocale)) {
    return headerLocale;
  }

  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(localeCookieName)?.value;

  if (cookieLocale && isLocale(cookieLocale)) {
    return cookieLocale;
  }

  return defaultLocale;
};
