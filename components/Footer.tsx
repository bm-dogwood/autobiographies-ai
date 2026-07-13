// app/components/Footer.tsx
"use client";

import Link from "next/link";
import { JSX } from "react/jsx-runtime";

export function Footer(): JSX.Element {
  const currentYear: number = new Date().getFullYear();

  return (
    <footer className="border-t border-line/70 bg-cream/60 mt-24">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="text-display text-3xl">
            Autobiographies<span className="text-forest">.ai</span>
          </div>
          <p className="mt-4 max-w-sm text-ink-mute text-sm leading-relaxed">
            Every life deserves to be remembered beautifully. We help families
            gather memories and turn them into tributes worth keeping forever.
          </p>
        </div>
        <div>
          <p className="eyebrow mb-4">Explore</p>
          <ul className="space-y-2 text-sm text-ink-soft">
            <li>
              <Link href="/how-it-works" className="hover:text-ink">
                How it works
              </Link>
            </li>
            <li>
              <Link href="/examples" className="hover:text-ink">
                Stories
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-ink">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-ink">
                About
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">Support</p>
          <ul className="space-y-2 text-sm text-ink-soft">
            <li>
              <Link href="/faq" className="hover:text-ink">
                Questions
              </Link>
            </li>
            <li>
              <a
                href="mailto:hello@autobiographies.ai"
                className="hover:text-ink"
              >
                hello@autobiographies.ai
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line/60">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-ink-mute">
          <p>&copy; {currentYear} Autobiographies.ai — Made with care.</p>
          <p className="text-editorial">
            &quot;To live in hearts we leave behind is not to die.&quot; —
            Thomas Campbell
          </p>
        </div>
      </div>
    </footer>
  );
}
