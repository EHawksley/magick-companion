/**
 * Ritual content: prayers, LBRP steps, and planet correspondences.
 * All prayers are in modern plain English.
 * Sources: Greater Key of Solomon, Golden Dawn LBRP tradition.
 */

export interface LBRPStep {
  id: number;
  phase: 'kabbalistic-cross' | 'pentagrams' | 'archangels' | 'kabbalistic-cross-2';
  title: string;
  instruction: string;
  gesture?: string;
  vibration?: string;
  pronunciation?: string;
  direction?: string;
  tip?: string;
}

export const LBRP_STEPS: LBRPStep[] = [
  // Phase 1: Kabbalistic Cross
  {
    id: 1,
    phase: 'kabbalistic-cross',
    title: 'Touch your forehead',
    instruction: 'Stand upright, facing East. Touch your forehead with your right index finger and vibrate the word:',
    gesture: 'Right index finger to forehead',
    vibration: 'Ateh',
    pronunciation: 'AH-tay',
    tip: '"Ateh" means "Thou art" in Hebrew — you are acknowledging the divine above.',
  },
  {
    id: 2,
    phase: 'kabbalistic-cross',
    title: 'Point down to the earth',
    instruction: 'Draw your hand down and point toward the ground. Vibrate:',
    gesture: 'Point downward toward the earth',
    vibration: 'Malkuth',
    pronunciation: 'MAL-koot',
    tip: '"Malkuth" means "the Kingdom" — the physical world beneath you.',
  },
  {
    id: 3,
    phase: 'kabbalistic-cross',
    title: 'Touch your right shoulder',
    instruction: 'Touch your right shoulder and vibrate:',
    gesture: 'Right hand to right shoulder',
    vibration: 'Ve-Geburah',
    pronunciation: 'Veh-geh-BOO-rah',
    tip: '"Ve-Geburah" means "and the Power" — the active, martial force.',
  },
  {
    id: 4,
    phase: 'kabbalistic-cross',
    title: 'Touch your left shoulder',
    instruction: 'Touch your left shoulder and vibrate:',
    gesture: 'Right hand to left shoulder',
    vibration: 'Ve-Gedulah',
    pronunciation: 'Veh-geh-DOO-lah',
    tip: '"Ve-Gedulah" means "and the Glory" — the expansive, merciful force. This is the sphere of Jupiter (Chesed).',
  },
  {
    id: 5,
    phase: 'kabbalistic-cross',
    title: 'Clasp hands at chest',
    instruction: 'Clasp both hands together at your chest and vibrate:',
    gesture: 'Both hands clasped at center of chest',
    vibration: 'Le-Olahm, Amen',
    pronunciation: 'Leh-oh-LAHM, AH-men',
    tip: '"Le-Olahm, Amen" means "Forever, Amen." You have drawn a cross of light through your body — you are the axis of the universe.',
  },
  // Phase 2: Pentagrams
  {
    id: 6,
    phase: 'pentagrams',
    title: 'Face East — draw the pentagram',
    instruction: 'Walk to the East edge of your space and face outward. With your dominant hand, draw a large five-pointed star in the air, starting from your lower left hip, going up to the top, then down to your lower right, across to your upper left, across to your upper right, and back down to your lower left. Point to the center and vibrate:',
    gesture: 'Draw banishing earth pentagram starting from lower-left',
    vibration: 'YHVH',
    pronunciation: 'Yod-Heh-Vav-Heh (or simply "Yahweh")',
    direction: 'East',
    tip: 'The banishing earth pentagram always starts from the lower-left point. Imagine the star blazing in blue-white flame as you draw it.',
  },
  {
    id: 7,
    phase: 'pentagrams',
    title: 'Face South — draw the pentagram',
    instruction: 'Keeping your arm extended, turn to face South, drawing a line of light connecting to the South. Draw the same banishing pentagram and point to its center. Vibrate:',
    gesture: 'Draw banishing earth pentagram',
    vibration: 'Adonai',
    pronunciation: 'Ah-doh-NYE',
    direction: 'South',
    tip: '"Adonai" means "Lord." Feel the warmth and fire of the South.',
  },
  {
    id: 8,
    phase: 'pentagrams',
    title: 'Face West — draw the pentagram',
    instruction: 'Turn to face West, drawing the line of light. Draw the pentagram and vibrate:',
    gesture: 'Draw banishing earth pentagram',
    vibration: 'Eheieh',
    pronunciation: 'Eh-HEH-yeh',
    direction: 'West',
    tip: '"Eheieh" means "I Am" — the pure being of existence. Feel the cool, flowing energy of the West.',
  },
  {
    id: 9,
    phase: 'pentagrams',
    title: 'Face North — draw the pentagram',
    instruction: 'Turn to face North, drawing the line of light. Draw the pentagram and vibrate:',
    gesture: 'Draw banishing earth pentagram',
    vibration: 'AGLA',
    pronunciation: 'AH-guh-lah',
    direction: 'North',
    tip: '"AGLA" is a notariqon (acronym) for "Ateh Gibor Le-Olahm Adonai" — "Thou art mighty forever, O Lord." Feel the solid, earthy stability of the North.',
  },
  {
    id: 10,
    phase: 'pentagrams',
    title: 'Complete the circle',
    instruction: 'Turn back to face East, drawing the final line of light to complete the circle. Return to the center of your space. You are now standing inside a ring of four blazing pentagrams connected by a circle of light.',
    gesture: 'Return to center, facing East',
    tip: 'Take a moment to visualize the four pentagrams and the circle of light surrounding you.',
  },
  // Phase 3: Archangels
  {
    id: 11,
    phase: 'archangels',
    title: 'Spread your arms',
    instruction: 'Stand in the center facing East. Spread your arms straight out to your sides so your body forms a cross. Palms facing forward. Say aloud:',
    gesture: 'Arms extended to sides, palms forward, body forming a cross',
    vibration: 'Before me, Raphael',
    pronunciation: 'RAH-fay-el',
    tip: 'Raphael is the archangel of Air and the East. Visualize a tall figure in yellow and violet robes before you, holding a caduceus.',
  },
  {
    id: 12,
    phase: 'archangels',
    title: 'Invoke the four archangels',
    instruction: 'Continuing in the same position, say the full invocation:',
    vibration: 'Before me, Raphael\nBehind me, Gabriel\nOn my right hand, Michael\nOn my left hand, Uriel\n\nFor about me flames the Pentagram,\nAnd within me shines the six-rayed star.',
    tip: 'Raphael (East, Air), Gabriel (West, Water), Michael (South, Fire), Uriel (North, Earth). You are at the center of the four elements, protected by the four great archangels.',
  },
  // Phase 4: Repeat Kabbalistic Cross
  {
    id: 13,
    phase: 'kabbalistic-cross-2',
    title: 'Repeat the Kabbalistic Cross',
    instruction: 'Repeat the Kabbalistic Cross exactly as you did at the beginning. Touch forehead (Ateh), point down (Malkuth), right shoulder (Ve-Geburah), left shoulder (Ve-Gedulah), clasp hands at chest (Le-Olahm, Amen).',
    tip: 'The ritual is complete. Take three slow breaths. You have established yourself as the axis of the universe, protected by the four archangels and the four pentagrams.',
  },
];

