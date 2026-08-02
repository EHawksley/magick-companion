/**
 * Planetary Hours Engine — Chaldean Order
 * Calculates traditional planetary hours based on sunrise/sunset for a given location.
 * Chaldean order: Saturn, Jupiter, Mars, Sun, Venus, Mercury, Moon
 * Day rulers: Sun=0(Sun), Mon=1(Moon), Tue=2(Mars), Wed=3(Mercury), Thu=4(Jupiter), Fri=5(Venus), Sat=6(Saturn)
 */
import * as SunCalc from 'suncalc';

export type PlanetName = 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars' | 'Jupiter' | 'Saturn';

export interface PlanetInfo {
  name: PlanetName;
  glyph: string;
  day: string;
  color: string;
  colorHex: string;
  metal: string;
  number: number;
  keywords: string;
  description: string;
  prayerAvailable: boolean;
}

// Chaldean order (index 0 = Saturn, 1 = Jupiter, ..., 6 = Moon)
export const CHALDEAN_ORDER: PlanetName[] = [
  'Saturn', 'Jupiter', 'Mars', 'Sun', 'Venus', 'Mercury', 'Moon'
];

// Day rulers by JS getDay() (0=Sunday, 1=Monday, ..., 6=Saturday)
const DAY_RULERS: PlanetName[] = [
  'Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'
];

export const PLANET_INFO: Record<PlanetName, PlanetInfo> = {
  Sun: {
    name: 'Sun',
    glyph: '☉',
    day: 'Sunday',
    color: 'Amber / Gold',
    colorHex: '#F59E0B',
    metal: 'Gold',
    number: 6,
    keywords: 'Vitality, success, authority, health, fame',
    description: 'The Sun governs life force, personal power, and achievement. Sunday is its day. Work with solar energy for confidence, career advancement, healing, and leadership.',
    prayerAvailable: false,
  },
  Moon: {
    name: 'Moon',
    glyph: '☽',
    day: 'Monday',
    color: 'Silver / White',
    colorHex: '#94A3B8',
    metal: 'Silver',
    number: 9,
    keywords: 'Intuition, dreams, cycles, emotions, the subconscious',
    description: 'The Moon governs the tides of feeling, memory, and psychic sensitivity. Monday is its day. Work with lunar energy for divination, emotional healing, and dream work.',
    prayerAvailable: false,
  },
  Mercury: {
    name: 'Mercury',
    glyph: '☿',
    day: 'Wednesday',
    color: 'Orange / Multi',
    colorHex: '#6EE7B7',
    metal: 'Quicksilver',
    number: 8,
    keywords: 'Communication, intellect, travel, commerce, skill',
    description: 'Mercury governs the mind, language, and exchange of information. Wednesday is its day. Work with mercurial energy for writing, study, negotiation, and travel.',
    prayerAvailable: false,
  },
  Venus: {
    name: 'Venus',
    glyph: '♀',
    day: 'Friday',
    color: 'Green / Rose',
    colorHex: '#F9A8D4',
    metal: 'Copper',
    number: 7,
    keywords: 'Love, beauty, harmony, pleasure, relationships',
    description: 'Venus governs attraction, art, and the pleasures of life. Friday is its day. Work with Venusian energy for love, friendship, creativity, and reconciliation.',
    prayerAvailable: false,
  },
  Mars: {
    name: 'Mars',
    glyph: '♂',
    day: 'Tuesday',
    color: 'Red',
    colorHex: '#EF4444',
    metal: 'Iron',
    number: 5,
    keywords: 'Courage, conflict, energy, protection, will',
    description: 'Mars governs action, strength, and the will to overcome obstacles. Tuesday is its day. Work with Martian energy for protection, courage, and breaking through resistance.',
    prayerAvailable: false,
  },
  Jupiter: {
    name: 'Jupiter',
    glyph: '♃',
    day: 'Thursday',
    color: 'Blue / Purple / Gold',
    colorHex: '#C9A84C',
    metal: 'Tin',
    number: 4,
    keywords: 'Abundance, expansion, honor, wisdom, fortune',
    description: 'Jupiter governs prosperity, divine favor, and the expansion of good fortune. Thursday is its day. Your Second Pentacle of Jupiter draws on Chesed — the sphere of Loving-Kindness — and its angels Tzadkiel, Parasiel, Sachiel, and Yophiel.',
    prayerAvailable: true,
  },
  Saturn: {
    name: 'Saturn',
    glyph: '♄',
    day: 'Saturday',
    color: 'Black / Dark Blue',
    colorHex: '#64748B',
    metal: 'Lead',
    number: 3,
    keywords: 'Discipline, time, structure, karma, limits',
    description: 'Saturn governs discipline, long-term work, and the lessons of time. Saturday is its day. Work with Saturnian energy for binding, banishing, establishing firm foundations, and long-term planning.',
    prayerAvailable: false,
  },
};

