/**
 * All 7 Classical Planet Prayer Systems
 * Each planet has 4 prayer variants:
 *   - peak:    Planet's own day + waxing/full moon + planet's hour
 *   - day:     Planet's own day + planet's hour (any moon)
 *   - waxing:  Planet's hour + waxing/full moon (not its day)
 *   - waning:  Planet's hour + waning/new moon (not its day)
 *   - off:     Not currently the planet's hour
 *
 * Sources: Greater Key of Solomon, Agrippa's Three Books of Occult Philosophy,
 * Picatrix, Golden Dawn tradition. All prayers in modern plain English.
 */

import type { PlanetName } from './planetaryHours';
import type { MoonCategory } from './ritualContent';

export interface PlanetPrayerVariant {
  key: string;
  title: string;
  subtitle: string;
  timingBadge: string;
  timingExplanation: string;
  intent: string;
  prayer: string;
  powerLevel: 1 | 2 | 3;
}

export interface PlanetPrayerSystem {
  planet: PlanetName;
  tradition: string;
  angels: string[];
  angelDescriptions: Record<string, string>;
  psalm?: { reference: string; text: string };
  instructions: string[];
  variants: {
    peak: PlanetPrayerVariant;
    day: PlanetPrayerVariant;
    waxing: PlanetPrayerVariant;
    waning: PlanetPrayerVariant;
    off: PlanetPrayerVariant;
  };
}

export type PrayerVariantKey = 'peak' | 'day' | 'waxing' | 'waning' | 'off';

export function selectPlanetPrayer(
  system: PlanetPrayerSystem,
  isPlanetHour: boolean,
  isPlanetDay: boolean,
  moonCategory: MoonCategory
): PlanetPrayerVariant {
  if (!isPlanetHour) return system.variants.off;
  const isWaxingOrFull = moonCategory === 'waxing' || moonCategory === 'full';
  if (isPlanetDay && isWaxingOrFull) return system.variants.peak;
  if (isPlanetDay) return system.variants.day;
  if (isWaxingOrFull) return system.variants.waxing;
  return system.variants.waning;
}

