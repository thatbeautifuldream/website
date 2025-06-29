import { MDXContent } from '@content-collections/mdx/react';
import Image from 'next/image';
import type { HTMLProps, ReactNode } from 'react';
import { Tweet } from 'react-tweet';
import { CodeBlock } from './code-block';
import { Features } from './features';
import { ImageZoom } from './image-zoom';
import { Link } from './link';
import { Timeline } from './timeline';
import { Video } from './video';
import { YouTubeVideos } from './youtube-videos';

type MdxProperties = {
  readonly code: string;
  readonly showCopyButton?: boolean;
};

const a = (props: HTMLProps<HTMLAnchorElement>) => {
  if (typeof props.href !== 'string') {
    throw new TypeError('href is required');
  }

  return <Link {...props} />;
};

const img = (properties: HTMLProps<HTMLImageElement>) => {
  if (
    typeof properties.src !== 'string' ||
    typeof properties.alt !== 'string'
  ) {
    throw new TypeError('Image src and alt are required');
  }

  return (
    <ImageZoom>
      <Image
        alt={properties.alt}
        className="my-4 overflow-hidden rounded-lg border border-border/50"
        height={698}
        quality={100}
        src={properties.src}
        unoptimized={properties.src.startsWith('http')}
        width={1240}
      />
    </ImageZoom>
  );
};

const Callout = ({ children }: { children: ReactNode }) => (
  <div className="overflow-hidden rounded-lg bg-gradient-to-tr from-white/0 to-white/20 p-px">
    <div className="rounded-[7px] bg-gradient-to-tr from-black to-neutral-950 p-6">
      {children}
    </div>
  </div>
);

const h2 = ({ children, ...props }: HTMLProps<HTMLHeadingElement>) => (
  <h2 {...props}>
    <span className="mr-2 select-none text-border">##</span>
    {children}
  </h2>
);

const h3 = ({ children, ...props }: HTMLProps<HTMLHeadingElement>) => (
  <h3 {...props}>
    <span className="mr-2 select-none text-border">###</span>
    {children}
  </h3>
);

const h4 = ({ children, ...props }: HTMLProps<HTMLHeadingElement>) => (
  <h4 {...props}>
    <span className="mr-2 select-none text-border">####</span>
    {children}
  </h4>
);

const h5 = ({ children, ...props }: HTMLProps<HTMLHeadingElement>) => (
  <h5 {...props}>
    <span className="mr-2 select-none text-border">#####</span>
    {children}
  </h5>
);

const h6 = ({ children, ...props }: HTMLProps<HTMLHeadingElement>) => (
  <h6 {...props}>
    <span className="mr-2 select-none text-border">######</span>
    {children}
  </h6>
);

const iframe = (properties: HTMLProps<HTMLIFrameElement>) => (
  <iframe {...properties} />
);

export const Mdx = ({ code, showCopyButton = false }: MdxProperties) => {
  const pre = (props: HTMLProps<HTMLPreElement>) => (
    <CodeBlock
      className={props.className}
      showCopyButton={showCopyButton}
      title={props.title}
    >
      {props.children}
    </CodeBlock>
  );

  return (
    <MDXContent
      code={code}
      components={{
        a,
        h2,
        h3,
        h4,
        h5,
        h6,
        img,
        iframe,
        pre,
        Video,
        Callout,
        Tweet,
        Timeline,
        Features,
        YouTubeVideos,
      }}
    />
  );
};
