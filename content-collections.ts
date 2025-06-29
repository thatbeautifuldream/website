import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import {
  type RehypeCodeOptions,
  rehypeCode,
  remarkGfm,
  remarkHeading,
} from "fumadocs-core/mdx-plugins";
import readingTime from "reading-time";

const rehypeCodeOptions: RehypeCodeOptions = {
  themes: {
    light: "github-light",
    dark: "github-dark-default",
  },
};

// for more information on configuration, visit:
// https://www.content-collections.dev/docs/configuration

const pages = defineCollection({
  name: "pages",
  directory: "content",
  include: "pages/*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
  }),
  transform: async (page, context) => {
    const body = await compileMDX(context, page, {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [[rehypeCode, rehypeCodeOptions], remarkHeading],
    });

    return {
      ...page,
      body,
    };
  },
});

const posts = defineCollection({
  name: "posts",
  directory: "content",
  include: "blog/*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date().optional(),
    datePublished: z.coerce.date().optional(),
    image: z.string().optional(),
    cover: z.string().optional(),
    cuid: z.string().optional(),
    slug: z.string().optional(),
    tags: z.string().optional(),
  }),
  transform: async (page, context) => {
    const body = await compileMDX(context, page, {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [[rehypeCode, rehypeCodeOptions], remarkHeading],
    });

    // Support both date formats - use datePublished if available, fallback to date
    const postDate = page.datePublished || page.date || new Date();

    // Use cover image if available, fallback to image
    const postImage = page.cover || page.image;

    return {
      ...page,
      date: new Date(postDate),
      image: postImage,
      body,
      slug: page.slug || page._meta.path,
      readingTime: readingTime(page.content).text,
    };
  },
});

const gists = defineCollection({
  name: "gists",
  directory: "content",
  include: "gist/*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date().optional(),
    datePublished: z.coerce.date().optional(),
    slug: z.string().optional(),
    tags: z.string().optional(),
    gistId: z.string(),
    gistUrl: z.string(),
    isPublic: z.boolean(),
  }),
  transform: async (page, context) => {
    const body = await compileMDX(context, page, {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [[rehypeCode, rehypeCodeOptions], remarkHeading],
    });

    // Support both date formats - use datePublished if available, fallback to date
    const gistDate = page.datePublished || page.date || new Date();

    return {
      ...page,
      date: new Date(gistDate),
      body,
      slug: page.slug || page._meta.path,
      readingTime: readingTime(page.content).text,
    };
  },
});

export default defineConfig({
  collections: [pages, posts, gists],
});
