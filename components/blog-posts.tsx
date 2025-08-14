"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { payloadClient, type Post } from "@/lib/payload-client";

interface TBlogPostsProps {
    initialPosts?: Post[];
    limit?: number;
}

export function BlogPosts({ initialPosts = [], limit = 10 }: TBlogPostsProps) {
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const [loading, setLoading] = useState(!initialPosts.length);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!initialPosts.length) {
            loadPosts();
        }
    }, []);

    const loadPosts = async () => {
        try {
            setLoading(true);
            const result = await payloadClient.getPosts(limit);
            setPosts(result.docs);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load posts");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 p-4 border border-red-200 rounded">
                Error loading posts: {error}
            </div>
        );
    }

    if (!posts.length) {
        return (
            <div className="text-gray-500 p-4 text-center">
                No posts found.
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {posts.map((post) => (
                <article key={post.id} className="border-b border-gray-200 pb-6">
                    <header className="mb-3">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            <Link
                                href={`/blog/${post.slug}`}
                                className="hover:text-blue-600 transition-colors"
                            >
                                {post.title}
                            </Link>
                        </h2>
                        <div className="text-sm text-gray-500 space-x-2">
                            {post.publishedAt && (
                                <time dateTime={post.publishedAt}>
                                    {new Date(post.publishedAt).toLocaleDateString()}
                                </time>
                            )}
                            <span>•</span>
                            <span className="capitalize">{post.status}</span>
                            {post.author && typeof post.author === "object" && (
                                <>
                                    <span>•</span>
                                    <span>by {post.author.email}</span>
                                </>
                            )}
                        </div>
                    </header>

                    {post.excerpt && (
                        <p className="text-gray-600 mb-3 leading-relaxed">
                            {post.excerpt}
                        </p>
                    )}

                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                            {post.tags.map((tagItem, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                                >
                                    {tagItem.tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <Link
                        href={`/blog/${post.slug}`}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                    >
                        Read more →
                    </Link>
                </article>
            ))}
        </div>
    );
}
