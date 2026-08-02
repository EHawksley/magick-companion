/**
 * Moon phase calculation using Julian date arithmetic.
 * Returns phase name, illumination percentage, emoji, lunar mansion, and upcoming dates.
 */

export interface MoonPhaseData {
  phaseName: string;
  phaseEmoji: string;
  illumination: number; // 0–1
  age: number; // days since new moon (0–29.53)
  description: string;
  ritualGuidance: string;
  mansion: LunarMansion;
  upcomingDates: UpcomingLunarDate[];
  daysUntilFull: number;
  daysUntilNew: number;
}

export interface LunarMansion {
  number: number; // 1–28
  name: string;
  arabicName: string;
  keywords: string;
  favorable: string;
  unfavorable: string;
  planet: string;
}

export interface UpcomingLunarDate {
  type: 'New Moon' | 'Full Moon' | 'First Quarter' | 'Last Quarter';
  date: Date;
  daysAway: number;
  ritualNote: string;
}

// ── 28 Lunar Mansions (from Picatrix / Agrippa tradition) ─────────────────────
const LUNAR_MANSIONS: LunarMansion[] = [
  { number: 1, name: 'Al-Sharatain', arabicName: 'The Two Signs', planet: 'Saturn', keywords: 'Beginnings, journeys, conflict', favorable: 'Starting new ventures, travel', unfavorable: 'Marriage, partnerships' },
  { number: 2, name: 'Al-Butain', arabicName: 'The Little Belly', planet: 'Saturn', keywords: 'Treasure, hidden things, profit', favorable: 'Finding hidden things, profit', unfavorable: 'Conflict, surgery' },
  { number: 3, name: 'Al-Thurayya', arabicName: 'The Many Little Ones', planet: 'Jupiter', keywords: 'Abundance, ships, sailors', favorable: 'Sea voyages, abundance', unfavorable: 'Enemies, discord' },
  { number: 4, name: 'Al-Dabaran', arabicName: 'The Follower', planet: 'Jupiter', keywords: 'Ruin of buildings, discord', favorable: 'Destruction of enemies', unfavorable: 'Building, planting' },
  { number: 5, name: 'Al-Haqa', arabicName: 'A White Spot', planet: 'Mars', keywords: 'Hunting, learning, eloquence', favorable: 'Hunting, learning', unfavorable: 'Marriage, travel by sea' },
  { number: 6, name: 'Al-Hana', arabicName: 'A Mark', planet: 'Mars', keywords: 'Love, friendship, travel', favorable: 'Love, friendship, travel', unfavorable: 'Enemies, discord' },
  { number: 7, name: 'Al-Dhira', arabicName: 'The Forearm', planet: 'Sun', keywords: 'Profit, gain, friendship', favorable: 'Gain, friendship, love', unfavorable: 'Enemies, discord' },
  { number: 8, name: 'Al-Nathre', arabicName: 'The Gap', planet: 'Sun', keywords: 'Love, friendship, victory', favorable: 'Love, victory in war', unfavorable: 'Journeys, partnerships' },
  { number: 9, name: 'Al-Tarf', arabicName: 'The Glance', planet: 'Venus', keywords: 'Harm, illness, obstacles', favorable: 'Banishing illness', unfavorable: 'Travel, trade' },
  { number: 10, name: 'Al-Jabha', arabicName: 'The Forehead', planet: 'Venus', keywords: 'Love, benevolence, victory', favorable: 'Love, benevolence, victory', unfavorable: 'Enemies, discord' },
  { number: 11, name: 'Al-Zubra', arabicName: 'The Mane', planet: 'Mercury', keywords: 'Profit, gain, love', favorable: 'Profit, love, friendship', unfavorable: 'Enemies, discord' },
  { number: 12, name: 'Al-Sarfa', arabicName: 'The Changer', planet: 'Mercury', keywords: 'Separation, discord, misfortune', favorable: 'Separation from enemies', unfavorable: 'Travel, trade' },
  { number: 13, name: 'Al-Awwa', arabicName: 'The Barker', planet: 'Moon', keywords: 'Benevolence, gain, love', favorable: 'Benevolence, gain, love', unfavorable: 'Enemies, discord' },
  { number: 14, name: 'Al-Simak', arabicName: 'The Unarmed', planet: 'Moon', keywords: 'Love, friendship, gain', favorable: 'Love, friendship, gain', unfavorable: 'Enemies, discord' },
  { number: 15, name: 'Al-Ghafr', arabicName: 'The Cover', planet: 'Saturn', keywords: 'Treasure, profit, travel', favorable: 'Treasure, profit, travel', unfavorable: 'Enemies, discord' },
  { number: 16, name: 'Al-Zubana', arabicName: 'The Claws', planet: 'Saturn', keywords: 'Commerce, trade, profit', favorable: 'Commerce, trade', unfavorable: 'Enemies, discord' },
  { number: 17, name: 'Al-Iklil', arabicName: 'The Crown', planet: 'Jupiter', keywords: 'Good fortune, profit, victory', favorable: 'Good fortune, victory', unfavorable: 'Enemies, discord' },
  { number: 18, name: 'Al-Qalb', arabicName: 'The Heart', planet: 'Jupiter', keywords: 'Good fortune, gain, victory', favorable: 'Good fortune, gain', unfavorable: 'Enemies, discord' },
  { number: 19, name: 'Al-Shawla', arabicName: 'The Sting', planet: 'Mars', keywords: 'Separation, discord, harm', favorable: 'Separation from enemies', unfavorable: 'Travel, trade' },
  { number: 20, name: 'Al-Naim', arabicName: 'The Ostriches', planet: 'Mars', keywords: 'Taming animals, friendship', favorable: 'Taming, friendship', unfavorable: 'Enemies, discord' },
  { number: 21, name: 'Al-Balda', arabicName: 'The City', planet: 'Sun', keywords: 'Profit, gain, friendship', favorable: 'Profit, gain, friendship', unfavorable: 'Enemies, discord' },
  { number: 22, name: 'Al-Saad al-Dhabih', arabicName: 'The Lucky Stars of the Slaughterer', planet: 'Sun', keywords: 'Captivity, binding, harm', favorable: 'Binding enemies', unfavorable: 'Travel, trade' },
  { number: 23, name: 'Al-Saad al-Bula', arabicName: 'The Lucky Stars of the Swallower', planet: 'Venus', keywords: 'Healing, profit, gain', favorable: 'Healing, profit', unfavorable: 'Enemies, discord' },
  { number: 24, name: 'Al-Saad al-Suud', arabicName: 'The Luckiest of the Lucky', planet: 'Venus', keywords: 'Love, friendship, gain', favorable: 'Love, friendship, gain', unfavorable: 'Enemies, discord' },
  { number: 25, name: 'Al-Saad al-Akhbiya', arabicName: 'The Lucky Stars of Hidden Things', planet: 'Mercury', keywords: 'Profit, gain, friendship', favorable: 'Profit, gain, friendship', unfavorable: 'Enemies, discord' },
  { number: 26, name: 'Al-Fargh al-Mukdim', arabicName: 'The First Spout', planet: 'Mercury', keywords: 'Buildings, profit, gain', favorable: 'Building, profit', unfavorable: 'Enemies, discord' },
  { number: 27, name: 'Al-Fargh al-Thani', arabicName: 'The Second Spout', planet: 'Moon', keywords: 'Profit, gain, friendship', favorable: 'Profit, gain, friendship', unfavorable: 'Enemies, discord' },
  { number: 28, name: 'Al-Batn al-Hut', arabicName: 'The Belly of the Fish', planet: 'Moon', keywords: 'Profit, gain, friendship', favorable: 'Profit, gain, friendship', unfavorable: 'Enemies, discord' },
];

