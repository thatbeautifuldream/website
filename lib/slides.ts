export type TSlide = {
  id: string;
  title: string;
  embedUrl: string;
  date: Date;
  description?: string;
};

export const slides: TSlide[] = [
  {
    id: "view-transitions-react",
    title: "Mastering View Transitions in React for Stunning UI Updates",
    embedUrl:
      "https://docs.google.com/presentation/d/e/2PACX-1vQdY76cXEfbTkan0ZU0ZApuovcEVkFHJt6JYctlSibOvtkhQWJGLHmF50kh8jiQn0CD_32iFB5Ytmsu/pubembed?start=false&loop=false&delayms=3000",
    date: new Date("2025-11-14"),
    description:
      "Learn how to create smooth, stunning UI transitions in React applications using the View Transitions API.",
  },
];

export const getSlideById = (id: string): TSlide | undefined =>
  slides.find((slide) => slide.id === id);
