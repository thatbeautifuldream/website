'use client';

import { MeshGradient } from '@paper-design/shaders-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const GRADIENT_COLORS = {
  dark: ['#000000', '#0d0d0d', '#1a1a1a', '#262626'],
  light: ['#ffffff', '#f8f8f8', '#f0f0f0', '#e8e8e8'],
};

export default function PaperShaderBG({ style = {}, ...props }) {
  const { resolvedTheme } = useTheme();
  const [colors, setColors] = useState<string[] | null>(null);

  useEffect(() => {
    setColors(GRADIENT_COLORS[resolvedTheme as keyof typeof GRADIENT_COLORS]);
  }, [resolvedTheme]);

  if (!colors) {
    return null;
  }

  return (
    <MeshGradient
      colors={colors}
      distortion={0.6}
      speed={0.15}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        ...style,
      }}
      swirl={0.6}
      {...props}
    />
  );
}
