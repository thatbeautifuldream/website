import Fuse, { type IFuseOptions } from "fuse.js";
import { social } from "./social";

export type TCommandAction = {
  id: string;
  label: string;
  description?: string;
  shortcut?: string[];
  href?: string;
  action?: () => void | Promise<void>;
  keywords?: string[];
  external?: boolean;
};

export type TCommandCategory = {
  id: string;
  label: string;
  actions: TCommandAction[];
};

export type TCommandPaletteConfig = {
  categories: TCommandCategory[];
  shortcuts: {
    open: string[];
    close: string[];
  };
};

const navigationActions: TCommandAction[] = [
  {
    id: "nav-home",
    label: "Go to Home",
    description: "Navigate to the homepage",
    href: "/",
    keywords: ["home", "main", "index"],
  },
  {
    id: "nav-about",
    label: "Go to About",
    description: "Learn more about me",
    href: "/about",
    keywords: ["about", "bio", "info"],
  },
  {
    id: "nav-work",
    label: "Go to Work",
    description: "View my work experience",
    href: "/work",
    keywords: ["work", "experience", "jobs", "career"],
  },
  {
    id: "nav-projects",
    label: "Go to Projects",
    description: "Check out my projects",
    href: "/projects",
    keywords: ["projects", "portfolio", "work", "builds"],
  },
  {
    id: "nav-blog",
    label: "Go to Blog",
    description: "Read my latest blog posts",
    href: "/blog",
    keywords: ["blog", "articles", "posts", "writing"],
  },
  {
    id: "nav-gist",
    label: "Go to Gist",
    description: "Browse my code snippets and gists",
    href: "/gist",
    keywords: ["gist", "snippets", "code", "examples"],
  },
];

const analyticsActions: TCommandAction[] = [
  {
    id: "analytics-wakatime",
    label: "View WakaTime Stats",
    description: "Check my coding activity and time tracking",
    href: "/wakatime",
    keywords: ["wakatime", "coding", "stats", "time", "activity"],
  },
  {
    id: "analytics-spotify",
    label: "View Spotify Activity",
    description: "See what I'm currently listening to",
    href: "/spotify",
    keywords: ["spotify", "music", "listening", "now playing"],
  },
  {
    id: "analytics-presence",
    label: "View Discord Presence",
    description: "Check my Discord status and activity",
    href: "/presence",
    keywords: ["discord", "presence", "status", "activity"],
  },
  {
    id: "analytics-youtube",
    label: "View YouTube Stats",
    description: "Check my YouTube channel analytics",
    href: "/youtube",
    keywords: ["youtube", "videos", "channel", "content"],
  },
];

const socialActions: TCommandAction[] = [
  {
    id: "social-github",
    label: "Open GitHub Profile",
    description: "Visit my GitHub profile",
    href: social.github.href,
    external: true,
    keywords: ["github", "code", "repositories", "open source"],
  },
  {
    id: "social-twitter",
    label: "Open X (Twitter) Profile",
    description: "Follow me on X/Twitter",
    href: social.x.href,
    external: true,
    keywords: ["twitter", "x", "social", "tweets"],
  },
  {
    id: "social-linkedin",
    label: "Open LinkedIn Profile",
    description: "Connect with me on LinkedIn",
    href: social.linkedin.href,
    external: true,
    keywords: ["linkedin", "professional", "network", "career"],
  },
  {
    id: "social-instagram",
    label: "Open Instagram Profile",
    description: "Follow me on Instagram",
    href: social.instagram.href,
    external: true,
    keywords: ["instagram", "photos", "social"],
  },
  {
    id: "social-youtube",
    label: "Open YouTube Channel",
    description: "Subscribe to my YouTube channel",
    href: social.youtube.href,
    external: true,
    keywords: ["youtube", "videos", "subscribe", "channel"],
  },
];

const toolsActions: TCommandAction[] = [
  {
    id: "tool-resume",
    label: "View Resume",
    description: "Open my interactive resume",
    href: "https://resume.milind.app",
    external: true,
    keywords: ["resume", "cv", "experience"],
  },
  {
    id: "tool-json-visualizer",
    label: "JSON Visualizer",
    description: "Open my JSON visualization tool",
    href: "https://json.milind.app",
    external: true,
    keywords: ["json", "visualizer", "tool", "developer"],
  },
  {
    id: "tool-notes",
    label: "My Notes",
    description: "Access my digital notes",
    href: "https://notes.milind.app",
    external: true,
    keywords: ["notes", "documentation", "knowledge"],
  },
  {
    id: "tool-ai-roadmap",
    label: "AI Roadmap Generator",
    description: "Generate learning roadmaps with AI",
    href: "https://airoadmapgenerator.com",
    external: true,
    keywords: ["ai", "roadmap", "learning", "generator"],
  },
];

