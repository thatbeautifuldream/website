import localFont from "next/font/local";

const proximaVara = localFont({
  src: "../public/fonts/proxima_vara.woff2",
  variable: "--font-proxima-vara",
  display: "swap",
});

const fkGrotesk = localFont({
  src: "../public/fonts/fk_grotesk.woff2",
  variable: "--font-fk-grotesk",
  display: "swap",
});

const fkGroteskNeue = localFont({
  src: "../public/fonts/fk_grotesk_neue.woff2",
  variable: "--font-fk-grotesk-neue",
  display: "swap",
});

const berkeleyMono = localFont({
  src: "../public/fonts/berkeley_mono.woff2",
  variable: "--font-berkeley-mono",
  display: "swap",
});

const ppEditorialNew = localFont({
  src: "../public/fonts/pp_editorial_new_variable.woff2",
  variable: "--font-pp-editorial-new",
  display: "swap",
});

export const sans = {
  proximaVara,
  fkGrotesk,
  fkGroteskNeue,
};

export const mono = {
  berkeleyMono,
};

export const serif = {
  ppEditorialNew,
};
