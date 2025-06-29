import { allPages } from 'content-collections';
import type { Metadata } from 'next';
import { Mdx } from '@/components/mdx';
import { Section } from '@/components/section';
import { createMetadata } from '@/lib/metadata';

const page = allPages.find((p) => p._meta.fileName === 'home.mdx');

if (!page) {
  throw new Error('Home page not found');
}

export const metadata: Metadata = createMetadata({
  title: page.title,
  description: page.description,
  image: `/api/og?title=${page.title}&description=${page.description}`,
});

const HomePage = () => (
  <>
    <Section className="flex items-center gap-4">
      {/** biome-ignore lint/performance/noImgElement: Need to use img element to escape Next.js image optimization */}
      <img
        alt=""
        className="size-10 rounded-full"
        height={40}
        // placeholder="blur"
        // priority
        src={'https://avatars.githubusercontent.com/u/28717686?v=4'}
        width={40}
      />
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
    <article>
      <Section delay={0.2}>
        <Mdx code={page.body} />
      </Section>
    </article>
  </>
);

export default HomePage;
