import { Geist, Geist_Mono, Instrument_Sans } from "next/font/google";

export const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});

export const sans = {
  instrumentSans,
};

export const mono = {
  geistMono,
};

export const serif = {
  geist,
};
