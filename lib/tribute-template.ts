import type { TributeData } from "./tribute-store";

export type Tribute = {
  headline: string;
  obituary: string;
  eulogy: string;
  shortMemorial: string;
  celebrationSpeech: string;
  socialPost: string;
  programSummary: string;
  meaningfulQuote: string;
  timeline: { year: string; event: string }[];
};

const firstName = (full: string) => full.trim().split(/\s+/)[0] || "They";
const yearOf = (iso: string) =>
  iso && /^\d{4}/.test(iso) ? iso.slice(0, 4) : "";
const fmtDate = (iso: string) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const join = (parts: (string | undefined | null | false)[], sep = " ") =>
  parts.filter((p): p is string => Boolean(p && p.trim())).join(sep);

const para = (lines: (string | undefined | null | false)[]) =>
  lines.filter((l): l is string => Boolean(l && l.trim())).join(" ");

export function buildTributeFromTemplate(d: TributeData): Tribute {
  const name = d.fullName.trim() || "Our beloved";
  const first = firstName(name);
  const nick = d.nickname.trim();
  const displayName = nick ? `${name} "${nick}"` : name;
  const born = fmtDate(d.birthDate);
  const died = fmtDate(d.deathDate);
  const bYear = yearOf(d.birthDate);
  const dYear = yearOf(d.deathDate);
  const lifespan = join([bYear, dYear], " – ");
  const pronoun = "they";
  const poss = "their";

  const headline = join(
    [`Remembering ${name}`, lifespan && `(${lifespan})`],
    " ",
  );

  const obituary = [
    para([
      `${name}${born ? `, born ${born}${d.birthplace ? ` in ${d.birthplace}` : ""}` : ""}${died ? `, passed away on ${died}` : ""}${d.residence ? ` in ${d.residence}` : ""}.`,
      d.personality && `${first} was ${d.personality}.`,
      d.values && `Above all, ${pronoun} valued ${d.values}.`,
    ]),
    para([
      d.education && `${first} was educated at ${d.education}.`,
      d.career && `${d.career}.`,
      d.achievements && `Among ${poss} accomplishments: ${d.achievements}.`,
      d.milestones &&
        `Life took ${first} through many moments — ${d.milestones}.`,
    ]),
    para([
      d.passions && `${first} loved ${d.passions}.`,
      d.humor &&
        `Those who knew ${pronoun} remember ${poss} humor — ${d.humor}.`,
      d.quirks && `And the small things: ${d.quirks}.`,
      d.favoriteSaying &&
        `${first} was often heard saying, ${d.favoriteSaying}.`,
    ]),
    para([
      d.spouse && `${first} is remembered by ${d.spouse}.`,
      d.children && `Children: ${d.children}.`,
      d.parents && `Parents: ${d.parents}.`,
      d.siblings && `Siblings: ${d.siblings}.`,
      d.survivedBy && `${first} is survived by ${d.survivedBy}.`,
    ]),
    para([
      d.legacy && `${first} leaves behind ${d.legacy}.`,
      d.faith && d.faith,
      d.service && `A service will be held: ${d.service}.`,
      d.memorialWishes && `${d.memorialWishes}.`,
    ]),
  ]
    .filter(Boolean)
    .join("\n\n");

  const eulogy = [
    `We gather today to remember ${displayName}.`,
    para([
      d.personality && `${first} was ${d.personality}.`,
      d.values && `${first} believed in ${d.values}.`,
    ]),
    para([
      d.milestones &&
        `${first}'s life carried ${pronoun} through ${d.milestones}.`,
      d.career && `In work, ${d.career}.`,
      d.achievements && `${first} gave us ${d.achievements}.`,
    ]),
    para([
      d.passions && `${first} found joy in ${d.passions}.`,
      d.quirks && `We'll remember ${d.quirks}.`,
      d.humor && `And that humor — ${d.humor}.`,
    ]),
    para([
      d.spouse && `To ${d.spouse}, and`,
      d.children && `to ${d.children},`,
      d.survivedBy && `and to ${d.survivedBy} —`,
      `${first}'s love is not gone; it is now yours to carry.`,
    ]),
    d.favoriteSaying && `As ${first} would say, ${d.favoriteSaying}`,
    `Rest well, ${first}. You are loved.`,
  ]
    .filter(Boolean)
    .join("\n\n");

  const shortMemorial =
    para([
      `${displayName}${lifespan ? `, ${lifespan}` : ""}.`,
      d.personality && `${first} was ${d.personality}.`,
      d.legacy && `${first} leaves ${d.legacy}.`,
    ]) || `${displayName}. Loved, and remembered.`;

  const celebrationSpeech = [
    `Today is not a goodbye — it's a thank-you for the life of ${displayName}.`,
    para([
      d.personality && `${first} was ${d.personality},`,
      d.passions && `and loved ${d.passions}.`,
    ]),
    para([
      d.achievements && `${first} gave us ${d.achievements}.`,
      d.humor && `And made us laugh — ${d.humor}.`,
    ]),
    `Let's remember ${first} the way ${pronoun} would want: fully, warmly, together.`,
  ]
    .filter(Boolean)
    .join("\n\n");

  const socialPost = para([
    `With love, we share the passing of ${displayName}${died ? ` on ${died}` : ""}.`,
    d.personality && `${first} was ${d.personality}.`,
    d.service && `Service: ${d.service}.`,
    d.memorialWishes && `${d.memorialWishes}.`,
  ]);

  const programSummary = para([
    `${displayName}${lifespan ? ` (${lifespan})` : ""}${d.birthplace ? `, born in ${d.birthplace}` : ""}${d.residence ? `, of ${d.residence}` : ""}.`,
    d.career,
    d.legacy && `${first} leaves ${d.legacy}.`,
  ]);

  const meaningfulQuote = d.favoriteSaying?.trim()
    ? d.favoriteSaying.replace(/^["']|["']$/g, "")
    : d.legacy?.trim()
      ? `They leave ${d.legacy}.`
      : `A life measured in the people they loved.`;

  const timeline: { year: string; event: string }[] = [];
  if (bYear)
    timeline.push({
      year: bYear,
      event: `Born${d.birthplace ? ` in ${d.birthplace}` : ""}.`,
    });
  if (d.education) timeline.push({ year: "—", event: d.education });
  if (d.career) timeline.push({ year: "—", event: d.career });
  if (d.milestones) {
    d.milestones
      .split(/\n|;|\. /)
      .map((m) => m.trim())
      .filter(Boolean)
      .slice(0, 3)
      .forEach((m) =>
        timeline.push({ year: "—", event: m.replace(/\.$/, "") }),
      );
  }
  if (d.achievements) timeline.push({ year: "—", event: d.achievements });
  if (dYear)
    timeline.push({
      year: dYear,
      event: `Passed away${d.residence ? ` in ${d.residence}` : ""}.`,
    });

  return {
    headline: headline || `Remembering ${name}`,
    obituary,
    eulogy,
    shortMemorial,
    celebrationSpeech,
    socialPost,
    programSummary,
    meaningfulQuote,
    timeline,
  };
}
