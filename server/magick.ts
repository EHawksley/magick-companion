/**
 * Magick Companion — tRPC routers
 * Journal entries, dream entries, AI mentor feedback, and practice stats.
 * All AI calls go through the server so the API key stays hidden.
 */
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { dreamEntries, journalEntries } from "../drizzle/schema";
import { invokeLLM } from "./_core/llm";
import { protectedProcedure, router } from "./_core/trpc";
import { getDb } from "./db";

// ── AI helpers ────────────────────────────────────────────────────────────────
async function getJournalAIFeedback(
  entry: { ritualType: string; notes: string; planetaryHour?: string | null; hourNumber?: number | null; isDay?: number | null; moonPhase?: string | null; dayRuler?: string | null; isPlanetDay?: number | null },
  recentEntries: Array<{ ritualType: string; notes: string; planetaryHour?: string | null; moonPhase?: string | null; dayRuler?: string | null; isPlanetDay?: number | null; aiFeedback?: string | null; createdAt: Date }>,
  entryDate: Date
): Promise<string> {
  const recentStr = recentEntries.slice(0, 8).map(e => {
    const tags = [
      e.planetaryHour ? `${e.planetaryHour} hour` : '',
      e.moonPhase ?? '',
      e.dayRuler ? `${e.dayRuler}'s day` : '',
      e.isPlanetDay ? '(planet day)' : '',
    ].filter(Boolean).join(', ');
    return `[${new Date(e.createdAt).toLocaleDateString()}] ${e.ritualType}${tags ? ` (${tags})` : ''}: ${e.notes.slice(0, 200)}`;
  }).join('\n');

  const planetCounts: Record<string, number> = {};
  recentEntries.forEach(e => {
    if (e.planetaryHour) planetCounts[e.planetaryHour] = (planetCounts[e.planetaryHour] ?? 0) + 1;
  });
  const topPlanet = Object.entries(planetCounts).sort((a, b) => b[1] - a[1])[0];
  const patternNote = topPlanet
    ? `Pattern note: this practitioner has logged ${recentEntries.length} entries total. Most common planetary hour during practice: ${topPlanet[0]} (${topPlanet[1]} times).`
    : '';

  const systemPrompt = `You are a knowledgeable and encouraging mentor in Western ceremonial magick, specifically the Solomonic and Golden Dawn traditions. The practitioner is a Capricorn beginner working with the Second Pentacle of Jupiter (Greater Key of Solomon) and learning the LBRP. They are also exploring prayers for all 7 classical planets. Saturn is their chart ruler.

Your role is to:
1. Acknowledge what they did well
2. Identify one or two specific areas for improvement
3. Suggest a concrete next step for their practice
4. If you notice patterns in their practice history, point it out specifically
5. Keep your tone warm, direct, and grounded — not mystical or vague

Keep your response to 3–4 short paragraphs. Be specific to what they actually wrote. Do not lecture about things they didn't mention. ${patternNote}`;

  const userMessage = `Here is my ritual journal entry:

Date: ${entryDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
Ritual: ${entry.ritualType}
${entry.planetaryHour ? `Planetary Hour: ${entry.planetaryHour} (Hour ${entry.hourNumber ?? '?'}, ${entry.isDay ? 'Day' : 'Night'})` : ''}
${entry.moonPhase ? `Moon Phase: ${entry.moonPhase}` : ''}
${entry.dayRuler ? `Day Ruler: ${entry.dayRuler}${entry.isPlanetDay ? " (this is the planet's own day — peak timing)" : ''}` : ''}

My notes:
${entry.notes}

${recentStr ? `My recent practice history:\n${recentStr}` : ''}

Please give me feedback on my practice and suggest what I should focus on next.`;

  const response = await invokeLLM({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage },
    ],
  });
  const c1 = response.choices[0]?.message?.content;
  return (typeof c1 === 'string' ? c1 : null) ?? 'No feedback received.';
}

