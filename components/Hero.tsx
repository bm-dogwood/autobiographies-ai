"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import Image from "next/image";
import heroImg from "@/public/hero-sunrise.jpg";
import { StaggerWords } from "@/components/Reveal";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const reduce = useReducedMotion();
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 180]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-dvh flex items-end overflow-hidden"
    >
      {/* Background image with parallax */}
      <motion.div style={{ y, scale }} className="absolute inset-0 -z-10">
        <Image
          src={heroImg}
          alt=""
          width={1920}
          height={1280}
          className="h-full w-full object-cover"
          priority
          quality={100}
        />
        {/* <div className="absolute inset-0 bg-gradient-to-b from-ivory/10 via-ivory/10 to-ivory" /> */}
        <div className="absolute inset-0 bg-gradient-to-r from-ivory/30 via-transparent to-transparent" />
        {/*
          NEW: contrast-protection scrim behind the headline block.
          Sits low-opacity and only in the text zone (bottom-left-ish),
          so it doesn't flatten the whole photo — just guarantees the
          dark serif headline and the forest-green italic line read
          cleanly regardless of what's behind them (sky vs. tree vs. hill).
        */}
        <div className="absolute inset-0 bg-gradient-to-t from-ivory/0 via-ink/0 to-ink/0">
          <div className="absolute left-0 right-0 top-[28%] h-[42%] bg-gradient-to-b from-ivory/0 via-ivory/35 to-ivory/0 blur-2xl" />
        </div>
      </motion.div>

      {/* Drifting light particles */}
      {!reduce && (
        <div className="pointer-events-none absolute inset-0 -z-10">
          {[...Array(14)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute block h-1 w-1 rounded-full bg-gold-soft/70"
              style={{ left: `${(i * 73) % 100}%`, top: `${(i * 41) % 100}%` }}
              animate={{ y: [0, -30, 0], opacity: [0.2, 0.9, 0.2] }}
              transition={{
                duration: 6 + (i % 4),
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        style={{ opacity }}
        className="mx-auto max-w-7xl px-6 pb-24 pt-40 md:pt-48 md:pb-32 relative"
      >
        {/*
          Eyebrow: added a soft pill background + increased text weight/opacity
          so it stays legible on bright sky regardless of exposure.
        */}

        <h1 className="mt-10 text-display text-5xl sm:text-7xl md:text-[92px] max-w-5xl leading-[0.95] drop-shadow-[0_2px_20px_rgba(255,250,240,0.5)]">
          <StaggerWords text="Every life deserves " />
          <br />
          <span className="text-editorial text-forest drop-shadow-[0_2px_16px_rgba(255,250,240,0.6)]">
            to be remembered beautifully.
          </span>
        </h1>

        {/* Increased top margin (mt-8 -> mt-10) for more breathing room off the headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9 }}
          className="mt-10 max-w-xl text-lg text-ink-soft leading-relaxed"
        >
          Gather the memories. We&apos;ll help you shape them into an obituary,
          eulogy or celebration of life — written with the warmth they deserve.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/create"
            className="group inline-flex items-center gap-2 rounded-full bg-forest px-7 py-4 text-ivory transition hover:bg-forest-soft"
          >
            Create a tribute
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              className="transition group-hover:translate-x-1"
            >
              <path
                d="M3 9h11m0 0-4-4m4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </Link>

          {/*
            "Watch how it works" now uses "See" to avoid echoing the
            nav's "Begin a tribute" / hero's "Create a tribute" pairing
            less, and the play icon is filled forest w/ ivory triangle
            so it doesn't wash out against the light pill background.
          */}
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-ivory/70 backdrop-blur px-6 py-4 text-ink hover:bg-ivory transition"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-forest">
              <svg width="10" height="10" viewBox="0 0 10 10">
                <path d="M2 1l7 4-7 4V1Z" fill="#FFFDF8" />
              </svg>
            </span>
            See how it works
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="mt-24 md:mt-32 flex items-end justify-between gap-6"
        >
          {/*
            Trust line: promoted from a quiet caption to a small badge —
            leading dot + border-top rule give it visual weight without
            competing with the headline. Darker ink for reliable contrast.
          */}
          {/* <div className="max-w-sm flex items-start gap-3 border-t border-ink/85 pt-4">
            <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-forest" />
            <p className="text-sm text-ink-bold leading-relaxed">
              Used quietly by families, funeral homes and hospice chaplains
              across the country.
            </p>
          </div> */}

          {/*
            Scroll cue: added a circular backing so it holds contrast on
            any part of the image, plus bumped text opacity/weight.
          */}
          {/* <motion.div
            aria-hidden
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="hidden md:flex flex-col items-center gap-2"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ivory/70 backdrop-blur-sm border border-ink/10">
              <svg width="12" height="12" viewBox="0 0 12 12">
                <path
                  d="M2 4l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  className="text-ink-soft"
                />
              </svg>
            </span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-ink-soft/80 font-medium">
              Scroll
            </span>
          </motion.div> */}
        </motion.div>
      </motion.div>
    </section>
  );
}
