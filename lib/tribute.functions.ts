// import { NextRequest, NextResponse } from "next/server";
// import { generateText, Output, NoObjectGeneratedError } from "ai";
// import { z } from "zod";
// import { createLovableAiGatewayProvider } from "./ai-gateway.server";

// const tributeSchema = z.object({
//   headline: z.string(),
//   obituary: z.string(),
//   eulogy: z.string(),
//   shortMemorial: z.string(),
//   celebrationSpeech: z.string(),
//   socialPost: z.string(),
//   programSummary: z.string(),
//   meaningfulQuote: z.string(),
//   timeline: z.array(z.object({ year: z.string(), event: z.string() })),
// });

// export type Tribute = z.infer<typeof tributeSchema>;

// const InputSchema = z.object({
//   fullName: z.string().min(1),
//   nickname: z.string().optional().default(""),
//   birthDate: z.string().optional().default(""),
//   deathDate: z.string().optional().default(""),
//   birthplace: z.string().optional().default(""),
//   residence: z.string().optional().default(""),
//   spouse: z.string().optional().default(""),
//   children: z.string().optional().default(""),
//   parents: z.string().optional().default(""),
//   siblings: z.string().optional().default(""),
//   survivedBy: z.string().optional().default(""),
//   career: z.string().optional().default(""),
//   education: z.string().optional().default(""),
//   achievements: z.string().optional().default(""),
//   milestones: z.string().optional().default(""),
//   personality: z.string().optional().default(""),
//   values: z.string().optional().default(""),
//   humor: z.string().optional().default(""),
//   quirks: z.string().optional().default(""),
//   favoriteSaying: z.string().optional().default(""),
//   passions: z.string().optional().default(""),
//   faith: z.string().optional().default(""),
//   legacy: z.string().optional().default(""),
//   service: z.string().optional().default(""),
//   memorialWishes: z.string().optional().default(""),
//   tone: z
//     .enum([
//       "Warm",
//       "Formal",
//       "Celebratory",
//       "Traditional",
//       "Religious",
//       "Modern",
//     ])
//     .default("Warm"),
// });

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const data = InputSchema.parse(body);

//     const key = process.env.LOVABLE_API_KEY;
//     if (!key) {
//       return NextResponse.json(
//         { error: "Missing LOVABLE_API_KEY" },
//         { status: 500 },
//       );
//     }

//     const gateway = createLovableAiGatewayProvider(key);
//     const model = gateway("google/gemini-2.5-flash");

//     const toneGuide: Record<string, string> = {
//       Warm: "gentle, tender, and human — warm without being saccharine",
//       Formal: "dignified, classical newspaper obituary style",
//       Celebratory: "life-affirming, joyful, celebrating who they were",
//       Traditional: "reverent, following classic obituary conventions",
//       Religious:
//         "faith-forward, hopeful, referencing spiritual life sensitively",
//       Modern:
//         "conversational, contemporary, unafraid of intimacy and specificity",
//     };

//     const prompt = `You are a compassionate tribute writer for a family who has lost someone they love. Write in a ${data.tone.toLowerCase()} tone: ${toneGuide[data.tone]}. Never generic. Never clichéd. Never mention "AI" or "artificial intelligence". Ground everything in the specific details provided; if a detail is missing, gracefully omit it rather than inventing facts.

// DETAILS ABOUT THE PERSON
// Name: ${data.fullName}${data.nickname ? ` (${data.nickname})` : ""}
// Born: ${data.birthDate || "—"} in ${data.birthplace || "—"}
// Died: ${data.deathDate || "—"}
// Lived in: ${data.residence || "—"}
// Spouse/partner: ${data.spouse || "—"}
// Children: ${data.children || "—"}
// Parents: ${data.parents || "—"}
// Siblings: ${data.siblings || "—"}
// Survived by: ${data.survivedBy || "—"}
// Career: ${data.career || "—"}
// Education: ${data.education || "—"}
// Achievements: ${data.achievements || "—"}
// Milestones: ${data.milestones || "—"}
// Personality: ${data.personality || "—"}
// Values: ${data.values || "—"}
// Sense of humor: ${data.humor || "—"}
// Quirks & habits: ${data.quirks || "—"}
// Favorite saying: ${data.favoriteSaying || "—"}
// Passions & hobbies: ${data.passions || "—"}
// Faith / spirituality: ${data.faith || "—"}
// Legacy: ${data.legacy || "—"}
// Service details: ${data.service || "—"}
// Memorial wishes: ${data.memorialWishes || "—"}

// WHAT TO PRODUCE
// - headline: a short, editorial headline (max ~10 words)
// - obituary: a full newspaper-style obituary, 3–5 warm paragraphs
// - eulogy: a spoken eulogy for a memorial service, 4–6 paragraphs, in the voice of a close family member
// - shortMemorial: a 2–3 sentence short memorial suitable for a program card
// - celebrationSpeech: a shorter, more uplifting speech (2–3 paragraphs)
// - socialPost: a heartfelt social post announcement (under 90 words)
// - programSummary: a one-paragraph summary for a memorial program
// - meaningfulQuote: one short original line that captures who they were (under 25 words, no attribution)
// - timeline: 5–8 key life events as { year, event }; use best-effort years derived from provided dates or "—" if unknown

// Write with restraint and specificity. Prefer concrete images over abstractions.`;

//     try {
//       const { output } = await generateText({
//         model,
//         output: Output.object({ schema: tributeSchema }),
//         prompt,
//       });

//       return NextResponse.json(output);
//     } catch (error) {
//       if (NoObjectGeneratedError.isInstance(error)) {
//         try {
//           const parsed = JSON.parse(error.text ?? "{}");
//           const validated = tributeSchema.parse(parsed);
//           return NextResponse.json(validated);
//         } catch {
//           return NextResponse.json(
//             {
//               error:
//                 "The writer had trouble finishing this draft. Please try again.",
//             },
//             { status: 500 },
//           );
//         }
//       }
//       throw error;
//     }
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return NextResponse.json(
//         { error: "Invalid input data", details: error.errors },
//         { status: 400 },
//       );
//     }

//     console.error("Tribute generation error:", error);
//     return NextResponse.json(
//       { error: "An unexpected error occurred" },
//       { status: 500 },
//     );
//   }
// }