async function getDreamAIFeedback(
  entry: { dream: string; symbols?: string | null; emotion?: string | null; clarity: number; moonPhase?: string | null; dayRuler?: string | null; hoursAfterRitual?: number | null },
  recentDreams: Array<{ dream: string; moonPhase?: string | null; dayRuler?: string | null; createdAt: Date }>,
  recentRituals: Array<{ ritualType: string; planetaryHour?: string | null; notes: string; createdAt: Date }>,
  entryDate: Date
): Promise<string> {
  const clarityLabels: Record<number, string> = { 1: 'Vague', 2: 'Clear', 3: 'Vivid / Lucid' };
  const ritualStr = recentRituals.slice(0, 5).map(r =>
    `[${new Date(r.createdAt).toLocaleDateString()}] ${r.ritualType}${r.planetaryHour ? ` (${r.planetaryHour} hour)` : ''}: ${r.notes.slice(0, 150)}`
  ).join('\n');
  const dreamStr = recentDreams.slice(0, 5).map(d =>
    `[${new Date(d.createdAt).toLocaleDateString()}] ${d.moonPhase ?? ''} · ${d.dayRuler ?? ''}'s day: ${d.dream.slice(0, 150)}`
  ).join('\n');

  const systemPrompt = `You are a mentor in Western ceremonial magick with deep knowledge of dream symbolism in the Solomonic and Hermetic traditions. The practitioner is a Capricorn beginner working with the Second Pentacle of Jupiter and learning the LBRP.

In these traditions, dreams are a primary communication channel from the planetary intelligences and angels. Dreams occurring within 48 hours of ritual work are especially significant.

Your role is to:
1. Identify any symbols that relate to the planetary work they are doing
2. Note if the dream seems to be a response to recent ritual work
3. Suggest what the dream might indicate about their practice
4. Recommend any follow-up action

Keep your response to 3–4 short paragraphs. Be grounded and specific. If the dream seems unrelated to their practice, say so clearly.`;

  const userMessage = `Here is my dream journal entry:

Date: ${entryDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
Moon Phase: ${entry.moonPhase ?? 'Unknown'}
Day Ruler: ${entry.dayRuler ?? 'Unknown'}
Clarity: ${clarityLabels[entry.clarity] ?? 'Clear'}
${entry.hoursAfterRitual !== null && entry.hoursAfterRitual !== undefined ? `Hours since last ritual: ${entry.hoursAfterRitual}h` : ''}

Dream:
${entry.dream}

${entry.symbols ? `Key symbols I noticed: ${entry.symbols}` : ''}
${entry.emotion ? `Emotional tone: ${entry.emotion}` : ''}

${ritualStr ? `My recent ritual work:\n${ritualStr}` : ''}
${dreamStr ? `My recent dreams:\n${dreamStr}` : ''}

Please analyze this dream in the context of my magical practice.`;

  const response = await invokeLLM({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage },
    ],
  });
  const c2 = response.choices[0]?.message?.content;
  return (typeof c2 === 'string' ? c2 : null) ?? 'No analysis received.';
}

