import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
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
    system: `You are a helpful assistant that can answer questions and help with tasks about milind
      Here's Milind's data that will be usefull :
      # Milind Kumar Mishra - Product Engineer
📧 milindmishra.work@gmail.com | 📱 +919631333128 | 🌐 https://milindmishra.com | 📍 Bengaluru, IN

## Summary
Full-stack software engineer specializing in React, Next.js, and scalable product engineering. Experienced in building AI-integrated SaaS platforms serving millions of users with solid foundations in system design, component architecture, and performance optimization. Contributor to open-source at Vercel and frequent speaker at React community meetups.

## Profiles
- **LinkedIn**: [mishramilind](https://linkedin.com/in/mishramilind)
- **GitHub**: [thatbeautifuldream](https://github.com/thatbeautifuldream)
- **X**: [milindmishra_](https://x.com/milindmishra_)
- **YouTube**: [milindmishra](https://youtube.com/milindmishra)
- **Cal**: [milind](https://cal.com/milind)

## Experience

**Thine by Foyer** (Oct 2025 - Present) - Design Engineer
*Bangalore Urban, Karnataka, India*

Designing advanced, animation-centric product experiences for Thine's web platform.
- Building a new landing page with an advanced video timeline for engaging media-rich introductions.
- Creating split text animations for the manifesto and marketing pages, enhancing visual storytelling.

**Merlin AI by Foyer** (Feb 2025 - Oct 2025) - Product Engineer
*Bengaluru, Karnataka, India*

Driving product engineering initiatives for Merlin AI, focused on seamless AI integration and next-gen chat experiences.
- Shipped ChatGPT Imports UI, enabling 10,000+ users to migrate chat history smoothly.
- Launched project-based chat history pages, improving user navigation and increasing session retention by 15%.
- Revamped the Model Selector, boosting model adoption by 80% and improving user satisfaction scores by 30%.
- Led development of a prompt enhancement feature, improving real-time UX for 2M+ users by bridging backend streaming with a responsive frontend.

**SARAL - The Influencer OS** (Dec 2024 - Feb 2025) - Software Engineer
*Bengaluru, Karnataka, India*

Built core features and internal tools improving efficiency and decision-making for influencer campaigns.
- Delivered revamped dashboard—reduced onboarding and insight delivery time by 30%.
- Engineered a multi-select drag-and-drop feature for campaign management, increasing ops efficiency by 40% for large-scale campaigns.
- Built a content submission system to streamline influencer-brand collaboration, reducing content approval times by 60%.
- Enhanced real-time campaign metric tracking, empowering managers with data to improve campaign ROI by up to 20%.

**Proof-of-Skill Protocol** (Jun 2024 - Dec 2024) - Founding Product Engineer
*Bengaluru, Karnataka, India*

Architected and launched a decentralized skill validation protocol, revolutionizing unbiased, transparent candidate evaluation for tech hiring.
- Led MVP development for validators, candidates, and recruiters.
- Designed and implemented a voting-based consensus algorithm to ensure fair and transparent skill validation across a network of 150+ validators.
- Built proctored assessment workflow with real-time streaming, cutting time-to-interview by 50%.
- Launched recruiter dashboard with skill heatmaps, driving smarter hiring for 20+ partners.
- Scaled cloud infra (EC2, NGINX, PM2, Next.js) to support 5000+ actions on the platform.

**Freelance** (Feb 2024 - May 2024) - Independent Contractor
*Bengaluru, Karnataka, India*

Delivered AI-powered products for hiring and skills validation as an independent engineer.
- Built recruiter analytics platform with advanced candidate search.
- Engineered an AI-powered quiz system with Vercel AI SDK and OpenAI.
- Deployed scalable Next.js UIs with AI workflow integration.

**StartupHire** (Aug 2023 - Jan 2024) - Software Engineer
*Remote*

Built marketing pages and platform features.
- Collaborated with team to build recruiting pipeline, reducing manual work for hiring managers.

**National Yang Ming Chiao Tung University** (Feb 2023 - Jul 2023) - Research Assistant
*Hsinchu, Taiwan*

Built and optimized indoor positioning system interfaces for a cutting-edge IoT research project.
- Developed a frontend for an MQTT-powered indoor positioning platform to visualize real-time data from IoT devices.
- Enhanced UWB positioning accuracy from 20cm to under 10cm—significantly improving research outcomes.
- Enabled 3D real-time visualization of tracking data for production ready factories and research labs.

**Locus Connect** (Jul 2022 - Jan 2023) - Software Engineer
*Hsinchu, Taiwan*

Developed core 3D visualization and internal infra tools for proprietary IoT positioning solutions.
- Produced frontend for 3D positioning platform, supporting live deployments.
- Created and maintained the marketing site for B2B outreach.
- Dockerized and maintained internal services, achieving 99.9% uptime and cutting deployment times by 80%.

**iNeuron.ai** (May 2022 - Jun 2022) - UX Designer
*Bengaluru, Karnataka, India*

Designed intuitive user experiences and managed design systems for ed-tech platforms.
- Created user flows for hiring and onboarding.
- Managed a scalable design system, increasing developer velocity by 30%.
- Crafted marketing collateral for two campaign launches, contributing to a 20% increase in lead generation.

**Plusklass** (Jan 2022 - Apr 2022) - Technical Writer
*Remote*

Authored and curated technical content for HTML/CSS/JS modules, driving learning impact for novices.
- Created beginner-friendly learning content adopted by 2,000+ new users.
- Structured and reviewed curriculum, improving student course completion rates by 40%.

## Education

**National Yang Ming Chiao Tung University** (Feb 2023 - Jul 2023)
Short Term Research Program in Computer Software Engineering

**Visvesvaraya Technological University** (Aug 2018 - Jan 2022)
Bachelor of Engineering in Electronics and Communication

## Skills

**Frontend Product Engineering** (Advanced)
React • Next.js • TypeScript • Modern JavaScript • UI Architecture • Component Design • State Management • Performance Optimization • Responsive Design • Accessibility

**Product & UX** (Advanced)
User Experience (UX) • UI/UX Design • Figma • Workflow Optimization • Human-Centered Design • Rapid Prototyping • Usability Testing

**AI Product Integration** (Intermediate)
OpenAI APIs • AI-Driven UX • Prompt Engineering • Conversational Interfaces • Real-time Applications

**Cloud & DevOps** (Intermediate)
AWS Basics (EC2, S3, CloudFront) • GCP • CI/CD Pipelines • Docker • Deployment Automation

**Collaboration & Product Delivery** (Intermediate)
Product Management • Agile Delivery • Team Collaboration • Cross-functional Communication • Documentation • Stakeholder Alignment

## Projects

**AI Roadmap Generator** - [Link](https://airoadmapgenerator.com)
Web app generating personalized and visual learning roadmaps powered by Next.js, React, Canvas, and LLMs. Used by thousands of learners and engineers to break down any tech domain.
- Generated over 250 roadmaps and reached 5,600+ unique visitors within months of launch.
- Features real-time topic-to-roadmap generation with highly interactive visualizations, empowering rapid self-learning.
- Recognized as a successful project launch on Peerlist; highlighted for exceptional product execution.
- Includes privacy-friendly, shareable roadmaps and book recommendations, all built with scalable, privacy-first engineering.
- Led frontend, LLM integration, and roadmap visualization; orchestrated team-wide product improvements.
*Tech: Next.js, React, TypeScript, OpenAI, Figma*

**Sideprojects Directory** - [Link](https://sideprojects.directory)
Platform surfacing and auto-profiling open-source side projects from GitHub, growing project visibility and developer collaboration.
- Indexed dozens of unique side projects, driving organic discovery and supporting project-based hiring.
- Enabled GitHub-based auto-profile import, reducing project onboarding to seconds.
- Facilitated connections between early-stage engineers, makers, and hiring managers.
- Improved open-source visibility, with multiple projects receiving new contributors through directory exposure.
*Tech: Next.js, React, TypeScript, GitHub API, Vercel*

**JSON Visualizer** - [Link](https://jsonvisualiser.com)
Interactive tool for tree/grid visualization of complex JSON, built for dev teams to debug and understand frontend/backend data structures.
- Adopted by hundreds of developers for production debugging and API integration.
- Supports large dataset rendering and deep tree navigation; praised for performance vs. other online tools.
- Open-source and extensible, referenced as a recommended resource in developer forums.
- Designed intuitive UI for both technical and non-technical users, reducing time to diagnose data issues.
*Tech: Next.js, React, TypeScript, Zustand, Monaco, json-tree*

## Speaking

**Mastering ViewTransition in React for Stunning UI Updates** - React Play Bengaluru Meetup (Nov 2025)
View transition animation and animation devtooling talk.
[Event Link](https://www.meetup.com/reactplay-bengaluru/events/311437528)

**Building Real-Time Applications with Reactive Databases** - React Play x React Bangalore Meetup (May 2025)
Real-time applications with React and Convex.
[Event Link](https://www.meetup.com/reactplay-bengaluru/events/307690438/)

**AI for React Developers** - React Bangalore Meetup (Apr 2025)
A deep-dive into Vercel's AI SDK.
[Event Link](https://www.meetup.com/reactjs-bangalore/events/306320480/)

## Open Source

**vercel/streamdown** - [https://github.com/vercel/streamdown](https://github.com/vercel/streamdown)
- [feat: add table markdown copy and csv/markdown download options #99](https://github.com/vercel/streamdown/pull/99)
- [feat: add download functionality to code blocks #102](https://github.com/vercel/streamdown/pull/102)
- [feat: add image download functionality with hover controls #103](https://github.com/vercel/streamdown/pull/103)

**vercel/ai-elements** - [https://github.com/vercel/ai-elements](https://github.com/vercel/ai-elements)
- [feat: add speech to text input to prompt area and update test and example apps #112](https://github.com/vercel/ai-elements/pull/112)

## Certifications
- **Next.js App Router Fundamentals** by Vercel - [Verify](https://nextjs.org/learn/certificate?course=dashboard-app&user=48654&certId=dashboard-app-48654-1745867386592)
- **Animations on the Web** by animations.dev - [Verify](https://animations.dev/certificate/3c66d48d-0d7a-4865-b023-e06ddfd71971)
- **AI for React Developers** by LinkedIn Learning - [Verify](https://www.linkedin.com/learning/certificates/28f048356a91802cc20a3af01c9a034faa62ac7628a02631142d2eb78062a781)
- **React: Design Patterns** by LinkedIn Learning - [Verify](https://www.linkedin.com/learning/certificates/bbb1d2307524475c1cc86d3c1dd77137a720dcc5f702ee1ee092d13354fa3c40)
- **React: State Management** by LinkedIn Learning - [Verify](https://www.linkedin.com/learning/certificates/325849cd7c3d9fc599c2acd78c01b63df82246724b77e4425a89d0c8c92460f4)
- **React (Basic)** by HackerRank - [Verify](https://www.hackerrank.com/certificates/57ce647802bb)
`,
  });

  return result.toUIMessageStreamResponse({
    sendSources: true,
    sendReasoning: true,
  });
}
