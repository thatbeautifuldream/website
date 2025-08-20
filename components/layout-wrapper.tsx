'use client';

import { LayoutGroup } from 'motion/react';
import type { ReactNode } from 'react';

type LayoutWrapperProps = {
  children: ReactNode;
};

export const LayoutWrapper = ({ children }: LayoutWrapperProps) => (
  <LayoutGroup>{children}</LayoutGroup>
);
