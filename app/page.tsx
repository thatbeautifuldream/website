import { allPages } from 'content-collections';
import type { Metadata } from 'next';
import { ImageZoom } from '@/components/image-zoom';
import { Mdx } from '@/components/mdx';
import { ProjectGrid } from '@/components/projects';
import { Section } from '@/components/section';
import { createMetadata } from '@/lib/metadata';

const page = allPages.find((p) => p._meta.fileName === 'home.mdx');

if (!page) {
  throw new Error('Home page not found');
}

export const metadata: Metadata = createMetadata({
  title: page.title,
  description: page.description,
  image: '/images/opengraph-image.png',
});

const GITHUB_AVATAR_URL =
  'https://avatars.githubusercontent.com/u/28717686?v=4';

const PROJECTS = [
  {
    slug: 'ai-roadmap-generator',
    title: 'AI Roadmap Generator',
    description:
      'Web app generating personalized and visual learning roadmaps powered by Next.js, React, Canvas, and LLMs. Used by thousands of learners and engineers to break down any tech domain.',
    externalUrl: 'https://airoadmapgenerator.com',
    image: 'https://www.airoadmapgenerator.com/opengraph-image.png',
  },
  {
    slug: 'json-visualizer',
    title: 'JSON Visualizer',
    description:
      'Interactive tool for tree/grid visualization of complex JSON, built for dev teams to debug and understand frontend/backend data structures.',
    externalUrl: 'https://jsonvisualiser.com',
    image:
      'https://dqy38fnwh4fqs.cloudfront.net/scroll/UHDNGKG7BMJ8PKPFNLPRDDRNOAG7-1753640125899',
  },
];

const HomePage = () => (
  <>
    <Section className="flex items-center gap-4" delay={0.1}>
      <ImageZoom>
        {/** biome-ignore lint/performance/noImgElement: Need to use img element to escape Next.js image optimization */}
        <img
          alt=""
          className="size-10 rounded-full transition-all duration-300 hover:scale-110"
          height={40}
          src={GITHUB_AVATAR_URL}
          width={40}
        />
      </ImageZoom>
      <div>
        <p className="font-medium text-foreground leading-normal">
          Milind Mishra
        </p>
        <p className="text-foreground-lighter text-sm leading-normal">
          Product Engineer, currently at{' '}
          <a href="https://getmerlin.in/chat">Merlin AI</a>.
        </p>
      </div>
    </Section>

    <Section delay={0.3}>
      <ProjectGrid projects={PROJECTS} />
    </Section>

    <article>
      <Section delay={0.5}>
        <Mdx code={page.body} />
      </Section>
    </article>
  </>
);

export default HomePage;
