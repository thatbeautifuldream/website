'use client';

import clarity from '@microsoft/clarity';
import { useEffect } from 'react';
import { env } from '@/lib/env';

export default function ClarityInit() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      clarity.init(env.NEXT_PUBLIC_CLARITY_ID);
    }
  }, []);

  return null;
}
