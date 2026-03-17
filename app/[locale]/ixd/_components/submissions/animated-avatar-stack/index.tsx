'use client';

import { useControls } from 'leva';
import { motion } from 'motion/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { avatarData } from './data';

export function AnimatedAvatarStack() {
  const { items, size, border, maxVisible } = useControls({
    items: {
      value: 4,
      min: 1,
      max: 8,
      step: 1,
    },
    size: {
      value: 60,
      min: 20,
      max: 80,
      step: 1,
    },
    border: {
      value: 3,
      min: 0,
      max: 10,
      step: 1,
    },
    maxVisible: {
      value: 5,
      min: 1,
      max: 8,
      step: 1,
    },
  });

  const displayAvatars = avatarData.slice(0, items);
  const visibleAvatars = displayAvatars.slice(0, maxVisible);
  const hiddenCount = displayAvatars.length - visibleAvatars.length;

  return (
    <div className="-space-x-2 isolate flex items-center">
      {visibleAvatars.map((avatar, index) => (
        <Tooltip key={`${avatar.fallback}-${index}`}>
          <TooltipTrigger asChild>
            <motion.div
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="relative cursor-pointer select-none overflow-hidden rounded-full hover:shadow-lg"
              initial={{ scale: 0, opacity: 0, y: 20 }}
              style={{
                zIndex: visibleAvatars.length - index,
                width: `${size}px`,
                height: `${size}px`,
                border:
                  border > 0 ? `${border}px solid var(--primary)` : 'none',
              }}
              whileHover={{
                scale: 1.1,
                y: -8,
                zIndex: 10,
                transition: {
                  type: 'spring',
                  stiffness: 400,
                  damping: 25,
                },
              }}
            >
              <Avatar
                className="shadow-sm"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              >
                <AvatarImage src={avatar.src} />
                <AvatarFallback>{avatar.fallback}</AvatarFallback>
              </Avatar>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent className="z-50" side="top">
            {avatar.name}
          </TooltipContent>
        </Tooltip>
      ))}

      {hiddenCount > 0 && (
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="relative flex cursor-pointer select-none items-center justify-center overflow-hidden rounded-full bg-muted font-medium text-muted-foreground text-sm hover:shadow-lg"
              initial={{ scale: 0, opacity: 0, y: 20 }}
              style={{
                zIndex: 1,
                width: `${size}px`,
                height: `${size}px`,
                border:
                  border > 0 ? `${border}px solid var(--primary)` : 'none',
              }}
              whileHover={{
                scale: 1.1,
                y: -8,
                zIndex: 10,
                transition: {
                  type: 'spring',
                  stiffness: 400,
                  damping: 25,
                },
              }}
            >
              +{hiddenCount}
            </motion.div>
          </TooltipTrigger>
          <TooltipContent className="z-50" side="top">
            {hiddenCount} more {hiddenCount === 1 ? 'person' : 'people'}
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
