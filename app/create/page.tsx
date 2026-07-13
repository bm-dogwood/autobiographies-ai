// "use client";

// import { useState, useEffect, useMemo, useRef, type ChangeEvent } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { STEPS, TONES, useTribute, type Tone, type TributeData } from "@/lib/tribute-store";
// import { generateTribute, type Tribute } from "@/lib/tribute.functions";

// // Metadata would be in a separate file or using Next.js metadata API
// // For client components, you'd use next/head or layout.tsx

// type FieldKey = keyof TributeData;

// export default function CreatePage() {
//   const router = useRouter();
//   const { step, data, set, setStep, reset } = useTribute();
//   const [tribute, setTribute] = useState<Tribute | null>(null);
//   const [isGenerating, setIsGenerating] = useState(false);

//   const total = STEPS.length;
//   const progress = ((step + 1) / total) * 100;

//   const isLast = step === total - 1;
//   const canNext = useMemo(() => {
//     if (step === 0) return data.fullName.trim().length > 0;
//     return true;
//   }, [step, data.fullName]);

//   const handleGenerate = async () => {
//     setIsGenerating(true);
//     try {
//       const result = await generateTribute({ data });
//       setTribute(result as Tribute);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     } catch (error) {
//       console.error("Failed to generate tribute:", error);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   if (tribute) {
//     return (
//       <TributeOutput
//         tribute={tribute}
//         personName={data.fullName}
//         onReset={() => {
//           setTribute(null);
//           reset();
//         }}
//       />
//     );
//   }

//   return (
//     <div className="min-h-dvh parchment-bg pt-28 pb-24">
//       <div className="mx-auto max-w-4xl px-6">
//         <div className="flex items-center justify-between mb-6">
//           <Link href="/" className="eyebrow hover:text-ink transition">
//             ← Home
//           </Link>
//           <p className="eyebrow">Step {step + 1} of {total} · Autosaved</p>
//         </div>

//         {/* Progress bar */}
//         <div className="h-[2px] w-full bg-line/60 rounded-full overflow-hidden mb-2">
//           <motion.div
//             className="h-full bg-forest"
//             animate={{ width: `${progress}%` }}
//             transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//           />
//         </div>

//         {/* Step navigation */}
//         <div className="flex flex-wrap gap-x-6 gap-y-2 mb-10 text-xs text-ink-mute">
//           {STEPS.map((s, i) => (
//             <button
//               key={s}
//               onClick={() => setStep(i)}
//               className={`transition ${i === step ? "text-forest" : "hover:text-ink"}`}
//             >
//               {i + 1}. {s}
//             </button>
//           ))}
//         </div>

//         {/* Step content */}
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={step}
//             initial={{ opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -12 }}
//             transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
//             className="soft-card p-8 md:p-12"
//           >
//             {step === 0 && <StepBasics data={data} set={set} />}
//             {step === 1 && <StepFamily data={data} set={set} />}
//             {step === 2 && <StepLife data={data} set={set} />}
//             {step === 3 && <StepPersonality data={data} set={set} />}
//             {step === 4 && <StepLegacy data={data} set={set} />}
//             {step === 5 && <StepPhoto data={data} set={set} />}
//             {step === 6 && <StepReview data={data} set={set} />}
//           </motion.div>
//         </AnimatePresence>

//         {/* Navigation buttons */}
//         <div className="mt-8 flex flex-wrap justify-between gap-3">
//           <motion.button
//             onClick={() => setStep(Math.max(0, step - 1))}
//             disabled={step === 0}
//             className="rounded-full border border-line px-6 py-3 text-sm text-ink hover:bg-cream disabled:opacity-30 disabled:cursor-not-allowed transition"
//             whileHover={{ x: -4 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             ← Back
//           </motion.button>

