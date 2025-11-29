import type { TProject } from "@/components/projects";

export const PROJECTS: TProject[] = [
  {
    slug: "thine-landing",
    title: "Thine's Landing",
    description:
      "Thine is your thoughtful companion that listens between the lines, responds with deep understanding of your life, and gently nudges you toward the life you're building.Thine is your thoughtful companion that listens between the lines, responds with deep understanding of your life, and gently nudges you toward the life you're building.",
    externalUrl: "https://www.thine.com",
    video: "https://cdn.milind.app/media/projects/thine.webm",
    date: new Date("2025-11-01"),
    tags: ["Tanstack Start", "Tailwind CSS", "Framer Motion", "CSS Animation"],
  },
  {
    slug: "merlin-projects",
    title: "Merlin Projects",
    description:
      "Projects is an AI-powered knowledge base that streamlines how you collect, organize, and get insights from all kinds of content—web links, notes, PDFs, and more—building a personal library for efficient knowledge management.",
    externalUrl: "https://www.getmerlin.in/chat/projects",
    video: "https://cdn.milind.app/media/projects/merlin-projects.webm",
    date: new Date("2025-08-01"),
    tags: ["Next.js", "React Query", "LLMs", "RAG"],
  },
  {
    slug: "json-visualizer",
    title: "JSON Visualizer",
    description:
      "Interactive tool for tree/grid visualization of complex JSON, built for dev teams to debug and understand frontend/backend data structures.",
    externalUrl: "https://jsonvisualiser.com",
    video: "https://cdn.milind.app/media/projects/json-visualiser.webm",
    githubUrl: "https://github.com/thatbeautifuldream/json-visualizer",
    date: new Date("2024-10-01"),
    tags: ["React", "TypeScript", "D3.js"],
  },
  {
    slug: "ai-roadmap-generator",
    title: "AI Roadmap Generator",
    description:
      "Web app generating personalized and visual learning roadmaps powered by Next.js, React, Canvas, and LLMs. Used by thousands of learners and engineers to break down any tech domain.",
    externalUrl: "https://airoadmapgenerator.com",
    video: "https://cdn.milind.app/media/projects/ai-roadmap-generator.webm",
    githubUrl: "https://github.com/thatbeautifuldream/ai-roadmap-generator",
    date: new Date("2024-08-01"),
    tags: ["React", "Next.js", "TypeScript", "Canvas", "LLMs"],
  },
];
