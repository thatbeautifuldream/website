'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useLocale } from '@/components/providers/locale-provider';
import { getLocaleLabel, localeCookieName, locales, type Locale } from '@/lib/i18n/config';
import { localizeHref } from '@/lib/i18n/locale-path';

export const LocaleSwitcher = () => {
  const { dictionary, locale } = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (nextLocale: Locale) => {
    document.cookie = `${localeCookieName}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;

    startTransition(() => {
      router.push(localizeHref(pathname, nextLocale));
      router.refresh();
    });
  };

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-foreground-lighter">{dictionary.common.language}</span>
      <div className="flex items-center gap-1 rounded-full border border-border/60 p-1">
        {locales.map((item) => (
          <button
            className="rounded-full px-2 py-1 transition-colors hover:bg-secondary disabled:opacity-70"
            disabled={isPending && item === locale}
            key={item}
            onClick={() => handleLocaleChange(item)}
            type="button"
          >
            {getLocaleLabel(item)}
          </button>
        ))}
      </div>
    </div>
  );
};
