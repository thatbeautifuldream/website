#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { RestEndpointMethodTypes } from "@octokit/rest";
import { fetchGistContent, getGists } from "../service/github.service.js";

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
  console.log("🔨 Creating MDX frontmatter...");
  const files = gist.files;
  if (!files) {
    throw new Error("Gist has no files");
  }

  const title = gist.description || `Gist: ${Object.keys(files)[0]}`;
  const slug = createSlug(title);
  const datePublished = new Date(gist.created_at || "").toISOString();
  const tags = generateTags(gist);

  console.log(`   Title: ${title}`);
  console.log(`   Slug: ${slug}`);
  console.log(`   Date: ${datePublished}`);

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

  // if (gist.description) {
  //   content += `## Description\n\n${gist.description}\n\n`;
  // }

  // Add files content
  const files = Object.values(gist.files).filter(Boolean) as GistFile[];

  // if (files.length === 1) {
  //   const file = files[0];
  //   // content += `## ${file.filename}\n\n`;
  //   if (file.language) {
  //     content += `\`\`\`${file.language.toLowerCase()} title="${
  //       file.filename
  //     }"\n${sanitizeContent(file.content)}\n\`\`\`\n\n`;
  //   } else {
  //     content += `\`\`\`\n${sanitizeContent(file.content)}\n\`\`\`\n\n`;
  //   }
  // } else {
  for (const file of files) {
    // content += `### ${file.filename}\n\n`;
    if (file.language) {
      content += `\`\`\`${file.language.toLowerCase()} title="${
        file.filename
      }"\n${sanitizeContent(file.content)}\n\`\`\`\n\n`;
    } else {
      content += `\`\`\`\n${sanitizeContent(file.content)}\n\`\`\`\n\n`;
    }
  }
  // }

  return content;
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
 * Processes a single gist and creates an MDX file
 */
async function processGist(gist: GistListItem): Promise<string | null> {
  try {
    console.log(`\n🔄 Processing gist: ${gist.id}`);
    console.log(`   Description: ${gist.description || "No description"}`);

    // Fetch full gist content
    console.log("📥 Fetching full gist content...");
    const fullGist = await fetchGistContent(gist.id);

    if (!fullGist) {
      console.log(`❌ Failed to fetch full gist content for: ${gist.id}`);
      return null;
    }

    console.log("✅ Full gist content fetched");

    // Create slug from title/description
    const title = fullGist.description || `gist-${fullGist.id}`;
    const slug = createSlug(title);
    const fileName = `${slug}.mdx`;
    const filePath = path.join(CONTENT_DIR, fileName);

    console.log(`💾 Writing file: ${fileName}`);

    // Create MDX content
    const frontmatter = createFrontmatter(fullGist);
    const content = createContent(fullGist);
    const mdxContent = frontmatter + content;

    // Write file
    fs.writeFileSync(filePath, mdxContent, "utf8");

    console.log(`✅ Successfully created: ${fileName}`);
    return fileName;
  } catch (error) {
    console.error(`❌ Error processing gist ${gist.id}:`, error);
    return null;
  }
}

/**
 * Fetches all gists and creates MDX files
 */
async function fetchGistsAndCreateMDXFiles(): Promise<void> {
  try {
    console.log("🚀 Starting gist fetching process...");
    console.log(`👤 GitHub Username: ${GITHUB_USERNAME}`);

    // Fetch all gists
    console.log("📡 Fetching all gists...");
    const gists = await getGists(GITHUB_USERNAME);

    console.log(`✅ Gists fetched: ${gists.length} found`);

    if (gists.length === 0) {
      console.log("⚠️ No gists found for user");
      return;
    }

    // Ensure content directory exists
    ensureContentDirectory();

    // Process all gists with controlled concurrency
    const BATCH_SIZE = 5; // Process 5 gists at a time to avoid rate limiting
    const processedFiles: string[] = [];

    console.log(`🔄 Processing gists in batches of ${BATCH_SIZE}...`);

    for (let i = 0; i < gists.length; i += BATCH_SIZE) {
      const batch = gists.slice(i, i + BATCH_SIZE);
      const batchNumber = Math.floor(i / BATCH_SIZE) + 1;
      const totalBatches = Math.ceil(gists.length / BATCH_SIZE);

      console.log(
        `\n📦 Processing batch ${batchNumber}/${totalBatches} (${batch.length} gists)`
      );

      const batchPromises = batch.map((gist) => processGist(gist));
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
      if (i + BATCH_SIZE < gists.length) {
        console.log("⏳ Waiting 1 second before next batch...");
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    console.log("\n🎉 Process completed!");
    console.log(
      `📊 Successfully processed ${processedFiles.length} out of ${gists.length} gists`
    );

    if (processedFiles.length > 0) {
      console.log("📝 Created files:");
      for (const file of processedFiles) {
        console.log(`   - ${file}`);
      }
    }
  } catch (error) {
    console.error("❌ Fatal error in fetchGistsAndCreateMDXFiles:", error);
    process.exit(1);
  }
}

/**
 * Main execution
 */
async function main(): Promise<void> {
  console.log("🔥 Gist MDX Generator Starting...");
  console.log("=".repeat(50));

  try {
    await fetchGistsAndCreateMDXFiles();
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

export { fetchGistsAndCreateMDXFiles };