//           {!isLast ? (
//             <motion.button
//               onClick={() => setStep(Math.min(total - 1, step + 1))}
//               disabled={!canNext}
//               className="rounded-full bg-forest px-6 py-3 text-sm text-ivory hover:bg-forest-soft disabled:opacity-40 disabled:cursor-not-allowed transition"
//               whileHover={{ x: 4 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               Continue →
//             </motion.button>
//           ) : (
//             <GenerateButton onGenerate={handleGenerate} isLoading={isGenerating} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // Generate Button Component
// function GenerateButton({
//   onGenerate,
//   isLoading
// }: {
//   onGenerate: () => Promise<void>;
//   isLoading: boolean;
// }) {
//   const [err, setErr] = useState<string | null>(null);

//   const handleClick = async () => {
//     setErr(null);
//     try {
//       await onGenerate();
//     } catch (e) {
//       setErr(e instanceof Error ? e.message : "Something went wrong.");
//     }
//   };

//   return (
//     <div className="flex flex-col items-end gap-2">
//       {err && (
//         <motion.p
//           initial={{ opacity: 0, y: -8 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-xs text-destructive"
//         >
//           {err}
//         </motion.p>
//       )}
//       <motion.button
//         onClick={handleClick}
//         disabled={isLoading}
//         className="rounded-full bg-forest px-7 py-3 text-sm text-ivory hover:bg-forest-soft disabled:opacity-50 transition inline-flex items-center gap-2"
//         whileHover={{ scale: 1.02 }}
//         whileTap={{ scale: 0.98 }}
//       >
//         {isLoading ? (
//           <>
//             <motion.span
//               className="h-2 w-2 rounded-full bg-ivory"
//               animate={{ scale: [1, 1.5, 1] }}
//               transition={{ duration: 0.8, repeat: Infinity }}
//             />
//             Writing your tribute…
//           </>
//         ) : (
//           <>Write the tribute ✨</>
//         )}
//       </motion.button>
//     </div>
//   );
// }

// // ============================================
// // Shared Components
// // ============================================

// function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
//   return (
//     <label className="block">
//       <span className="eyebrow">{label}</span>
//       {hint && <p className="text-sm text-ink-mute mt-1">{hint}</p>}
//       <div className="mt-2">{children}</div>
//     </label>
//   );
// }

// function TextInput({
//   value,
//   onChange,
//   placeholder,
//   type = "text"
// }: {
//   value: string;
//   onChange: (v: string) => void;
//   placeholder?: string;
//   type?: string;
// }) {
//   return (
//     <input
//       type={type}
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       placeholder={placeholder}
//       className="w-full bg-transparent border-b border-line focus:border-forest outline-none py-2 text-lg placeholder:text-ink-mute/60 transition"
//     />
//   );
// }

// function TextArea({
//   value,
//   onChange,
//   placeholder,
//   rows = 3
// }: {
//   value: string;
//   onChange: (v: string) => void;
//   placeholder?: string;
//   rows?: number;
// }) {
//   return (
//     <textarea
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       placeholder={placeholder}
//       rows={rows}
//       className="w-full bg-ivory/60 border border-line rounded-xl focus:border-forest outline-none p-3 text-base placeholder:text-ink-mute/60 transition resize-none"
//     />
//   );
// }

// type StepProps = {
//   data: TributeData;
//   set: <K extends keyof TributeData>(k: K, v: TributeData[K]) => void;
// };

// function StepHeader({
//   eyebrow,
//   title,
//   sub
// }: {
//   eyebrow: string;
//   title: string;
//   sub: string;
// }) {
//   return (
//     <div className="mb-8">
//       <p className="eyebrow">{eyebrow}</p>
//       <h1 className="mt-3 text-display text-3xl md:text-5xl">{title}</h1>
//       <p className="mt-3 text-ink-soft max-w-xl">{sub}</p>
//     </div>
//   );
// }

// // ============================================
// // Step Components
// // ============================================

