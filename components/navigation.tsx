'use client';

import { SearchIcon } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { TextMorph } from 'torph/react';
import { Link } from '@/components/link';
import { durations, easings } from '@/lib/motion-tokens';
import { cn } from '@/lib/utils';
import { useCommandPalette } from './providers/command-palette-provider';
import { createSectionTransition } from './section';
import { Sign } from './sign';
import { Button } from './ui/button';

const desktopNavigationMediaQuery = '(min-width: 640px)';

const links = [
  {
    href: '/',
    label: 'Home',
    showInDesktop: true,
    showInMobileMenu: true,
    active: (pathname: string) => pathname === '/',
  },
  {
    href: '/talk',
    label: 'Talk',
    showInDesktop: true,
    showInMobileMenu: true,
    active: (pathname: string) => pathname.startsWith('/talk'),
  },
  {
    href: '/work',
    label: 'Work',
    showInDesktop: true,
    showInMobileMenu: true,
    active: (pathname: string) => pathname.startsWith('/work'),
  },
  {
    href: '/project',
    label: 'Project',
    showInDesktop: true,
    showInMobileMenu: true,
    active: (pathname: string) => pathname.startsWith('/project'),
  },
  {
    href: '/blog',
    label: 'Blog',
    showInDesktop: true,
    showInMobileMenu: true,
    active: (pathname: string) => pathname.startsWith('/blog'),
  },
  {
    href: '/wakatime',
    label: 'Wakatime',
    showInDesktop: false,
    showInMobileMenu: true,
    active: (pathname: string) => pathname.startsWith('/wakatime'),
  },
  {
    href: '/spotify',
    label: 'Spotify',
    showInDesktop: false,
    showInMobileMenu: true,
    active: (pathname: string) => pathname.startsWith('/wakatime'),
  },
];