// ── Ritual guidance per phase ─────────────────────────────────────────────────
const RITUAL_GUIDANCE: Record<string, string> = {
  'New Moon': 'Set intentions. Write down what you want to call in. This is the seed moment — what you plant now grows with the moon. Ideal for beginning new Jupiter work or starting a new practice.',
  'Waxing Crescent': 'Begin invoking. The moon is building power. Use this time for attraction prayers — ask for what you want to grow. Jupiter work is active and effective now.',
  'First Quarter': 'Take action. The moon is at half-power and growing. Push through obstacles. If your Jupiter work has stalled, this is the time to push harder and be more direct in your petitions.',
  'Waxing Gibbous': 'Refine and intensify. You are approaching peak power. Review your intentions — are they specific enough? Add detail to your prayers. Prepare for the full moon ritual.',
  'Full Moon': 'Peak power. Perform your most important rituals tonight. The full moon amplifies everything — Jupiter petitions, consecration renewals, and gratitude rituals. Stay up for the peak if you can.',
  'Waning Gibbous': 'Gratitude and release. Give thanks for what was received during the waxing phase. Begin releasing what you no longer need. Saturn banishing work is excellent now.',
  'Last Quarter': 'Banish and clear. This is the most powerful time for removing obstacles, breaking bad habits, and binding what harms you. Saturn work is at its peak.',
  'Waning Crescent': 'Rest and prepare. The cycle is ending. Do not begin new work — rest, reflect, and prepare your intentions for the new moon. This is the dark before the dawn.',
};

