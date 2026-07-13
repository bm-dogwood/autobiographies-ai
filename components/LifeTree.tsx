"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/Reveal";

const branches = [
  {
    id: "family",
    label: "Family",
    angle: -60,
    leaves: [
      { x: -160, y: -260 },
      { x: -190, y: -220 },
      { x: -220, y: -190 },
      { x: -140, y: -210 },
    ],
  },
  {
    id: "career",
    label: "Career",
    angle: -30,
    leaves: [
      { x: -90, y: -310 },
      { x: -60, y: -280 },
      { x: -110, y: -260 },
    ],
  },
  {
    id: "passions",
    label: "Passions",
    angle: 0,
    leaves: [
      { x: 0, y: -340 },
      { x: 30, y: -310 },
      { x: -25, y: -320 },
    ],
  },
  {
    id: "community",
    label: "Community",
    angle: 30,
    leaves: [
      { x: 80, y: -300 },
      { x: 110, y: -270 },
      { x: 60, y: -280 },
    ],
  },
  {
    id: "legacy",
    label: "Legacy",
    angle: 60,
    leaves: [
      { x: 170, y: -250 },
      { x: 210, y: -210 },
      { x: 190, y: -190 },
      { x: 140, y: -220 },
    ],
  },
];

export function LifeTree() {
  const [selected, setSelected] = useState<string[]>(["family"]);

  const toggle = useCallback((id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }, []);

  const isSelected = useCallback(
    (id: string) => {
      return selected.includes(id);
    },
    [selected],
  );

  const selectedCount = useMemo(() => selected.length, [selected]);

  return (
    <section className="relative py-32 md:py-40 bg-cream/70" id="life">
      <div className="mx-auto max-w-7xl px-6 grid gap-16 lg:grid-cols-2 lg:items-center">
        {/* Left Column - Content */}
        <div>
          <Reveal>
            <p className="eyebrow">The life tree</p>
            <h2 className="mt-4 text-display text-4xl md:text-6xl">
              A tree, growing with every memory.
            </h2>
            <p className="mt-6 max-w-lg text-ink-soft">
              Choose the parts of a life that mattered most. Watch the tree fill
              in. Your completed tree becomes part of the final tribute — a
              quiet visual keepsake.
            </p>
          </Reveal>

          <div className="mt-10">
            <div className="flex flex-wrap gap-3">
              {branches.map((b) => {
                const on = isSelected(b.id);
                return (
                  <motion.button
                    key={b.id}
                    onClick={() => toggle(b.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`rounded-full border px-5 py-2.5 text-sm transition-colors ${
                      on
                        ? "bg-forest text-ivory border-forest shadow-md"
                        : "border-line text-ink hover:bg-cream"
                    }`}
                  >
                    {b.label}
                  </motion.button>
                );
              })}
            </div>

            {/* Selection counter */}
            <div className="mt-4 text-sm text-ink-mute">
              {selectedCount === 0 ? (
                <span>Select a branch to see the tree grow 🌱</span>
              ) : (
                <span>
                  {selectedCount} of {branches.length} branches selected
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Tree SVG */}
        <Reveal delay={0.1}>
          <div className="relative aspect-square max-w-lg mx-auto">
            {/* Decorative ring */}
            <div className="absolute inset-0 rounded-full border border-line/20 pointer-events-none" />

            <svg
              viewBox="-300 -400 600 500"
              className="w-full h-full"
              role="img"
              aria-label="Interactive life tree visualization"
            >
              <defs>
                <radialGradient id="soil" cx="0.5" cy="0" r="1">
                  <stop
                    offset="0"
                    stopColor="oklch(0.75 0.06 78)"
                    stopOpacity="0.5"
                  />
                  <stop offset="1" stopColor="transparent" />
                </radialGradient>

                <linearGradient id="trunkGradient" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0" stopColor="oklch(0.32 0.03 45)" />
                  <stop offset="1" stopColor="oklch(0.45 0.04 45)" />
                </linearGradient>

                <filter id="leafGlow">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Ground/soil */}
              <ellipse
                cx="0"
                cy="80"
                rx="240"
                ry="30"
                fill="url(#soil)"
                className="transition-opacity duration-700"
              />

              {/* Trunk */}
              <motion.path
                d="M0 80 C -8 20, -4 -40, 0 -100"
                stroke="url(#trunkGradient)"
                strokeWidth="14"
                strokeLinecap="round"
                fill="none"
                initial={{ scaleY: 0.8, opacity: 0.5 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                transform-origin="0 80"
              />

              {/* Branches */}
              {branches.map((b) => {
                const angleRad = (b.angle * Math.PI) / 180;
                const startX = Math.sin(angleRad) * 60;
                const startY = -160 + Math.cos(angleRad) * 20;
                const endX = Math.sin(angleRad) * 200;
                const endY = -260 + Math.cos(angleRad) * 30;
                const isActive = isSelected(b.id);

                return (
                  <g key={b.id}>
                    {/* Branch path */}
                    <motion.path
                      d={`M0 -100 Q ${startX} ${startY} ${endX} ${endY}`}
                      stroke="oklch(0.32 0.03 45)"
                      strokeWidth={isActive ? 5 : 3}
                      strokeLinecap="round"
                      fill="none"
                      initial={false}
                      animate={{
                        opacity: isActive ? 1 : 0.35,
                        strokeWidth: isActive ? 5 : 3,
                      }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    />

                    {/* Leaves */}
                    <AnimatePresence mode="wait">
                      {isActive &&
                        b.leaves.map((l, i) => (
                          <motion.circle
                            key={`${b.id}-leaf-${i}`}
                            cx={l.x}
                            cy={l.y}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 0.85 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{
                              delay: i * 0.1,
                              duration: 0.6,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            r={12}
                            fill={`oklch(${0.5 + i * 0.02} 0.09 155)`}
                            filter="url(#leafGlow)"
                            className="cursor-default"
                          />
                        ))}
                    </AnimatePresence>
                  </g>
                );
              })}
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