export const Navigation = () => {
  const pathname = usePathname();
  const desktopLinks = links.filter((link) => link.showInDesktop);
  const mobileMenuLinks = links.filter((link) => link.showInMobileMenu);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMenuPosition, setMobileMenuPosition] = useState({
    left: 0,
    top: 24,
    width: 89,
  });
  const [mobileLogoPosition, setMobileLogoPosition] = useState({
    left: 16,
    top: 24,
  });
  const [mobileHeaderBottom, setMobileHeaderBottom] = useState(72);
  const mobileLogoRef = useRef<HTMLDivElement | null>(null);
  const mobileNavRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuPanelRef = useRef<HTMLDivElement | null>(null);
  const { toggle } = useCommandPalette();
  const shouldReduceMotion = useReducedMotion();

  const captureMobileChromePositions = () => {
    const triggerRect = mobileNavRef.current?.getBoundingClientRect();
    const logoRect = mobileLogoRef.current?.getBoundingClientRect();

    if (!(triggerRect && logoRect)) {
      return false;
    }

    setMobileMenuPosition({
      left: triggerRect.left,
      top: triggerRect.top,
      width: triggerRect.width,
    });
    setMobileLogoPosition({
      left: logoRect.left,
      top: logoRect.top,
    });
    setMobileHeaderBottom(Math.max(triggerRect.bottom, logoRect.bottom) + 8);

    return true;
  };

  useEffect(() => {
    setIsMounted(true);
    captureMobileChromePositions();

    const handleResize = () => {
      captureMobileChromePositions();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      const isInsideTrigger = mobileNavRef.current?.contains(target);
      const isInsidePanel = mobileMenuPanelRef.current?.contains(target);

      if (!(isInsideTrigger || isInsidePanel)) {
        setMobileMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(desktopNavigationMediaQuery);

    const syncMobileMenuState = (
      event: MediaQueryList | MediaQueryListEvent
    ) => {
      if (event.matches) {
        setMobileMenuOpen(false);
      }
    };

    syncMobileMenuState(mediaQuery);
    mediaQuery.addEventListener('change', syncMobileMenuState);

    return () => {
      mediaQuery.removeEventListener('change', syncMobileMenuState);
    };
  }, []);

  const getMobileLinkMotion = (index: number) => {
    if (shouldReduceMotion) {
      return {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
      };
    }

    return {
      initial: {
        filter: 'blur(4px)',
        translateY: -10,
        opacity: 0,
      },
      animate: {
        filter: 'blur(0px)',
        translateY: 0,
        opacity: 1,
        transition: createSectionTransition(0.02 + index * 0.035, {
          duration: 0.16,
        }),
      },
      exit: {
        filter: 'blur(4px)',
        translateY: -10,
        opacity: 0,
        transition: createSectionTransition(0, {
          duration: durations.fast,
        }),
      },
    };
  };

  // Fixed exit delay for cleaner, more predictable animation
  const mobileMenuExitDelay = shouldReduceMotion ? 0 : durations.fast;

  const handleMobileMenuToggle = () => {
    if (!mobileMenuOpen) {
      captureMobileChromePositions();
    }

    setMobileMenuOpen((open) => !open);
  };

  return (
    <div className="grid gap-4">
      <nav className="flex items-center justify-between gap-3 text-xs sm:gap-4">
        <div className="h-10 w-10 sm:hidden" ref={mobileLogoRef}>
          <Link
            aria-label="Home"
            className={cn('block', mobileMenuOpen && 'fixed z-121')}
            href="/"
            style={
              mobileMenuOpen
                ? {
                    left: mobileLogoPosition.left,
                    top: mobileLogoPosition.top,
                  }
                : undefined
            }
          >
            <Sign className="size-10" color="currentColor" />
          </Link>
        </div>
        <div
          className="relative ml-auto h-8 sm:hidden"
          ref={mobileNavRef}
          style={
            mobileMenuOpen
              ? {
                  width: mobileMenuPosition.width,
                }
              : undefined
          }
        >
          <Button
            aria-expanded={mobileMenuOpen}
            aria-haspopup="dialog"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className={cn(
              'h-8 w-full touch-manipulation items-center justify-start gap-2.5 px-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent dark:hover:bg-transparent',
              mobileMenuOpen && 'fixed z-121'
            )}
            onClick={handleMobileMenuToggle}
            style={
              mobileMenuOpen
                ? {
                    left: mobileMenuPosition.left,
                    top: mobileMenuPosition.top,
                    width: mobileMenuPosition.width,
                  }
                : undefined
            }
            variant="ghost"
          >
            <TextMorph className="flex h-8 items-center font-medium text-lg leading-none">
              {mobileMenuOpen ? 'Close' : 'Menu'}
            </TextMorph>
            <div className="relative flex h-8 w-4 items-center justify-center">
              <div className="relative size-4">
                <span
                  className={cn(
                    'absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-100',
                    mobileMenuOpen ? '-rotate-45 top-[0.4rem]' : 'top-1'
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-100',
                    mobileMenuOpen ? 'top-[0.4rem] rotate-45' : 'top-2.5'
                  )}
                />
              </div>
              <span className="sr-only">Toggle Menu</span>
            </div>
          </Button>
        </div>
        <Link aria-label="Home" className="hidden sm:block" href="/">
          <Sign className="size-10 sm:size-12" color="currentColor" />
        </Link>
        <ul className="hidden items-center gap-0.5 rounded-xl border bg-muted/80 p-0.5 transition-colors duration-200 sm:flex sm:gap-1 sm:p-1">
          {desktopLinks.map(({ href, label, active }, index) => {
            const isActive = active(pathname);
            const isHovered = hoveredIndex === index;
            const isActiveOrHovered = isActive || isHovered;

            return (
              <li key={href}>
                <Link
                  className={cn(
                    'relative rounded-lg border-none px-3 py-2 font-medium text-sm transition-colors duration-200 sm:px-3 sm:py-1.5 sm:text-xs',
                    isActive && 'text-foreground'
                  )}
                  href={href}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {isActiveOrHovered && (
                    <motion.span
                      animate={{ opacity: 1 }}
                      aria-label={`Navigate to ${label}`}
                      className="absolute inset-0 rounded-lg border bg-card"
                      initial={{ opacity: 0 }}
                      layoutId="nav-pill"
                      transition={{
                        duration: durations.normal,
                        ease: easings.LAYOUT,
                      }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </Link>
              </li>
            );
          })}
          <li>
            <button
              className={cn(
                'relative flex items-center justify-center rounded-lg border-none px-3 py-2 font-medium text-sm transition-colors duration-200 sm:px-3 sm:py-1.5 sm:text-xs',
                hoveredIndex === desktopLinks.length && 'text-foreground'
              )}
              onClick={toggle}
              onMouseEnter={() => setHoveredIndex(desktopLinks.length)}
              onMouseLeave={() => setHoveredIndex(null)}
              title="Search commands (⌘K)"
              type="button"
            >
              {hoveredIndex === desktopLinks.length && (
                <motion.span
                  animate={{ opacity: 1 }}
                  aria-label="Open search"
                  className="absolute inset-0 rounded-lg border bg-card"
                  initial={{ opacity: 0 }}
                  layoutId="nav-pill"
                  transition={{
                    duration: 0.2,
                    ease: 'easeInOut',
                  }}
                />
              )}
              <SearchIcon className="relative z-10 size-5 sm:size-4" />
            </button>
          </li>
        </ul>
      </nav>
      {isMounted
        ? createPortal(
            <AnimatePresence>
              {mobileMenuOpen ? (
                <div className="fixed inset-0 z-120 sm:hidden">
                  <motion.button
                    animate={{ opacity: 1 }}
                    aria-label="Close mobile menu"
                    className="absolute right-0 bottom-0 left-0 bg-background dark:bg-background/55 dark:backdrop-blur-xl"
                    exit={{
                      opacity: 0,
                      transition: {
                        duration: shouldReduceMotion ? 0 : 0.12,
                        delay: mobileMenuExitDelay,
                      },
                    }}
                    initial={{ opacity: 0 }}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ top: mobileHeaderBottom }}
                    type="button"
                  />
                  <div
                    className="fixed inset-0 overflow-y-auto"
                    ref={mobileMenuPanelRef}
                    role="dialog"
                  >
                    <div className="flex min-h-dvh flex-col px-6 py-6">
                      <div
                        className="flex flex-col gap-12 pt-16"
                        style={{
                          paddingRight: Math.max(mobileMenuPosition.width, 0),
                        }}
                      >
                        <div className="flex flex-col gap-4">
                          <motion.div
                            animate={getMobileLinkMotion(0).animate}
                            className="font-medium text-muted-foreground text-sm"
                            exit={getMobileLinkMotion(0).exit}
                            initial={getMobileLinkMotion(0).initial}
                          >
                            Menu
                          </motion.div>
                          <div className="flex flex-col gap-3">
                            {mobileMenuLinks.map(({ href, label }, index) => {
                              const motionState = getMobileLinkMotion(
                                index + 1
                              );

                              return (
                                <motion.div
                                  animate={motionState.animate}
                                  exit={motionState.exit}
                                  initial={motionState.initial}
                                  key={href}
                                >
                                  <Link
                                    className="flex items-center gap-2 font-medium text-2xl text-foreground transition-[color,text-shadow] duration-150 ease-out hover:text-[var(--color-link-hover)] focus-visible:text-[var(--color-link-hover)] focus-visible:outline-none active:text-[var(--color-link-hover)] hover:[text-shadow:0_0_24px_color-mix(in_srgb,var(--color-link-hover)_58%,transparent),0_0_48px_color-mix(in_srgb,var(--color-link-hover)_24%,transparent)] focus-visible:[text-shadow:0_0_24px_color-mix(in_srgb,var(--color-link-hover)_58%,transparent),0_0_48px_color-mix(in_srgb,var(--color-link-hover)_24%,transparent)] active:[text-shadow:0_0_24px_color-mix(in_srgb,var(--color-link-hover)_58%,transparent),0_0_48px_color-mix(in_srgb,var(--color-link-hover)_24%,transparent)]"
                                    href={href}
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    {label}
                                  </Link>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}
    </div>
  );
};
