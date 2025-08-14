import type { CollectionConfig } from "payload";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "status", "createdAt"],
  },
  access: {
    read: () => true, // Allow public reading
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "URL-friendly version of the title",
      },
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
    {
      name: "excerpt",
      type: "textarea",
      admin: {
        description: "Brief description of the post",
      },
    },
    // {
    //   name: "featuredImage",
    //   type: "upload",
    //   relationTo: "media", // You'll need to create a media collection too
    //   admin: {
    //     description: "Featured image for the post",
    //   },
    // },
    {
      name: "status",
      type: "select",
      options: [
        {
          label: "Draft",
          value: "draft",
        },
        {
          label: "Published",
          value: "published",
        },
        {
          label: "Archived",
          value: "archived",
        },
      ],
      defaultValue: "draft",
      required: true,
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        description: "When the post should be published",
      },
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      required: true,
    },
    {
      name: "tags",
      type: "array",
      fields: [
        {
          name: "tag",
          type: "text",
        },
      ],
    },
    {
      name: "seo",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          admin: {
            description: "SEO title (if different from post title)",
          },
        },
        {
          name: "description",
          type: "textarea",
          admin: {
            description: "SEO description",
          },
        },
        {
          name: "keywords",
          type: "text",
          admin: {
            description: "Comma-separated keywords",
          },
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Auto-generate slug from title if not provided
        if (data.title && !data.slug) {
          data.slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
        }
        return data;
      },
    ],
  },
};
