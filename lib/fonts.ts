import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";

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

export const googleSansFlex = localFont({
  src: "../public/font/GoogleSansFlex-VariableFont_GRAD,ROND,opsz,slnt,wdth,wght.ttf",
  variable: "--font-google-sans-flex",
});

export const sans = {
  geist,
  googleSansFlex,
};

export const mono = {
  geistMono,
};

export const serif = {
  instrumentSerif,
};
