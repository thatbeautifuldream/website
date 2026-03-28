import {
  Familjen_Grotesk,
  Geist,
  Geist_Mono,
  Instrument_Serif,
} from "next/font/google";

export const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument-serif",
});

export const familjenGrotesk = Familjen_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const sans = {
  geist,
  familjenGrotesk,
};

export const mono = {
  geistMono,
};

export const serif = {
  instrumentSerif,
};