// function StepBasics({ data, set }: StepProps) {
//   return (
//     <>
//       <StepHeader
//         eyebrow="Step 1 · Basics"
//         title="Let's start with their name."
//         sub="A few gentle details to anchor the story. Only the name is required — everything else can be added or skipped as you like."
//       />
//       <div className="grid gap-6 md:grid-cols-2">
//         <Field label="Full name *">
//           <TextInput
//             value={data.fullName}
//             onChange={(v) => set("fullName", v)}
//             placeholder="Eleanor Margaret Hayes"
//           />
//         </Field>
//         <Field label="Nickname or how they were known">
//           <TextInput
//             value={data.nickname}
//             onChange={(v) => set("nickname", v)}
//             placeholder="Ellie"
//           />
//         </Field>
//         <Field label="Date of birth">
//           <TextInput
//             type="date"
//             value={data.birthDate}
//             onChange={(v) => set("birthDate", v)}
//           />
//         </Field>
//         <Field label="Date of passing">
//           <TextInput
//             type="date"
//             value={data.deathDate}
//             onChange={(v) => set("deathDate", v)}
//           />
//         </Field>
//         <Field label="Place of birth">
//           <TextInput
//             value={data.birthplace}
//             onChange={(v) => set("birthplace", v)}
//             placeholder="Galway, Ireland"
//           />
//         </Field>
//         <Field label="Where they lived">
//           <TextInput
//             value={data.residence}
//             onChange={(v) => set("residence", v)}
//             placeholder="Portland, Oregon"
//           />
//         </Field>
//       </div>
//     </>
//   );
// }

// function StepFamily({ data, set }: StepProps) {
//   return (
//     <>
//       <StepHeader
//         eyebrow="Step 2 · Family"
//         title="The people who loved them."
//         sub="Names and relationships — no need to list everyone, just the ones the tribute should honor."
//       />
//       <div className="grid gap-6 md:grid-cols-2">
//         <Field label="Spouse or partner">
//           <TextInput
//             value={data.spouse}
//             onChange={(v) => set("spouse", v)}
//             placeholder="Thomas, married 52 years"
//           />
//         </Field>
//         <Field label="Parents">
//           <TextInput
//             value={data.parents}
//             onChange={(v) => set("parents", v)}
//             placeholder="Margaret & Patrick O'Connell"
//           />
//         </Field>
//         <div className="md:col-span-2">
//           <Field label="Children">
//             <TextArea
//               value={data.children}
//               onChange={(v) => set("children", v)}
//               placeholder="Sarah, Michael and their families"
//               rows={2}
//             />
//           </Field>
//         </div>
//         <div className="md:col-span-2">
//           <Field label="Siblings">
//             <TextArea
//               value={data.siblings}
//               onChange={(v) => set("siblings", v)}
//               placeholder="Younger brother James (predeceased)"
//               rows={2}
//             />
//           </Field>
//         </div>
//         <div className="md:col-span-2">
//           <Field
//             label="Survived by"
//             hint="Anyone else you want mentioned — grandchildren, close friends, chosen family."
//           >
//             <TextArea
//               value={data.survivedBy}
//               onChange={(v) => set("survivedBy", v)}
//               placeholder="Seven grandchildren, a great-grandson, and countless friends"
//               rows={2}
//             />
//           </Field>
//         </div>
//       </div>
//     </>
//   );
// }

// function StepLife({ data, set }: StepProps) {
//   return (
//     <>
//       <StepHeader
//         eyebrow="Step 3 · Life story"
//         title="What they did with their days."
//         sub="Career, education, milestones. Bullet points are fine — we'll weave them into prose."
//       />
//       <div className="grid gap-6">
//         <Field label="Career or work life">
//           <TextArea
//             value={data.career}
//             onChange={(v) => set("career", v)}
//             placeholder="Elementary school teacher for 34 years in the same district"
//           />
//         </Field>
//         <Field label="Education">
//           <TextArea
//             value={data.education}
//             onChange={(v) => set("education", v)}
//             placeholder="B.A. in English, University of Oregon, 1968"
//             rows={2}
//           />
//         </Field>
//         <Field label="Achievements or accomplishments">
//           <TextArea
//             value={data.achievements}
//             onChange={(v) => set("achievements", v)}
//             placeholder="Founded the neighborhood literacy program that still runs today"
//           />
//         </Field>
//         <Field label="Life milestones" hint="Moves, marriages, adventures, hard-won moments.">
//           <TextArea
//             value={data.milestones}
//             onChange={(v) => set("milestones", v)}
//             placeholder="Emigrated at 19, raised three children, walked the Camino at 68"
//             rows={4}
//           />
//         </Field>
//       </div>
//     </>
//   );
// }