// ── Journal router ────────────────────────────────────────────────────────────
export const journalRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];
    return db.select().from(journalEntries)
      .where(eq(journalEntries.userId, ctx.user.id))
      .orderBy(desc(journalEntries.createdAt))
      .limit(100);
  }),

  create: protectedProcedure
    .input(z.object({
      ritualType: z.string().min(1),
      notes: z.string().min(1),
      planetaryHour: z.string().optional(),
      hourNumber: z.number().optional(),
      isDay: z.boolean().optional(),
      moonPhase: z.string().optional(),
      dayRuler: z.string().optional(),
      isPlanetDay: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database unavailable');

      // Get recent entries for AI context
      const recent = await db.select().from(journalEntries)
        .where(eq(journalEntries.userId, ctx.user.id))
        .orderBy(desc(journalEntries.createdAt))
        .limit(10);

      const now = new Date();
      let aiFeedback: string | null = null;
      try {
        aiFeedback = await getJournalAIFeedback(
          { ...input, isDay: input.isDay ? 1 : 0, isPlanetDay: input.isPlanetDay ? 1 : 0 },
          recent,
          now
        );
      } catch (e) {
        console.error('[AI] Journal feedback failed:', e);
      }

      const [result] = await db.insert(journalEntries).values({
        userId: ctx.user.id,
        ritualType: input.ritualType,
        notes: input.notes,
        aiFeedback,
        planetaryHour: input.planetaryHour ?? null,
        hourNumber: input.hourNumber ?? null,
        isDay: input.isDay !== undefined ? (input.isDay ? 1 : 0) : null,
        moonPhase: input.moonPhase ?? null,
        dayRuler: input.dayRuler ?? null,
        isPlanetDay: input.isPlanetDay !== undefined ? (input.isPlanetDay ? 1 : 0) : null,
      });
      void result;

      const [created] = await db.select().from(journalEntries)
        .where(eq(journalEntries.userId, ctx.user.id))
        .orderBy(desc(journalEntries.createdAt))
        .limit(1);
      return created;
    }),

  update: protectedProcedure
    .input(z.object({ id: z.number(), notes: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database unavailable');
      await db.update(journalEntries)
        .set({ notes: input.notes })
        .where(eq(journalEntries.id, input.id));
      return { success: true };
    }),

  stats: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return { streak: 0, total: 0, lastFocus: null };
    const entries = await db.select().from(journalEntries)
      .where(eq(journalEntries.userId, ctx.user.id))
      .orderBy(desc(journalEntries.createdAt))
      .limit(200);
    const total = entries.length;
    if (!total) return { streak: 0, total: 0, lastFocus: null };
    // Calculate streak
    const days = new Set(entries.map(e => new Date(e.createdAt).toDateString()));
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      if (days.has(d.toDateString())) { streak++; } else if (i > 0) break;
    }
    // Last AI focus
    const lastFeedback = entries.find(e => e.aiFeedback)?.aiFeedback ?? null;
    let lastFocus: string | null = null;
    if (lastFeedback) {
      const lines = lastFeedback.split('\n').filter(l => l.trim().length > 20);
      lastFocus = lines[lines.length - 1]?.slice(0, 150) ?? null;
    }
    return { streak, total, lastFocus };
  }),
});

// ── Dreams router ─────────────────────────────────────────────────────────────
export const dreamsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];
    return db.select().from(dreamEntries)
      .where(eq(dreamEntries.userId, ctx.user.id))
      .orderBy(desc(dreamEntries.createdAt))
      .limit(100);
  }),

  create: protectedProcedure
    .input(z.object({
      dream: z.string().min(1),
      symbols: z.string().optional(),
      emotion: z.string().optional(),
      clarity: z.number().int().min(1).max(3),
      moonPhase: z.string().optional(),
      dayRuler: z.string().optional(),
      hoursAfterRitual: z.number().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database unavailable');

      // Get context for AI
      const recentDreams = await db.select().from(dreamEntries)
        .where(eq(dreamEntries.userId, ctx.user.id))
        .orderBy(desc(dreamEntries.createdAt)).limit(5);
      const recentRituals = await db.select().from(journalEntries)
        .where(eq(journalEntries.userId, ctx.user.id))
        .orderBy(desc(journalEntries.createdAt)).limit(5);

      const now = new Date();
      let aiFeedback: string | null = null;
      try {
        aiFeedback = await getDreamAIFeedback(input, recentDreams, recentRituals, now);
      } catch (e) {
        console.error('[AI] Dream feedback failed:', e);
      }

      await db.insert(dreamEntries).values({
        userId: ctx.user.id,
        dream: input.dream,
        symbols: input.symbols ?? null,
        emotion: input.emotion ?? null,
        clarity: input.clarity,
        moonPhase: input.moonPhase ?? null,
        dayRuler: input.dayRuler ?? null,
        hoursAfterRitual: input.hoursAfterRitual ?? null,
        aiFeedback,
      });

      const [created] = await db.select().from(dreamEntries)
        .where(eq(dreamEntries.userId, ctx.user.id))
        .orderBy(desc(dreamEntries.createdAt)).limit(1);
      return created;
    }),
});
