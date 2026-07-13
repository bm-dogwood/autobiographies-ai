"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { JSX, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { Reveal } from "@/components/Reveal";
import g1 from "@/public/gallery-letter.jpg";
import g2 from "@/public/gallery-candle.jpg";
import g3 from "@/public/gallery-journals.jpg";
import g4 from "@/public/gallery-garden.jpg";
import g5 from "@/public/gallery-tree.jpg";
import g6 from "@/public/gallery-portrait.jpg";

interface GalleryItem {
  src: StaticImageData;
  w: number;
  h: number;
  alt: string;
}

const items: GalleryItem[] = [
  { src: g1, w: 4, h: 5, alt: "A handwritten letter on linen" },
  { src: g4, w: 4, h: 3, alt: "A cottage garden at golden hour" },
  { src: g3, w: 7, h: 5, alt: "Journals and vintage photographs" },
  { src: g2, w: 4, h: 5, alt: "A single candle beside dried flowers" },
  { src: g5, w: 4, h: 5, alt: "An ancient oak against the sunrise" },
  { src: g6, w: 4, h: 5, alt: "A framed sepia family portrait" },
];

interface ParallaxImageProps {
  src: StaticImageData;
  alt: string;
  className?: string;
}

function ParallaxImage({
  src,
  alt,
  className,
}: ParallaxImageProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl bg-parchment ${className}`}
    >
      <motion.div style={{ y }} className="h-[110%] w-full">
        <Image
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover"
          placeholder="blur"
        />
      </motion.div>
    </div>
  );
}

export function Gallery(): JSX.Element {
  return (
    <section className="relative py-32 md:py-40 bg-parchment/40" id="gallery">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="eyebrow">A gallery of small, holy things</p>
          <h2 className="mt-4 text-display text-4xl md:text-6xl max-w-3xl">
            The objects a life leaves behind.
          </h2>
        </Reveal>
        <div className="mt-16 grid grid-cols-6 gap-4 md:gap-6 auto-rows-[120px] md:auto-rows-[180px]">
          <ParallaxImage
            src={items[0].src}
            alt={items[0].alt}
            className="col-span-3 md:col-span-2 row-span-3"
          />
          <ParallaxImage
            src={items[1].src}
            alt={items[1].alt}
            className="col-span-3 md:col-span-4 row-span-2"
          />
          <ParallaxImage
            src={items[2].src}
            alt={items[2].alt}
            className="col-span-6 md:col-span-4 row-span-3"
          />
          <ParallaxImage
            src={items[3].src}
            alt={items[3].alt}
            className="col-span-3 md:col-span-2 row-span-3"
          />
          <ParallaxImage
            src={items[4].src}
            alt={items[4].alt}
            className="col-span-3 md:col-span-2 row-span-3"
          />
          <ParallaxImage
            src={items[5].src}
            alt={items[5].alt}
            className="col-span-3 md:col-span-4 row-span-3"
          />
        </div>
      </div>
    </section>
  );
}
