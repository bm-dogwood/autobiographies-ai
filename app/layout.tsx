// app/layout.tsx
import type { Metadata } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { QueryProvider } from "@/components/QueryProvider";
import { Footer } from "@/components/Footer"; // You'll also need to move Footer to its own file
import "./globals.css";
import { JSX } from "react/jsx-runtime";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title:
    "Autobiographies.ai — Every life deserves to be remembered beautifully",
  description:
    "A gentle, thoughtful way to preserve a life story. Autobiographies.ai helps families craft beautifully written obituaries, eulogies and tributes that celebrate the people we love.",
  authors: [{ name: "Autobiographies.ai" }],
  themeColor: "#f6efe1",
  openGraph: {
    title:
      "Autobiographies.ai — Every life deserves to be remembered beautifully",
    description:
      "Craft beautifully written obituaries, eulogies and tributes that celebrate the people we love.",
    type: "website",
    siteName: "Autobiographies.ai",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${interTight.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <Header />
          <main className="min-h-dvh flex-1">{children}</main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
