import { getPayload } from "payload";
import configPromise from "../payload.config";
import type { Post, User } from "../payload-types";

// Initialize Payload client
export const getPayloadClient = async () => {
  return await getPayload({
    config: configPromise,
  });
};

// Helper functions for common operations
export const payloadClient = {
  // Get all published posts
  async getPosts(limit = 10, page = 1) {
    const payload = await getPayloadClient();
    return await payload.find({
      collection: "posts",
      where: {
        status: { equals: "published" },
      },
      limit,
      page,
      sort: "-publishedAt",
    });
  },

  // Get a single post by slug
  async getPostBySlug(slug: string) {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "posts",
      where: {
        slug: { equals: slug },
        status: { equals: "published" },
      },
      limit: 1,
    });
    return result.docs[0] || null;
  },

  // Create a new post
  async createPost(data: Partial<Post>) {
    const payload = await getPayloadClient();
    return await payload.create({
      collection: "posts",
      data: {
        ...data,
        status: "published",
      } as Post,
    });
  },
};

// Export types for use in components
export type { Post, User };
