import type { CollectionConfig } from "payload";

export const Files: CollectionConfig = {
  slug: "files",
  upload: {
    staticDir: "files",
    // Remove mimeTypes restriction to allow any file type
    // mimeTypes: ["*/*"], // This is the default when omitted
    adminThumbnail: ({
      doc,
    }: {
      doc: Record<string, unknown>;
    }): string | null => {
      // For images, use the file itself as thumbnail
      if (
        doc.mimeType &&
        typeof doc.mimeType === "string" &&
        doc.mimeType.startsWith("image/")
      ) {
        return typeof doc.url === "string" ? doc.url : null;
      }
      // For other files, we could return a default icon or null
      return null;
    },
    // Disable image resizing for non-image files
    disableLocalStorage: false,
    crop: false,
    // Note: File size limits are typically handled at the storage provider level (UploadThing)
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: false,
      admin: {
        description: "Optional title for the file",
      },
    },
    {
      name: "description",
      type: "textarea",
      required: false,
      admin: {
        description: "Optional description of the file",
      },
    },
    {
      name: "category",
      type: "select",
      required: false,
      options: [
        {
          label: "Document",
          value: "document",
        },
        {
          label: "Archive",
          value: "archive",
        },
        {
          label: "Video",
          value: "video",
        },
        {
          label: "Audio",
          value: "audio",
        },
        {
          label: "Image",
          value: "image",
        },
        {
          label: "Other",
          value: "other",
        },
      ],
      admin: {
        description: "Categorize the file type",
      },
    },
    {
      name: "tags",
      type: "text",
      hasMany: true,
      required: false,
      admin: {
        description: "Add tags for better organization",
      },
    },
  ],
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "filename", "mimeType", "category", "filesize"],
    group: "Media",
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Auto-categorize based on MIME type if category is not set
        if (!data.category && data.mimeType) {
          if (data.mimeType.startsWith("image/")) {
            data.category = "image";
          } else if (data.mimeType.startsWith("video/")) {
            data.category = "video";
          } else if (data.mimeType.startsWith("audio/")) {
            data.category = "audio";
          } else if (
            data.mimeType === "application/pdf" ||
            data.mimeType.includes("document") ||
            data.mimeType.includes("text")
          ) {
            data.category = "document";
          } else if (
            data.mimeType.includes("zip") ||
            data.mimeType.includes("rar") ||
            data.mimeType.includes("archive")
          ) {
            data.category = "archive";
          } else {
            data.category = "other";
          }
        }
        return data;
      },
    ],
  },
};
