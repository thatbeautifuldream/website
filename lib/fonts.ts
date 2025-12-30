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
  src: [
    {
      path: "../public/font/GoogleSansFlex_24pt-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/font/GoogleSansFlex_24pt-ExtraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/font/GoogleSansFlex_24pt-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/font/GoogleSansFlex_24pt-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/font/GoogleSansFlex_24pt-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/font/GoogleSansFlex_24pt-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/font/GoogleSansFlex_24pt-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/font/GoogleSansFlex_24pt-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/font/GoogleSansFlex_24pt-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-google-sans-flex",
  display: "swap",
  preload: true,
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