// ── Calculate upcoming lunar dates ────────────────────────────────────────────
function getUpcomingLunarDates(fromDate: Date): UpcomingLunarDate[] {
  const knownNewMoon = 2451549.5;
  const synodicMonth = 29.53058867;

  function jdForDate(d: Date): number {
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate() + d.getHours() / 24;
    let y = year, m = month;
    if (m <= 2) { y -= 1; m += 12; }
    const A = Math.floor(y / 100);
    const B = 2 - A + Math.floor(A / 4);
    return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + B - 1524.5;
  }

  function dateForJd(jd: number): Date {
    const z = Math.floor(jd + 0.5);
    const f = jd + 0.5 - z;
    let a = z;
    if (z >= 2299161) {
      const alpha = Math.floor((z - 1867216.25) / 36524.25);
      a = z + 1 + alpha - Math.floor(alpha / 4);
    }
    const b = a + 1524;
    const c = Math.floor((b - 122.1) / 365.25);
    const d = Math.floor(365.25 * c);
    const e = Math.floor((b - d) / 30.6001);
    const day = b - d - Math.floor(30.6001 * e);
    const month = e < 14 ? e - 1 : e - 13;
    const year = month > 2 ? c - 4716 : c - 4715;
    const hours = f * 24;
    return new Date(year, month - 1, day, Math.floor(hours));
  }

  const jdNow = jdForDate(fromDate);
  const daysSinceNew = ((jdNow - knownNewMoon) % synodicMonth + synodicMonth) % synodicMonth;

  // Phase targets within one synodic month: 0=new, 7.38=first quarter, 14.77=full, 22.15=last quarter
  const targets = [
    { age: 0, type: 'New Moon' as const, note: 'Set new intentions. Begin Jupiter work. Plant seeds.' },
    { age: 7.38, type: 'First Quarter' as const, note: 'Take decisive action. Push through obstacles.' },
    { age: 14.77, type: 'Full Moon' as const, note: 'Peak power. Perform your most important rituals.' },
    { age: 22.15, type: 'Last Quarter' as const, note: 'Banish and clear. Saturn work is strongest now.' },
  ];

  const upcoming: UpcomingLunarDate[] = [];

  for (let cycle = 0; cycle <= 3; cycle++) {
    for (const target of targets) {
      const targetAge = target.age + cycle * synodicMonth;
      const daysUntil = targetAge - daysSinceNew;
      if (daysUntil > 0.5) { // at least 12 hours in the future
        const targetJd = jdNow + daysUntil;
        const targetDate = dateForJd(targetJd);
        const daysAway = Math.round(daysUntil);
        upcoming.push({
          type: target.type,
          date: targetDate,
          daysAway,
          ritualNote: target.note,
        });
        if (upcoming.length >= 8) break;
      }
    }
    if (upcoming.length >= 8) break;
  }

  return upcoming.slice(0, 8);
}