export interface PlanetaryHour {
  planet: PlanetName;
  start: Date;
  end: Date;
  isDay: boolean;
  hourNumber: number; // 1–24
}

export interface DayData {
  date: Date;
  dayRuler: PlanetName;
  sunrise: Date;
  sunset: Date;
  nextSunrise: Date;
  hours: PlanetaryHour[];
}

// Salt Lake City, UT coordinates (default)
export const SLC_LAT = 40.7608;
export const SLC_LNG = -111.8910;

/**
 * Calculate all 24 planetary hours for a given date and location.
 */
export function calculatePlanetaryHours(date: Date, lat: number = SLC_LAT, lng: number = SLC_LNG): DayData {
  const times = SunCalc.getTimes(date, lat, lng);
  const sunriseRaw: Date = times.sunrise as Date;
  const sunsetRaw: Date = times.sunset as Date;
  const sunrise: Date = isNaN(sunriseRaw.getTime())
    ? new Date(date.getFullYear(), date.getMonth(), date.getDate(), 6, 0, 0)
    : sunriseRaw;
  const sunset: Date = isNaN(sunsetRaw.getTime())
    ? new Date(date.getFullYear(), date.getMonth(), date.getDate(), 18, 0, 0)
    : sunsetRaw;

  // Get next day's sunrise for night hours
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1);
  const nextTimes = SunCalc.getTimes(nextDay, lat, lng);
  const nextSunriseRaw: Date = nextTimes.sunrise as Date;
  const nextSunrise: Date = isNaN(nextSunriseRaw.getTime())
    ? new Date(nextDay.getFullYear(), nextDay.getMonth(), nextDay.getDate(), 6, 0, 0)
    : nextSunriseRaw;

  // Day ruler: planet that rules the first hour of the day
  const dayOfWeek = sunrise.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
  const dayRuler = DAY_RULERS[dayOfWeek];
  const dayRulerChaldeanIndex = CHALDEAN_ORDER.indexOf(dayRuler);

  // Day hours: sunrise to sunset, divided into 12
  const dayDurationMs = sunset.getTime() - sunrise.getTime();
  const dayHourMs = dayDurationMs / 12;

  // Night hours: sunset to next sunrise, divided into 12
  const nightDurationMs = nextSunrise.getTime() - sunset.getTime();
  const nightHourMs = nightDurationMs / 12;

  const hours: PlanetaryHour[] = [];

  // Day hours (1–12)
  for (let i = 0; i < 12; i++) {
    const chaldeanIndex = (dayRulerChaldeanIndex + i) % 7;
    const start = new Date(sunrise.getTime() + i * dayHourMs);
    const end = new Date(sunrise.getTime() + (i + 1) * dayHourMs);
    hours.push({
      planet: CHALDEAN_ORDER[chaldeanIndex],
      start,
      end,
      isDay: true,
      hourNumber: i + 1,
    });
  }

  // Night hours (13–24)
  for (let i = 0; i < 12; i++) {
    const chaldeanIndex = (dayRulerChaldeanIndex + 12 + i) % 7;
    const start = new Date(sunset.getTime() + i * nightHourMs);
    const end = new Date(sunset.getTime() + (i + 1) * nightHourMs);
    hours.push({
      planet: CHALDEAN_ORDER[chaldeanIndex],
      start,
      end,
      isDay: false,
      hourNumber: i + 13,
    });
  }

  return { date, dayRuler, sunrise, sunset, nextSunrise, hours };
}

/**
 * Get the current planetary hour.
 */
export function getCurrentHour(dayData: DayData, now: Date = new Date()): PlanetaryHour | null {
  return dayData.hours.find(h => now >= h.start && now < h.end) ?? null;
}

/**
 * Get the next Jupiter hour after a given time.
 */
export function getNextJupiterHour(dayData: DayData, now: Date = new Date()): PlanetaryHour | null {
  return dayData.hours.find(h => h.planet === 'Jupiter' && h.start > now) ?? null;
}

/**
 * Format a duration in ms as "Xh Ym" or "Ym Zs".
 */
export function formatDuration(ms: number): string {
  if (ms <= 0) return '0s';
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

/**
 * Format time as HH:MM AM/PM.
 */
export function formatTime(date: Date): string {
  // Use the user's local timezone (browser will apply it automatically)
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Get progress (0–1) through the current hour.
 */
export function getHourProgress(hour: PlanetaryHour, now: Date = new Date()): number {
  const total = hour.end.getTime() - hour.start.getTime();
  const elapsed = now.getTime() - hour.start.getTime();
  return Math.max(0, Math.min(1, elapsed / total));
}
