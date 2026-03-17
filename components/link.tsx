'use client';

import NextLink from 'next/link';
import type { ComponentProps } from 'react';
import { useOptionalLocale } from '@/components/providers/locale-provider';
import { localizeHref } from '@/lib/i18n/locale-path';

type LinkProps = ComponentProps<'a'>;

export const Link = (props: LinkProps) => {
  const { locale } = useOptionalLocale();

  if (props.href?.startsWith('/') || props.href?.startsWith('#')) {
    const href =
      typeof props.href === 'string' ? localizeHref(props.href, locale) : props.href;

    return <NextLink href={href} {...props} />;
  }

  return <a {...props} rel="noopener noreferrer" target="_blank" />;
};
