"use client";

import { motion, useReducedMotion } from "motion/react";
import type {
  TargetAndTransition,
  Transition,
  Variant,
  Variants,
} from "motion/react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionMotionOptions = {
  delay?: number;
  translateY?: number;
  blur?: number;
};

const SECTION_EASE = [0.25, 0.46, 0.45, 0.94] as const;

export const createSectionTransition = (
  delay = 0,
  overrides?: Transition,
): Transition => ({
  delay,
  duration: 0.6,
  ease: SECTION_EASE,
  type: "tween",
  layout: {
    duration: 0.3,
    ease: SECTION_EASE,
  },
  ...overrides,
});

export const createSectionAnimation = ({
  delay = 0,
  translateY = -8,
  blur = 3,
}: SectionMotionOptions = {}) => {
  const hidden: TargetAndTransition = {
    filter: `blur(${blur}px)`,
    translateY,
    opacity: 0,
  };

  const visible: TargetAndTransition = {
    filter: "blur(0px)",
    translateY: 0,
    opacity: 1,
    transition: createSectionTransition(delay),
  };

  return {
    initial: hidden,
    animate: visible,
    exit: hidden,
  };
};

export const createSectionStagger = (
  delay = 0,
  staggerChildren = 0.08,
): Variants => ({
  hidden: {},
  visible: {
    transition: createSectionTransition(delay, {
      staggerChildren,
      delayChildren: delay,
    }),
  },
  exit: {
    transition: createSectionTransition(0, {
      staggerChildren,
      staggerDirection: -1,
    }),
  },
});

export const createSectionItemVariants = ({
  translateY = -8,
  blur = 3,
}: Omit<SectionMotionOptions, "delay"> = {}): Variants => ({
  hidden: {
    filter: `blur(${blur}px)`,
    translateY,
    opacity: 0,
  } satisfies Variant,
  visible: {
    filter: "blur(0px)",
    translateY: 0,
    opacity: 1,
    transition: createSectionTransition(),
  } satisfies Variant,
  exit: {
    filter: `blur(${blur}px)`,
    translateY,
    opacity: 0,
    transition: createSectionTransition(),
  } satisfies Variant,
});

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>["className"];
  layout?: ComponentProps<typeof motion.div>["layout"];
  layoutId?: ComponentProps<typeof motion.div>["layoutId"];
  exit?: ComponentProps<typeof motion.div>["exit"];
  children: ReactNode;
};

export const Section = ({
  className,
  delay = 0,
  layout,
  layoutId,
  exit,
  children,
}: ViewAnimationProps) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return children;
  }

  return (
    <motion.div
      animate={createSectionAnimation({ delay }).animate}
      className={cn("grid gap-4", className)}
      exit={exit ?? createSectionAnimation().exit}
      initial={createSectionAnimation().initial}
      style={{
        willChange: "transform, opacity, filter",
      }}
      transition={createSectionTransition(delay)}
      viewport={{ once: true, amount: 0.3 }}
      {...(layout ? { layout } : {})}
      {...(layoutId ? { layoutId } : {})}
    >
      {children}
    </motion.div>
  );
};