// function StepPersonality({ data, set }: StepProps) {
//   return (
//     <>
//       <StepHeader
//         eyebrow="Step 4 · Personality"
//         title="Who they were, up close."
//         sub="This is where the tribute comes alive. Small, specific details are more powerful than sweeping ones."
//       />
//       <div className="grid gap-6">
//         <Field label="How would you describe them?">
//           <TextArea
//             value={data.personality}
//             onChange={(v) => set("personality", v)}
//             placeholder="Steadfast, quietly funny, the person who noticed you first in a crowded room"
//           />
//         </Field>
//         <Field label="What did they value most?">
//           <TextArea
//             value={data.values}
//             onChange={(v) => set("values", v)}
//             placeholder="Family, honest work, and a well-made cup of tea"
//             rows={2}
//           />
//         </Field>
//         <Field label="Their sense of humor">
//           <TextArea
//             value={data.humor}
//             onChange={(v) => set("humor", v)}
//             placeholder="Dry, self-deprecating, always had a story about the cat"
//             rows={2}
//           />
//         </Field>
//         <Field label="Little quirks and habits">
//           <TextArea
//             value={data.quirks}
//             onChange={(v) => set("quirks", v)}
//             placeholder="Sang while she cooked; never learned to whistle; kept the same pen for 20 years"
//             rows={2}
//           />
//         </Field>
//         <Field label="A favorite saying">
//           <TextInput
//             value={data.favoriteSaying}
//             onChange={(v) => set("favoriteSaying", v)}
//             placeholder="'Well, we'll see about that.'"
//           />
//         </Field>
//       </div>
//     </>
//   );
// }

// function StepLegacy({ data, set }: StepProps) {
//   return (
//     <>
//       <StepHeader
//         eyebrow="Step 5 · Legacy & wishes"
//         title="What they leave behind."
//         sub="Passions, faith, memorial arrangements — anything you want the tribute to honor."
//       />
//       <div className="grid gap-6">
//         <Field label="Passions & hobbies">
//           <TextArea
//             value={data.passions}
//             onChange={(v) => set("passions", v)}
//             placeholder="Her garden, watercolor Sunday afternoons, Puccini on the record player"
//           />
//         </Field>
//         <Field label="Faith or spirituality">
//           <TextArea
//             value={data.faith}
//             onChange={(v) => set("faith", v)}
//             placeholder="Lifelong Catholic; found God in the small mercies"
//             rows={2}
//           />
//         </Field>
//         <Field label="What legacy do they leave?">
//           <TextArea
//             value={data.legacy}
//             onChange={(v) => set("legacy", v)}
//             placeholder="A family that knows how to sit with each other in silence"
//             rows={3}
//           />
//         </Field>
//         <Field label="Service details">
//           <TextArea
//             value={data.service}
//             onChange={(v) => set("service", v)}
//             placeholder="Memorial gathering Saturday, June 15 at 2pm, St. Mary's Chapel"
//             rows={2}
//           />
//         </Field>
//         <Field label="Memorial wishes" hint="Donations, flowers, requests.">
//           <TextArea
//             value={data.memorialWishes}
//             onChange={(v) => set("memorialWishes", v)}
//             placeholder="In lieu of flowers, donations to the local library"
//             rows={2}
//           />
//         </Field>
//       </div>
//     </>
//   );
// }

