import { Bricolage_Grotesque, Geist_Mono } from 'next/font/google';

export const sans = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const mono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});
