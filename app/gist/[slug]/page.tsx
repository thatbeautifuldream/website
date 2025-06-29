import { allGists } from 'content-collections';
import { ArrowLeftToLineIcon, ExternalLinkIcon } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { FC } from 'react';
import { Link } from '@/components/link';
import { Mdx } from '@/components/mdx';
import { Section } from '@/components/section';
import { createMetadata } from '@/lib/metadata';
import { cn } from '@/lib/utils';

type PageProperties = {
    readonly params: Promise<{
        slug: string;
    }>;
};

export const runtime = 'nodejs';

export const generateMetadata = async ({
    params,
}: PageProperties): Promise<Metadata> => {
    const { slug } = await params;
    const page = allGists.find((g) => g._meta.path === `gist/${slug}`);

    if (!page) {
        return {};
    }

    return createMetadata({
        title: page.title,
        description: page.description || '',
    });
};

export const generateStaticParams = (): { slug: string }[] =>
    allGists.map((page) => ({
        slug: page._meta.path.replace('gist/', ''),
    }));

const Page: FC<PageProperties> = async ({ params }) => {
    const { slug } = await params;
    const page = allGists.find((g) => g._meta.path === `gist/${slug}`);

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
                    Gists
                </Link>
            </Section>
            <Section className="gap-1">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <h1>{page.title}</h1>
                        {page.description && (
                            <p className="text-foreground-lighter">{page.description}</p>
                        )}
                    </div>
                    <Link
                        className={cn(
                            'flex items-center gap-2 text-nowrap text-foreground-lighter text-xs transition-colors',
                            'hover:text-foreground'
                        )}
                        external
                        href={page.gistUrl}
                    >
                        <ExternalLinkIcon size={12} />
                        View on GitHub
                    </Link>
                </div>
                <div className="flex gap-2">
                    {page.tags?.split(',').map((tag) => (
                        <code
                            className="rounded-md bg-secondary px-2 py-1 text-xs"
                            key={tag}
                        >
                            {tag.trim()}
                        </code>
                    ))}
                </div>
            </Section>
            <article className="grid gap-3">
                <Section delay={0.2}>
                    <Mdx code={page.body} showCopyButton />
                </Section>
            </article>
            <Section
                className="grid gap-1 text-foreground-lighter text-sm"
                delay={0.4}
            >
                <p>
                    Published on{' '}
                    {new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(
                        page.date
                    )}
                </p>
                <p>{page.readingTime}</p>
                {page.isPublic ? <p>Public gist</p> : <p>Private gist</p>}
            </Section>
        </>
    );
};

export default Page;
