#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { RestEndpointMethodTypes } from "@octokit/rest";
import { fetchGistContent } from "../service/github.service.js";

// Load environment variables from .env.local using ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, "..", ".env.local");

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  for (const line of envContent.split("\n")) {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith("#")) {
      const [key, ...valueParts] = trimmedLine.split("=");
      if (key && valueParts.length > 0) {
        const value = valueParts.join("=").replace(/^["']|["']$/g, "");
        process.env[key] = value;
      }
    }
  }
}

// Simple logger to avoid console usage
const logger = {
  info: (message: string) => process.stdout.write(`${message}\n`),
  error: (message: string) => process.stderr.write(`${message}\n`),
};

// Type definitions
type GistFile = {
  filename: string;
  language: string | null;
  content: string;
  size: number;
  raw_url: string;
  type: string;
};

type GistDetails = RestEndpointMethodTypes["gists"]["get"]["response"]["data"];

// Configuration
const CONTENT_DIR = path.join(process.cwd(), "content", "gist");

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
 * Sanitizes content for MDX format
 */
function sanitizeContent(content: string): string {
  // Escape triple backticks that might interfere with MDX
  return content.replace(/```/g, "\\`\\`\\`");
}

/**
 * Extracts the primary language from gist files
 */
function getPrimaryLanguage(files: Record<string, GistFile>): string {
  const languages: string[] = [];

  for (const file of Object.values(files)) {
    if (file.language) {
      languages.push(file.language);
    }
  }

  return languages[0] || "text";
}

/**
 * Generates tags based on gist content and language
 */
function generateTags(gist: GistDetails): string {
  const tags: string[] = [];

  // Add language-based tags
  const primaryLanguage = getPrimaryLanguage(
    gist.files as Record<string, GistFile>
  );
  if (primaryLanguage && primaryLanguage !== "text") {
    tags.push(primaryLanguage.toLowerCase());
  }

  // Add 'gist' tag to identify source
  tags.push("gist");

  // Add additional tags based on description keywords
  const description = gist.description?.toLowerCase() || "";
  const keywords = [
    "tutorial",
    "example",
    "snippet",
    "script",
    "utility",
    "helper",
  ];

  for (const keyword of keywords) {
    if (description.includes(keyword)) {
      tags.push(keyword);
    }
  }

  return tags.join(", ");
}

/**
 * Creates frontmatter for the MDX file
 */
function createFrontmatter(gist: GistDetails): string {
  logger.info("🔨 Creating MDX frontmatter...");
  const files = gist.files;
  if (!files) {
    throw new Error("Gist has no files");
  }

  const title = gist.description || `Gist: ${Object.keys(files)[0]}`;
  const slug = createSlug(title);
  const datePublished = new Date(gist.created_at || "").toISOString();
  const tags = generateTags(gist);

  logger.info(`   Title: ${title}`);
  logger.info(`   Slug: ${slug}`);
  logger.info(`   Date: ${datePublished}`);

  return `---
title: "${title}"
description: "${gist.description || "A GitHub gist"}"
datePublished: ${datePublished}
date: ${datePublished}
slug: ${slug}
tags: ${tags}
gistId: ${gist.id}
gistUrl: ${gist.html_url}
isPublic: ${gist.public}
---

`;
}

/**
 * Creates the content section of the MDX file
 */
function createContent(gist: GistDetails): string {
  let content = "";

  if (!gist.files) {
    return content;
  }

  // Add files content
  const files = Object.values(gist.files).filter(Boolean) as GistFile[];

  for (const file of files) {
    if (file.language) {
      content += `\`\`\`${file.language.toLowerCase()} title="${
        file.filename
      }"\n${sanitizeContent(file.content)}\n\`\`\`\n\n`;
    } else {
      content += `\`\`\`\n${sanitizeContent(file.content)}\n\`\`\`\n\n`;
    }
  }

  return content;
}

/**
 * Ensures the content directory exists
 */
function ensureContentDirectory(): void {
  logger.info(`📁 Ensuring content directory exists: ${CONTENT_DIR}`);
  if (fs.existsSync(CONTENT_DIR)) {
    logger.info("✅ Content directory already exists");
  } else {
    logger.info("📁 Creating content directory...");
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
    logger.info("✅ Content directory created successfully");
  }
}

/**
 * Processes a single gist and creates an MDX file
 */
async function processGist(gistId: string): Promise<string | null> {
  try {
    logger.info(`\n🔄 Processing gist: ${gistId}`);

    // Fetch full gist content
    logger.info("📥 Fetching full gist content...");
    const fullGist = await fetchGistContent(gistId);

    if (!fullGist) {
      logger.error(`❌ Failed to fetch full gist content for: ${gistId}`);
      return null;
    }

    logger.info("✅ Full gist content fetched");
    logger.info(`   Description: ${fullGist.description || "No description"}`);

    // Create slug from title/description
    const title = fullGist.description || `gist-${fullGist.id}`;
    const slug = createSlug(title);
    const fileName = `${slug}.mdx`;
    const filePath = path.join(CONTENT_DIR, fileName);

    logger.info(`💾 Writing file: ${fileName}`);

    // Create MDX content
    const frontmatter = createFrontmatter(fullGist);
    const content = createContent(fullGist);
    const mdxContent = frontmatter + content;

    // Write file
    fs.writeFileSync(filePath, mdxContent, "utf8");

    logger.info(`✅ Successfully created: ${fileName}`);
    return fileName;
  } catch (error) {
    logger.error(`❌ Error processing gist ${gistId}: ${error}`);
    return null;
  }
}

/**
 * Main function to process a single gist
 */
async function processSingleGist(gistId: string): Promise<void> {
  try {
    logger.info("🚀 Starting single gist processing...");
    logger.info(`🔍 Gist ID: ${gistId}`);

    // Ensure content directory exists
    ensureContentDirectory();

    // Process the gist
    const result = await processGist(gistId);

    if (result) {
      logger.info("\n🎉 Process completed successfully!");
      logger.info(`📝 Created file: ${result}`);
    } else {
      logger.error(`\n❌ Failed to process gist: ${gistId}`);
      process.exit(1);
    }
  } catch (error) {
    logger.error(`❌ Fatal error in processSingleGist: ${error}`);
    process.exit(1);
  }
}

/**
 * Main execution
 */
async function main(): Promise<void> {
  logger.info("🔥 Single Gist MDX Generator Starting...");
  logger.info("=".repeat(50));

  // Get gist ID from command line arguments
  const gistId = process.argv[2];

  if (!gistId) {
    logger.error("❌ Please provide a gist ID as an argument");
    logger.info("Usage: node single-gist.js <gist-id>");
    process.exit(1);
  }

  try {
    await processSingleGist(gistId);
    logger.info(`\n${"=".repeat(50)}`);
    logger.info("✅ Script completed successfully!");
  } catch (error) {
    logger.error(`\n${"=".repeat(50)}`);
    logger.error(`❌ Script failed: ${error}`);
    process.exit(1);
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    logger.error(`❌ Unhandled error: ${error}`);
    process.exit(1);
  });
}

export { processSingleGist };