// function StepPhoto({ data, set }: StepProps) {
//   const inputRef = useRef<HTMLInputElement>(null);

//   const onFile = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     if (file.size > 5 * 1024 * 1024) {
//       alert("Please choose a photo under 5MB.");
//       return;
//     }
//     const reader = new FileReader();
//     reader.onload = () => set("photoDataUrl", typeof reader.result === "string" ? reader.result : "");
//     reader.readAsDataURL(file);
//   };

//   return (
//     <>
//       <StepHeader
//         eyebrow="Step 6 · Photograph"
//         title="A picture worth keeping."
//         sub="Optional. This appears alongside the printed tribute. Photos stay on your device."
//       />
//       <div className="flex flex-col items-center gap-6">
//         <motion.div
//           className="w-56 h-56 rounded-full overflow-hidden bg-parchment border border-line flex items-center justify-center paper-grain"
//           whileHover={{ scale: 1.02 }}
//           transition={{ duration: 0.3 }}
//         >
//           {data.photoDataUrl ? (
//             // eslint-disable-next-line @next/next/no-img-element
//             <img src={data.photoDataUrl} alt="" className="w-full h-full object-cover" />
//           ) : (
//             <span className="text-ink-mute text-sm">No photo yet</span>
//           )}
//         </motion.div>

//         <input
//           ref={inputRef}
//           type="file"
//           accept="image/*"
//           onChange={onFile}
//           className="hidden"
//         />

//         <div className="flex gap-3">
//           <motion.button
//             onClick={() => inputRef.current?.click()}
//             className="rounded-full bg-forest px-6 py-2.5 text-sm text-ivory hover:bg-forest-soft transition"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             {data.photoDataUrl ? "Choose a different photo" : "Choose a photo"}
//           </motion.button>
//           {data.photoDataUrl && (
//             <motion.button
//               onClick={() => set("photoDataUrl", "")}
//               className="rounded-full border border-line px-6 py-2.5 text-sm hover:bg-cream transition"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Remove
//             </motion.button>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// function StepReview({ data, set }: StepProps) {
//   return (
//     <>
//       <StepHeader
//         eyebrow="Step 7 · Review & write"
//         title="Choose a tone. Then let us begin."
//         sub="You can regenerate as many times as you like."
//       />
//       <div className="mb-8">
//         <p className="eyebrow mb-3">Tone</p>
//         <div className="flex flex-wrap gap-2">
//           {TONES.map((t) => (
//             <motion.button
//               key={t}
//               onClick={() => set("tone", t as Tone)}
//               className={`rounded-full px-5 py-2 text-sm border transition ${
//                 data.tone === t ? "bg-forest text-ivory border-forest" : "border-line text-ink hover:bg-cream"
//               }`}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               {t}
//             </motion.button>
//           ))}
//         </div>
//       </div>
//       <motion.div
//         className="soft-card bg-ivory/70 p-6 md:p-8 space-y-3 text-sm"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.2 }}
//       >
//         <p className="eyebrow">Summary</p>
//         <p className="text-editorial text-2xl text-ink">
//           {data.fullName || "—"}
//           {data.nickname && ` "${data.nickname}"`}
//         </p>
//         <p className="text-ink-soft">
//           {data.birthDate || "?"} — {data.deathDate || "present"} · {data.residence || data.birthplace || "—"}
//         </p>
//         {data.personality && (
//           <p className="text-ink-soft">
//             <span className="eyebrow mr-2">Who</span>
//             {data.personality}
//           </p>
//         )}
//         {data.legacy && (
//           <p className="text-ink-soft">
//             <span className="eyebrow mr-2">Legacy</span>
//             {data.legacy}
//           </p>
//         )}
//       </motion.div>
//     </>
//   );
// }

// // ============================================
// // Output Component
// // ============================================

// type TabKey = "obituary" | "eulogy" | "shortMemorial" | "celebrationSpeech" | "socialPost" | "programSummary";

