"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, useMemo } from "react";

const lines = [
  "A life is more than dates.",
  "It is the letters, the recipes, the songs you hummed while cooking.",
  "It is the way you made a room feel warmer just by walking in.",
];

function Line({
  progress,
  index,
  total,
  text,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  text: string;
}) {
  // Memoize these calculations to avoid recalculating on every render
  const { start, end } = useMemo(() => {
    const start = index / total;
    const end = (index + 1) / total;
    return { start, end };
  }, [index, total]);

  const opacity = useTransform(
    progress,
    [start, start + 0.12, end - 0.05, end + 0.05],
    [0.1, 1, 1, 0.15],
  );

  const y = useTransform(progress, [start, end], [30, -30]);

  return (
    <motion.p
      style={{ opacity, y }}
      className="text-editorial text-3xl md:text-5xl leading-tight text-ink text-center min-h-[6rem] md:min-h-[7rem] flex items-center justify-center"
    >
      {text}
    </motion.p>
  );
}

export function StoryIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={ref} className="relative py-40 md:py-56 parchment-bg">
      <div className="mx-auto max-w-4xl px-6">
        {lines.map((line, i) => (
          <Line
            key={i}
            progress={scrollYProgress}
            index={i}
            total={lines.length}
            text={line}
          />
        ))}
      </div>
    </section>
  );
}
