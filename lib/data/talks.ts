import type { TTalk } from "@/components/talks";

export const TALKS: TTalk[] = [
  {
    slug: "view-transition-react",
    event: "React Play Bengaluru Meetup",
    date: new Date("2025-11-15"),
    title: "Mastering ViewTransition in React for Stunning UI Updates",
    url: "https://www.meetup.com/reactplay-bengaluru/events/311437528",
    description: "View transition animation and animation devtooling talk.",
    image: "https://cdn.milind.app/media/talks/view-transition-react.webp",
  },
  {
    slug: "realtime-reactive-databases",
    event: "React Play x React Bangalore Meetup",
    date: new Date("2025-05-17"),
    title: "Building Real-Time Applications with Reactive Databases",
    url: "https://www.meetup.com/reactplay-bengaluru/events/307690438/",
    description: "Real-time applications with React and Convex.",
    image:
      "https://cdn.milind.app/media/talks/realtime-reactive-databases.webp",
  },
  {
    slug: "ai-react-developers",
    event: "React Bangalore Meetup",
    date: new Date("2025-04-12"),
    title: "AI for React Developers",
    url: "https://www.meetup.com/reactjs-bangalore/events/306320480/",
    description: "A deep-dive into Vercel's AI SDK.",
    image: "https://cdn.milind.app/media/talks/ai-react-developers.webp",
  },
];
