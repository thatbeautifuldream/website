import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'attn/ui',
  description:
    'Attention (to detail) is all you need. Accessible, animated components built with craft. Built on shadcn, distributed as code.',
  image: `/og?title=${encodeURIComponent('attn/ui')}&description=${encodeURIComponent('Attention (to detail) is all you need.')}`,
});

export default function Page() {
  redirect('https://attnui.com');
}
