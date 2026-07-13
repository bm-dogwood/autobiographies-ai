"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/Reveal";

const milestones = [
  {
    id: 0,
    year: "Childhood",
    title: "Small wonders",
    body: "A backyard universe. Skinned knees and secret hideouts. The first songs remembered by heart.",
  },
  {
    id: 1,
    year: "Education",
    title: "First curiosities",
    body: "Teachers whose names still return at unexpected moments. The book that changed everything.",
  },
  {
    id: 2,
    year: "Career",
    title: "Building a craft",
    body: "Long hours turned into mastery. The colleagues who became friends. Work that carried a signature.",
  },
  {
    id: 3,
    year: "Family",
    title: "A love story",
    body: "The night you knew. Weddings and small kitchens. The children who became who they were meant to be.",
  },
  {
    id: 4,
    year: "Achievements",
    title: "Moments of arrival",
    body: "The quiet triumphs and public ones. Awards received humbly. Promises kept.",
  },
  {
    id: 5,
    year: "Legacy",
    title: "What remains",
    body: "The recipes, the letters, the way you made others feel seen. The story that keeps being told.",
  },
];

export function MemoryTimeline() {
  const [active, setActive] = useState<number | null>(null);

  const handleMouseEnter = useCallback((index: number) => {
    setActive(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActive(null);
  }, []);

  return (
    <section className="relative py-32 md:py-40" id="memory">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="eyebrow">A life, in chapters</p>
          <h2 className="mt-4 text-display text-4xl md:text-6xl max-w-3xl">
            An interactive memory timeline.
          </h2>
          <p className="mt-6 max-w-xl text-ink-soft">
            Hover any chapter to open it. This is how we help you gather the
            moments — one by one, in their own time.
          </p>
        </Reveal>

        <div className="relative mt-20">
          {/* Timeline line */}
          <div
            className="absolute left-0 right-0 top-8 h-px bg-line"
            aria-hidden="true"
          />

          {/* Timeline items */}
          <div
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 -mx-6 px-6 scrollbar-hide"
            role="list"
          >
            {milestones.map((m) => (
              <motion.button
                key={m.id}
                onMouseEnter={() => handleMouseEnter(m.id)}
                onMouseLeave={handleMouseLeave}
                onFocus={() => handleMouseEnter(m.id)}
                onBlur={handleMouseLeave}
                whileHover={{ y: -6 }}
                className="snap-start shrink-0 w-72 md:w-80 text-left group focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 rounded-lg"
                role="listitem"
                aria-expanded={active === m.id}
              >
                {/* Timeline dot */}
                <div className="relative flex items-center justify-center">
                  <span
                    className={`h-4 w-4 rounded-full border ring-4 ring-ivory relative z-10 transition-colors ${
                      active === m.id
                        ? "bg-forest border-forest"
                        : "bg-ivory border-forest group-hover:bg-forest"
                    }`}
                    aria-hidden="true"
                  />
                </div>

                {/* Card content */}
                <div
                  className={`mt-8 soft-card p-6 min-h-[220px] transition-shadow ${
                    active === m.id ? "shadow-lg" : ""
                  }`}
                >
                  <p className="eyebrow text-forest">{m.year}</p>
                  <h3 className="mt-3 text-display text-2xl">{m.title}</h3>

                  <AnimatePresence mode="wait">
                    {active === m.id && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{
                          duration: 0.4,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="mt-3 text-sm text-ink-mute leading-relaxed overflow-hidden"
                      >
                        {m.body}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
