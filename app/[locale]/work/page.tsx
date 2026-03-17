import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Mdx } from '@/components/mdx';
import { Section } from '@/components/section';
import { getLocalizedPage } from '@/lib/i18n/content';
import { isLocale } from '@/lib/i18n/config';
import { createMetadata } from '@/lib/metadata';

type WorkPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: WorkPageProps): Promise<Metadata> => {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const page = getLocalizedPage('work', locale);

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

const WorkPage = async ({ params }: WorkPageProps) => {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const page = getLocalizedPage('work', locale);

  if (!page) {
    notFound();
  }

  return (
    <>
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

export default WorkPage;