// const TABS: { key: TabKey; label: string }[] = [
//   { key: "obituary", label: "Obituary" },
//   { key: "eulogy", label: "Eulogy" },
//   { key: "celebrationSpeech", label: "Celebration speech" },
//   { key: "shortMemorial", label: "Short memorial" },
//   { key: "programSummary", label: "Program summary" },
//   { key: "socialPost", label: "Social post" },
// ];

// function TributeOutput({
//   tribute,
//   personName,
//   onReset
// }: {
//   tribute: Tribute;
//   personName: string;
//   onReset: () => void;
// }) {
//   const [tab, setTab] = useState<TabKey>("obituary");
//   const [text, setText] = useState<string>(tribute.obituary);
//   const [copied, setCopied] = useState(false);

//   useEffect(() => {
//     setText(tribute[tab]);
//   }, [tab, tribute]);

//   const copy = async () => {
//     if (typeof navigator === "undefined") return;
//     await navigator.clipboard.writeText(text);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 1600);
//   };

//   const print = () => {
//     if (typeof window !== "undefined") window.print();
//   };

//   return (
//     <div className="min-h-dvh parchment-bg pt-28 pb-24">
//       <div className="mx-auto max-w-4xl px-6">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <p className="eyebrow">A tribute to</p>
//           <h1 className="mt-3 text-display text-4xl md:text-6xl">{personName}</h1>
//           <motion.p
//             className="mt-6 text-editorial text-2xl text-forest max-w-2xl"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//           >
//             "{tribute.meaningfulQuote}"
//           </motion.p>
//           <p className="mt-2 text-ink-mute text-sm">{tribute.headline}</p>
//         </motion.div>

//         <div className="mt-10 flex flex-wrap gap-2 print:hidden">
//           {TABS.map((t) => (
//             <motion.button
//               key={t.key}
//               onClick={() => setTab(t.key)}
//               className={`rounded-full px-4 py-2 text-sm border transition ${
//                 tab === t.key ? "bg-forest text-ivory border-forest" : "border-line hover:bg-cream"
//               }`}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               {t.label}
//             </motion.button>
//           ))}
//         </div>

//         <motion.div
//           key={tab}
//           initial={{ opacity: 0, y: 12 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//           className="mt-6 soft-card p-8 md:p-12 paper-grain"
//         >
//           <textarea
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             rows={Math.max(10, text.split("\n").length + 2)}
//             className="w-full bg-transparent outline-none text-editorial text-xl md:text-2xl leading-relaxed text-ink resize-none"
//           />
//         </motion.div>

//         <div className="mt-4 flex flex-wrap gap-2 print:hidden">
//           <motion.button
//             onClick={copy}
//             className="rounded-full bg-forest px-5 py-2 text-sm text-ivory hover:bg-forest-soft transition"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             {copied ? "Copied ✓" : "Copy"}
//           </motion.button>
//           <motion.button
//             onClick={print}
//             className="rounded-full border border-line px-5 py-2 text-sm hover:bg-cream transition"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Print / Save PDF
//           </motion.button>
//           <motion.button
//             onClick={onReset}
//             className="rounded-full border border-line px-5 py-2 text-sm hover:bg-cream transition"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Start a new tribute
//           </motion.button>
//         </div>

//         {tribute.timeline?.length > 0 && (
//           <motion.div
//             className="mt-16 print:mt-8"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4 }}
//           >
//             <p className="eyebrow">A life in moments</p>
//             <ol className="mt-6 space-y-4 border-l border-line pl-6">
//               {tribute.timeline.map((t, i) => (
//                 <motion.li
//                   key={i}
//                   className="relative"
//                   initial={{ opacity: 0, x: -10 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.5 + i * 0.05 }}
//                 >
//                   <span className="absolute -left-[29px] top-2 h-2 w-2 rounded-full bg-forest" />
//                   <p className="eyebrow">{t.year}</p>
//                   <p className="text-ink text-lg">{t.event}</p>
//                 </motion.li>
//               ))}
//             </ol>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }
