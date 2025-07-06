#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import {
  getFileContent,
  getRepositoryContents,
} from "../service/github.service.js";

// Type definitions
type RepositoryFile = {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: "file";
};

type BlogFrontmatter = {
  title?: string;
  slug?: string;
  datePublished?: string;
  cuid?: string;
  cover?: string;
  tags?: string;
  [key: string]: string | undefined;
};

// Configuration
const REPO_OWNER = "thatbeautifuldream";
const REPO_NAME = "hashnode-blogs";
const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

// Regex for parsing frontmatter (with multiline support)
const FRONTMATTER_REGEX = /^---[\s]*\n([\s\S]*?)\n---[\s]*\n([\s\S]*)/;

/**
 * Simple frontmatter parser for YAML format
 */
function parseFrontmatter(content: string): {
  frontmatter: BlogFrontmatter;
  body: string;
} {
  console.log("📄 Parsing frontmatter...");
  const match = content.match(FRONTMATTER_REGEX);

  if (!match) {
    console.log("⚠️ No frontmatter found, returning raw content");
    return {
      frontmatter: {},
      body: content,
    };
  }

  const [, frontmatterStr, body] = match;
  const frontmatter: BlogFrontmatter = {};

  // Simple YAML parsing (handles basic key-value pairs)
  const lines = frontmatterStr.split("\n");
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith("#")) {
      continue;
    }

    const colonIndex = trimmedLine.indexOf(":");
    if (colonIndex === -1) {
      continue;
    }

    const key = trimmedLine.slice(0, colonIndex).trim();
    let value = trimmedLine.slice(colonIndex + 1).trim();

    // Remove quotes if present
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    frontmatter[key] = value;
  }

  console.log(
    `✅ Parsed frontmatter with ${Object.keys(frontmatter).length} fields`
  );
  return {
    frontmatter,
    body: body.trim(),
  };
}

/**
 * Converts a string to a URL-friendly slug
 */
function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .trim();
}

/**
 * Creates frontmatter for the MDX file
 */
function createMDXFrontmatter(frontmatter: BlogFrontmatter): string {
  console.log("🔨 Creating MDX frontmatter...");
  const title = frontmatter.title || "Untitled Blog Post";
  const slug = frontmatter.slug || createSlug(title);
  const datePublished = frontmatter.datePublished || new Date().toISOString();
  const cuid = frontmatter.cuid || "";
  const cover =
    frontmatter.cover +
      "?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp" ||
    "";
  const tags = frontmatter.tags || "";

  console.log(`   Title: ${title}`);
  console.log(`   Slug: ${slug}`);
  console.log(`   Date: ${datePublished}`);

  return `---
title: "${title}"
datePublished: ${datePublished}
cuid: ${cuid}
slug: ${slug}
${cover ? `cover: ${cover}` : ""}
${tags ? `tags: ${tags}` : ""}
---

`;
}

/**
 * Ensures the content directory exists
 */
function ensureContentDirectory(): void {
  console.log(`📁 Ensuring content directory exists: ${CONTENT_DIR}`);
  if (fs.existsSync(CONTENT_DIR)) {
    console.log("✅ Content directory already exists");
  } else {
    console.log("📁 Creating content directory...");
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
    console.log("✅ Content directory created successfully");
  }
}

/**
 * Processes a single blog file and creates an MDX file
 */
