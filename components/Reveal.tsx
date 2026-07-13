"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

// Created once, at module scope — never inside a component body — so the
// react-hooks/react-compiler "no components created during render" rule
// (and React itself) never sees a fresh component identity on re-render.
const MOTION_TAGS = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  header: motion.header,
  footer: motion.footer,
  main: motion.main,
  ul: motion.ul,
  li: motion.li,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  p: motion.p,
  span: motion.span,
} as const;

type RevealTag = keyof typeof MOTION_TAGS;

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: RevealTag;
}) {
  const reduce = useReducedMotion();
  // The tags in MOTION_TAGS each carry a differently-typed `ref` (one per
  // element type), which TS can't reconcile into a single call site. Since
  // we don't touch `ref` anymore (see whileInView/viewport below), this
  // cast is just to give the JSX one concrete shape to check props against.
  const MTag = MOTION_TAGS[as] as unknown as typeof motion.div;

  return (
    <MTag
      initial={reduce ? undefined : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </MTag>
  );
}

export function StaggerWords({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={reduce ? undefined : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.05 * i,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block mr-[0.22em]"
        >
          {w}
        </motion.span>
      ))}
    </span>
  );
}
