"use client";

import { SearchIcon } from "lucide-react";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "@/components/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useCommandPalette } from "./providers/command-palette-provider";
import { Section } from "./section";
import { Sign } from "./sign";

const links = [
  {
    href: "/",
    label: "Home",
    active: (pathname: string) => pathname === "/",
  },
  {
    href: "/talk",
    label: "Talk",
    active: (pathname: string) => pathname.startsWith("/talk"),
  },
  {
    href: "/work",
    label: "Work",
    active: (pathname: string) => pathname.startsWith("/work"),
  },
  {
    href: "/project",
    label: "Project",
    active: (pathname: string) => pathname.startsWith("/project"),
  },
  {
    href: "/blog",
    label: "Blog",
    active: (pathname: string) => pathname.startsWith("/blog"),
  },
];

export const Navigation = () => {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMenuPosition, setMobileMenuPosition] = useState({
    left: 16,
    triggerTop: 24,
    top: 72,
    width: 320,
  });
  const mobileNavRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuPanelRef = useRef<HTMLDivElement | null>(null);
  const { toggle } = useCommandPalette();

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const updatePosition = () => {
      const rect = mobileNavRef.current?.getBoundingClientRect();

      if (!rect) {
        return;
      }

      setMobileMenuPosition({
        left: rect.left,
        triggerTop: rect.top,
        top: rect.bottom + 14,
        width: Math.min(384, window.innerWidth - 32),
      });
    };

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      const isInsideTrigger = mobileNavRef.current?.contains(target);
      const isInsidePanel = mobileMenuPanelRef.current?.contains(target);

      if (!isInsideTrigger && !isInsidePanel) {
        setMobileMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    updatePosition();

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    window.addEventListener("resize", updatePosition);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("resize", updatePosition);
    };
  }, [mobileMenuOpen]);

  return (
    <Section delay={0.05}>
      <nav className="flex items-center justify-between gap-3 text-xs sm:gap-4">
        <div className="relative sm:hidden" ref={mobileNavRef}>
          <Button
            aria-expanded={mobileMenuOpen}
            aria-haspopup="dialog"
            className="h-8 touch-manipulation items-center justify-start gap-2.5 px-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent dark:hover:bg-transparent"
            onClick={() => setMobileMenuOpen((open) => !open)}
            variant="ghost"
          >
            <div className="relative flex h-8 w-4 items-center justify-center">
              <div className="relative size-4">
                <span
                  className={cn(
                    "absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-100",
                    mobileMenuOpen ? "top-[0.4rem] -rotate-45" : "top-1",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-100",
                    mobileMenuOpen ? "top-[0.4rem] rotate-45" : "top-2.5",
                  )}
                />
              </div>
              <span className="sr-only">Toggle Menu</span>
            </div>
            <span className="flex h-8 items-center text-lg leading-none font-medium">
              Menu
            </span>
          </Button>
          {mobileMenuOpen &&
            createPortal(
              <div className="fixed inset-0 z-120 sm:hidden">
                <button
                  aria-label="Close mobile menu"
                  className="absolute inset-0 bg-black/55 backdrop-blur-xl"
                  onClick={() => setMobileMenuOpen(false)}
                  type="button"
                />
                <div
                  className="fixed inset-0 overflow-y-auto"
                  role="dialog"
                  ref={mobileMenuPanelRef}
                >
                  <div className="flex min-h-dvh flex-col px-6 py-6">
                    <button
                      aria-label="Close mobile menu"
                      className="fixed z-121 flex h-8 w-fit items-center justify-start gap-2.5 px-0 text-foreground"
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        left: mobileMenuPosition.left,
                        top: mobileMenuPosition.triggerTop,
                      }}
                      type="button"
                    >
                      <div className="relative flex h-8 w-4 items-center justify-center">
                        <div className="relative size-4">
                          <span className="absolute left-0 top-[0.4rem] block h-0.5 w-4 -rotate-45 bg-foreground" />
                          <span className="absolute left-0 top-[0.4rem] block h-0.5 w-4 rotate-45 bg-foreground" />
                        </div>
                      </div>
                      <span className="flex h-8 items-center text-lg leading-none font-medium">
                        Menu
                      </span>
                    </button>
                    <div
                      className="flex flex-col gap-12 pt-16"
                      style={{
                        marginLeft: Math.max(mobileMenuPosition.left, 0),
                        maxWidth: mobileMenuPosition.width,
                      }}
                    >
                      <div className="flex flex-col gap-4">
                        <div className="text-sm font-medium text-muted-foreground">
                          Menu
                        </div>
                        <div className="flex flex-col gap-3">
                          {links.map(({ href, label }) => (
                            <Link
                              className="flex items-center gap-2 text-2xl font-medium text-foreground"
                              href={href}
                              key={href}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>,
              document.body,
            )}
        </div>
        <Link aria-label="Home" className="hidden sm:block" href="/">
          <Sign className="size-10 sm:size-12" color="currentColor" />
        </Link>
        <ul className="hidden items-center gap-0.5 rounded-xl border bg-muted/80 p-0.5 transition-colors duration-200 sm:flex sm:gap-1 sm:p-1">
          {links.map(({ href, label, active }, index) => {
            const isActive = active(pathname);
            const isHovered = hoveredIndex === index;
            const isActiveOrHovered = isActive || isHovered;

            return (
              <li key={href}>
                <Link
                  className={cn(
                    "relative rounded-lg border-none px-2 py-1.5 font-medium text-xs transition-colors duration-200 sm:px-3",
                    isActive && "text-foreground",
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
                        duration: 0.2,
                        ease: "easeInOut",
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
                "relative flex items-center justify-center rounded-lg border-none px-2 py-1.5 font-medium text-xs transition-colors duration-200 sm:px-3",
                hoveredIndex === links.length && "text-foreground",
              )}
              onClick={toggle}
              onMouseEnter={() => setHoveredIndex(links.length)}
              onMouseLeave={() => setHoveredIndex(null)}
              title="Search commands (⌘K)"
              type="button"
            >
              {hoveredIndex === links.length && (
                <motion.span
                  animate={{ opacity: 1 }}
                  aria-label="Open search"
                  className="absolute inset-0 rounded-lg border bg-card"
                  initial={{ opacity: 0 }}
                  layoutId="nav-pill"
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                  }}
                />
              )}
              <SearchIcon className="relative z-10 h-4 w-4" />
            </button>
          </li>
        </ul>
        <button
          aria-label="Open search"
          className="flex h-8 w-8 items-center justify-center rounded-lg border bg-muted/80 transition-colors duration-200 sm:hidden"
          onClick={toggle}
          title="Search commands"
          type="button"
        >
          <SearchIcon className="h-4 w-4" />
        </button>
      </nav>
    </Section>
  );
};