async function processBlogFile(file: RepositoryFile): Promise<string | null> {
  try {
    console.log(`\n🔄 Processing file: ${file.name}`);

    // Skip non-markdown files
    if (!file.name.endsWith(".md")) {
      console.log(`⏭️ Skipping non-markdown file: ${file.name}`);
      return null;
    }

    console.log(`📥 Fetching content for: ${file.path}`);
    // Fetch file content
    const content = await getFileContent(REPO_OWNER, REPO_NAME, file.path);

    if (!content) {
      console.log(`❌ Failed to fetch content for: ${file.name}`);
      return null;
    }

    console.log(`✅ Content fetched (${content.length} characters)`);

    // Parse frontmatter and body
    const { frontmatter, body } = parseFrontmatter(content);

    if (!(frontmatter.slug || frontmatter.title)) {
      console.log(`⚠️ Skipping file without slug or title: ${file.name}`);
      return null;
    }

    // Determine the slug to use
    const slug = frontmatter.slug || createSlug(frontmatter.title || file.name);
    const fileName = `${slug}.mdx`;
    const filePath = path.join(CONTENT_DIR, fileName);

    console.log(`💾 Writing file: ${fileName}`);

    // Create MDX content
    const mdxFrontmatter = createMDXFrontmatter(frontmatter);
    const mdxContent = mdxFrontmatter + body;

    // Write file
    fs.writeFileSync(filePath, mdxContent, "utf8");

    console.log(`✅ Successfully created: ${fileName}`);
    return fileName;
  } catch (error) {
    console.error(`❌ Error processing file ${file.name}:`, error);
    return null;
  }
}

/**
 * Fetches all blog files and creates MDX files
 */
async function fetchBlogsAndCreateMDXFiles(): Promise<void> {
  try {
    console.log("🚀 Starting blog fetching process...");
    console.log(`📂 Repository: ${REPO_OWNER}/${REPO_NAME}`);

    // Fetch repository contents
    console.log("📡 Fetching repository contents...");
    const contents = await getRepositoryContents(REPO_OWNER, REPO_NAME);

    console.log("✅ Repository contents fetched");

    // Filter for .md files
    const files = Array.isArray(contents)
      ? (contents.filter(
          (item) => item.type === "file" && item.name.endsWith(".md")
        ) as RepositoryFile[])
      : [];

    console.log(`📋 Found ${files.length} markdown files to process`);

    if (files.length === 0) {
      console.log("⚠️ No markdown files found in repository");
      return;
    }

    // Ensure content directory exists
    ensureContentDirectory();

    // Process all files with controlled concurrency
    const BATCH_SIZE = 5; // Process 5 files at a time to avoid rate limiting
    const processedFiles: string[] = [];

    console.log(`🔄 Processing files in batches of ${BATCH_SIZE}...`);

    for (let i = 0; i < files.length; i += BATCH_SIZE) {
      const batch = files.slice(i, i + BATCH_SIZE);
      const batchNumber = Math.floor(i / BATCH_SIZE) + 1;
      const totalBatches = Math.ceil(files.length / BATCH_SIZE);

      console.log(
        `\n📦 Processing batch ${batchNumber}/${totalBatches} (${batch.length} files)`
      );

      const batchPromises = batch.map((file) => processBlogFile(file));
      // biome-ignore lint: intentional await in loop for rate limiting
      const batchResults = await Promise.all(batchPromises);

      // Collect successful results
      for (const result of batchResults) {
        if (result) {
          processedFiles.push(result);
        }
      }

      console.log(`✅ Batch ${batchNumber} completed`);

      // Add delay between batches to avoid rate limiting
      if (i + BATCH_SIZE < files.length) {
        console.log("⏳ Waiting 1 second before next batch...");
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    console.log("\n🎉 Process completed!");
    console.log(
      `📊 Successfully processed ${processedFiles.length} out of ${files.length} files`
    );

    if (processedFiles.length > 0) {
      console.log("📝 Created files:");
      for (const file of processedFiles) {
        console.log(`   - ${file}`);
      }
    }
  } catch (error) {
    console.error("❌ Fatal error in fetchBlogsAndCreateMDXFiles:", error);
    process.exit(1);
  }
}

/**
 * Main execution
 */
async function main(): Promise<void> {
  console.log("🔥 Blog MDX Generator Starting...");
  console.log("=".repeat(50));

  try {
    await fetchBlogsAndCreateMDXFiles();
    console.log(`\n${"=".repeat(50)}`);
    console.log("✅ Script completed successfully!");
  } catch (error) {
    console.error(`\n${"=".repeat(50)}`);
    console.error("❌ Script failed:", error);
    process.exit(1);
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error("❌ Unhandled error:", error);
    process.exit(1);
  });
}

export { fetchBlogsAndCreateMDXFiles };