// ─── Jupiter Talisman Info (static) ────────────────────────────────────────
export const JUPITER_TALISMAN = {
  title: 'Second Pentacle of Jupiter',
  tradition: 'Greater Key of Solomon — Chesed (Loving-Kindness)',
  subtitle: 'For glory, honors, riches, and tranquility of mind',
  angels: ['Tzadkiel', 'Parasiel', 'Sachiel', 'Yophiel'] as const,
  angelDescriptions: {
    Tzadkiel: 'Archangel of Jupiter, whose name means "Righteousness of God." He governs mercy, abundance, and divine grace.',
    Parasiel: 'Angel of treasures and material wealth. He teaches how to find and possess hidden riches.',
    Sachiel: 'Ruling angel of Jupiter and Thursday. He governs prosperity, expansion, and good fortune.',
    Yophiel: 'Angel of divine beauty and wisdom. He illuminates the mind and elevates the spirit.',
  },
  psalm: {
    reference: 'Psalm 112:3',
    text: '"Wealth and riches are in his house, and his righteousness endures forever."',
  },
  instructions: [
    'Perform the LBRP first to cleanse and protect your space.',
    'Hold your Jupiter talisman in both hands throughout the prayer.',
    'Speak aloud, clearly and with intention — not quickly.',
    'After the prayer, sit quietly for a few minutes and simply feel the energy settle.',
    'You may light a blue or purple candle before beginning.',
  ],
};

