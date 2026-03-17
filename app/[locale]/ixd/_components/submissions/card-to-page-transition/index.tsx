/** biome-ignore-all lint/performance/noImgElement: its ok */
'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

type TLongDescription = {
  title: string;
  description: string;
};

type TCard = {
  cardTitle: string;
  image: string;
  longDescription: TLongDescription[];
};

function Card({
  card,
  setActiveCard,
}: {
  card: TCard;
  setActiveCard: (c: TCard) => void;
}) {
  return (
    <motion.div
      className="relative h-[370px] w-[320px] cursor-pointer select-none overflow-hidden rounded-[20px] outline-none"
      layoutId={`card-${card.cardTitle}`}
      onClick={() => setActiveCard(card)}
      whileTap={{ scale: 0.98 }}
    >
      <motion.img
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        layoutId={`image-${card.cardTitle}`}
        src={card.image}
      />

      <motion.button
        aria-hidden
        className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-full bg-primary-foreground/20 text-primary opacity-0 backdrop-blur-md"
        layoutId={`close-button-${card.cardTitle}`}
        tabIndex={-1}
      >
        <svg
          className="stroke-current"
          height="20"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 18 18 6M6 6l12 12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.button>

      <motion.div
        className="absolute right-0 bottom-0 left-0"
        layoutId={`card-content-${card.cardTitle}`}
      >
        <div className="px-4 pb-3">
          <motion.h2
            className="mb-1 max-w-[160px] text-left font-extrabold text-[40px] text-white uppercase leading-[0.9]"
            layoutId={`card-heading-${card.cardTitle}`}
          >
            {card.cardTitle}
          </motion.h2>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-full flex-1 p-4 text-muted-foreground opacity-0"
        layoutId={`card-long-description-${card.cardTitle}`}
      >
        <p>
          <b className="font-semibold text-black">
            {card.longDescription[0].title}
          </b>{' '}
          {card.longDescription[0].description}
        </p>
        <p>
          <b className="font-semibold text-black">
            {card.longDescription[1].title}
          </b>{' '}
          {card.longDescription[1].description}
        </p>
      </motion.div>
    </motion.div>
  );
}

function ActiveCard({
  activeCard,
  setActiveCard,
}: {
  activeCard: TCard;
  setActiveCard: (c: TCard | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Fix: use correct type for useOnClickOutside (HTMLElement, not HTMLDivElement | null)
  useOnClickOutside(ref as React.RefObject<HTMLElement>, () =>
    setActiveCard(null)
  );

  return (
    <motion.div
      className="absolute top-0 flex h-full w-[360px] flex-col bg-primary"
      layoutId={`card-${activeCard.cardTitle}`}
      ref={ref}
    >
      <div className="relative h-[430px] w-[360px]">
        <motion.img
          alt=""
          className="pointer-events-none h-full w-full object-cover"
          layoutId={`image-${activeCard.cardTitle}`}
          src={activeCard.image}
        />
        <motion.button
          aria-label="Close button"
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20 text-primary backdrop-blur-md"
          layoutId={`close-button-${activeCard.cardTitle}`}
          onClick={() => setActiveCard(null)}
        >
          <svg
            className="stroke-current"
            height="20"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 18 18 6M6 6l12 12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
        <motion.div
          className="absolute right-0 bottom-0 left-0"
          layoutId={`card-content-${activeCard.cardTitle}`}
        >
          <div className="px-4 pb-3">
            <motion.h2
              className="mb-1 max-w-[160px] font-extrabold text-[40px] text-white uppercase leading-[0.9]"
              layoutId={`card-heading-${activeCard.cardTitle}`}
            >
              {activeCard.cardTitle}
            </motion.h2>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="flex-1 overflow-auto p-4 text-primary-foreground/70 leading-relaxed"
        layoutId={`card-long-description-${activeCard.cardTitle}`}
      >
        <p className="mb-4">
          <b className="font-semibold text-primary-foreground">
            {activeCard.longDescription[0].title}
          </b>{' '}
          {activeCard.longDescription[0].description}
        </p>
        <p>
          <b className="font-semibold text-primary-foreground">
            {activeCard.longDescription[1].title}
          </b>{' '}
          {activeCard.longDescription[1].description}
        </p>
      </motion.div>
    </motion.div>
  );
}

export function CardToPageTransition() {
  const [activeCard, setActiveCard] = useState<TCard | null>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActiveCard(null);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className="relative flex h-[675px] w-full flex-col items-center justify-center">
      {CARDS.map((card) => (
        <Card card={card} key={card.cardTitle} setActiveCard={setActiveCard} />
      ))}
      {/* <AnimatePresence>
        {activeCard ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/20"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          />
        ) : null}
      </AnimatePresence> */}
      <AnimatePresence>
        {activeCard ? (
          <ActiveCard activeCard={activeCard} setActiveCard={setActiveCard} />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

const CARDS: TCard[] = [
  {
    cardTitle: 'That beautiful dream',
    image: '/images/tbd.jpg',
    longDescription: [
      {
        title: 'It’s always been a dream—',
        description:
          'to become skilled, capable, and independent. To earn not just a living, but respect, and to give our parents countless reasons to feel proud.',
      },
      {
        title: 'The journey never ends.',
        description:
          'With relentless drive, we push further, guided by respect and determination, aiming higher, knowing every step brings us closer to the best version of ourselves.',
      },
    ],
  },
];
