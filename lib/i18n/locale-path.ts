import { defaultLocale, isLocale, type Locale } from './config';

export const stripLocaleFromPathname = (pathname: string) => {
  const segments = pathname.split('/');
  const maybeLocale = segments[1];

  if (!maybeLocale || !isLocale(maybeLocale)) {
    return pathname || '/';
  }

  const stripped = `/${segments.slice(2).join('/')}`;
  return stripped === '/' ? '/' : stripped.replace(/\/$/, '') || '/';
};

export const localizeHref = (href: string, locale: Locale = defaultLocale) => {
  if (!href.startsWith('/') || href.startsWith('//')) {
    return href;
  }

  if (href === '/') {
    return `/${locale}`;
  }

  const stripped = stripLocaleFromPathname(href);
  return `/${locale}${stripped === '/' ? '' : stripped}`;
};
