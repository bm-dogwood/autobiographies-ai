"use client";

import { JSX, useState } from "react";
import { motion } from "motion/react";
import { Reveal } from "@/components/Reveal";

const bullets: string[] = [
  "Born 1942, Boston",
  "3 kids, 7 grandkids",
  "Nurse for 40 yrs",
  "Loved gardening, jazz",
  "Made everyone laugh",
  "Passed May 2024",
];

const obituary: string =
  "Margaret Ellen Whitman, born in Boston in 1942, spent forty years as a nurse — the kind whose hands you remembered long after you left the hospital. She raised three children with her husband Thomas, and lived to see seven grandchildren grow into people she was quietly, endlessly proud of. Her garden bloomed in impossible colors. Miles Davis played on Sundays. And in every room she entered, laughter followed. Margaret passed peacefully in May of 2024, leaving behind not an ending, but a garden still in bloom.";

export function BeforeAfter(): JSX.Element {
  const [split, setSplit] = useState<number>(50);

  const handleSplitChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSplit(Number(e.target.value));
  };

  return (
    <section className="relative py-32 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="eyebrow">Before &amp; After</p>
          <h2 className="mt-4 text-display text-4xl md:text-6xl max-w-3xl">
            From notes to something worth reading aloud.
          </h2>
          <p className="mt-6 max-w-xl text-ink-soft">
            Drag the handle. Your rough memories on one side. The written
            tribute on the other.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-14 relative aspect-[16/10] md:aspect-[16/8] rounded-3xl overflow-hidden soft-card select-none">
            {/* After (right) */}
            <div className="absolute inset-0 p-8 md:p-16 parchment-bg overflow-hidden">
              <p className="eyebrow mb-4">Final tribute</p>
              <p className="text-editorial text-lg md:text-2xl leading-relaxed text-ink max-w-2xl">
                {obituary}
              </p>
            </div>

            {/* Before (left, clipped) */}
            <div
              className="absolute inset-0 p-8 md:p-16 bg-ivory overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
            >
              <p className="eyebrow mb-4 text-ink-mute">Raw notes</p>
              <ul className="space-y-3 text-ink-soft font-mono text-sm md:text-base">
                {bullets.map((b: string) => (
                  <li key={b} className="flex gap-3">
                    <span className="text-forest">&mdash;</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Handle */}
            <input
              type="range"
              min={5}
              max={95}
              value={split}
              onChange={handleSplitChange}
              className="absolute inset-y-0 left-0 w-full opacity-0 cursor-ew-resize z-20"
              aria-label="Compare before and after"
            />
            <motion.div
              className="absolute top-0 bottom-0 z-10 pointer-events-none"
              style={{ left: `${split}%` }}
            >
              <div className="h-full w-px bg-ink/20" />
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-forest text-ivory flex items-center justify-center shadow-lg">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M7 5l-4 5 4 5M13 5l4 5-4 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
