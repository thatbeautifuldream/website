'use client';

import Image from 'next/image';
import type { ReactNode, VideoHTMLAttributes } from 'react';
import { useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { MEDIA_FRAME_SIZES } from '@/lib/media-frame';
import { cn } from '@/lib/utils';

const mediaGradientClass =
  'bg-linear-to-br from-secondary via-background to-muted';

const mediaFrameClass = cn(
  'relative aspect-video w-full overflow-hidden rounded-lg border border-border/50',
  mediaGradientClass
);

const loadingOverlayClass = (
  isLoaded: boolean,
  shouldReduceMotion: boolean
) =>
  cn(
    'pointer-events-none absolute inset-0 transition-opacity duration-300',
    mediaGradientClass,
    !shouldReduceMotion && 'media-gradient-loading bg-[length:200%_200%]',
    isLoaded && 'opacity-0'
  );

type MediaFrameProps = {
  children?: ReactNode;
  className?: string;
};

type RemoteMediaImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

type RemoteMediaVideoProps = Omit<
  VideoHTMLAttributes<HTMLVideoElement>,
  'className' | 'src'
> & {
  src: string;
  className?: string;
  priority?: boolean;
  sourceType?: string;
};

export const MediaFrame = ({ children, className }: MediaFrameProps) => (
  <div className={cn(mediaFrameClass, className)}>{children}</div>
);

export const MediaFallback = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => (
  <MediaFrame
    className={cn('flex items-center justify-center px-6 text-center', className)}
  >
    <span className="font-medium text-foreground-lighter text-lg">{title}</span>
  </MediaFrame>
);

export const RemoteMediaImage = ({
  src,
  alt,
  className,
  priority = false,
}: RemoteMediaImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const shouldReduceMotion = !!useReducedMotion();

  return (
    <MediaFrame className={className}>
      <div
        aria-hidden="true"
        className={loadingOverlayClass(isLoaded, shouldReduceMotion)}
      />
      <Image
        alt={alt}
        className="object-contain"
        fill
        onLoad={() => setIsLoaded(true)}
        priority={priority}
        sizes={MEDIA_FRAME_SIZES}
        src={src}
      />
    </MediaFrame>
  );
};

export const RemoteMediaVideo = ({
  src,
  className,
  priority = false,
  onLoadedData,
  sourceType,
  ...props
}: RemoteMediaVideoProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const shouldReduceMotion = !!useReducedMotion();

  return (
    <MediaFrame className={className}>
      <div
        aria-hidden="true"
        className={loadingOverlayClass(isLoaded, shouldReduceMotion)}
      />
      <video
        {...props}
        className="absolute inset-0 size-full bg-transparent object-contain"
        onLoadedData={(event) => {
          setIsLoaded(true);
          onLoadedData?.(event);
        }}
        preload={priority ? 'metadata' : 'none'}
      >
        <source src={src} type={sourceType} />
      </video>
    </MediaFrame>
  );
};
