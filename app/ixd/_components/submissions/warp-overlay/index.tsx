'use client';

import { TrashIcon } from 'lucide-react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

type TMail = {
  readonly id: number;
  readonly title: string;
  readonly excerpt: string;
};

type TOverlayDialogProps = {
  readonly title: string;
  readonly onCancel: () => void;
  readonly onConfirm: () => void;
};

const MAILS: readonly TMail[] = [
  {
    id: 1,
    title: 'Weekly team update',
    excerpt: 'Quick update on progress this week...',
  },
  {
    id: 2,
    title: 'Your subscription confirmation',
    excerpt: 'Thanks for subscribing to our newsletter!',
  },
  {
    id: 3,
    title: 'Invoice #1234 for April',
    excerpt: 'Your monthly invoice is now available...',
  },
  {
    id: 4,
    title: 'Security alert: New login',
    excerpt: 'We detected a new sign-in to your account...',
  },
  {
    id: 5,
    title: 'Upcoming maintenance notice',
    excerpt: 'Maintenance scheduled for this weekend...',
  },
] as const;

const spring = {
  type: 'spring',
  stiffness: 320,
  damping: 34,
  mass: 0.6,
} as const;

export function WarpOverlay() {
  const [selected, setSelected] = useState<readonly number[]>([1, 2, 3]);
  const [open, setOpen] = useState(false);
  const [deletedItems, setDeletedItems] = useState<readonly number[]>([]);

  const count = selected.length;
  const hasSelection = count > 0;

  const title = useMemo(
    () => (count === 1 ? '1 item' : `${count} items`),
    [count]
  );

  const toggle = useCallback((id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const confirmDelete = useCallback(() => {
    setDeletedItems((prev) => [...prev, ...selected]);
    setSelected([]);
    setOpen(false);
  }, [selected]);

  const availableMails = useMemo(
    () => MAILS.filter((mail) => !deletedItems.includes(mail.id)),
    [deletedItems]
  );

  // Escape to close
  useEffect(() => {
    if (!open) {
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <LayoutGroup>
      <main
        aria-label="Inbox interface"
        className="relative overflow-hidden rounded-3xl border border-border bg-card/60 py-4 text-card-foreground shadow-lg"
        style={{
          boxShadow:
            'inset 0 0 0 1px rgba(255,255,255,0.03), 0 24px 80px rgba(0,0,0,0.35), 0 8px 24px rgba(0,0,0,0.25)',
        }}
      >
        {/* Header */}
        <div className="relative flex items-center justify-between px-5 py-4">
          <div className="text-muted-foreground text-sm">9:41</div>
          <h2 className="text-pretty font-semibold text-lg">Inbox</h2>

          <div className="relative">
            {/* Seed: red glow behind delete button (expands via shared layoutId) */}
            {!open && (
              <motion.div
                aria-hidden="true"
                className="-inset-y-1 -inset-x-1 absolute inset-0 rounded-full bg-destructive/30"
                layoutId="warp-bg"
                style={{ filter: 'blur(6px)' }}
                transition={spring}
              />
            )}

            <button
              aria-label={hasSelection ? 'Delete selected' : 'Nothing selected'}
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-card/70 shadow-sm transition-opacity disabled:opacity-40"
              disabled={!hasSelection}
              onClick={() => {
                if (hasSelection) {
                  setOpen(true);
                }
              }}
              type="button"
            >
              <TrashIcon className="size-4" />
            </button>
          </div>
        </div>

        {/* List */}
        <ul aria-label="Mail list" className="min-h-48 space-y-3 px-4 pb-5">
          <AnimatePresence mode="popLayout">
            {availableMails.map((m) => {
              const checked = selected.includes(m.id);
              return (
                <motion.li
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="flex items-start gap-3 rounded-xl border border-border/60 bg-card/80 p-4"
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                    y: -20,
                    transition: { duration: 0.15 },
                  }}
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  key={m.id}
                  layout
                  transition={spring}
                >
                  <input
                    aria-labelledby={`title-${m.id}`}
                    checked={checked}
                    className="mt-1 h-4 w-4 rounded border-border/70 bg-card"
                    id={`mail-${m.id}`}
                    onChange={() => {
                      toggle(m.id);
                    }}
                    type="checkbox"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium leading-6" id={`title-${m.id}`}>
                      {m.title}
                    </h3>
                    <p className="line-clamp-2 text-muted-foreground text-sm leading-6">
                      {m.excerpt}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>

        {/* Subtle device handle */}
        <div className="px-5 pb-4">
          <div className="mx-auto h-1 w-24 rounded-full bg-foreground/10" />
        </div>

        {/* Overlay */}
        <AnimatePresence>
          {open && (
            <>
              {/* Warping red sheet */}
              <motion.div
                aria-hidden="true"
                className="absolute inset-2 z-50 rounded-3xl bg-destructive/40 ring-1 ring-destructive/20 backdrop-blur-[60px] backdrop-saturate-150"
                layoutId="warp-bg"
                transition={spring}
              >
                <div
                  className="pointer-events-none absolute inset-0 rounded-3xl mix-blend-multiply"
                  style={{
                    background:
                      'radial-gradient(80% 60% at 50% 0%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.00) 60%), radial-gradient(120% 120% at 50% 100%, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.00) 60%)',
                  }}
                />
              </motion.div>

              <OverlayDialog
                onCancel={() => setOpen(false)}
                onConfirm={confirmDelete}
                title={count === 0 ? 'No items' : title}
              />
            </>
          )}
        </AnimatePresence>
      </main>
    </LayoutGroup>
  );
}

const OverlayDialog = memo(function OverlayDialogComponent({
  title,
  onCancel,
  onConfirm,
}: TOverlayDialogProps) {
  const [dragY, setDragY] = useState(0);
  const THRESHOLD = 90;

  const confirmRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const id = setTimeout(() => {
      confirmRef.current?.focus();
    }, 60);
    return () => {
      clearTimeout(id);
    };
  }, []);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      aria-describedby="warp-dialog-desc"
      aria-labelledby="warp-dialog-title"
      aria-modal="true"
      className="absolute inset-0 z-50 flex items-center justify-center p-6"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      onClick={onCancel}
      role="dialog"
      transition={{ duration: 0.18 }}
    >
      <motion.div
        className="relative w-full max-w-xs"
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.08}
        onClick={(e) => e.stopPropagation()}
        onDrag={(_, info) => {
          setDragY(info.offset.y);
        }}
        onDragEnd={(_, info) => {
          if (info.offset.y > THRESHOLD) {
            onCancel();
          }
        }}
        style={{ y: dragY }}
      >
        <motion.div className="mx-auto text-center" layout transition={spring}>
          <h3
            className="mb-3 text-balance font-semibold text-foreground text-xl tracking-tight"
            id="warp-dialog-title"
          >
            {title}
          </h3>
          <p
            className="text-muted-foreground text-sm leading-relaxed"
            id="warp-dialog-desc"
          >
            Are you sure you want to delete these entries? You can&apos;t undo
            this action.
          </p>
        </motion.div>

        <div className="mt-6 flex flex-col items-center gap-4">
          <motion.button
            className="inline-flex h-11 w-full max-w-32 items-center justify-center rounded-full bg-destructive px-6 font-medium text-destructive-foreground shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-destructive/60"
            layout
            onClick={onConfirm}
            ref={confirmRef}
            transition={spring}
            type="button"
            whileTap={{ scale: 0.98 }}
          >
            Delete
          </motion.button>
          <motion.button
            aria-label="Cancel and close dialog"
            className="rounded-full px-4 py-2 text-foreground/80 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
            layout
            onClick={onCancel}
            transition={spring}
            type="button"
            whileTap={{ scale: 0.98 }}
          >
            Cancel
          </motion.button>
        </div>

        {/* drag handle */}
        <div className="mt-5 flex justify-center">
          <div
            aria-hidden="true"
            className="h-1.5 w-12 rounded-full bg-muted-foreground/40"
          />
        </div>
      </motion.div>
    </motion.div>
  );
});
