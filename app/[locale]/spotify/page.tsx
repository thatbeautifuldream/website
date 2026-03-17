import { ArrowLeftToLineIcon } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Link } from '@/components/link';
import { Mdx } from '@/components/mdx';
import { Section } from '@/components/section';
import { getLocalizedPage } from '@/lib/i18n/content';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { isLocale } from '@/lib/i18n/config';
import { createMetadata } from '@/lib/metadata';
import { cn } from '@/lib/utils';

type SpotifyPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: SpotifyPageProps): Promise<Metadata> => {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const page = getLocalizedPage('spotify', locale);

  if (!page) {
    return {};
  }

  return createMetadata({
    title: page.title,
    description: page.description,
    image: `/og?title=${encodeURIComponent(page.title)}&description=${encodeURIComponent(page.description)}`,
    locale,
  });
};

const SpotifyPage = async ({ params }: SpotifyPageProps) => {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const page = getLocalizedPage('spotify', locale);
  const dictionary = getDictionary(locale);

  if (!page) {
    notFound();
  }

  return (
    <>
      <Section
        className="-ml-28 absolute mt-1 hidden select-none lg:block"
        delay={0.6}
      >
        <Link
          className={cn(
            'flex items-center gap-2 text-nowrap text-foreground-lighter text-xs transition-colors',
            'hover:text-foreground'
          )}
          href="/"
        >
          <ArrowLeftToLineIcon size={12} />
          {dictionary.navigation.home}
        </Link>
      </Section>
      <Section className="gap-0">
        <h1>{page.title}</h1>
        <p className="text-foreground-lighter">{page.description}</p>
      </Section>
      <article>
        <Section>
          <Mdx code={page.body} />
        </Section>
      </article>
    </>
  );
};

export default SpotifyPage;
