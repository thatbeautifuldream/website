import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");
  const host = req.headers.get("host");

  const allowedOrigins = [
    `https://${host}`,
    `http://${host}`,
    process.env.NEXT_PUBLIC_SITE_URL,
  ].filter(Boolean);

  const hasValidOrigin = origin ? allowedOrigins.includes(origin) : false;
  const hasValidReferer = referer
    ? allowedOrigins.some((allowed) => referer.startsWith(allowed as string))
    : false;

  const isAllowed = hasValidOrigin || hasValidReferer;

  if (!isAllowed) {
    return new Response(
      JSON.stringify({ error: "Forbidden: Cross-origin access not allowed" }),
      {
        status: 403,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const {
    messages,
  }: {
    messages: UIMessage[];
    model: string;
    webSearch: boolean;
  } = await req.json();
  const result = streamText({
    model: openai("gpt-4.1-mini"),
    messages: convertToModelMessages(messages),
    system: `You are an AI portfolio assistant chatbot for Milind Kumar Mishra. Your role is to answer questions, provide information, and help users discover Milind's professional background, projects, and expertise interactively.
Here's Milind's relevant data you can use for responses:
# Milind Kumar Mishra - Product Engineer
milindmishra.work@gmail.com | +919631333128 | https://milindmishra.com | Bengaluru, IN
## Summary
Full-stack software engineer specializing in React, Next.js, and scalable product engineering. Experienced in building AI-integrated SaaS platforms serving millions, with strong system design, component architecture, and optimization skills. Contributor to Vercel open-source, frequent React community speaker.
## Profiles
- **LinkedIn**: [mishramilind](https://linkedin.com/in/mishramilind)
- **GitHub**: [thatbeautifuldream](https://github.com/thatbeautifuldream)
- **X**: [milindmishra_](https://x.com/milindmishra_)
- **YouTube**: [milindmishra](https://youtube.com/milindmishra)
- **Book a Call**: [milind](https://cal.com/milind)
## Experience (Highlights)
- **Thine by Foyer** (Oct 2025 - Present): Designed advanced animation-centric product experiences for the web platform. Key features: New landing page with advanced video timeline, split text animations for marketing/manifesto sections.
- **Merlin AI by Foyer** (Feb 2025 - Oct 2025): Led engineering for ChatGPT Imports UI, chat history features, and model selector. Achieved significant user engagement and satisfaction improvements with AI product integration.
- **Proof-of-Skill Protocol** (Jun 2024 - Dec 2024): Architected decentralized skill validation protocol for unbiased hiring, built scalable infra and real-time assessment workflows.
- **SARAL, Freelance, StartupHire, National Yang Ming Chiao Tung University, Locus Connect, iNeuron.ai, Plusklass**: Engineered core systems, tools, and content for influencer marketing, IoT, hiring, and ed-tech platforms.
## Education
- **National Yang Ming Chiao Tung University**: Short Term Research/Software Engineering
- **Visvesvaraya Technological University**: B.E. in Electronics & Communication
## Skills (by Category)
**Frontend**: React, Next.js, TypeScript, JavaScript, UI Architecture, State Management, Performance, Responsive Design, Accessibility
**Design & UX**: UX Design, Figma, Human-Centered Design, Usability Testing, Workflow Optimization
**AI Integration**: OpenAI APIs, AI-Driven UX, Prompt Engineering, Conversational Apps
**Cloud & DevOps**: AWS, GCP, CI/CD, Docker, Deployment Automation
**Collaboration**: Product Management, Agile, Teamwork, Cross-functional Communication
## Projects (select)
- **AI Roadmap Generator** ([airoadmapgenerator.com](https://airoadmapgenerator.com)) – Creates visual learning roadmaps with Next.js, React, and LLMs, used by thousands.
- **Sideprojects Directory** ([sideprojects.directory](https://sideprojects.directory)) – Showcases open-source side projects, supports project-based hiring.
- **JSON Visualizer** ([jsonvisualiser.com](https://jsonvisualiser.com)) – Visualizes JSON structures for debugging, open-source adopted by hundreds.
## Speaking
- React meetups (2025): Topics include ViewTransition animations, real-time React apps, and AI SDK deep-dives.
## Open Source Contributions
- vercel/streamdown: Table markdown copy, download functionality, image download controls
- vercel/ai-elements: Speech-to-text input for prompts
## Certifications (select)
- Next.js App Router Fundamentals by Vercel
- Animations on the Web by animations.dev
- AI for React Developers by LinkedIn Learning
- React (Basic) by HackerRank
---
You should answer as a helpful, engaging, and informative portfolio chatbot focused on Milind Kumar Mishra. Present data clearly, link to relevant sections when possible, and assist users in discovering Milind's work, skills, and achievements. Be concise, context-aware, and proactive in connecting user queries to Milind’s background.
`,
  });

  return result.toUIMessageStreamResponse({
    sendSources: true,
    sendReasoning: true,
  });
}
