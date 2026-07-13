import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Tone =
  | "Warm"
  | "Formal"
  | "Celebratory"
  | "Traditional"
  | "Religious"
  | "Modern";

export type TributeData = {
  // Basics
  fullName: string;
  nickname: string;
  birthDate: string;
  deathDate: string;
  birthplace: string;
  residence: string;
  // Family
  spouse: string;
  children: string;
  parents: string;
  siblings: string;
  survivedBy: string;
  // Life story
  career: string;
  education: string;
  achievements: string;
  milestones: string;
  // Personality
  personality: string;
  values: string;
  humor: string;
  quirks: string;
  favoriteSaying: string;
  // Legacy
  passions: string;
  faith: string;
  legacy: string;
  service: string;
  memorialWishes: string;
  // Photo
  photoDataUrl: string;
  // Review
  tone: Tone;
};

const empty: TributeData = {
  fullName: "",
  nickname: "",
  birthDate: "",
  deathDate: "",
  birthplace: "",
  residence: "",
  spouse: "",
  children: "",
  parents: "",
  siblings: "",
  survivedBy: "",
  career: "",
  education: "",
  achievements: "",
  milestones: "",
  personality: "",
  values: "",
  humor: "",
  quirks: "",
  favoriteSaying: "",
  passions: "",
  faith: "",
  legacy: "",
  service: "",
  memorialWishes: "",
  photoDataUrl: "",
  tone: "Warm",
};

type Store = {
  step: number;
  data: TributeData;
  set: <K extends keyof TributeData>(k: K, v: TributeData[K]) => void;
  setStep: (n: number) => void;
  reset: () => void;
};

export const useTribute = create<Store>()(
  persist(
    (set) => ({
      step: 0,
      data: empty,
      set: (k, v) => set((s) => ({ data: { ...s.data, [k]: v } })),
      setStep: (n) => set({ step: n }),
      reset: () => set({ step: 0, data: empty }),
    }),
    { name: "autobiographies-tribute-draft", version: 1 },
  ),
);

export const STEPS = [
  "Basics",
  "Family",
  "Life story",
  "Personality",
  "Legacy & wishes",
  "Photograph",
  "Review & write",
] as const;

export const TONES: Tone[] = [
  "Warm",
  "Formal",
  "Celebratory",
  "Traditional",
  "Religious",
  "Modern",
];