// ─────────────────────────────────────────────────────────────────────────────
// SUN
// ─────────────────────────────────────────────────────────────────────────────
const SUN_PRAYERS: PlanetPrayerSystem = {
  planet: 'Sun',
  tradition: 'Solomonic / Agrippan — Tiphareth (Beauty)',
  angels: ['Michael', 'Raphael', 'Och'],
  angelDescriptions: {
    Michael: 'Archangel of the Sun and fire. His name means "Who is like God." He governs solar power, protection, and divine authority.',
    Raphael: 'Archangel of healing and the East. He governs health, vitality, and the restoration of life force.',
    Och: 'Olympic spirit of the Sun. He governs gold, medicine, long life, and the perfection of wisdom.',
  },
  psalm: { reference: 'Psalm 19:1', text: '"The heavens declare the glory of God; the skies proclaim the work of his hands."' },
  instructions: [
    'Perform the LBRP first.',
    'Face East — the direction of the rising Sun.',
    'Hold something gold, or wear gold if you have it.',
    'Sunday is the ideal day. Sunday + Sun hour + waxing moon is peak power.',
    'Speak with authority and confidence — the Sun does not whisper.',
  ],
  variants: {
    peak: {
      key: 'peak', powerLevel: 3,
      title: 'The Great Solar Invocation',
      subtitle: 'Sunday · Waxing or Full Moon · Sun Hour',
      timingBadge: '✦ Peak Power',
      timingExplanation: 'All three conditions align: it is Sunday (the Sun\'s day), a Sun hour, and the moon is waxing or full. This is the most powerful window for solar work — petitions for health, authority, success, and recognition.',
      intent: 'Major petitions — success, health, authority, fame, vitality',
      prayer: `I stand in the full light of the Solar sphere, in the hour and day of the Sun, under a growing moon.

I call upon you, Michael, Archangel of the Sun — let the light of divine authority and protection shine through me and upon everything I am building. Let my name be known. Let my work be recognized. Let my health be strong.

I call upon you, Raphael, Healer of the East — restore and strengthen my vital force. Let every cell of my body be filled with solar light. Let illness, weakness, and fatigue have no hold on me.

I call upon you, Och, Spirit of the Sun — grant me wisdom perfected, long life, and the golden touch that turns effort into achievement. Let my path be illuminated.

As it is written: "The heavens declare the glory of God; the skies proclaim the work of his hands." — Psalm 19:1

I am a child of the Sun. I receive its power. I use it well. So it is, and so shall it be. Amen.`,
    },
    day: {
      key: 'day', powerLevel: 2,
      title: 'Sunday Solar Prayer',
      subtitle: 'Sunday · Sun Hour',
      timingBadge: 'Sunday · Sun Hour',
      timingExplanation: 'It is Sunday and a Sun hour — the Sun\'s own day and hour. A strong window for solar work, though the waning moon asks you to focus on releasing what dims your light rather than petitioning for new things.',
      intent: 'Releasing self-doubt, clearing blocks to success and recognition',
      prayer: `I stand in the hour of the Sun, on the Sun\'s own day.

I call upon Michael, Raphael, and Och — I come to clear what stands between me and my full solar expression.

Let the waning moon carry away my self-doubt, my smallness, my fear of being seen. Let it carry away every story I tell myself about why I cannot succeed, cannot lead, cannot shine.

I call upon Michael — protect me from the voices, within and without, that diminish my light.

As it is written: "The heavens declare the glory of God." — Psalm 19:1

I release what is false. I stand in what is true. So it is. Amen.`,
    },
    waxing: {
      key: 'waxing', powerLevel: 2,
      title: 'Solar Hour Invocation',
      subtitle: 'Sun Hour · Waxing or Full Moon',
      timingBadge: 'Sun Hour · Waxing Moon',
      timingExplanation: 'You are in a Sun hour and the moon is waxing — a favorable time for solar attraction work. While not as potent as Sunday, any Sun hour during a waxing moon is a legitimate window for invoking vitality and success.',
      intent: 'Daily solar maintenance — vitality, clarity, confidence',
      prayer: `I stand in the hour of the Sun, under a growing moon.

I call upon Michael, Raphael, and Och — let this hour be a thread of golden light connecting my daily life to the Solar sphere.

Let my vitality be strong today. Let my mind be clear. Let my confidence be grounded in genuine ability, not performance.

Let the work of my hands be blessed. Let the words I speak carry weight. Let my presence be felt as a positive force.

As it is written: "The heavens declare the glory of God." — Psalm 19:1

So it is, and so shall it be. Amen.`,
    },
    waning: {
      key: 'waning', powerLevel: 1,
      title: 'Solar Hour Reflection',
      subtitle: 'Sun Hour · Waning Moon',
      timingBadge: 'Sun Hour · Waning Moon',
      timingExplanation: 'You are in a Sun hour, but the moon is waning. Use this time to give thanks for what the Sun has given you and to release what no longer serves your growth.',
      intent: 'Gratitude and releasing what dims your light',
      prayer: `I stand in the hour of the Sun, under a waning moon.

I give thanks to Michael, Raphael, and Och for the light that has been given to me — for every moment of clarity, health, and success.

As the moon diminishes, let my ego diminish with it. Let what is false about me fall away. Let only what is genuinely mine remain.

As it is written: "The heavens declare the glory of God." — Psalm 19:1

I am grateful. I release. Amen.`,
    },
    off: {
      key: 'off', powerLevel: 1,
      title: 'Not a Sun Hour',
      subtitle: 'Current hour is not ruled by the Sun',
      timingBadge: 'Off-Peak',
      timingExplanation: 'The current hour is not a Sun hour. You can still acknowledge the Solar sphere, but save the full prayer for a Sun hour — ideally on Sunday.',
      intent: 'Brief acknowledgment',
      prayer: `I acknowledge the Solar sphere and its angels — Michael, Raphael, and Och.

Though this is not a Sun hour, I carry the light of the Sun within me. I am grateful for health, clarity, and the ability to act in the world.

I will return to pray fully when the Sun\'s hour comes.

As it is written: "The heavens declare the glory of God." — Psalm 19:1 Amen.`,
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// MOON
// ─────────────────────────────────────────────────────────────────────────────
const MOON_PRAYERS: PlanetPrayerSystem = {
  planet: 'Moon',
  tradition: 'Solomonic / Agrippan — Yesod (Foundation)',
  angels: ['Gabriel', 'Phul'],
  angelDescriptions: {
    Gabriel: 'Archangel of the Moon and the West. His name means "God is my strength." He governs dreams, prophecy, intuition, and the waters of the subconscious.',
    Phul: 'Olympic spirit of the Moon. He governs all things lunar — tides, dreams, silver, and the hidden currents of life.',
  },
  psalm: { reference: 'Psalm 121:6', text: '"The sun will not harm you by day, nor the moon by night."' },
  instructions: [
    'Perform the LBRP first.',
    'Face West — the direction of the setting sun and the waters.',
    'Monday is the Moon\'s day. Full moon + Monday + Moon hour is peak power.',
    'Silver objects, water, or a bowl of water on your altar amplify lunar work.',
    'Lunar work is best done in stillness and receptivity — not force.',
  ],
  variants: {
    peak: {
      key: 'peak', powerLevel: 3,
      title: 'The Full Moon Invocation',
      subtitle: 'Monday · Full or Waxing Moon · Moon Hour',
      timingBadge: '✦ Peak Power',
      timingExplanation: 'All conditions align: it is Monday (the Moon\'s day), a Moon hour, and the moon is waxing or full. This is the most powerful window for lunar work — divination, dream work, psychic development, and emotional healing.',
      intent: 'Divination, psychic opening, emotional healing, dream work',
      prayer: `I stand in the full light of the Lunar sphere, in the hour and day of the Moon, under a growing or full moon.

I call upon you, Gabriel, Archangel of the Moon — open the gates of the subconscious. Let the waters of intuition flow freely through me. Let me hear what is spoken in silence, see what is hidden in shadow, and know what cannot be known by reason alone.

I call upon you, Phul, Spirit of the Moon — let the tides of my inner life be clear and navigable. Let my dreams be vivid and meaningful. Let my emotional body be healed of old wounds that cloud my perception.

Let the silver light of this lunar hour illuminate the hidden places within me and around me.

As it is written: "The sun will not harm you by day, nor the moon by night." — Psalm 121:6

I open. I receive. I trust the tides. So it is, and so shall it be. Amen.`,
    },
    day: {
      key: 'day', powerLevel: 2,
      title: 'Monday Lunar Prayer',
      subtitle: 'Monday · Moon Hour',
      timingBadge: 'Monday · Moon Hour',
      timingExplanation: 'It is Monday (the Moon\'s day) and a Moon hour. The waning moon asks you to release emotional patterns and old conditioning rather than open new channels.',
      intent: 'Releasing emotional patterns, clearing the subconscious',
      prayer: `I stand in the hour of the Moon, on the Moon\'s own day.

I call upon Gabriel and Phul — as the moon wanes, let the emotional debris of the past wane with it. Let old grief, old fear, and old conditioning be released into the dark water.

I do not need to carry what no longer belongs to me. I release it now, with gratitude for what it taught me.

As it is written: "The sun will not harm you by day, nor the moon by night." — Psalm 121:6

I release. I rest. I trust the cycle. Amen.`,
    },
    waxing: {
      key: 'waxing', powerLevel: 2,
      title: 'Lunar Hour Invocation',
      subtitle: 'Moon Hour · Waxing or Full Moon',
      timingBadge: 'Moon Hour · Waxing Moon',
      timingExplanation: 'You are in a Moon hour and the moon is waxing — a favorable time for intuitive and receptive work. Open your inner channels and invite clarity in dreams and feelings.',
      intent: 'Opening intuition, inviting clear dreams and inner guidance',
      prayer: `I stand in the hour of the Moon, under a growing moon.

I call upon Gabriel and Phul — let this hour deepen my connection to the inner tides. Let my intuition be sharp and trustworthy. Let my dreams tonight carry messages worth remembering.

Let me be receptive without being passive. Let me feel without being overwhelmed. Let the lunar light illuminate the next step on my path.

As it is written: "The sun will not harm you by day, nor the moon by night." — Psalm 121:6

So it is, and so shall it be. Amen.`,
    },
    waning: {
      key: 'waning', powerLevel: 1,
      title: 'Lunar Hour Reflection',
      subtitle: 'Moon Hour · Waning Moon',
      timingBadge: 'Moon Hour · Waning Moon',
      timingExplanation: 'You are in a Moon hour and the moon is waning. This is a natural time for rest, reflection, and releasing what no longer serves your emotional wellbeing.',
      intent: 'Rest, release, and preparation for the new cycle',
      prayer: `I stand in the hour of the Moon, under a waning moon.

I give thanks to Gabriel and Phul for the intuitions, dreams, and emotional clarity that have come to me this cycle.

As the moon diminishes, I let go of what I have been carrying. I rest in the quiet before the new cycle begins.

As it is written: "The sun will not harm you by day, nor the moon by night." — Psalm 121:6

I rest. I release. I am ready. Amen.`,
    },
    off: {
      key: 'off', powerLevel: 1,
      title: 'Not a Moon Hour',
      subtitle: 'Current hour is not ruled by the Moon',
      timingBadge: 'Off-Peak',
      timingExplanation: 'The current hour is not a Moon hour. Save the full prayer for a Moon hour — ideally on Monday or during a full moon.',
      intent: 'Brief acknowledgment',
      prayer: `I acknowledge the Lunar sphere and its angels — Gabriel and Phul.

Though this is not a Moon hour, I carry the tides of intuition and feeling within me. I am grateful for the inner life the Moon governs.

I will return to pray fully when the Moon\'s hour comes. Amen.`,
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// MERCURY
// ─────────────────────────────────────────────────────────────────────────────
const MERCURY_PRAYERS: PlanetPrayerSystem = {
  planet: 'Mercury',
  tradition: 'Solomonic / Agrippan — Hod (Splendor)',
  angels: ['Raphael', 'Michael', 'Tiriel'],
  angelDescriptions: {
    Raphael: 'Archangel of Mercury in the Solomonic tradition. He governs healing through knowledge, communication, and the swift movement of information.',
    Michael: 'In some traditions, Michael governs Mercury\'s sphere of intellect and divine communication.',
    Tiriel: 'Intelligence of Mercury. He governs the rational mind, writing, commerce, and the transmission of knowledge.',
  },
  psalm: { reference: 'Psalm 119:18', text: '"Open my eyes that I may see wonderful things in your law."' },
  instructions: [
    'Perform the LBRP first.',
    'Wednesday is Mercury\'s day. Wednesday + Mercury hour + waxing moon is peak power.',
    'Have paper and pen nearby — Mercury governs writing.',
    'Orange or yellow candles, or quicksilver-colored objects, amplify mercurial work.',
    'Work with Mercury for contracts, exams, negotiations, travel, and communication.',
  ],
  variants: {
    peak: {
      key: 'peak', powerLevel: 3,
      title: 'The Great Mercurial Invocation',
      subtitle: 'Wednesday · Waxing or Full Moon · Mercury Hour',
      timingBadge: '✦ Peak Power',
      timingExplanation: 'All conditions align: Wednesday (Mercury\'s day), a Mercury hour, and the moon is waxing or full. This is the most powerful window for mercurial work — communication, contracts, study, travel, and the opening of the mind.',
      intent: 'Major petitions — communication, contracts, study, travel, negotiation',
      prayer: `I stand in the swift current of the Mercurial sphere, in the hour and day of Mercury, under a growing moon.

I call upon you, Raphael, Archangel of Mercury — let the channels of communication be open and clear. Let my words land with precision and be received with understanding. Let every negotiation, contract, and agreement I enter be favorable and just.

I call upon you, Tiriel, Intelligence of Mercury — sharpen my mind. Let me learn quickly, retain deeply, and communicate with clarity and grace. Let the written word serve me well.

Let every journey I take be safe and swift. Let every door I need to open be opened by the right word at the right time.

As it is written: "Open my eyes that I may see wonderful things in your law." — Psalm 119:18

I am quick. I am clear. I am heard. So it is, and so shall it be. Amen.`,
    },
    day: {
      key: 'day', powerLevel: 2,
      title: 'Wednesday Mercurial Prayer',
      subtitle: 'Wednesday · Mercury Hour',
      timingBadge: 'Wednesday · Mercury Hour',
      timingExplanation: 'It is Wednesday (Mercury\'s day) and a Mercury hour. The waning moon asks you to release mental clutter, old beliefs, and communication patterns that no longer serve you.',
      intent: 'Releasing mental clutter, clearing old communication patterns',
      prayer: `I stand in the hour of Mercury, on Mercury\'s own day.

I call upon Raphael and Tiriel — as the moon wanes, let the noise in my mind wane with it. Let outdated beliefs, mental loops, and unhelpful thought patterns be released.

Let my mind become clear and spacious. Let me hear what is actually being said, not what I fear is being said.

As it is written: "Open my eyes that I may see wonderful things in your law." — Psalm 119:18

I release the noise. I welcome clarity. Amen.`,
    },
    waxing: {
      key: 'waxing', powerLevel: 2,
      title: 'Mercurial Hour Invocation',
      subtitle: 'Mercury Hour · Waxing or Full Moon',
      timingBadge: 'Mercury Hour · Waxing Moon',
      timingExplanation: 'You are in a Mercury hour and the moon is waxing. A good time for study, writing, and communication work.',
      intent: 'Study, writing, communication, mental clarity',
      prayer: `I stand in the hour of Mercury, under a growing moon.

I call upon Raphael and Tiriel — let this hour sharpen my mind and open my channels of communication. Let the work I do with words and ideas today be effective and lasting.

Let me learn what I need to learn. Let me say what needs to be said. Let me hear what needs to be heard.

As it is written: "Open my eyes that I may see wonderful things in your law." — Psalm 119:18

So it is, and so shall it be. Amen.`,
    },
    waning: {
      key: 'waning', powerLevel: 1,
      title: 'Mercurial Hour Reflection',
      subtitle: 'Mercury Hour · Waning Moon',
      timingBadge: 'Mercury Hour · Waning Moon',
      timingExplanation: 'You are in a Mercury hour and the moon is waning. A good time to review what you have learned and release mental patterns that no longer serve you.',
      intent: 'Reviewing, releasing mental clutter',
      prayer: `I stand in the hour of Mercury, under a waning moon.

I give thanks to Raphael and Tiriel for the clarity, communication, and knowledge that have come to me this cycle.

As the moon diminishes, let mental noise diminish with it. Let me arrive at the new moon with a clear and ready mind.

As it is written: "Open my eyes that I may see wonderful things in your law." — Psalm 119:18

I release. I clarify. Amen.`,
    },
    off: {
      key: 'off', powerLevel: 1,
      title: 'Not a Mercury Hour',
      subtitle: 'Current hour is not ruled by Mercury',
      timingBadge: 'Off-Peak',
      timingExplanation: 'The current hour is not a Mercury hour. Save the full prayer for a Mercury hour — ideally on Wednesday.',
      intent: 'Brief acknowledgment',
      prayer: `I acknowledge the Mercurial sphere and its angels — Raphael and Tiriel.

Though this is not a Mercury hour, I carry the gift of language and thought within me. I am grateful for the mind Mercury governs.

I will return to pray fully when Mercury\'s hour comes. Amen.`,
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// VENUS
// ─────────────────────────────────────────────────────────────────────────────
const VENUS_PRAYERS: PlanetPrayerSystem = {
  planet: 'Venus',
  tradition: 'Solomonic / Agrippan — Netzach (Victory)',
  angels: ['Haniel', 'Hagiel'],
  angelDescriptions: {
    Haniel: 'Archangel of Venus. Her name means "Grace of God." She governs love, beauty, art, and the pleasures of life.',
    Hagiel: 'Intelligence of Venus. She governs attraction, harmony, and the magnetic force that draws love and beauty into your life.',
  },
  psalm: { reference: 'Psalm 45:1', text: '"My heart is stirred by a noble theme as I recite my verses for the king; my tongue is the pen of a skillful writer."' },
  instructions: [
    'Perform the LBRP first.',
    'Friday is Venus\'s day. Friday + Venus hour + waxing moon is peak power.',
    'Green or rose-colored candles, copper objects, or flowers amplify Venusian work.',
    'Venus governs all forms of love — romantic, platonic, self-love, and creative love.',
    'Approach Venus work with genuine feeling, not desperation.',
  ],
  variants: {
    peak: {
      key: 'peak', powerLevel: 3,
      title: 'The Great Venusian Invocation',
      subtitle: 'Friday · Waxing or Full Moon · Venus Hour',
      timingBadge: '✦ Peak Power',
      timingExplanation: 'All conditions align: Friday (Venus\'s day), a Venus hour, and the moon is waxing or full. The most powerful window for Venusian work — love, attraction, beauty, art, and harmony.',
      intent: 'Love, attraction, beauty, creative work, reconciliation',
      prayer: `I stand in the warm current of the Venusian sphere, in the hour and day of Venus, under a growing moon.

I call upon you, Haniel, Archangel of Venus — let the grace of love flow through my life. Let me be magnetic to what is beautiful, harmonious, and genuinely loving. Let my relationships deepen and flourish.

I call upon you, Hagiel, Intelligence of Venus — awaken the force of attraction within me. Not the desperate grasping of loneliness, but the natural magnetism of someone who is genuinely present and genuinely loving.

Let beauty enter my life in all its forms — in art, in nature, in the people I meet, and in the way I see myself.

As it is written: "My heart is stirred by a noble theme." — Psalm 45:1

I am open. I am loving. I attract what is genuinely mine. So it is, and so shall it be. Amen.`,
    },
    day: {
      key: 'day', powerLevel: 2,
      title: 'Friday Venusian Prayer',
      subtitle: 'Friday · Venus Hour',
      timingBadge: 'Friday · Venus Hour',
      timingExplanation: 'It is Friday (Venus\'s day) and a Venus hour. The waning moon asks you to release what blocks love — old wounds, resentments, and patterns of self-rejection.',
      intent: 'Releasing blocks to love, healing old wounds',
      prayer: `I stand in the hour of Venus, on Venus\'s own day.

I call upon Haniel and Hagiel — as the moon wanes, let the wounds that block love wane with it. Let old resentments, old rejections, and old stories about being unlovable be released.

I am worthy of love. I release what tells me otherwise.

As it is written: "My heart is stirred by a noble theme." — Psalm 45:1

I release. I open. I am worthy. Amen.`,
    },
    waxing: {
      key: 'waxing', powerLevel: 2,
      title: 'Venusian Hour Invocation',
      subtitle: 'Venus Hour · Waxing or Full Moon',
      timingBadge: 'Venus Hour · Waxing Moon',
      timingExplanation: 'You are in a Venus hour and the moon is waxing. A good time for creative work, deepening relationships, and inviting beauty into your life.',
      intent: 'Attracting love, beauty, and harmony',
      prayer: `I stand in the hour of Venus, under a growing moon.

I call upon Haniel and Hagiel — let this hour soften what is hard in me and open what is closed. Let me be genuinely present to the beauty around me and the people in my life.

Let my creative work flow. Let my relationships deepen. Let love find me where I am.

As it is written: "My heart is stirred by a noble theme." — Psalm 45:1

So it is, and so shall it be. Amen.`,
    },
    waning: {
      key: 'waning', powerLevel: 1,
      title: 'Venusian Hour Reflection',
      subtitle: 'Venus Hour · Waning Moon',
      timingBadge: 'Venus Hour · Waning Moon',
      timingExplanation: 'You are in a Venus hour and the moon is waning. A good time to give thanks for love received and to release what blocks deeper connection.',
      intent: 'Gratitude for love, releasing blocks to connection',
      prayer: `I stand in the hour of Venus, under a waning moon.

I give thanks to Haniel and Hagiel for the love, beauty, and harmony that have come to me this cycle.

As the moon diminishes, let what blocks love diminish with it. Let me arrive at the new moon more open, more loving, and more worthy in my own eyes.

As it is written: "My heart is stirred by a noble theme." — Psalm 45:1

I am grateful. I release. Amen.`,
    },
    off: {
      key: 'off', powerLevel: 1,
      title: 'Not a Venus Hour',
      subtitle: 'Current hour is not ruled by Venus',
      timingBadge: 'Off-Peak',
      timingExplanation: 'The current hour is not a Venus hour. Save the full prayer for a Venus hour — ideally on Friday.',
      intent: 'Brief acknowledgment',
      prayer: `I acknowledge the Venusian sphere and its angels — Haniel and Hagiel.

Though this is not a Venus hour, I carry the capacity for love and beauty within me. I am grateful for what Venus governs in my life.

I will return to pray fully when Venus\'s hour comes. Amen.`,
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// MARS
// ─────────────────────────────────────────────────────────────────────────────
const MARS_PRAYERS: PlanetPrayerSystem = {
  planet: 'Mars',
  tradition: 'Solomonic / Agrippan — Geburah (Strength)',
  angels: ['Camael', 'Graphiel'],
  angelDescriptions: {
    Camael: 'Archangel of Mars. His name means "One who sees God." He governs courage, strength, justice, and the righteous use of force.',
    Graphiel: 'Intelligence of Mars. He governs the martial will — the capacity to act decisively, overcome obstacles, and defend what matters.',
  },
  psalm: { reference: 'Psalm 144:1', text: '"Praise be to the Lord my Rock, who trains my hands for war, my fingers for battle."' },
  instructions: [
    'Perform the LBRP first.',
    'Tuesday is Mars\'s day. Tuesday + Mars hour + waxing moon is peak power.',
    'Red candles or iron objects amplify Martian work.',
    'Mars governs protection, courage, and breaking through resistance — not aggression for its own sake.',
    'Approach Mars work with clarity of purpose. Know exactly what you are fighting for.',
  ],
  variants: {
    peak: {
      key: 'peak', powerLevel: 3,
      title: 'The Great Martial Invocation',
      subtitle: 'Tuesday · Waxing or Full Moon · Mars Hour',
      timingBadge: '✦ Peak Power',
      timingExplanation: 'All conditions align: Tuesday (Mars\'s day), a Mars hour, and the moon is waxing or full. The most powerful window for Martian work — protection, courage, breaking through obstacles, and righteous conflict.',
      intent: 'Protection, courage, overcoming obstacles, decisive action',
      prayer: `I stand in the fierce current of the Martial sphere, in the hour and day of Mars, under a growing moon.

I call upon you, Camael, Archangel of Mars — arm me with the courage to face what must be faced. Let me act decisively when action is required. Let me stand firm when others would have me yield. Let justice be served through my hands.

I call upon you, Graphiel, Intelligence of Mars — sharpen my will. Let every obstacle before me be identified clearly and overcome directly. Let me not be stopped by fear, by inertia, or by the resistance of others.

Let my body be strong. Let my will be iron. Let my purpose be clear.

As it is written: "Praise be to the Lord my Rock, who trains my hands for war, my fingers for battle." — Psalm 144:1

I am protected. I am strong. I move forward. So it is, and so shall it be. Amen.`,
    },
    day: {
      key: 'day', powerLevel: 2,
      title: 'Tuesday Martial Prayer',
      subtitle: 'Tuesday · Mars Hour',
      timingBadge: 'Tuesday · Mars Hour',
      timingExplanation: 'It is Tuesday (Mars\'s day) and a Mars hour. The waning moon asks you to release anger, aggression, and conflict that no longer serves you.',
      intent: 'Releasing anger, banishing conflict, clearing Martian excess',
      prayer: `I stand in the hour of Mars, on Mars\'s own day.

I call upon Camael and Graphiel — as the moon wanes, let the anger that has no righteous purpose wane with it. Let old conflicts, old wounds from battle, and the exhaustion of constant fighting be released.

I do not need to fight everything. I release what is not mine to fight.

As it is written: "Praise be to the Lord my Rock, who trains my hands for war." — Psalm 144:1

I release unnecessary conflict. I conserve my strength for what matters. Amen.`,
    },
    waxing: {
      key: 'waxing', powerLevel: 2,
      title: 'Martial Hour Invocation',
      subtitle: 'Mars Hour · Waxing or Full Moon',
      timingBadge: 'Mars Hour · Waxing Moon',
      timingExplanation: 'You are in a Mars hour and the moon is waxing. A good time for protection work, building physical strength, and invoking courage.',
      intent: 'Protection, courage, physical strength',
      prayer: `I stand in the hour of Mars, under a growing moon.

I call upon Camael and Graphiel — let this hour strengthen my resolve and protect my path. Let no obstacle stop what is rightfully mine. Let no person or force diminish what I am building.

Let my body be strong. Let my will be clear. Let my protection be firm.

As it is written: "Praise be to the Lord my Rock, who trains my hands for war." — Psalm 144:1

So it is, and so shall it be. Amen.`,
    },
    waning: {
      key: 'waning', powerLevel: 1,
      title: 'Martial Hour Reflection',
      subtitle: 'Mars Hour · Waning Moon',
      timingBadge: 'Mars Hour · Waning Moon',
      timingExplanation: 'You are in a Mars hour and the moon is waning. A good time to banish conflict, release anger, and clear Martian excess from your life.',
      intent: 'Banishing conflict, releasing anger',
      prayer: `I stand in the hour of Mars, under a waning moon.

I give thanks to Camael and Graphiel for the courage and strength that have served me this cycle.

As the moon diminishes, let unnecessary conflict diminish with it. Let anger that has no righteous purpose be released. Let me arrive at the new moon with my strength conserved and my will clear.

As it is written: "Praise be to the Lord my Rock, who trains my hands for war." — Psalm 144:1

I release. I rest. I am ready. Amen.`,
    },
    off: {
      key: 'off', powerLevel: 1,
      title: 'Not a Mars Hour',
      subtitle: 'Current hour is not ruled by Mars',
      timingBadge: 'Off-Peak',
      timingExplanation: 'The current hour is not a Mars hour. Save the full prayer for a Mars hour — ideally on Tuesday.',
      intent: 'Brief acknowledgment',
      prayer: `I acknowledge the Martial sphere and its angels — Camael and Graphiel.

Though this is not a Mars hour, I carry the capacity for courage and decisive action within me. I am grateful for the strength Mars governs.

I will return to pray fully when Mars\'s hour comes. Amen.`,
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// JUPITER (expanded from ritualContent.ts)
// ─────────────────────────────────────────────────────────────────────────────
const JUPITER_PRAYERS: PlanetPrayerSystem = {
  planet: 'Jupiter',
  tradition: 'Greater Key of Solomon — Chesed (Loving-Kindness)',
  angels: ['Tzadkiel', 'Parasiel', 'Sachiel', 'Yophiel'],
  angelDescriptions: {
    Tzadkiel: 'Archangel of Jupiter, whose name means "Righteousness of God." He governs mercy, abundance, and divine grace.',
    Parasiel: 'Angel of treasures and material wealth. He teaches how to find and possess hidden riches.',
    Sachiel: 'Ruling angel of Jupiter and Thursday. He governs prosperity, expansion, and good fortune.',
    Yophiel: 'Angel of divine beauty and wisdom. He illuminates the mind and elevates the spirit.',
  },
  psalm: { reference: 'Psalm 112:3', text: '"Wealth and riches are in his house, and his righteousness endures forever."' },
  instructions: [
    'Perform the LBRP first.',
    'Hold your Second Pentacle of Jupiter throughout the prayer.',
    'Thursday is Jupiter\'s day. Thursday + Jupiter hour + waxing/full moon is peak power.',
    'Blue or purple candles amplify Jovian work.',
    'Speak aloud, clearly and with intention — not quickly.',
  ],
  variants: {
    peak: {
      key: 'peak', powerLevel: 3,
      title: 'The Great Invocation of Jupiter',
      subtitle: 'Thursday · Waxing or Full Moon · Jupiter Hour',
      timingBadge: '✦ Peak Power',
      timingExplanation: 'All three conditions align: Thursday (Jupiter\'s day), a Jupiter hour, and the moon is waxing or full. This is the most powerful window for Jupiter work — the tradition says to make your most important petitions now.',
      intent: 'Major petitions — abundance, honor, expansion, consecration renewal',
      prayer: `I stand at the threshold of the Jovian sphere, in the hour and day of Jupiter, under a moon that grows in power.

I call upon you, Tzadkiel, Archangel of Jupiter — let the full force of divine mercy and abundance flow through this talisman and into every area of my life.

I call upon you, Parasiel, Lord of Treasures — the gates of abundance are open. Teach me to receive without resistance, to hold without fear, and to use wealth as a vessel of good.

I call upon you, Sachiel, Ruler of this day and this hour — expand my fortune, my honor, and my good name. Let my path be made clear.

I call upon you, Yophiel, Angel of Wisdom — illuminate my mind and elevate my spirit so that I may use all gifts with gratitude and wisdom.

I hold this Second Pentacle of Jupiter. May it draw to me glory, honors, dignities, and all kinds of good. May it bring great tranquility of mind.

As it is written: "Wealth and riches are in his house, and his righteousness endures forever." — Psalm 112:3

I receive this. I am grateful. So it is, and so shall it be. Amen.`,
    },
    day: {
      key: 'day', powerLevel: 2,
      title: 'Thursday Gratitude & Release',
      subtitle: 'Thursday · Jupiter Hour · Waning Moon',
      timingBadge: 'Thursday · Waning Moon',
      timingExplanation: 'It is Thursday (Jupiter\'s day) and a Jupiter hour. The waning moon asks you to give thanks and release scarcity thinking rather than petition for new things.',
      intent: 'Gratitude, releasing scarcity, clearing obstacles to abundance',
      prayer: `I stand in the hour of Jupiter, on Jupiter\'s own day, under a moon that releases what no longer serves.

I call upon Tzadkiel, Parasiel, Sachiel, and Yophiel — I come not to ask, but to give thanks. For every door that opened, every gift received, every moment of grace — I am grateful.

Let the waning moon carry away my scarcity thinking. Let what is false fall away so that what is true may remain.

I hold this Second Pentacle of Jupiter. As the moon diminishes, let all that blocks my abundance diminish with it.

As it is written: "Wealth and riches are in his house, and his righteousness endures forever." — Psalm 112:3

I release. I trust. So it is. Amen.`,
    },
    waxing: {
      key: 'waxing', powerLevel: 2,
      title: 'Daily Jupiter Invocation',
      subtitle: 'Jupiter Hour · Waxing or Full Moon',
      timingBadge: 'Jupiter Hour · Waxing Moon',
      timingExplanation: 'You are in a Jupiter hour and the moon is waxing. A favorable time for daily talisman maintenance and invoking abundance.',
      intent: 'Daily maintenance — invoking abundance, feeding the talisman',
      prayer: `I stand in the hour of Jupiter, under a growing moon.

I call upon Tzadkiel, Sachiel, Parasiel, and Yophiel — let this hour be a thread of gold connecting my daily life to the sphere of Chesed, the Loving-Kindness of the Most High.

I hold this Second Pentacle of Jupiter. As the moon grows, let my fortune grow with it. Let this talisman remain charged, active, and aligned with its purpose.

As it is written: "Wealth and riches are in his house, and his righteousness endures forever." — Psalm 112:3

So it is, and so shall it be. Amen.`,
    },
    waning: {
      key: 'waning', powerLevel: 1,
      title: 'Jupiter Hour Reflection',
      subtitle: 'Jupiter Hour · Waning Moon',
      timingBadge: 'Jupiter Hour · Waning Moon',
      timingExplanation: 'You are in a Jupiter hour, but the moon is waning. Use this time to review your practice, give thanks, and prepare for the next waxing cycle.',
      intent: 'Reflection, gratitude, and preparation for the next cycle',
      prayer: `I stand in the hour of Jupiter, under a waning moon.

I come not to petition, but to reflect. I give thanks to Tzadkiel, Sachiel, Parasiel, and Yophiel for their presence and their work in my life.

I hold this Second Pentacle of Jupiter and I simply breathe. I do not demand — I receive.

As the moon diminishes, let my anxieties about abundance diminish with it.

As it is written: "Wealth and riches are in his house, and his righteousness endures forever." — Psalm 112:3

I am grateful. I am ready. So it is. Amen.`,
    },
    off: {
      key: 'off', powerLevel: 1,
      title: 'Not a Jupiter Hour',
      subtitle: 'Current hour is not ruled by Jupiter',
      timingBadge: 'Off-Peak',
      timingExplanation: 'The current hour is not a Jupiter hour. Check the Observatory for the next Jupiter hour.',
      intent: 'Brief acknowledgment',
      prayer: `I acknowledge the sphere of Jupiter and the angels of my talisman — Tzadkiel, Sachiel, Parasiel, and Yophiel.

Though this is not a Jupiter hour, I hold this Second Pentacle and I am grateful for its presence in my life. I carry it with intention.

I will return to pray fully when the hour of Jupiter comes.

As it is written: "Wealth and riches are in his house, and his righteousness endures forever." — Psalm 112:3 Amen.`,
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// SATURN
// ─────────────────────────────────────────────────────────────────────────────
const SATURN_PRAYERS: PlanetPrayerSystem = {
  planet: 'Saturn',
  tradition: 'Solomonic / Agrippan — Binah (Understanding)',
  angels: ['Tzaphkiel', 'Agiel'],
  angelDescriptions: {
    Tzaphkiel: 'Archangel of Saturn. His name means "Beholder of God." He governs deep understanding, the passage of time, and the wisdom that comes through limitation and loss.',
    Agiel: 'Intelligence of Saturn. He governs discipline, long-term work, binding, and the establishment of firm foundations.',
  },
  psalm: { reference: 'Psalm 90:12', text: '"Teach us to number our days, that we may gain a heart of wisdom."' },
  instructions: [
    'Perform the LBRP first.',
    'Saturday is Saturn\'s day. Saturn work is most appropriate during waning moon.',
    'Black or dark blue candles, lead objects, or stones (obsidian, onyx) amplify Saturnian work.',
    'Saturn governs binding, banishing, discipline, and long-term foundations — not quick results.',
    'Approach Saturn with respect and seriousness. He rewards patience and punishes shortcuts.',
  ],
  variants: {
    peak: {
      key: 'peak', powerLevel: 3,
      title: 'The Great Saturnian Invocation',
      subtitle: 'Saturday · Waxing or Full Moon · Saturn Hour',
      timingBadge: '✦ Saturn Hour · Saturday',
      timingExplanation: 'It is Saturday (Saturn\'s day) and a Saturn hour. Note: Saturn work is traditionally most powerful during the waning or dark moon for binding and banishing. During a waxing moon, focus on building long-term foundations, establishing discipline, and invoking Saturnian wisdom.',
      intent: 'Long-term foundations, discipline, wisdom through limitation',
      prayer: `I stand in the slow, deep current of the Saturnian sphere, in the hour and day of Saturn.

I call upon you, Tzaphkiel, Archangel of Saturn — grant me the wisdom that comes only through time and limitation. Let me see clearly what is truly important and what is merely urgent. Let me build what will last.

I call upon you, Agiel, Intelligence of Saturn — discipline my will. Let me do the work that must be done, even when it is difficult, even when it is slow, even when no one is watching.

Let my foundations be firm. Let my long-term work be blessed. Let the passage of time work in my favor.

As it is written: "Teach us to number our days, that we may gain a heart of wisdom." — Psalm 90:12

I am patient. I am disciplined. I build what lasts. So it is, and so shall it be. Amen.`,
    },
    day: {
      key: 'day', powerLevel: 3,
      title: 'Saturday Saturnian Banishing',
      subtitle: 'Saturday · Waning Moon · Saturn Hour',
      timingBadge: '✦ Ideal for Saturn Work',
      timingExplanation: 'Saturday (Saturn\'s day), a Saturn hour, and the moon is waning — this is actually the most traditional alignment for Saturnian work. The waning moon combined with Saturn\'s energy is ideal for binding, banishing, and clearing away what must go.',
      intent: 'Banishing, binding, clearing obstacles, ending what must end',
      prayer: `I stand in the heavy, ancient current of the Saturnian sphere, in the hour and day of Saturn, under a waning moon.

I call upon you, Tzaphkiel, Archangel of Saturn — let the weight of Saturn fall upon what must be ended. Let what is harmful, what is false, and what has run its course be bound and removed from my life.

I call upon you, Agiel, Intelligence of Saturn — let the discipline of Saturn clear what my own will has been unable to clear. Let the old structures that no longer serve me crumble. Let the dead wood be cut away so that new growth can come.

I do not fear endings. I understand that Saturn\'s work is necessary. What must go, goes now.

As it is written: "Teach us to number our days, that we may gain a heart of wisdom." — Psalm 90:12

It is done. So it is, and so shall it be. Amen.`,
    },
    waxing: {
      key: 'waxing', powerLevel: 2,
      title: 'Saturnian Hour — Foundation Work',
      subtitle: 'Saturn Hour · Waxing or Full Moon',
      timingBadge: 'Saturn Hour · Waxing Moon',
      timingExplanation: 'You are in a Saturn hour and the moon is waxing. Saturn during a waxing moon is best used for building long-term structures, establishing discipline, and invoking patience.',
      intent: 'Building foundations, establishing discipline, long-term planning',
      prayer: `I stand in the hour of Saturn, under a growing moon.

I call upon Tzaphkiel and Agiel — let this hour strengthen my long-term foundations. Let me build slowly and correctly. Let me resist the temptation of shortcuts.

Let my discipline be consistent. Let my patience be genuine. Let what I build now still be standing years from now.

As it is written: "Teach us to number our days, that we may gain a heart of wisdom." — Psalm 90:12

So it is, and so shall it be. Amen.`,
    },
    waning: {
      key: 'waning', powerLevel: 2,
      title: 'Saturnian Hour — Banishing',
      subtitle: 'Saturn Hour · Waning Moon',
      timingBadge: 'Saturn Hour · Waning Moon',
      timingExplanation: 'You are in a Saturn hour and the moon is waning — a good alignment for Saturnian banishing and binding work. Use this time to remove what must go.',
      intent: 'Banishing, binding, removing obstacles',
      prayer: `I stand in the hour of Saturn, under a waning moon.

I call upon Tzaphkiel and Agiel — let the combined force of Saturn and the waning moon remove what must be removed from my life. Let what is harmful be bound. Let what is dead be cleared away.

I name what must go: [speak it aloud]. It has no further claim on me.

As it is written: "Teach us to number our days, that we may gain a heart of wisdom." — Psalm 90:12

It is done. Amen.`,
    },
    off: {
      key: 'off', powerLevel: 1,
      title: 'Not a Saturn Hour',
      subtitle: 'Current hour is not ruled by Saturn',
      timingBadge: 'Off-Peak',
      timingExplanation: 'The current hour is not a Saturn hour. Save Saturn work for a Saturn hour — ideally on Saturday during a waning moon.',
      intent: 'Brief acknowledgment',
      prayer: `I acknowledge the Saturnian sphere and its angels — Tzaphkiel and Agiel.

Though this is not a Saturn hour, I carry the capacity for discipline, patience, and long-term work within me. I am grateful for the wisdom Saturn governs.

I will return to pray fully when Saturn\'s hour comes. Amen.`,
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Export
// ─────────────────────────────────────────────────────────────────────────────
export const PLANET_PRAYER_SYSTEMS: Record<PlanetName, PlanetPrayerSystem> = {
  Sun: SUN_PRAYERS,
  Moon: MOON_PRAYERS,
  Mercury: MERCURY_PRAYERS,
  Venus: VENUS_PRAYERS,
  Mars: MARS_PRAYERS,
  Jupiter: JUPITER_PRAYERS,
  Saturn: SATURN_PRAYERS,
};
