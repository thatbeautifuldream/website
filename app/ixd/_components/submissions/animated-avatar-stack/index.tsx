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
  const { items, size, border } = useControls({
    items: {
      value: 4,
      min: 1,
      max: 8,
      step: 1,
    },
    size: {
      value: 55,
      min: 20,
      max: 80,
      step: 1,
    },
    border: {
      value: 2,
      min: 0,
      max: 10,
      step: 1,
    },
  });

  const displayAvatars = avatarData.slice(0, items);

  return (
    <div className="-space-x-2 isolate flex items-center">
      {displayAvatars.map((avatar, index) => (
        <Tooltip key={`${avatar.fallback}-${index}`}>
          <TooltipTrigger asChild>
            <motion.div
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-full"
              initial={{ scale: 0, opacity: 0, y: 20 }}
              style={{
                zIndex: displayAvatars.length - index,
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
    </div>
  );
}
