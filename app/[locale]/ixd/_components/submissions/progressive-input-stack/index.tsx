'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import confetti from 'canvas-confetti';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useTheme } from 'next-themes';
import React from 'react';
import { Section } from '@/components/section';
import { Button } from '@/components/ui/button';
import type { TGuestbook } from '@/db/schema';
import { orpc } from '@/lib/orpc';

type StepKey = 'name' | 'message' | 'review';
const steps: StepKey[] = ['name', 'message', 'review'];

const spring = {
  type: 'spring' as const,
  stiffness: 500,
  damping: 40,
  mass: 0.6,
};
const fadeSlide = (dir: 1 | -1) => ({
  initial: { opacity: 0, y: dir * 8, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.24 } },
  exit: {
    opacity: 0,
    y: -dir * 8,
    scale: 0.98,
    transition: { duration: 0.18 },
  },
});

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: can work just for the submission
export function ProgressiveInputStack() {
  const queryClient = useQueryClient();
  const { theme } = useTheme();
  const [index, setIndex] = React.useState(0);
  const [name, setName] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [success, setSuccess] = React.useState(false);
  const prefersReduced = useReducedMotion();

  const triggerConfetti = React.useCallback(() => {
    if (prefersReduced) {
      return;
    }

    const confettiColor = theme === 'dark' ? '#ffffff' : '#000000';

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: [confettiColor],
    });
  }, [theme, prefersReduced]);

  const createEntryMutation = useMutation({
    ...orpc.guestbook.create.mutationOptions(),
    onSuccess: (newEntry: TGuestbook) => {
      queryClient.setQueryData(
        orpc.guestbook.list.queryKey({ input: { limit: 10, offset: 0 } }),
        (
          oldData:
            | {
                data: TGuestbook[];
                pagination: { limit: number; offset: number; total: number };
              }
            | undefined
        ) => {
          if (!oldData) {
            return {
              data: [newEntry],
              pagination: { limit: 10, offset: 0, total: 1 },
            };
          }
          return {
            ...oldData,
            data: [newEntry, ...oldData.data],
            pagination: {
              ...oldData.pagination,
              total: oldData.pagination.total + 1,
            },
          };
        }
      );
      setSuccess(true);
      triggerConfetti();
    },
  });

  const activeStep = steps[index];

  const nameRef = React.useRef<HTMLInputElement>(null);
  const messageRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    const t = setTimeout(() => {
      if (activeStep === 'name' && nameRef.current) {
        nameRef.current.focus();
        nameRef.current.select();
      }
      if (activeStep === 'message' && messageRef.current) {
        messageRef.current.focus();
        messageRef.current.select();
      }
    }, 150);
    return () => clearTimeout(t);
  }, [activeStep]);

  const canGoBack = index > 0 && !success; // prevent going back after successful sign
  const canAdvance =
    (activeStep === 'name' && name.trim().length > 1) ||
    (activeStep === 'message' && message.trim().length > 2) ||
    activeStep === 'review';

  function next() {
    if (!canAdvance) {
      return;
    }
    if (index < steps.length - 1) {
      setIndex((i) => i + 1);
    }
  }
  function back() {
    if (!canGoBack) {
      return;
    }
    setIndex((i) => i - 1);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (success) {
      return;
    }
    if (activeStep === 'name' && e.key === 'Enter') {
      e.preventDefault();
      next();
    }
    if (activeStep === 'message' && e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      next();
    }
  }

  function onSubmit() {
    if (!(name.trim() && message.trim())) {
      return;
    }
    createEntryMutation.mutate({ name: name.trim(), message: message.trim() });
  }

  return (
    <div className="flex size-full flex-col items-center gap-3 py-12">
      {!success && (
        <>
          <Section
            className="mx-auto flex w-full max-w-md flex-col gap-3"
            layout="position"
          >
            <AnimatePresence initial={false} mode="popLayout">
              {index >= 1 && (
                <motion.button
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  aria-label="Edit name"
                  className="w-full rounded-xl border border-border bg-card px-4 py-2 text-left text-foreground text-sm hover:bg-muted disabled:cursor-default disabled:opacity-60 disabled:hover:bg-card"
                  disabled={success}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  key="chip-name"
                  layout="position"
                  onClick={() => !success && setIndex(0)}
                  transition={spring}
                >
                  <span className="block font-medium text-foreground">
                    Name
                  </span>
                  <span className="block truncate text-muted-foreground">
                    {name || '—'}
                  </span>
                </motion.button>
              )}
              {index >= 2 && (
                <motion.button
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  aria-label="Edit message"
                  className="w-full rounded-xl border border-border bg-card px-4 py-2 text-left text-foreground text-sm hover:bg-muted disabled:cursor-default disabled:opacity-60 disabled:hover:bg-card"
                  disabled={success}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  key="chip-message"
                  layout="position"
                  onClick={() => !success && setIndex(1)}
                  transition={spring}
                >
                  <span className="block font-medium text-foreground">
                    Message
                  </span>
                  <span className="line-clamp-2 block text-muted-foreground">
                    {message || '—'}
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          </Section>

          <Section
            className="mx-auto flex w-full max-w-md flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-3 shadow-sm"
            layout="position"
          >
            <div>
              <motion.h2
                key={activeStep}
                {...(prefersReduced ? {} : fadeSlide(1))}
                aria-live="polite"
                className="font-medium text-muted-foreground text-sm"
              >
                {activeStep === 'name' && "What's your name?"}
                {activeStep === 'message' && 'Leave a short message'}
                {activeStep === 'review' && 'Review & sign'}
              </motion.h2>
            </div>

            <div className="flex flex-1 flex-col">
              <AnimatePresence initial={false} mode="wait">
                {activeStep === 'name' && (
                  <motion.div
                    key="step-name"
                    {...(prefersReduced ? {} : fadeSlide(1))}
                  >
                    <label className="sr-only" htmlFor="guest-name">
                      Your name
                    </label>
                    <input
                      autoComplete="name"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none ring-0 focus:border-muted-foreground"
                      id="guest-name"
                      onChange={(e) => setName(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Jane Doe"
                      ref={nameRef}
                      value={name}
                    />
                  </motion.div>
                )}

                {activeStep === 'message' && (
                  <motion.div
                    key="step-message"
                    {...(prefersReduced ? {} : fadeSlide(1))}
                  >
                    <label className="sr-only" htmlFor="guest-message">
                      Message
                    </label>
                    <textarea
                      className="min-h-28 w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none ring-0 focus:border-muted-foreground"
                      id="guest-message"
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Thanks for hosting this wonderful event!"
                      ref={messageRef}
                      rows={4}
                      style={{ maxHeight: 160 }}
                      value={message}
                    />
                    <p className="text-muted-foreground text-xs">
                      Press Enter to continue, Shift+Enter for a new line.
                    </p>
                  </motion.div>
                )}

                {activeStep === 'review' && !success && (
                  <motion.div
                    key="step-review"
                    {...(prefersReduced ? {} : fadeSlide(1))}
                    className="w-full"
                  >
                    <blockquote className="border-border border-l-4 pl-4 text-base text-foreground">
                      <p className="mb-2 whitespace-pre-line">
                        "{message || 'Signed!'}"
                      </p>
                      <footer className="mt-1 text-muted-foreground text-sm">
                        - {name}
                      </footer>
                    </blockquote>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Section>

          <Section
            className="mx-auto flex w-full max-w-md items-center justify-between"
            layout="position"
          >
            <AnimatePresence initial={false}>
              {canGoBack && (
                <motion.div
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  initial={{ opacity: 0, x: -8 }}
                  key="back"
                  layout="position"
                  transition={{ duration: 0.18 }}
                >
                  <Button
                    aria-label="Go back"
                    className="h-10 rounded-full px-3 text-foreground hover:bg-muted"
                    onClick={back}
                    type="button"
                    variant="ghost"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <AnimatePresence initial={false} mode="popLayout">
                {activeStep !== 'review' && !success && (
                  <motion.div
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    initial={{ opacity: 0, x: 8 }}
                    key="next"
                    layout="position"
                  >
                    <Button
                      className="h-10 rounded-full bg-primary px-5 text-primary-foreground hover:bg-primary/90 disabled:bg-primary/60"
                      disabled={!canAdvance}
                      onClick={next}
                      type="button"
                    >
                      <span className="flex items-center gap-2">
                        Next <ArrowRight className="h-4 w-4" />
                      </span>
                    </Button>
                  </motion.div>
                )}

                {activeStep === 'review' && !success && (
                  <motion.div
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    initial={{ opacity: 0, x: 8 }}
                    key="sign"
                    layout="position"
                  >
                    <Button
                      className="h-10 rounded-full bg-primary px-5 text-primary-foreground hover:bg-primary/90 disabled:bg-primary/60"
                      disabled={createEntryMutation.isPending}
                      onClick={onSubmit}
                      type="button"
                    >
                      {createEntryMutation.isPending
                        ? 'Signing…'
                        : 'Sign guestbook'}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Section>
        </>
      )}

      {success && (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto w-full max-w-md"
          exit={{ opacity: 0, y: 6 }}
          initial={{ opacity: 0, y: 6 }}
          layout
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <blockquote className="border-border border-l-4 pl-4 text-base text-foreground">
            <p className="mb-2 whitespace-pre-line">{message || 'Signed!'}</p>
            <footer className="mt-1 text-muted-foreground text-sm">
              {name}
            </footer>
          </blockquote>
        </motion.div>
      )}
    </div>
  );
}
