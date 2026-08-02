/**
 * Moon phase calculation using Julian date arithmetic.
 * Returns phase name, illumination percentage, and emoji.
 */

export interface MoonPhaseData {
  phaseName: string;
  phaseEmoji: string;
  illumination: number; // 0–1
  age: number; // days since new moon (0–29.53)
  description: string;
}

export function getMoonPhase(date: Date = new Date()): MoonPhaseData {
  // Julian date calculation
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  let y = year;
  let m = month;
  if (m <= 2) { y -= 1; m += 12; }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + B - 1524.5;

  // Known new moon: Jan 6, 2000 = JD 2451549.5
  const knownNewMoon = 2451549.5;
  const synodicMonth = 29.53058867;

  const daysSinceNew = (jd - knownNewMoon) % synodicMonth;
  const age = daysSinceNew < 0 ? daysSinceNew + synodicMonth : daysSinceNew;
  const illumination = (1 - Math.cos((age / synodicMonth) * 2 * Math.PI)) / 2;

  let phaseName: string = 'New Moon';
  let phaseEmoji: string = '🌑';
  let description: string = 'The moon is dark.';

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
  } else if (age < 29.53) {
    phaseName = 'Waning Crescent'; phaseEmoji = '🌘';
    description = 'The moon fades toward dark. Rest, reflect, and prepare for the new cycle.';
  } else {
    phaseName = 'New Moon'; phaseEmoji = '🌑';
    description = 'The moon is dark. A time for new beginnings and setting intentions.';
  }

  return { phaseName, phaseEmoji, illumination, age, description };
}
