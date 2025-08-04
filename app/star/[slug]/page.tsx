import { allPosts, allStars } from 'content-collections';
import { ArrowLeftToLineIcon } from 'lucide-react';
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
    const page = allStars.find((p) => p._meta.path === `star/${slug}`);

    if (!page) {
        return {};
    }

    return createMetadata({
        title: page.title,
        description: page.description || '',
    });
};

export const generateStaticParams = (): { slug: string }[] =>
    allPosts.map((page) => ({
        slug: page._meta.path,
    }));

const Page: FC<PageProperties> = async ({ params }) => {
    const { slug } = await params;
    const page = allStars.find((p) => p._meta.path === `star/${slug}`);

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
                    href="/posts"
                >
                    <ArrowLeftToLineIcon size={12} />
                    Posts
                </Link>
            </Section>
            <Section className="gap-1">
                <h1>{page.title}</h1>
                {page.description && <p className="text-foreground-lighter text-sm">{page.description}</p>}
                <div className="flex justify-between text-foreground-lighter text-xs">
                    <p>
                        Published on{' '}
                        {new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(
                            page.date
                        )}
                    </p>
                    <p>{page.readingTime}</p>
                </div>
            </Section>
            <article className="grid gap-3">
                <Section delay={0.2}>
                    <Mdx code={page.body} />
                </Section>
            </article>

        </>
    );
};

export default Page; 