/** biome-ignore-all lint/performance/noImgElement: ok */
'use client';

import type { AnimationItem } from 'lottie-web';
import { motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { useCallback, useEffect, useRef, useState } from 'react';

type TFolderItem = {
  readonly id: number;
  readonly name: string;
  readonly type:
    | 'document'
    | 'image'
    | 'presentation'
    | 'spreadsheet'
    | 'video'
    | 'audio';
  readonly thumbnail: string;
};

type TAnimationConfig = {
  readonly container: HTMLElement;
  readonly renderer: 'svg' | 'canvas' | 'html';
  readonly loop: boolean;
  readonly autoplay: boolean;
  readonly path: string;
};

const FOLDER_CONTENTS: readonly TFolderItem[] = [
  {
    id: 1,
    name: 'Document 1',
    type: 'document',
    thumbnail: '/images/interactive-folder/document-icon.png',
  },
  {
    id: 2,
    name: 'Image 1',
    type: 'image',
    thumbnail: '/images/interactive-folder/photo-landscape.png',
  },
  {
    id: 3,
    name: 'Presentation',
    type: 'presentation',
    thumbnail: '/images/interactive-folder/presentation-slides.png',
  },
  {
    id: 4,
    name: 'Spreadsheet',
    type: 'spreadsheet',
    thumbnail: '/images/interactive-folder/spreadsheet-data.png',
  },
  {
    id: 5,
    name: 'Video File',
    type: 'video',
    thumbnail: '/images/interactive-folder/modern-video-player.png',
  },
  {
    id: 6,
    name: 'Audio Track',
    type: 'audio',
    thumbnail: '/images/interactive-folder/music-waveform.png',
  },
] as const;

const ANIMATION_CONFIG = {
  STAGGER_DELAY: 0.08,
  DELAY_CHILDREN: 0.15,
  RADIUS: 120,
  ANGLE_STEP: 60,
  START_ANGLE: -150,
  SPRING_CONFIG: {
    stiffness: 260,
    damping: 20,
    mass: 0.6,
  },
} as const;

const containerVariants = {
  hover: {
    transition: {
      staggerChildren: ANIMATION_CONFIG.STAGGER_DELAY,
      delayChildren: ANIMATION_CONFIG.DELAY_CHILDREN,
    },
  },
  initial: {
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
} as const;

const itemVariants = {
  initial: {
    y: 0,
    x: 0,
    rotate: 0,
    scale: 0,
    opacity: 0,
  },
  hover: (index: number) => {
    const angle =
      index * ANIMATION_CONFIG.ANGLE_STEP + ANIMATION_CONFIG.START_ANGLE;
    const x = Math.cos((angle * Math.PI) / 180) * ANIMATION_CONFIG.RADIUS;
    const y = Math.sin((angle * Math.PI) / 180) * ANIMATION_CONFIG.RADIUS;

    return {
      x,
      y,
      rotate: angle / 6,
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        ...ANIMATION_CONFIG.SPRING_CONFIG,
      },
    };
  },
} as const;

export function InteractiveFolder() {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const lottieContainerRef = useRef<HTMLDivElement>(null);
  const animationInstanceRef = useRef<AnimationItem | null>(null);
  const isLoadingRef = useRef<boolean>(false);
  const { resolvedTheme } = useTheme();

  const handleHoverStart = useCallback(() => setIsHovered(true), []);
  const handleHoverEnd = useCallback(() => setIsHovered(false), []);

  useEffect(() => {
    let isMounted = true;

    const initializeLottieAnimation = async (): Promise<void> => {
      if (
        isLoadingRef.current ||
        animationInstanceRef.current ||
        !lottieContainerRef.current
      ) {
        return;
      }

      isLoadingRef.current = true;

      try {
        const lottieWeb = await import('lottie-web');

        if (!(isMounted && lottieContainerRef.current)) {
          return;
        }

        const config: TAnimationConfig = {
          container: lottieContainerRef.current,
          renderer: 'svg',
          loop: false,
          autoplay: false,
          path: '/lottie/folder-animation.json',
        };

        animationInstanceRef.current = lottieWeb.default.loadAnimation(config);

        animationInstanceRef.current.addEventListener('DOMLoaded', () => {
          console.log('Lottie animation loaded successfully');
        });

        animationInstanceRef.current.addEventListener('error', (error) => {
          console.error('Lottie animation failed to load:', error);
        });
      } catch (error) {
        console.error('Failed to load Lottie library:', error);
      } finally {
        isLoadingRef.current = false;
      }
    };

    initializeLottieAnimation();

    return () => {
      isMounted = false;
      if (animationInstanceRef.current) {
        animationInstanceRef.current.destroy();
        animationInstanceRef.current = null;
      }
      isLoadingRef.current = false;
    };
  }, []);

  useEffect(() => {
    const animation = animationInstanceRef.current;
    if (!animation) {
      return;
    }

    try {
      if (isHovered) {
        animation.setDirection(1);
        animation.play();
      } else {
        animation.setDirection(-1);
        animation.play();
      }
    } catch (error) {
      console.error('Animation control error:', error);
    }
  }, [isHovered]);

  return (
    <div className="flex size-96 select-none items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={isHovered ? 'hover' : 'initial'}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          initial="initial"
          variants={containerVariants}
        >
          {FOLDER_CONTENTS.map((item, index) => (
            <motion.div
              className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2"
              custom={index}
              key={item.id}
              variants={itemVariants}
            >
              <div className="h-20 w-20 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl backdrop-blur-sm">
                <img
                  alt={`${item.name} thumbnail`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  src={item.thumbnail || '/placeholder.svg'}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        animate={{ scale: isHovered ? 1.05 : 1 }}
        aria-label="Interactive folder with file preview"
        className="relative z-10 flex h-20 w-20 cursor-pointer items-center justify-center"
        initial={{ scale: 1 }}
        onHoverEnd={handleHoverEnd}
        onHoverStart={handleHoverStart}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsHovered(!isHovered);
          }
        }}
        tabIndex={0}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div
          aria-hidden="true"
          className="flex h-16 w-16 items-center justify-center"
          ref={lottieContainerRef}
          style={{
            filter: `drop-shadow(0 4px 12px rgba(0,0,0,0.15)) ${
              resolvedTheme === 'dark' ? 'brightness(0) invert(1)' : ''
            }`,
          }}
        />
      </motion.div>
    </div>
  );
}
