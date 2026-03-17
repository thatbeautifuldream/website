import { ArrowLeftToLineIcon, ExternalLinkIcon } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { FC } from 'react';
import { Link } from '@/components/link';
import { Mdx } from '@/components/mdx';
import { Section } from '@/components/section';
import { getLocalizedGist, getLocalizedGists } from '@/lib/i18n/content';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { formatDateLong } from '@/lib/i18n/formatters';
import { isLocale } from '@/lib/i18n/config';
import { createMetadata } from '@/lib/metadata';
import { cn } from '@/lib/utils';

type PageProperties = {
    readonly params: Promise<{
        locale: string;
        slug: string;
    }>;
};

export const runtime = 'nodejs';

export const generateMetadata = async ({
    params,
}: PageProperties): Promise<Metadata> => {
    const { locale, slug } = await params;

    if (!isLocale(locale)) {
        return {};
    }

    const page = getLocalizedGist(slug, locale);

    if (!page) {
        return {};
    }

    return createMetadata({
        title: page.title,
        description: page.description || '',
        image: `https://milindmishra.com/og?title=${encodeURIComponent(page.title)}`,
        locale,
    });
};

export const generateStaticParams = () =>
    getLocalizedGists('en').map((page) => ({
        locale: page.locale,
        slug: page.slug,
    }));

const Page: FC<PageProperties> = async ({ params }) => {
    const { locale, slug } = await params;

    if (!isLocale(locale)) {
        notFound();
    }

    const page = getLocalizedGist(slug, locale);
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
                    href="/gist"
                >
                    <ArrowLeftToLineIcon size={12} />
                    {dictionary.sections.gistTitle}
                </Link>
            </Section>
            <Section className="gap-1">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <h1>{page.title}</h1>
                        <p className="text-foreground-lighter text-xs">
                            {dictionary.common.publishedOn} {formatDateLong(page.date, locale)}
                        </p>
                    </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                    {page.tags?.split(',').map((tag) => (
                        <code
                            className="whitespace-nowrap rounded-md bg-secondary px-2 py-1 text-xs"
                            key={tag}
                        >
                            {tag.trim()}
                        </code>
                    ))}
                </div>
            </Section>
            <article className="grid gap-3">
                <Section delay={0.2}>
                    <Mdx code={page.body} />
                </Section>
            </article>
            <Section className="grid gap-1" delay={0.4}>
                <Link
                    className={cn(
                        'flex items-center gap-2 text-nowrap text-foreground-lighter text-xs underline underline-offset-1 transition-colors',
                        'hover:text-foreground hover:underline hover:underline-offset-2'
                    )}
                    href={page.gistUrl}
                    target="_blank"
                >
                    <ExternalLinkIcon size={12} />
                    {dictionary.common.viewOnGitHub}
                </Link>
            </Section>
        </>
    );
};

export default Page;
