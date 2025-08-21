'use client';

import { useEffect } from 'react';
import { cn } from '@/lib/utils';

type TPeerlistEmbedProps = {
  postId: string;
  width?: string;
  className?: string;
};

export const PeerlistEmbed = ({
  postId,
  width = '100%',
  className,
}: TPeerlistEmbedProps) => {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'setHeight') {
        const iframe = document.getElementById(`peerlist-post-${postId}`);
        if (iframe) {
          iframe.style.height = `${event.data.height}px`;
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [postId]);

  return (
    <div className="w-full overflow-hidden rounded-lg shadow-xl">
      <iframe
        allowFullScreen
        className={cn('w-full', className)}
        id={`peerlist-post-${postId}`}
        src={`https://peerlist.io/embeds/posts?postId=${postId}`}
        title="Peerlist Post Embed"
        width={width}
      />
    </div>
  );
};
