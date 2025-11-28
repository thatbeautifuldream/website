import type { TProject } from "@/components/projects";

export const PROJECTS: TProject[] = [
  {
    slug: "ai-roadmap-generator",
    title: "AI Roadmap Generator",
    description:
      "Web app generating personalized and visual learning roadmaps powered by Next.js, React, Canvas, and LLMs. Used by thousands of learners and engineers to break down any tech domain.",
    externalUrl: "https://airoadmapgenerator.com",
    image:
      "https://raw.githubusercontent.com/thatbeautifuldream/cdn/refs/heads/main/media/projects/ai-roadmap-generator.webp",
    githubUrl: "https://github.com/thatbeautifuldream/ai-roadmap-generator",
    date: new Date("2024-08-01"),
    tags: ["React", "Next.js", "TypeScript", "Canvas", "LLMs"],
  },
  {
    slug: "json-visualizer",
    title: "JSON Visualizer",
    description:
      "Interactive tool for tree/grid visualization of complex JSON, built for dev teams to debug and understand frontend/backend data structures.",
    externalUrl: "https://jsonvisualiser.com",
    image:
      "https://raw.githubusercontent.com/thatbeautifuldream/cdn/refs/heads/main/media/projects/json-visualiser.webp",
    githubUrl: "https://github.com/thatbeautifuldream/json-visualizer",
    date: new Date("2024-08-01"),
    tags: ["React", "TypeScript", "D3.js"],
  },
];
