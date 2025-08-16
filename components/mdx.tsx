import { MDXContent } from '@content-collections/mdx/react';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import Image from 'next/image';
import type { HTMLProps, ReactNode } from 'react';
import { Tweet } from 'react-tweet';
import { DiscordPresence } from './discord-presence';
import { Features } from './features';
import { ImageZoom } from './image-zoom';
import { Link } from './link';
import { Mermaid } from './mdx/mermaid';
import { SpotifyNowPlaying } from './spotify-now-playing';
import { SpotifyTopTracks } from './spotify-top-tracks';
import { Timeline } from './timeline';
import { Video } from './video';
import { Wakatime } from './wakatime/wakatime';
import { YouTubeVideos } from './youtube-videos';

type MdxProperties = {
  readonly code: string;
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

const pre = ({ ref: _ref, ...props }: HTMLProps<HTMLPreElement>) => {
  if (props.children?.toString().includes('```mermaid')) {
    return <Mermaid chart={props.children.toString()} />;
  }

  return (
    <CodeBlock {...props}>
      <Pre style={{ fontFamily: 'var(--font-mono)' }}>{props.children}</Pre>
    </CodeBlock>
  );
};

const Instagram = ({ reel, caption }: { reel: string; caption?: string }) => {
  const embedUrl = `https://www.instagram.com/reel/${reel}/embed/captioned/`;

  return (
    <div className="my-4 flex justify-center">
      <iframe
        allow="encrypted-media"
        allowTransparency={true}
        className="rounded-lg border border-border/50"
        frameBorder="0"
        height="480"
        scrolling="no"
        src={embedUrl}
        title={caption || `Instagram reel ${reel}`}
        width="400"
      />
    </div>
  );
};

const CodePen = ({
  penId,
  title,
  height = 300,
  defaultTab = 'html%2Cresult',
  theme = 'dark',
}: {
  penId: string;
  title: string;
  height?: number;
  defaultTab?: string;
  theme?: string;
}) => {
  const embedUrl = `https://codepen.io/milindmishra/embed/${penId}?default-tab=${defaultTab}&editable=true&theme-id=${theme}`;
  const penUrl = `https://codepen.io/milindmishra/pen/${penId}`;

  return (
    <iframe
      height={height}
      src={embedUrl}
      style={{ width: '100%' }}
      title={`CodePen: ${title}`}
    >
      See the Pen <a href={penUrl}>{title}</a> by Milind Mishra (
      <a href="https://codepen.io/milindmishra">@milindmishra</a>) on{' '}
      <a href="https://codepen.io">CodePen</a>.
    </iframe>
  );
};

const CodeSandbox = ({
  sandboxId,
  title,
  height = 500,
  view = 'editor+%2B+preview',
  module = '%2Fsrc%2FApp.js',
}: {
  sandboxId: string;
  title: string;
  height?: number;
  view?: string;
  module?: string;
}) => {
  const embedUrl = `https://codesandbox.io/embed/${sandboxId}?view=${view}&module=${module}`;

  return (
    <iframe
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      className="my-4 overflow-hidden rounded border-0"
      height={height}
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      src={embedUrl}
      style={{ width: '100%' }}
      title={title}
    />
  );
};

export const Mdx = ({ code }: MdxProperties) => {
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
        Instagram,
        CodePen,
        CodeSandbox,
        Callout,
        Tweet,
        Timeline,
        Features,
        YouTubeVideos,
        SpotifyNowPlaying,
        SpotifyTopTracks,
        DiscordPresence,
        Mermaid,
        Wakatime,
      }}
    />
  );
};
