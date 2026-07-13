"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { useState } from "react";

const faqs = [
  {
    q: "Is this only for obituaries?",
    a: "No. Autobiographies.ai writes obituaries, eulogies, celebration-of-life speeches, memorial programs, short remembrance posts, and life timelines. You choose the format and tone.",
  },
  {
    q: "How is this different from just using ChatGPT?",
    a: "Our companion is designed for one thing: helping you write about someone you love. The prompts are gentle, the tone options are thoughtful, and the drafts read like they were written by a human editor, not a machine.",
  },
  {
    q: "Do I have to fill everything out at once?",
    a: "Never. Every step autosaves. You can leave and return anytime, from any device.",
  },
  {
    q: "Can I edit the tribute afterwards?",
    a: "Yes. Everything the AI writes is a starting point. You can edit, rewrite, regenerate with a different tone, or delete anything at all.",
  },
  {
    q: "Is my information private?",
    a: "Yes. Your memories are yours. We never sell data, never share it, and you can delete everything with a single click.",
  },
  {
    q: "Can I print or share it?",
    a: "Yes. Download a beautifully typeset PDF, print it directly, or share via a private link with family.",
  },
];

// Custom animated accordion content wrapper
const AccordionContent = ({
  children,
  isOpen,
}: {
  children: React.ReactNode;
  isOpen: boolean;
}) => {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="overflow-hidden"
        >
          <div className="pb-6 pr-12 text-ink-soft leading-relaxed">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export function FAQ() {
  const [openItem, setOpenItem] = useState<string>("");

  return (
    <section className="relative py-32 md:py-40" id="faq">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <p className="eyebrow">Questions</p>
          <h2 className="mt-4 text-display text-4xl md:text-6xl">
            The things people quietly wonder.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <Accordion.Root
            type="single"
            collapsible
            className="mt-16 space-y-2"
            onValueChange={(value) => setOpenItem(value)}
          >
            {faqs.map((f, i) => {
              const isOpen = openItem === `item-${i}`;
              return (
                <Accordion.Item
                  key={i}
                  value={`item-${i}`}
                  className="border-b border-line transition-colors hover:border-line/80"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="group flex w-full items-center justify-between py-6 text-left text-display text-xl md:text-2xl text-ink hover:text-forest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 rounded-lg">
                      <span>{f.q}</span>
                      <motion.svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        className="text-ink-mute shrink-0 ml-6"
                        animate={{
                          rotate: isOpen ? 45 : 0,
                        }}
                        transition={{
                          duration: 0.3,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <path
                          d="M9 3v12M3 9h12"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                      </motion.svg>
                    </Accordion.Trigger>
                  </Accordion.Header>

                  <AccordionContent isOpen={isOpen}>{f.a}</AccordionContent>
                </Accordion.Item>
              );
            })}
          </Accordion.Root>
        </Reveal>

        {/* Optional: Additional CTA */}
        <div className="mt-16 text-center">
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 text-forest hover:text-forest-dark transition-colors"
            whileHover={{ x: 4 }}
          >
            Still have questions? Get in touch
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
