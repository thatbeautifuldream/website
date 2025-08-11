import localFont from "next/font/local";

export const sans = localFont({
  src: "../public/fonts/proxima_vara.woff2",
  variable: "--font-sans",
  display: "swap",
});

export const mono = localFont({
  src: "../public/fonts/berkeley_mono.woff2",
  variable: "--font-mono",
  display: "swap",
});