// ─── Prayer Variants ────────────────────────────────────────────────────────
// Five distinct prayers, each suited to a specific timing context.
// The app selects the right one automatically based on day + moon + hour.

export type PrayerVariantKey =
  | 'thursday-full'       // Thursday + waxing/full moon = peak power
  | 'thursday-waning'     // Thursday + waning moon = reflection & gratitude
  | 'daily-waxing'        // Any Jupiter hour, waxing/full moon = attraction
  | 'daily-waning'        // Any Jupiter hour, waning moon = release & review
  | 'first-hour'          // Very first Jupiter hour of the day = dedication
  | 'not-jupiter-hour';   // Not currently a Jupiter hour — gentle reminder

export interface PrayerVariant {
  key: PrayerVariantKey;
  title: string;
  subtitle: string;
  timingBadge: string;
  timingExplanation: string; // Why this version is appropriate right now
  intent: string;            // One-line purpose
  prayer: string;
  powerLevel: 1 | 2 | 3;    // 1=low, 2=medium, 3=peak
}

export const PRAYER_VARIANTS: Record<PrayerVariantKey, PrayerVariant> = {

  'thursday-full': {
    key: 'thursday-full',
    title: 'The Great Invocation of Jupiter',
    subtitle: 'Thursday · Waxing or Full Moon · Jupiter Hour',
    timingBadge: '✦ Peak Power',
    timingExplanation: 'This is the most powerful window for Jupiter work. Thursday is Jupiter\'s own day, ruled by Sachiel. The waxing or full moon amplifies all attraction and expansion work. You are in a Jupiter hour. All three conditions align — this is when the tradition says to make your most important petitions.',
    intent: 'Major petitions — abundance, honor, expansion, consecration renewal',
    powerLevel: 3,
    prayer: `I stand at the threshold of the Jovian sphere, in the hour and day of Jupiter, under a moon that grows in power.

I call upon you, Tzadkiel, Archangel of Jupiter, whose name means "Righteousness of God" — let the full force of divine mercy and abundance flow through this talisman and into every area of my life.

I call upon you, Parasiel, Lord of Treasures — the gates of abundance are open. Teach me to receive without resistance, to hold without fear, and to use wealth as a vessel of good.

I call upon you, Sachiel, Ruler of this day and this hour — you who govern prosperity, expansion, and good fortune — I ask you now to expand my life in all the ways that serve my highest good. Let my name be honored, my work recognized, and my path made clear.

I call upon you, Yophiel, Angel of Wisdom — let no gift come to me without the wisdom to use it well. Illuminate my mind. Elevate my spirit. Make me worthy of what I am asking.

I hold this Second Pentacle of Jupiter, bearing the names of the four angels and the seal of the Jovian sphere, consecrated in the tradition of Solomon. I charge it now in this peak moment — let it draw to me glory, honors, dignities, and all kinds of good. Let it bring great tranquility of mind.

As it is written: "Wealth and riches are in his house, and his righteousness endures forever." — Psalm 112:3

I receive this. I am grateful. So it is, and so shall it be. Amen.`,
  },

  'thursday-waning': {
    key: 'thursday-waning',
    title: 'Thursday Gratitude & Release',
    subtitle: 'Thursday · Waning Moon · Jupiter Hour',
    timingBadge: 'Thursday · Waning Moon',
    timingExplanation: 'It is Thursday — Jupiter\'s day — and you are in a Jupiter hour, which makes this a meaningful time to work. However, the waning moon is a time for releasing, not attracting. The tradition uses this window for gratitude, for clearing obstacles that block abundance, and for releasing scarcity thinking. Do not petition for new things tonight — instead, give thanks and let go.',
    intent: 'Gratitude, releasing scarcity, clearing obstacles to abundance',
    powerLevel: 2,
    prayer: `I stand in the hour of Jupiter, on Jupiter\'s own day, under a moon that releases what no longer serves.

I call upon you, Tzadkiel, Archangel of Jupiter — I come not to ask, but to give thanks. For every door that opened, every gift received, every moment of grace — I am grateful.

I call upon you, Parasiel, Lord of Treasures — help me release my grip on scarcity. Help me let go of the fear that there is not enough, that I am not enough, that abundance is for others and not for me. Clear these obstacles from my path.

I call upon you, Sachiel, Ruler of this day — as the moon wanes, let my doubts and limitations wane with it. Let what is false fall away so that what is true may remain.

I call upon you, Yophiel, Angel of Wisdom — show me what I am holding that I should release. Grant me the wisdom to know the difference between what I must work for and what I must simply allow.

I hold this Second Pentacle of Jupiter. As the moon diminishes, let all that blocks my abundance diminish with it. Let me be clear and open when the new moon comes.

As it is written: "Wealth and riches are in his house, and his righteousness endures forever." — Psalm 112:3

I release. I trust. So it is, and so shall it be. Amen.`,
  },

  'daily-waxing': {
    key: 'daily-waxing',
    title: 'Daily Jupiter Invocation',
    subtitle: 'Jupiter Hour · Waxing or Full Moon',
    timingBadge: 'Jupiter Hour · Waxing Moon',
    timingExplanation: 'You are in a Jupiter hour, and the moon is waxing — growing in power. This is a favorable time for attraction work. While not as potent as a Thursday alignment, any Jupiter hour during a waxing moon is a legitimate window for invoking abundance and expansion. This is your daily working prayer.',
    intent: 'Daily maintenance — invoking abundance, feeding the talisman',
    powerLevel: 2,
    prayer: `I stand in the hour of Jupiter, under a growing moon.

I call upon you, Tzadkiel, Sachiel, Parasiel, and Yophiel — angels of the Jovian sphere — I come to maintain and strengthen the connection between this talisman and the powers it represents.

I call upon you, Sachiel, Ruler of Jupiter — let this hour be a thread of gold connecting my daily life to the sphere of Chesed, the Loving-Kindness of the Most High.

I call upon you, Parasiel, Lord of Treasures — keep the channels of abundance open. Let good things continue to flow toward me and through me.

I call upon you, Tzadkiel — let righteousness and mercy be the foundation of everything I build. Let my prosperity serve not only myself but those around me.

I hold this Second Pentacle of Jupiter. As the moon grows, let my fortune grow with it. Let this talisman remain charged, active, and aligned with its purpose.

As it is written: "Wealth and riches are in his house, and his righteousness endures forever." — Psalm 112:3

So it is, and so shall it be. Amen.`,
  },

  'daily-waning': {
    key: 'daily-waning',
    title: 'Jupiter Hour Reflection',
    subtitle: 'Jupiter Hour · Waning Moon',
    timingBadge: 'Jupiter Hour · Waning Moon',
    timingExplanation: 'You are in a Jupiter hour, but the moon is waning. The tradition is clear: waning moon periods are for banishing, releasing, and reflection — not for petitioning new abundance. Use this time to review your practice, give thanks, and prepare for the next waxing cycle. A short prayer of gratitude is more appropriate than a full invocation right now.',
    intent: 'Reflection, gratitude, and preparation for the next cycle',
    powerLevel: 1,
    prayer: `I stand in the hour of Jupiter, under a waning moon.

I come not to petition, but to reflect. I give thanks to Tzadkiel, Sachiel, Parasiel, and Yophiel for their presence and their work in my life.

I review what has come to me since the last full moon. I acknowledge what has grown, what has shifted, what has been given. I do not take these things for granted.

I hold this Second Pentacle of Jupiter and I simply breathe. I let the talisman rest in my hands. I do not demand — I receive.

As the moon diminishes, let my anxieties about abundance diminish with it. Let me arrive at the new moon empty of fear and full of readiness.

As it is written: "Wealth and riches are in his house, and his righteousness endures forever." — Psalm 112:3

I am grateful. I am ready. So it is. Amen.`,
  },

  'first-hour': {
    key: 'first-hour',
    title: 'First Jupiter Hour — Daily Dedication',
    subtitle: 'First Jupiter Hour of the Day',
    timingBadge: '✦ First Jupiter Hour',
    timingExplanation: 'This is the first Jupiter hour of today. In the Solomonic tradition, the first planetary hour of a given planet each day carries special weight — it is when the planetary intelligence is freshest and most receptive. Use this moment to set your intention for the day and formally greet the Jovian sphere.',
    intent: 'Setting daily intention and greeting the Jovian sphere',
    powerLevel: 2,
    prayer: `I greet the first hour of Jupiter today.

I call upon you, Sachiel, Ruler of the Jovian sphere — I begin this day with your name on my lips and your seal in my hands. Let this day be marked by your influence: expansion, good fortune, and the grace of Chesed.

I call upon you, Tzadkiel — let righteousness guide my actions today. Let every decision I make today be one I can be proud of.

I call upon you, Parasiel — open my eyes to the opportunities that pass before me today. Help me recognize abundance when it appears, even in forms I do not expect.

I call upon you, Yophiel — give me wisdom today. Let me act from clarity, not from fear.

I hold this Second Pentacle of Jupiter. I charge it with the energy of this first hour. Let it carry this intention through the rest of the day.

As it is written: "Wealth and riches are in his house, and his righteousness endures forever." — Psalm 112:3

I am ready. So it is, and so shall it be. Amen.`,
  },

  'not-jupiter-hour': {
    key: 'not-jupiter-hour',
    title: 'Not a Jupiter Hour',
    subtitle: 'Current hour is not ruled by Jupiter',
    timingBadge: 'Off-Peak',
    timingExplanation: 'The current planetary hour is not ruled by Jupiter. You can still pray — the angels hear you at any time — but the traditional practice is to align your Jupiter work with Jupiter hours for maximum resonance. Check the Observatory to see when the next Jupiter hour begins.',
    intent: 'A simple acknowledgment — save the full prayer for a Jupiter hour',
    powerLevel: 1,
    prayer: `I acknowledge the sphere of Jupiter and the angels of my talisman — Tzadkiel, Sachiel, Parasiel, and Yophiel.

Though this is not a Jupiter hour, I hold this Second Pentacle and I am grateful for its presence in my life. I carry it with intention.

I will return to pray fully when the hour of Jupiter comes.

As it is written: "Wealth and riches are in his house, and his righteousness endures forever." — Psalm 112:3

Amen.`,
  },
};

