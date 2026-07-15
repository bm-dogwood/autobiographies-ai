"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Reveal } from "@/components/Reveal";
import treeImg from "@/public/gallery-tree.jpg";

export function FinalCTA() {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden">
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 -z-10"
      >
        <Image
          src={treeImg}
          alt=""
          fill
          className="object-cover"
          loading="lazy"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/70 via-ivory/50 to-ivory" />
      </motion.div>

      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="eyebrow">When you are ready</p>
          <h2 className="mt-6 text-display text-5xl md:text-7xl leading-[1.02]">
            Begin the tribute. <br />
            <span className="text-editorial text-forest">
              In your own time.
            </span>
          </h2>
          <p className="mt-8 max-w-xl mx-auto text-ink-soft text-lg">
            No account required to start. Autosaves as you write. Nothing is
            shared until you decide.
          </p>
          <Link
            href="/create"
            className="mt-12 inline-flex items-center gap-2 rounded-full bg-forest px-10 py-5 text-ivory text-lg hover:bg-forest-soft transition"
          >
            Create a tribute
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M3 10h13m0 0-5-5m5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
