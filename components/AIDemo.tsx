"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";

const questions = [
  { q: "What was their name?", placeholder: "e.g. Eleanor", key: "name" },
  {
    q: "What is one word people used to describe them?",
    placeholder: "e.g. steadfast",
    key: "word",
  },
  {
    q: "What did they love most?",
    placeholder: "e.g. her garden and her grandchildren",
    key: "love",
  },
];

const generateTribute = (answers: Record<string, string>) => {
  const name = answers.name || "She";
  const word = answers.word || "steadfast";
  const love = answers.love || "the people around her";
  const firstName = name.split(" ")[0];

  return (
    `${name} was, above all, ${word}. In a life measured not in years but in the people she carried, ${firstName} gave herself freely to ${love}. ` +
    `She kept a garden of small, ordinary miracles — a warm kitchen, a phone that always answered, a way of listening that made you feel newly seen. ` +
    `Those who knew her will remember not what she said, but the quiet weight of her presence, and the light she leaves in each of us.`
  );
};

export function AIDemo() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [text, setText] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const canGenerate = useMemo(() => {
    return (
      Object.keys(answers).length === questions.length &&
      Object.values(answers).every(Boolean)
    );
  }, [answers]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleAnswerChange = useCallback((key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }, []);

  const generate = useCallback(() => {
    if (!canGenerate || isRunning) return;

    const fullText = generateTribute(answers);
    setText("");
    setIsRunning(true);

    let index = 0;
    const step = () => {
      index += 2;
      setText(fullText.slice(0, index));

      if (index < fullText.length) {
        timeoutRef.current = setTimeout(step, 18);
      } else {
        setIsRunning(false);
      }
    };

    step();
  }, [answers, canGenerate, isRunning]);

  const resetAnswers = useCallback(() => {
    setAnswers({});
    setText("");
    setIsRunning(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  return (
    <section className="relative py-32 md:py-40 bg-cream/60" id="demo">
      <div className="mx-auto max-w-7xl px-6 grid gap-16 lg:grid-cols-2 lg:items-center">
        {/* Left Column - Questions */}
        <div>
          <Reveal>
            <p className="eyebrow">Meet the writing companion</p>
            <h2 className="mt-4 text-display text-4xl md:text-6xl">
              Answer three small questions. Watch a tribute begin.
            </h2>
            <p className="mt-6 max-w-lg text-ink-soft">
              Our writing companion listens, not lectures. Give it a few honest
              details and it drafts something warm, in your voice — never
              generic.
            </p>
          </Reveal>

          <div className="mt-10 space-y-5">
            {questions.map((q, i) => (
              <Reveal key={q.key} delay={i * 0.08}>
                <label className="block">
                  <span className="eyebrow">Question {i + 1}</span>
                  <p className="mt-1 text-editorial text-xl text-ink">{q.q}</p>
                  <input
                    type="text"
                    placeholder={q.placeholder}
                    value={answers[q.key] || ""}
                    onChange={(e) => handleAnswerChange(q.key, e.target.value)}
                    className="mt-3 w-full bg-transparent border-b border-line focus:border-forest outline-none py-2 text-lg placeholder:text-ink-mute/60 transition"
                    aria-label={q.q}
                  />
                </label>
              </Reveal>
            ))}

            <div className="flex gap-4 mt-4">
              <button
                onClick={generate}
                disabled={!canGenerate || isRunning}
                className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-ivory text-sm transition hover:bg-forest-soft disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isRunning ? "Writing…" : "Draft a paragraph"}
              </button>

              {Object.keys(answers).length > 0 && (
                <button
                  onClick={resetAnswers}
                  className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm text-ink-mute hover:bg-ivory transition"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Live Draft */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="soft-card p-8 md:p-12 min-h-[420px] paper-grain relative overflow-hidden"
          >
            <div className="flex items-center gap-2 mb-6">
              <span
                className={`h-2 w-2 rounded-full ${isRunning ? "bg-forest animate-pulse" : "bg-forest"}`}
              />
              <p className="eyebrow">Live draft</p>
              {isRunning && (
                <span className="ml-auto text-xs text-ink-mute">
                  Generating…
                </span>
              )}
            </div>

            <p className="text-editorial text-2xl md:text-3xl leading-snug text-ink">
              {text || (
                <span className="text-ink-mute/70">
                  A gentle draft will appear here, sentence by sentence, once
                  you have answered.
                </span>
              )}
              {isRunning && (
                <span className="ml-1 inline-block h-6 w-[2px] align-middle bg-forest animate-pulse" />
              )}
            </p>

            {/* Character count */}
            {text && (
              <div className="mt-6 text-xs text-ink-mute/50">
                {text.length} characters
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
