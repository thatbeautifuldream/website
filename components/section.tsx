'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>['className'];
  children: ReactNode;
};

export const Section = ({ className, delay, children }: ViewAnimationProps) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return children;
  }

  return (
    <motion.div
      animate={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      className={cn('grid gap-4', className)}
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      transition={{ delay, duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </motion.div>
  );
};
