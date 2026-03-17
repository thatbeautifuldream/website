import type { Metadata } from 'next';
import { Gist } from '@/components/gist';
import { Section } from '@/components/section';
import { getLocalizedGists } from '@/lib/i18n/content';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { createMetadata } from '@/lib/metadata';

type GistIndexProps = {
  params: Promise<{
    locale: string;
  }>;
};

const groupGistsByYear = (locale: Locale) =>
  getLocalizedGists(locale).reduce(
    (acc, gist) => {
      const year = gist.date.getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(gist);
      return acc;
    },
    {} as Record<number, ReturnType<typeof getLocalizedGists>>
  );

export const generateMetadata = async ({
  params,
}: GistIndexProps): Promise<Metadata> => {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const dictionary = getDictionary(locale);
  const title = dictionary.sections.gistTitle;
  const description = dictionary.sections.gistDescription;

  return createMetadata({
    title,
    description,
    image: `https://milindmishra.com/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
    locale,
  });
};

const Gists = async ({ params }: GistIndexProps) => {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return null;
  }

  const dictionary = getDictionary(locale);
  const gistsByYear = groupGistsByYear(locale);

  return (
    <>
      <Section className="gap-0">
        <h1>{dictionary.sections.gistTitle}</h1>
        <p className="text-foreground-lighter">
          {dictionary.sections.gistDescription}
        </p>
      </Section>
      {Object.entries(gistsByYear)
        .sort(([a], [b]) => Number(b) - Number(a))
        .map(([year, gists], index) => (
          <Section delay={(index + 1) * 0.2} key={year}>
            <h2 className="font-normal text-foreground-lighter text-sm">
              {year}
            </h2>
            <ul className="grid gap-6">
              {gists.map((gist) => (
                <li key={gist.entryId}>
                  <Gist {...gist} locale={locale} />
                </li>
              ))}
            </ul>
          </Section>
        ))}
    </>
  );
};

export default Gists; 
