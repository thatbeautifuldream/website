'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>['className'];
  children: ReactNode;
};

export const Section = ({ className, delay = 0, children }: ViewAnimationProps) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return children;
  }

  return (
    <motion.div
      animate={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      className={cn('grid gap-4', className)}
      initial={{ filter: 'blur(3px)', translateY: -8, opacity: 0 }}
      style={{
        willChange: 'transform, opacity, filter'
      }}
      transition={{
        delay,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: 'tween'
      }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </motion.div>
  );
};
