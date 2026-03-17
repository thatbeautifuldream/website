import { NextResponse, type NextRequest } from 'next/server';
import {
  defaultLocale,
  isLocale,
  localeCookieName,
  localeHeaderName,
  locales,
  type Locale,
} from '@/lib/i18n/config';

const publicFile = /\.(.*)$/;

const getPreferredLocale = (request: NextRequest): Locale => {
  const cookieLocale = request.cookies.get(localeCookieName)?.value;

  if (cookieLocale && isLocale(cookieLocale)) {
    return cookieLocale;
  }

  const acceptedLanguages = (request.headers.get('accept-language') ?? '')
    .split(',')
    .map((part) => part.split(';')[0]?.trim().toLowerCase())
    .filter(Boolean);

  for (const acceptedLanguage of acceptedLanguages) {
    if (isLocale(acceptedLanguage)) {
      return acceptedLanguage;
    }

    const baseLanguage = acceptedLanguage.split('-')[0];

    if (baseLanguage && isLocale(baseLanguage)) {
      return baseLanguage;
    }
  }

  return defaultLocale;
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/rpc') ||
    pathname.startsWith('/orpc') ||
    pathname.startsWith('/og') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon') ||
    publicFile.test(pathname)
  ) {
    return NextResponse.next();
  }

  const pathnameLocale = pathname.split('/')[1];

  if (pathnameLocale && isLocale(pathnameLocale)) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(localeHeaderName, pathnameLocale);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  const locale = getPreferredLocale(request);
  const localizedUrl = request.nextUrl.clone();
  localizedUrl.pathname = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`;

  return NextResponse.redirect(localizedUrl);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|images|rpc|orpc|.*\\..*).*)'],
};
