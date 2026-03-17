import type { Locale } from './config';

type NavigationDictionary = {
  home: string;
  talk: string;
  work: string;
  project: string;
  blog: string;
  wakatime: string;
  spotify: string;
};

type FooterDictionary = {
  scratchpad: string;
  sourceCode: string;
};

type CommonDictionary = {
  publishedOn: string;
  presentedAt: string;
  event: string;
  viewOnGitHub: string;
  returnHome: string;
  checkBlog: string;
  language: string;
};

type SectionDictionary = {
  blogTitle: string;
  blogDescription: string;
  postTitle: string;
  postDescription: string;
  gistTitle: string;
  gistDescription: string;
  projectTitle: string;
  projectDescription: string;
};

type Dictionary = {
  navigation: NavigationDictionary;
  footer: FooterDictionary;
  common: CommonDictionary;
  sections: SectionDictionary;
};

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    navigation: {
      home: 'Home',
      talk: 'Talk',
      work: 'Work',
      project: 'Project',
      blog: 'Blog',
      wakatime: 'Wakatime',
      spotify: 'Spotify',
    },
    footer: {
      scratchpad: 'Welcome to my internet scratchpad.',
      sourceCode: 'source code',
    },
    common: {
      publishedOn: 'Published on',
      presentedAt: 'Presented at',
      event: 'Event',
      viewOnGitHub: 'View on GitHub',
      returnHome: 'Return Home',
      checkBlog: 'Check Blog ?',
      language: 'Language',
    },
    sections: {
      blogTitle: 'Blog',
      blogDescription: 'Learning Experiences.',
      postTitle: 'Posts',
      postDescription: 'Articles and thoughts.',
      gistTitle: 'Gists',
      gistDescription: 'Code snippets and quick solutions.',
      projectTitle: 'Project',
      projectDescription: "A collection of Milind's projects.",
    },
  },
  hi: {
    navigation: {
      home: 'होम',
      talk: 'टॉक्स',
      work: 'वर्क',
      project: 'प्रोजेक्ट',
      blog: 'ब्लॉग',
      wakatime: 'वाकाटाइम',
      spotify: 'स्पॉटिफ़ाइ',
    },
    footer: {
      scratchpad: 'मेरे इंटरनेट स्क्रैचपैड में आपका स्वागत है।',
      sourceCode: 'सोर्स कोड',
    },
    common: {
      publishedOn: 'प्रकाशित',
      presentedAt: 'प्रस्तुत किया गया',
      event: 'इवेंट',
      viewOnGitHub: 'GitHub पर देखें',
      returnHome: 'होम पर लौटें',
      checkBlog: 'ब्लॉग देखें ?',
      language: 'भाषा',
    },
    sections: {
      blogTitle: 'ब्लॉग',
      blogDescription: 'सीखने के अनुभव।',
      postTitle: 'पोस्ट्स',
      postDescription: 'लेख और विचार।',
      gistTitle: 'गिस्ट्स',
      gistDescription: 'कोड स्निपेट्स और त्वरित समाधान।',
      projectTitle: 'प्रोजेक्ट',
      projectDescription: 'मिलिंद के प्रोजेक्ट्स का संग्रह।',
    },
  },
};

export const getDictionary = (locale: Locale) => dictionaries[locale];

export type { Dictionary };
