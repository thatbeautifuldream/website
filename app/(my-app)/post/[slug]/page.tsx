import { allPosts } from 'content-collections';
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
    const page = allPosts.find((p) => p._meta.path === `post/${slug}`);

    if (!page) {
        return {};
    }

    return createMetadata({
        title: page.title,
        description: page.description || '',
        image: `/api/og?title=${encodeURIComponent(page.title)}}`,
    });
};

export const generateStaticParams = (): { slug: string }[] =>
    allPosts.map((page) => ({
        slug: page._meta.path,
    }));

const Page: FC<PageProperties> = async ({ params }) => {
    const { slug } = await params;
    const page = allPosts.find((p) => p._meta.path === `post/${slug}`);

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
                <div className="mt-2 flex flex-wrap gap-2">
                    {page.tags?.split(',').map((tag) => (
                        <code
                            className="whitespace-nowrap rounded-md bg-secondary px-2 py-1 text-xs"
                            key={tag}
                        >
                            {tag}
                        </code>
                    ))}
                </div>

            </Section>
            {page.image ? (
                <Section>
                    {/** biome-ignore lint/performance/noImgElement: Need to use img element to escape Next.js image optimization */}
                    <img
                        alt={page.title}
                        className="overflow-hidden rounded-lg border border-border/50"
                        height={630}
                        // priority
                        // quality={100}
                        src={page.image}
                        width={1200}
                    />
                </Section>
            ) : null}
            <article className="grid gap-3">
                <Section delay={0.2}>
                    <Mdx code={page.body} />
                </Section>
            </article>

        </>
    );
};

export default Page; 