'use client';

import { motion } from 'motion/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const avatarData = [
  {
    src: 'https://dqy38fnwh4fqs.cloudfront.net/UHA9BO68BL6LRNA2R9MD686DLDGE/ha9bo68bl6lrna2r9md686dldge-profile.webp',
    fallback: 'YB',
    name: 'Yogini Bende',
  },
  {
    src: 'https://dqy38fnwh4fqs.cloudfront.net/UHDNK79BK6LA89DCMPRQGEGQOGGO/hdnk79bk6la89dcmprqgegqoggo-9038-profile.webp',
    fallback: 'AB',
    name: 'Akash Bhadange',
  },
  {
    src: 'https://dqy38fnwh4fqs.cloudfront.net/UHBAOB6BGGNQPGECB6RAQMJRNA9P/hbaob6bggnqpgecb6raqmjrna9p-5809-profile.webp',
    fallback: 'JK',
    name: 'Jay Kadam',
  },
  {
    src: 'https://dqy38fnwh4fqs.cloudfront.net/UH9O6OKP8QDKOQE18KQBMGQBBBLD/h9o6okp8qdkoqe18kqbmgqbbbld-profile.webp',
    fallback: 'AS',
    name: 'Ajinkya Shinde',
  },
];

export function AnimatedAvatarStack() {
  return (
    <div className="-space-x-2 isolate flex items-center">
      {avatarData.map((avatar, index) => (
        <Tooltip key={avatar.fallback}>
          <TooltipTrigger asChild>
            <motion.div
              className="relative overflow-hidden rounded-full"
              initial={{ scale: 1, y: 0 }}
              style={{
                zIndex: avatarData.length - index,
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
              <Avatar className="size-10 shadow-sm">
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
