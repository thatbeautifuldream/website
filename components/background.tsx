'use client';

import { GrainGradient } from '@paper-design/shaders-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const GRADIENT_COLORS = {
  dark: ['#000000', '#0d0d0d', '#1a1a1a', '#262626'],
  light: ['#fce7f3', '#fed7aa', '#fef08a', '#dbeafe', '#bfdbfe'],
};

export function Background({ style = {}, ...props }) {
  const { resolvedTheme } = useTheme();
  const [colors, setColors] = useState<string[] | null>(null);

  useEffect(() => {
    setColors(GRADIENT_COLORS[resolvedTheme as keyof typeof GRADIENT_COLORS]);
  }, [resolvedTheme]);

  if (!colors) {
    return null;
  }

  return (
    <GrainGradient
      colors={colors}
      colorBack={resolvedTheme === 'dark' ? '#000000' : '#ffffff'}
      softness={0.5}
      intensity={0.5}
      noise={0.25}
      shape="corners"
      offsetX={1}
      offsetY={-1}
      scale={3.52}
      rotation={0}
      speed={1}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        ...style,
      }}
      {...props}
    />
  );
}
