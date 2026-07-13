// app/components/Header.tsx
"use client";

import { useState, useEffect, JSX } from "react";
import Link from "next/link";

export function Header(): JSX.Element {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = (): void => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? "backdrop-blur-md bg-ivory/80 border-b border-line/60 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:py-5">
        <Link href="/" className="flex items-center gap-2 group">
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M13 2C7 6 4 11 4 16c0 4 3 7 9 8 6-1 9-4 9-8 0-5-3-10-9-14Z"
              stroke="currentColor"
              strokeWidth="1.2"
              className="text-forest transition-colors duration-300 group-hover:text-forest-soft"
            />
            <path
              d="M13 6v18"
              stroke="currentColor"
              strokeWidth="1"
              className="text-forest/60 transition-colors duration-300 group-hover:text-forest-soft/60"
            />
          </svg>
          <span className="text-display text-xl tracking-tight transition-colors duration-300">
            Autobiographies
            <span className="text-forest transition-colors duration-300 group-hover:text-forest-soft">
              .ai
            </span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-9 text-sm text-ink-soft">
          <Link
            href="/#memory"
            onClick={() => setOpen(false)}
            className="relative transition-colors duration-300 hover:text-forest after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-forest after:transition-all after:duration-300 hover:after:w-full"
          >
            Memory Timeline
          </Link>
          <Link
            href="/#demo"
            onClick={() => setOpen(false)}
            className="relative transition-colors duration-300 hover:text-forest after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-forest after:transition-all after:duration-300 hover:after:w-full"
          >
            Interactive demo
          </Link>
          <Link
            href="/#gallery"
            onClick={() => setOpen(false)}
            className="relative transition-colors duration-300 hover:text-forest after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-forest after:transition-all after:duration-300 hover:after:w-full"
          >
            Gallery
          </Link>
          <Link
            href="/#life"
            onClick={() => setOpen(false)}
            className="relative transition-colors duration-300 hover:text-forest after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-forest after:transition-all after:duration-300 hover:after:w-full"
          >
            Life Tree
          </Link>
          <Link
            href="/#how"
            onClick={() => setOpen(false)}
            className="relative transition-colors duration-300 hover:text-forest after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-forest after:transition-all after:duration-300 hover:after:w-full"
          >
            How It Works
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/create"
            className="hidden sm:inline-flex items-center rounded-full bg-forest px-5 py-2.5 text-sm text-ivory transition-all duration-300 hover:bg-forest-soft hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
          >
            Begin a tribute
          </Link>
          <button
            aria-label="Open menu"
            className={`md:hidden rounded-full border transition-all duration-300 p-2 ${
              open
                ? "border-forest bg-forest/5"
                : "border-line hover:border-forest hover:bg-forest/5"
            }`}
            onClick={() => setOpen((v: boolean) => !v)}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              aria-hidden="true"
              className="transition-transform duration-300"
            >
              <path
                d="M2 5h14M2 9h14M2 13h14"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                className={`transition-all duration-300 ${
                  open ? "text-forest" : ""
                }`}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu with smooth slide animation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-line/60 bg-ivory/95 backdrop-blur px-6 py-4 flex flex-col gap-3 text-ink-soft">
          <Link
            href="/#memory"
            onClick={() => setOpen(false)}
            className="transition-colors duration-200 hover:text-forest hover:pl-2"
          >
            Memory Timeline
          </Link>
          <Link
            href="/#demo"
            onClick={() => setOpen(false)}
            className="transition-colors duration-200 hover:text-forest hover:pl-2"
          >
            Interactive demo
          </Link>
          <Link
            href="/#gallery"
            onClick={() => setOpen(false)}
            className="transition-colors duration-200 hover:text-forest hover:pl-2"
          >
            Gallery
          </Link>
          <Link
            href="/#life"
            onClick={() => setOpen(false)}
            className="transition-colors duration-200 hover:text-forest hover:pl-2"
          >
            Life Tree
          </Link>
          <Link
            href="/#how"
            onClick={() => setOpen(false)}
            className="transition-colors duration-200 hover:text-forest hover:pl-2"
          >
            How It Works
          </Link>
          <Link
            href="/create"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-forest px-4 py-2 text-ivory text-center transition-all duration-300 hover:bg-forest-soft hover:scale-[1.02] active:scale-95"
          >
            Begin a tribute
          </Link>
        </div>
      </div>
    </header>
  );
}
