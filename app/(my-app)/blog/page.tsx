import { allBlogs } from 'content-collections';
import type { Metadata } from 'next';
import { Post } from '@/components/post';
import { Section } from '@/components/section';
import { createMetadata } from '@/lib/metadata';

const postsByYear = allBlogs
  .sort((a, b) => b.date.getTime() - a.date.getTime())
  .reduce(
    (acc, post) => {
      const year = post.date.getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    },
    {} as Record<number, typeof allBlogs>
  );

const title = 'Blog';
const description = 'Learning Experiences.';

export const metadata: Metadata = createMetadata({
  title,
  description,
  ogText: 'My blog — Learning Experiences.',
  image: `https://milindmishra.com/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
});

const Posts = () => (
  <>
    <Section className="gap-0">
      <h1>{title}</h1>
      <p className="text-foreground-lighter">{description}</p>
    </Section>
    {Object.entries(postsByYear)
      .sort(([a], [b]) => Number(b) - Number(a))
      .map(([year, posts], index) => (
        <Section delay={(index + 1) * 0.2} key={year}>
          <h2 className="font-normal text-foreground-lighter text-sm">
            {year}
          </h2>
          <ul className="grid gap-6">
            {posts.map((post) => (
              <li key={post._meta.path}>
                <Post {...post} />
              </li>
            ))}
          </ul>
        </Section>
      ))}
  </>
);

export default Posts;
