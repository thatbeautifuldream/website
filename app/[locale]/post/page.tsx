import type { Metadata } from 'next';
import { PostItem } from '@/components/post-item';
import { Section } from '@/components/section';
import { getLocalizedPosts } from '@/lib/i18n/content';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { createMetadata } from '@/lib/metadata';

type PostIndexProps = {
  params: Promise<{
    locale: string;
  }>;
};

const groupPostsByYear = (locale: Locale) =>
  getLocalizedPosts(locale).reduce(
    (acc, post) => {
      const year = post.date.getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    },
    {} as Record<number, ReturnType<typeof getLocalizedPosts>>
  );

export const generateMetadata = async ({
  params,
}: PostIndexProps): Promise<Metadata> => {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const dictionary = getDictionary(locale);
  const title = dictionary.sections.postTitle;
  const description = dictionary.sections.postDescription;

  return createMetadata({
    title,
    description,
    ogText: `My ${title.toLowerCase()} — ${description}`,
    image: `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
    locale,
  });
};

const Posts = async ({ params }: PostIndexProps) => {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return null;
  }

  const dictionary = getDictionary(locale);
  const postsByYear = groupPostsByYear(locale);

  return (
    <>
      <Section className="gap-0">
        <h1>{dictionary.sections.postTitle}</h1>
        <p className="text-foreground-lighter">
          {dictionary.sections.postDescription}
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
                  <PostItem {...post} locale={locale} />
                </li>
              ))}
            </ul>
          </Section>
        ))}
    </>
  );
};

export default Posts; 
