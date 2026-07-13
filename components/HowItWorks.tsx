"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { JSX, useRef } from "react";
import { Reveal } from "@/components/Reveal";

interface Step {
  n: string;
  title: string;
  body: string;
}

const steps: Step[] = [
  {
    n: "One",
    title: "Share memories",
    body: "Answer gentle prompts at your own pace. Skip anything that doesn't fit. Autosaves as you go.",
  },
  {
    n: "Two",
    title: "AI understands your story",
    body: "Our writing companion reads between the lines. It notices what matters, and what to leave in the margin.",
  },
  {
    n: "Three",
    title: "Receive a beautifully written tribute",
    body: "Obituary, eulogy, celebration speech. Edit anything. Download, print or share.",
  },
];

export function HowItWorks(): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 60%", "end 40%"],
  });
  const line = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative py-32 md:py-40" id="how">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="eyebrow">The journey</p>
          <h2 className="mt-4 text-display text-4xl md:text-6xl max-w-3xl">
            How a tribute takes shape.
          </h2>
        </Reveal>

        <div className="relative mt-20 grid gap-16">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-line -translate-x-1/2" />
          <motion.div
            style={{ height: line }}
            className="absolute left-6 md:left-1/2 top-0 w-px bg-forest -translate-x-1/2"
          />

          {steps.map((s: Step, i: number) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div
                className={`grid md:grid-cols-2 gap-10 items-center ${
                  i % 2 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`relative pl-16 md:pl-0 ${
                    i % 2 ? "md:order-2 md:pl-20" : "md:pr-20 md:text-right"
                  }`}
                >
                  <span
                    className="absolute left-0 md:left-auto md:right-[calc(100%+1.5rem)] top-0 h-3 w-3 rounded-full bg-forest ring-4 ring-ivory"
                    style={i % 2 ? { left: "-4.5rem" } : {}}
                  />
                  <p className="eyebrow text-forest">Step {s.n}</p>
                  <h3 className="mt-3 text-display text-3xl md:text-5xl">
                    {s.title}
                  </h3>
                  <p className="mt-4 text-ink-soft max-w-md md:ml-auto">
                    {s.body}
                  </p>
                </div>
                <div className={`relative ${i % 2 ? "md:order-1" : ""}`}>
                  <motion.div
                    whileInView={{ opacity: [0, 1], y: [30, 0] }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="soft-card aspect-[5/4] p-8 flex items-center justify-center paper-grain"
                  >
                    <span className="text-display text-9xl text-forest/20">
                      {i + 1}
                    </span>
                  </motion.div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
