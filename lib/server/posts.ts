import { getPayloadClient } from "@/lib/payload-client";
import type { Post } from "@/payload-types";

export async function getPublishedPosts(limit = 10, page = 1) {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "posts",
      where: {
        status: { equals: "published" },
        publishedAt: { less_than_equal: new Date().toISOString() },
      },
      limit,
      page,
      sort: "-publishedAt",
      populate: {
        author: true,
        featuredImage: true,
      },
    });

    return {
      posts: result.docs,
      totalPages: result.totalPages,
      currentPage: result.page,
      totalDocs: result.totalDocs,
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      posts: [],
      totalPages: 0,
      currentPage: 1,
      totalDocs: 0,
    };
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "posts",
      where: {
        slug: { equals: slug },
        status: { equals: "published" },
        publishedAt: { less_than_equal: new Date().toISOString() },
      },
      limit: 1,
      populate: {
        author: true,
        featuredImage: true,
      },
    });

    return result.docs[0] || null;
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
}

export async function getRelatedPosts(
  currentPostId: number,
  tags: string[] = [],
  limit = 3
): Promise<Post[]> {
  try {
    const payload = await getPayloadClient();

    // Build query to find posts with similar tags
    const tagQueries = tags.map((tag) => ({
      "tags.tag": { contains: tag },
    }));

    const result = await payload.find({
      collection: "posts",
      where: {
        and: [
          { id: { not_equals: currentPostId } },
          { status: { equals: "published" } },
          { publishedAt: { less_than_equal: new Date().toISOString() } },
          ...(tagQueries.length > 0 ? [{ or: tagQueries }] : []),
        ],
      },
      limit,
      sort: "-publishedAt",
      populate: {
        author: true,
        featuredImage: true,
      },
    });

    return result.docs;
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
}
