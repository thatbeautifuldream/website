import NextLink from 'next/link';
import type { ComponentProps } from 'react';

type LinkProps = ComponentProps<'a'>;

export const Link = (props: LinkProps) =>
  props.href?.startsWith('/') || props.href?.startsWith('#') ? (
    <NextLink href={props.href} {...props} />
  ) : (
    <a {...props} rel="noopener noreferrer" target="_blank" />
  );
