import type { Metadata } from 'next';
import { Post } from '@/components/post';
import { Section } from '@/components/section';
import { getLocalizedBlogs } from '@/lib/i18n/content';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { createMetadata } from '@/lib/metadata';

type BlogIndexProps = {
  params: Promise<{
    locale: string;
  }>;
};

const groupPostsByYear = (locale: Locale) =>
  getLocalizedBlogs(locale).reduce(
    (acc, post) => {
      const year = post.date.getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    },
    {} as Record<number, ReturnType<typeof getLocalizedBlogs>>
  );

export const generateMetadata = async ({
  params,
}: BlogIndexProps): Promise<Metadata> => {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const dictionary = getDictionary(locale);
  const title = dictionary.sections.blogTitle;
  const description = dictionary.sections.blogDescription;

  return createMetadata({
    title,
    description,
    ogText: `My ${title.toLowerCase()} — ${description}`,
    image: `https://milindmishra.com/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
    locale,
  });
};

const Posts = async ({ params }: BlogIndexProps) => {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return null;
  }

  const dictionary = getDictionary(locale);
  const postsByYear = groupPostsByYear(locale);

  return (
    <>
      <Section className="gap-0">
        <h1>{dictionary.sections.blogTitle}</h1>
        <p className="text-foreground-lighter">
          {dictionary.sections.blogDescription}
        </p>
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
                <li key={post.entryId}>
                  <Post {...post} locale={locale} />
                </li>
              ))}
            </ul>
          </Section>
        ))}
    </>
  );
};

export default Posts;
