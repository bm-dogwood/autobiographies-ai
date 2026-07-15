"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/Reveal";

const ROMAN = ["I", "II", "III", "IV", "V", "VI"];

const milestones = [
  {
    id: 0,
    year: "Childhood",
    title: "Small wonders",
    body: "A backyard universe. Skinned knees and secret hideouts. The first songs remembered by heart.",
    icon: (
      <path d="M12 20v-7M12 13c-3.2 0-5.5-2.2-5.8-5.6C9.6 7 12 9.3 12 13Zm0 0c3.2 0 5.5-2.2 5.8-5.6C14.4 7 12 9.3 12 13Z" />
    ),
  },
  {
    id: 1,
    year: "Education",
    title: "First curiosities",
    body: "Teachers whose names still return at unexpected moments. The book that changed everything.",
    icon: (
      <>
        <path d="M4 6.5c2.2-1.1 5.1-1 8 1 2.9-2 5.8-2.1 8-1V18c-2.2-1.1-5.1-1-8 1-2.9-2-5.8-2.1-8-1Z" />
        <path d="M12 7.5V19" />
      </>
    ),
  },
  {
    id: 2,
    year: "Career",
    title: "Building a craft",
    body: "Long hours turned into mastery. The colleagues who became friends. Work that carried a signature.",
    icon: (
      <>
        <circle cx="12" cy="12" r="7.5" />
        <path d="M14.3 9.7 13 13l-3.3 1.3L11 11Z" />
      </>
    ),
  },
  {
    id: 3,
    year: "Family",
    title: "A love story",
    body: "The night you knew. Weddings and small kitchens. The children who became who they were meant to be.",
    icon: (
      <path d="M12 19.5s-6.4-3.9-8.6-7.7C1.8 9 3.4 6.2 6.2 6.2c1.9 0 3.5 1.3 5.3 3.6.8-1 2.6-2.6 4.7-2.6C19.3 6 21.5 9 20.6 11.8 18.4 15.6 12 19.5 12 19.5Z" />
    ),
  },
  {
    id: 4,
    year: "Achievements",
    title: "Moments of arrival",
    body: "The quiet triumphs and public ones. Awards received humbly. Promises kept.",
    icon: (
      <>
        <circle cx="12" cy="9.2" r="4.4" />
        <path d="M9.2 12.8 7.5 19l4.5-2.6L16.5 19l-1.7-6.2" />
      </>
    ),
  },
  {
    id: 5,
    year: "Legacy",
    title: "What remains",
    body: "The recipes, the letters, the way you made others feel seen. The story that keeps being told.",
    icon: (
      <>
        <path d="M19.5 4.5c-5.7 0-11.4 4-13 11 1.8.5 3.5.4 5.2-.5" />
        <path d="M7 16 17 6" />
        <path d="M10 13l2.5-2.5" />
      </>
    ),
  },
];

export function MemoryTimeline() {
  const [active, setActive] = useState<number | null>(null);
  const [pinned, setPinned] = useState(false);
  const reduceMotion = useReducedMotion();

  const openOnHover = useCallback(
    (index: number) => {
      if (!pinned) setActive(index);
    },
    [pinned],
  );

  const closeOnLeave = useCallback(() => {
    if (!pinned) setActive(null);
  }, [pinned]);

  const toggleOnClick = useCallback(
    (index: number) => {
      if (pinned && active === index) {
        setPinned(false);
        setActive(null);
      } else {
        setPinned(true);
        setActive(index);
      }
    },
    [pinned, active],
  );

  return (
    <section className="relative py-32 md:py-40" id="memory">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="eyebrow">A life, in chapters</p>
          <h2 className="mt-4 text-display text-4xl md:text-6xl max-w-3xl">
            An interactive memory timeline.
          </h2>
          <p className="mt-6 max-w-xl text-ink-soft">
            Hover — or tap — any chapter to open it. This is how we help you
            gather the moments, one by one, in their own time.
          </p>
        </Reveal>

        <div className="relative mt-24">
          {/* Stitched thread */}
          <div
            className="pointer-events-none absolute left-0 right-0 top-9 h-px opacity-70"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, var(--color-forest, #2f4a3a) 0, var(--color-forest, #2f4a3a) 6px, transparent 6px, transparent 14px)",
            }}
            aria-hidden="true"
          />

          {/* Timeline items */}
          <div
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 -mx-6 px-6 scrollbar-hide"
            role="list"
          >
            {milestones.map((m, i) => {
              const isActive = active === m.id;
              const isPinned = isActive && pinned;
              return (
                <motion.button
                  key={m.id}
                  onMouseEnter={() => openOnHover(m.id)}
                  onMouseLeave={closeOnLeave}
                  onFocus={() => openOnHover(m.id)}
                  onBlur={closeOnLeave}
                  onClick={() => toggleOnClick(m.id)}
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  style={{
                    marginTop: i % 2 === 1 && !reduceMotion ? "22px" : "0px",
                  }}
                  className="snap-start shrink-0 w-72 md:w-80 text-left group focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 rounded-lg"
                  role="listitem"
                  aria-expanded={isActive}
                >
                  {/* Chapter seal */}
                  <div className="relative flex items-center justify-center">
                    <span
                      aria-hidden="true"
                      className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full border font-serif italic text-[13px] transition-colors duration-300 ${
                        isActive
                          ? "bg-forest border-forest text-ivory"
                          : "bg-ivory border-forest/60 text-forest group-hover:border-forest"
                      }`}
                    >
                      {ROMAN[i]}
                    </span>
                    {isPinned && (
                      <span
                        className="absolute z-10 -bottom-1 h-1.5 w-1.5 rounded-full bg-forest"
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  {/* Card content */}
                  <div
                    className={`mt-8 soft-card p-6 min-h-[228px] transition-shadow duration-300 ${
                      isActive ? "shadow-lg" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="eyebrow text-forest">{m.year}</p>
                        <h3 className="mt-3 text-display text-2xl">
                          {m.title}
                        </h3>
                      </div>
                      <svg
                        viewBox="0 0 24 24"
                        className={`h-6 w-6 shrink-0 stroke-current text-forest/70 transition-transform duration-300 ${
                          isActive ? "scale-110 text-forest" : ""
                        }`}
                        fill="none"
                        strokeWidth={1.4}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        {m.icon}
                      </svg>
                    </div>

                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.p
                          initial={{
                            opacity: 0,
                            height: 0,
                            filter: reduceMotion ? "none" : "blur(2px)",
                          }}
                          animate={{
                            opacity: 1,
                            height: "auto",
                            filter: "blur(0px)",
                          }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{
                            duration: reduceMotion ? 0 : 0.4,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="mt-3 text-sm text-ink-mute leading-relaxed overflow-hidden"
                        >
                          {m.body}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {!isActive && (
                      <p className="mt-3 text-xs text-ink-mute/70 italic">
                        Hover to read
                      </p>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
