#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import type { RestEndpointMethodTypes } from "@octokit/rest";
import githubService from "../service/github.service.js";

// Type definitions
type GistFile = {
  filename: string;
  language: string | null;
  content: string;
  size: number;
  raw_url: string;
  type: string;
};

type GistListItem =
  RestEndpointMethodTypes["gists"]["listForUser"]["response"]["data"][0];
type GistDetails = RestEndpointMethodTypes["gists"]["get"]["response"]["data"];

// Configuration
const GITHUB_USERNAME = "thatbeautifuldream";
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
  const files = gist.files;
  if (!files) {
    throw new Error("Gist has no files");
  }

  const title = gist.description || `Gist: ${Object.keys(files)[0]}`;
  const slug = createSlug(title);
  const datePublished = new Date(gist.created_at || "").toISOString();
  const tags = generateTags(gist);

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

  // Add gist metadata (not showing atm)
  //   content += `> **Gist ID:** ${gist.id}  \n`;
  //   content += `> **Created:** ${new Date(
  //     gist.created_at || ""
  //   ).toLocaleDateString()}  \n`;
  //   content += `> **Updated:** ${new Date(
  //     gist.updated_at || ""
  //   ).toLocaleDateString()}  \n`;
  //   content += `> **Public:** ${gist.public ? "Yes" : "No"}  \n`;
  //   content += `> **URL:** [View on GitHub](${gist.html_url})\n\n`;

  if (gist.description) {
    content += `## Description\n\n${gist.description}\n\n`;
  }

  // Add files content
  const files = Object.values(gist.files).filter(Boolean) as GistFile[];

  if (files.length === 1) {
    const file = files[0];
    content += `## ${file.filename}\n\n`;
    if (file.language) {
      content += `\`\`\`${file.language.toLowerCase()}\n${sanitizeContent(
        file.content
      )}\n\`\`\`\n\n`;
    } else {
      content += `\`\`\`\n${sanitizeContent(file.content)}\n\`\`\`\n\n`;
    }
  } else {
    content += "## Files\n\n";
    for (const file of files) {
      content += `### ${file.filename}\n\n`;
      if (file.language) {
        content += `\`\`\`${file.language.toLowerCase()}\n${sanitizeContent(
          file.content
        )}\n\`\`\`\n\n`;
      } else {
        content += `\`\`\`\n${sanitizeContent(file.content)}\n\`\`\`\n\n`;
      }
    }
  }

  return content;
}

/**
 * Ensures the content directory exists
 */
function ensureContentDirectory(): void {
  if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
    console.log(`Created directory: ${CONTENT_DIR}`);
  }
}

/**
 * Processes a single gist and creates an MDX file
 */
async function processGist(gist: GistListItem): Promise<string | null> {
  try {
    console.log(
      `Processing gist: ${gist.id} - ${gist.description || "No description"}`
    );

    // Fetch full gist content
    const fullGist = await githubService.fetchGistContent(gist.id);

    if (!fullGist) {
      console.warn(`Could not fetch content for gist: ${gist.id}`);
      return null;
    }

    // Create slug from title/description
    const title = fullGist.description || `gist-${fullGist.id}`;
    const slug = createSlug(title);
    const fileName = `${slug}.mdx`;
    const filePath = path.join(CONTENT_DIR, fileName);

    // Create MDX content
    const frontmatter = createFrontmatter(fullGist);
    const content = createContent(fullGist);
    const mdxContent = frontmatter + content;

    // Write file
    fs.writeFileSync(filePath, mdxContent, "utf8");
    console.log(`Created: ${fileName}`);

    return fileName;
  } catch (error) {
    console.error(`Error processing gist ${gist.id}:`, error);
    return null;
  }
}

/**
 * Fetches all gists and creates MDX files
 */
async function fetchGistsAndCreateMDXFiles(): Promise<void> {
  try {
    console.log(`Fetching gists for user: ${GITHUB_USERNAME}`);

    // Fetch all gists
    const gists = await githubService.getGists(GITHUB_USERNAME);
    console.log(`Found ${gists.length} gists`);

    // Ensure content directory exists
    ensureContentDirectory();

    // Process all gists with controlled concurrency
    const BATCH_SIZE = 5; // Process 5 gists at a time to avoid rate limiting
    const processedFiles: string[] = [];

    for (let i = 0; i < gists.length; i += BATCH_SIZE) {
      const batch = gists.slice(i, i + BATCH_SIZE);
      const batchPromises = batch.map((gist) => processGist(gist));
      const batchResults = await Promise.all(batchPromises);

      // Collect successful results
      for (const result of batchResults) {
        if (result) {
          processedFiles.push(result);
        }
      }

      // Add delay between batches to avoid rate limiting
      if (i + BATCH_SIZE < gists.length) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    console.log(`\n✅ Successfully processed ${processedFiles.length} gists`);
    console.log(`📁 Files created in: ${CONTENT_DIR}`);
  } catch (error) {
    console.error("Failed to fetch gists:", error);
    process.exit(1);
  }
}

/**
 * Main execution
 */
async function main(): Promise<void> {
  console.log("🚀 Starting GitHub Gists to MDX conversion...\n");
  await fetchGistsAndCreateMDXFiles();
  console.log("\n🎉 Conversion completed!");
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { fetchGistsAndCreateMDXFiles };