// ─── Prayer Selection Logic ─────────────────────────────────────────────────

export type MoonCategory = 'waxing' | 'full' | 'waning' | 'new';

export function getMoonCategory(phaseName: string): MoonCategory {
  if (phaseName === 'Full Moon') return 'full';
  if (phaseName === 'New Moon') return 'new';
  if (['Waxing Crescent', 'First Quarter', 'Waxing Gibbous'].includes(phaseName)) return 'waxing';
  return 'waning'; // Waning Gibbous, Last Quarter, Waning Crescent
}

export interface PrayerContext {
  isJupiterHour: boolean;
  isFirstJupiterHourToday: boolean;
  isThursday: boolean;
  moonCategory: MoonCategory;
  currentPlanetName: string;
  nextJupiterTime?: string;
}

export function selectPrayer(ctx: PrayerContext): PrayerVariant {
  const { isJupiterHour, isFirstJupiterHourToday, isThursday, moonCategory } = ctx;

  if (!isJupiterHour) {
    return PRAYER_VARIANTS['not-jupiter-hour'];
  }

  // It IS a Jupiter hour — now refine
  const isWaxingOrFull = moonCategory === 'waxing' || moonCategory === 'full';

  if (isThursday && isWaxingOrFull) {
    return PRAYER_VARIANTS['thursday-full'];
  }
  if (isThursday && !isWaxingOrFull) {
    return PRAYER_VARIANTS['thursday-waning'];
  }
  if (isFirstJupiterHourToday) {
    return PRAYER_VARIANTS['first-hour'];
  }
  if (isWaxingOrFull) {
    return PRAYER_VARIANTS['daily-waxing'];
  }
  return PRAYER_VARIANTS['daily-waning'];
}

