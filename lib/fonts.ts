import { Geist, Geist_Mono } from "next/font/google";

export const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});