const contactActions: TCommandAction[] = [
  {
    id: "contact-email",
    label: "Send Email",
    description: "Get in touch via email",
    href: "mailto:milind@milind.app",
    external: true,
    keywords: ["email", "contact", "message"],
  },
  {
    id: "contact-guestbook",
    label: "Sign Guestbook",
    description: "Leave a message in my guestbook",
    href: "/guestbook",
    keywords: ["guestbook", "message", "sign", "visitor"],
  },
  {
    id: "contact-cal",
    label: "Schedule a Call",
    description: "Book a meeting with me",
    href: "https://cal.com/milindmishra",
    external: true,
    keywords: ["call", "meeting", "schedule", "calendar"],
  },
];

const createThemeActions = (
  setTheme?: (theme: string) => void
): TCommandAction[] => [
  {
    id: "theme-light",
    label: "Switch to Light Theme",
    description: "Use light color scheme",
    action: () => setTheme?.("light"),
    keywords: ["theme", "light", "bright"],
  },
  {
    id: "theme-dark",
    label: "Switch to Dark Theme",
    description: "Use dark color scheme",
    action: () => setTheme?.("dark"),
    keywords: ["theme", "dark", "night"],
  },
  {
    id: "theme-system",
    label: "Use System Theme",
    description: "Follow system preference",
    action: () => setTheme?.("system"),
    keywords: ["theme", "system", "auto"],
  },
];

const utilityActions: TCommandAction[] = [
  {
    id: "utility-copy-url",
    label: "Copy Current URL",
    description: "Copy the current page URL to clipboard",
    action: async () => {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
      }
    },
    keywords: ["copy", "url", "link", "share"],
  },
  {
    id: "utility-copy-email",
    label: "Copy Email Address",
    description: "Copy my email to clipboard",
    action: async () => {
      await navigator.clipboard.writeText("milind@milind.app");
    },
    keywords: ["copy", "email", "contact"],
  },
  {
    id: "utility-rss",
    label: "RSS Feed",
    description: "Subscribe to my blog RSS feed",
    href: "/feed.xml",
    keywords: ["rss", "feed", "subscribe", "blog"],
  },
];

export const createCommandConfig = (
  setTheme?: (theme: string) => void
): TCommandPaletteConfig => ({
  categories: [
    {
      id: "navigation",
      label: "Navigation",
      actions: navigationActions,
    },
    {
      id: "analytics",
      label: "Analytics & Stats",
      actions: analyticsActions,
    },
    {
      id: "social",
      label: "Social Media",
      actions: socialActions,
    },
    {
      id: "tools",
      label: "Tools & Projects",
      actions: toolsActions,
    },
    {
      id: "contact",
      label: "Contact & Interaction",
      actions: contactActions,
    },
    {
      id: "theme",
      label: "Theme & UI",
      actions: createThemeActions(setTheme),
    },
    {
      id: "utility",
      label: "Utilities",
      actions: utilityActions,
    },
  ],
  shortcuts: {
    open: ["cmd+k", "ctrl+k"],
    close: ["escape"],
  },
});

export const getAllActions = (
  config: TCommandPaletteConfig
): TCommandAction[] => {
  return config.categories.flatMap((category) => category.actions);
};

const fuseOptions: IFuseOptions<TCommandAction> = {
  keys: [
    {
      name: "label",
      weight: 0.4,
    },
    {
      name: "description",
      weight: 0.3,
    },
    {
      name: "keywords",
      weight: 0.3,
    },
  ],
  threshold: 0.4,
  distance: 100,
  minMatchCharLength: 1,
  includeScore: true,
  ignoreLocation: true,
  findAllMatches: true,
  shouldSort: true,
};

export const searchActions = (
  actions: TCommandAction[],
  query: string
): TCommandAction[] => {
  if (!query.trim()) {
    return actions;
  }

  const fuse = new Fuse(actions, fuseOptions);
  const results = fuse.search(query);

  return results.map((result) => result.item);
};