// ── Main export ───────────────────────────────────────────────────────────────
export function getMoonPhase(date: Date = new Date()): MoonPhaseData {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  let y = year;
  let m = month;
  if (m <= 2) { y -= 1; m += 12; }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + B - 1524.5;

  const knownNewMoon = 2451549.5;
  const synodicMonth = 29.53058867;

  const daysSinceNew = (jd - knownNewMoon) % synodicMonth;
  const age = daysSinceNew < 0 ? daysSinceNew + synodicMonth : daysSinceNew;
  const illumination = (1 - Math.cos((age / synodicMonth) * 2 * Math.PI)) / 2;

  // Lunar mansion: 28 mansions over 27.32 days (sidereal month)
  const siderealMonth = 27.32166;
  const mansionAge = age % siderealMonth;
  const mansionIndex = Math.floor((mansionAge / siderealMonth) * 28);
  const mansion = LUNAR_MANSIONS[Math.min(mansionIndex, 27)];

  let phaseName = 'New Moon';
  let phaseEmoji = '🌑';
  let description = 'The moon is dark.';

  if (age < 1.85) {
    phaseName = 'New Moon'; phaseEmoji = '🌑';
    description = 'The moon is dark. A time for new beginnings, setting intentions, and planting seeds of desire.';
  } else if (age < 7.38) {
    phaseName = 'Waxing Crescent'; phaseEmoji = '🌒';
    description = 'The moon grows. A favorable time for attraction work, building momentum, and invoking increase.';
  } else if (age < 9.22) {
    phaseName = 'First Quarter'; phaseEmoji = '🌓';
    description = 'Half illuminated and growing. A time for action, overcoming obstacles, and decisive moves.';
  } else if (age < 14.77) {
    phaseName = 'Waxing Gibbous'; phaseEmoji = '🌔';
    description = 'Nearly full. Refine your work and prepare for culmination. Energy is building strongly.';
  } else if (age < 16.61) {
    phaseName = 'Full Moon'; phaseEmoji = '🌕';
    description = 'Maximum illumination. The most powerful time for Jupiter work — petitions, consecrations, and gratitude rituals.';
  } else if (age < 22.15) {
    phaseName = 'Waning Gibbous'; phaseEmoji = '🌖';
    description = 'The moon diminishes. A time for releasing, banishing, and gratitude for what was received.';
  } else if (age < 23.99) {
    phaseName = 'Last Quarter'; phaseEmoji = '🌗';
    description = 'Half illuminated and waning. Good for banishing, breaking bad habits, and clearing obstacles.';
  } else {
    phaseName = 'Waning Crescent'; phaseEmoji = '🌘';
    description = 'The moon fades toward dark. Rest, reflect, and prepare for the new cycle.';
  }

  const ritualGuidance = RITUAL_GUIDANCE[phaseName] ?? description;
  const upcomingDates = getUpcomingLunarDates(date);

  // Days until next full and new moon
  const nextFull = upcomingDates.find(d => d.type === 'Full Moon');
  const nextNew = upcomingDates.find(d => d.type === 'New Moon');
  const daysUntilFull = nextFull?.daysAway ?? 0;
  const daysUntilNew = nextNew?.daysAway ?? 0;

  return { phaseName, phaseEmoji, illumination, age, description, ritualGuidance, mansion, upcomingDates, daysUntilFull, daysUntilNew };
}
