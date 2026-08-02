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

export const JUPITER_PRAYER = {
  title: 'Prayer to Jupiter — Second Pentacle',
  subtitle: 'For glory, honors, riches, and tranquility of mind',
  tradition: 'Greater Key of Solomon — Chesed (Loving-Kindness)',
  angels: ['Tzadkiel', 'Parasiel', 'Sachiel', 'Yophiel'],
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
  prayer: `I stand before the powers of Jupiter and the sphere of Chesed, the Loving-Kindness of the Most High.

I call upon you, Tzadkiel, Archangel of Jupiter — let your righteousness and mercy flow through this talisman and into my life.

I call upon you, Parasiel, Lord of Treasures — open the hidden places of abundance and teach me to receive what is rightfully mine.

I call upon you, Sachiel, Ruler of Thursday and the Jovian sphere — expand my fortune, my honor, and my good name.

I call upon you, Yophiel, Angel of Wisdom — illuminate my mind and elevate my spirit so that I may use all gifts with gratitude and wisdom.

I hold this Second Pentacle of Jupiter, consecrated in the tradition of Solomon. May it draw to me glory, honors, dignities, and all kinds of good. May it bring great tranquility of mind.

As it is written: "Wealth and riches are in his house, and his righteousness endures forever." — Psalm 112:3

So it is, and so shall it be. Amen.`,
  instructions: [
    'Perform the LBRP first to cleanse and protect your space.',
    'Hold your Jupiter talisman in both hands throughout the prayer.',
    'Speak aloud, clearly and with intention — not quickly.',
    'The ideal time is during a Jupiter hour on Thursday, with the moon waxing or full.',
    'After the prayer, sit quietly for a few minutes and simply feel the energy settle.',
    'You may light a blue or purple candle before beginning.',
  ],
  bestTiming: 'Thursday, Jupiter hour, waxing or full moon',
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
};

