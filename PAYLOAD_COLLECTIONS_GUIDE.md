# Payload CMS Collections Guide

This guide explains how to use the Payload CMS collections that have been set up in your project.

## Collections Overview

### 1. Users Collection (`collections/user.ts`)

- **Purpose**: User authentication and management
- **Features**: Built-in auth, email-based login
- **Usage**: Automatically handles user registration and login

### 2. Posts Collection (`collections/posts.ts`)

- **Purpose**: Blog posts and articles
- **Features**:
  - Rich text content with Lexical editor
  - SEO fields (title, description, keywords)
  - Status management (draft, published, archived)
  - Tags system
  - Author relationship
  - Featured images
  - Auto-generated slugs

### 3. Media Collection (`collections/media.ts`)

- **Purpose**: File uploads and media management
- **Features**:
  - Image uploads with multiple sizes
  - Alt text and captions for accessibility
  - Automatic thumbnail generation

## TypeScript Types

After running `npx payload generate:types`, you'll get strongly typed interfaces:

```typescript
import type { Post, Media, User } from "./payload-types";
```

## Usage Examples

### Server-Side (Recommended for SSR)

```typescript
// In your page component
import { getPublishedPosts, getPostBySlug } from "@/lib/server/posts";

export default async function BlogPage() {
  const { posts } = await getPublishedPosts(10);

  return (
    <div>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
```

### Client-Side

```typescript
// In your React component
import { BlogPosts } from "@/components/blog-posts";

export default function BlogPage() {
  return <BlogPosts limit={10} />;
}
```

### API Usage

```typescript
import { payloadClient } from "@/lib/payload-client";

// Get posts
const posts = await payloadClient.getPosts(10);

// Get single post
const post = await payloadClient.getPostBySlug("my-blog-post");

// Create new post
const newPost = await payloadClient.createPost({
  title: "New Post",
  slug: "new-post",
  content: {
    /* Lexical editor content */
  },
  status: "published",
  author: userId,
});
```

## Available Fields

### Post Fields

- `title` (required): Post title
- `slug` (required): URL-friendly identifier
- `content` (required): Rich text content
- `excerpt`: Brief description
- `featuredImage`: Upload relationship to media
- `status`: draft | published | archived
- `publishedAt`: Publication date
- `author`: Relationship to user
- `tags`: Array of tag objects
- `seo`: Group with title, description, keywords

### Media Fields

- `alt`: Alternative text for accessibility
- `caption`: Image caption
- `url`: File URL (auto-generated)
- `filename`: Original filename
- `mimeType`: File MIME type
- `filesize`: File size in bytes
- `width/height`: Image dimensions

## Admin Interface

Access the Payload admin at `/admin` to:

- Create and manage posts
- Upload and organize media
- Manage users
- Configure collections

## Collection Configuration

Each collection supports:

- **Access Control**: Define who can read/write
- **Hooks**: Run code before/after operations
- **Validation**: Custom field validation
- **Admin UI**: Customize the admin interface

## Adding More Collections

To add new collections:

1. Create a new file in `collections/` directory:

```typescript
// collections/categories.ts
import type { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
    },
  ],
};
```

2. Import and add to `payload.config.ts`:

```typescript
import { Categories } from "./collections/categories";

export default buildConfig({
  collections: [Users, Posts, Media, Categories],
  // ... other config
});
```

3. Regenerate types:

```bash
npx payload generate:types
```

## Next Steps

1. **Customize Collections**: Modify field types and validation rules
2. **Add Relationships**: Connect collections with relationship fields
3. **Implement Access Control**: Add permission-based access
4. **Create Custom Hooks**: Add business logic to collection operations
5. **Build Admin Views**: Customize the admin interface

## Resources

- [Payload CMS Documentation](https://payloadcms.com/docs)
- [Collection Configuration](https://payloadcms.com/docs/configuration/collections)
- [Field Types](https://payloadcms.com/docs/fields/overview)
- [Access Control](https://payloadcms.com/docs/access-control/overview)