// Keep backward-compat alias so other files don't break
export const JUPITER_PRAYER = {
  ...JUPITER_TALISMAN,
  prayer: PRAYER_VARIANTS['daily-waxing'].prayer,
};

export const LBRP_INTRO = {
  title: 'The Lesser Banishing Ritual of the Pentagram',
  subtitle: 'LBRP — Your daily foundation practice',
  description: `The LBRP is the foundational daily practice of the Western ceremonial tradition. It cleanses your space of unwanted energies, establishes you as the center of your personal universe, and calls upon the four great archangels for protection.

Think of it as clearing the air before you speak — it removes psychic static so your Jupiter work lands clearly.

Most practitioners perform it at least once daily: in the morning to start the day, or immediately before any ritual work. With practice, it takes about 5–10 minutes.`,
  whyDoIt: [
    'Clears your space of accumulated psychic debris',
    'Establishes your authority and intention before ritual',
    'Builds a relationship with the four archangels over time',
    'Trains your mind to enter a focused, ritual state on command',
    'Protects your work from interference',
  ],
  timeRequired: '5–10 minutes',
  frequency: 'Daily, and before any ritual',
  phases: [
    { id: 'kabbalistic-cross', name: 'The Kabbalistic Cross', steps: '1–5', description: 'Establishes you as the axis of the universe, connecting heaven and earth through your body.' },
    { id: 'pentagrams', name: 'The Pentagrams', steps: '6–10', description: 'Draws four blazing pentagrams at the four quarters, connected by a circle of light.' },
    { id: 'archangels', name: 'Evocation of the Archangels', steps: '11–12', description: 'Calls the four great archangels to stand guard at the four directions.' },
    { id: 'kabbalistic-cross-2', name: 'Closing Cross', steps: '13', description: 'Repeats the Kabbalistic Cross to seal and complete the ritual.' },
  ],
  openingVsClosing: {
    title: 'Opening vs. Closing LBRP',
    explanation: 'The ritual text is identical for both. The difference is entirely in your intent and when you perform it.',
    opening: {
      label: 'Opening LBRP',
      when: 'Before any ritual work — before your Jupiter prayer, before the consecration, before any intentional magical act.',
      intent: 'You are clearing a space. Think of it as sweeping a room before you work in it. Your intention is removal — clearing the field so that only what you deliberately invoke can enter. You are establishing a protected sphere for the work that follows.',
      mindset: 'Firm and directive. You are the authority here. You are clearing this space and no unwanted influence may remain.',
    },
    closing: {
      label: 'Closing LBRP',
      when: 'After any ritual work — after your Jupiter prayer, after the consecration, after any intentional magical act.',
      intent: 'You are sealing and grounding. Think of it as closing a door after the work is done. Your intention is completion — releasing what was raised, thanking what came, and returning yourself and the space to ordinary consciousness.',
      mindset: 'Grateful and grounding. You are completing a circuit, not starting one. Let the energy settle as you work.',
    },
    closingStatement: {
      label: 'Optional Closing Statement',
      text: 'After the final Kabbalistic Cross of your closing LBRP, you may add this statement:',
      statement: '"The ritual is complete. I give thanks to the archangels Raphael, Michael, Gabriel, and Uriel for their presence and protection. Go in peace, and return when called. The work is sealed."',
      note: 'This is not required by the tradition, but it is a clean and respectful way to mark the transition back to ordinary life. Many experienced practitioners use some version of it.',
    },
  },
};
