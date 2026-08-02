/**
 * Consecration Page — Guided one-time ritual for formally consecrating
 * the Second Pentacle of Jupiter using the full Solomonic procedure.
 * Includes timing requirements, tools, the full conjuration, and completion tracking.
 */
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { calculatePlanetaryHours, getCurrentHour, getNextJupiterHour, formatTime, PLANET_INFO } from '@/lib/planetaryHours';
import { getMoonPhase } from '@/lib/moonPhase';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const GOLD = '#C9A84C';
const STORAGE_KEY = 'magick-consecration-complete';

// ── Consecration steps ────────────────────────────────────────────────────────
interface ConsecrStep {
  id: number;
  title: string;
  phase: 'preparation' | 'purification' | 'invocation' | 'consecration' | 'closing';
  instruction: string;
  detail?: string;
  vibration?: string;
  tip?: string;
}

const STEPS: ConsecrStep[] = [
  {
    id: 1, phase: 'preparation', title: 'Choose Your Timing',
    instruction: 'This ritual must be performed during a Jupiter hour on a Thursday, with the moon waxing or full. This is not optional — the timing is part of the ritual.',
    detail: 'The Second Pentacle of Jupiter draws its power from the Jovian sphere. Performing the consecration at the correct time aligns the talisman with that sphere at the moment of its activation. The ideal window is the first Jupiter hour of Thursday morning.',
    tip: 'Check the Observatory for the next Thursday Jupiter hour. Mark it in your calendar. Prepare everything the night before.',
  },
  {
    id: 2, phase: 'preparation', title: 'Gather Your Tools',
    instruction: 'Assemble the following before you begin. You do not need all of them, but more is better for a first consecration.',
    detail: `Required:
• Your Second Pentacle of Jupiter talisman
• A clean, quiet space where you will not be disturbed
• This app (or a printed copy of the prayers)

Recommended:
• A blue or purple candle (Jupiter's colors)
• Incense: cedar, pine, or frankincense (Jovian scents)
• A small bowl of water (for purification)
• A piece of tin or anything gold-colored (Jupiter's metal)
• Clean hands and clean clothes — take a shower before the ritual`,
    tip: 'You do not need an elaborate altar. A clean table with a candle and your talisman is sufficient for a beginner. The intention and timing matter far more than the props.',
  },
  {
    id: 3, phase: 'preparation', title: 'Fast or Abstain (Optional)',
    instruction: 'The Solomonic tradition recommends fasting for 24 hours before a major consecration, or at minimum abstaining from meat, alcohol, and sexual activity on the day of the ritual.',
    detail: 'This is about signal-to-noise. The body\'s gross appetites create psychic noise that can interfere with subtle work. Even a partial fast — skipping one meal, avoiding alcohol — demonstrates seriousness of intent and quiets the body.',
    tip: 'For a first consecration, do what you can. Even a 4-hour fast before the ritual is meaningful. Do not let perfect be the enemy of good.',
  },
  {
    id: 4, phase: 'purification', title: 'Perform the LBRP',
    instruction: 'Begin with the Lesser Banishing Ritual of the Pentagram. This clears the space of unwanted influences and establishes a protected working area.',
    detail: 'The LBRP is the foundation of all ceremonial work. It creates a sphere of purified space around you. For a consecration, it is not optional — you are about to call on powerful angelic forces, and you want a clean space for them to enter.',
    tip: 'If you are still learning the LBRP, do your best version of it. The intent to purify is more important than perfect execution at this stage. Use the LBRP Guide in the Ritual section if you need a refresher.',
  },
  {
    id: 5, phase: 'purification', title: 'Purify the Talisman',
    instruction: 'Hold your talisman over the candle flame (briefly — do not burn it) and pass it through the incense smoke. Then touch it to the bowl of water. As you do each, say: "I purify this talisman by fire, by air, and by water."',
    detail: 'This removes any previous influences — the energy of whoever made it, shipped it, or handled it before you. You are wiping the slate clean so that only your intention and the angelic forces you call will be impressed upon it.',
    tip: 'If you have no candle or incense, hold the talisman in both hands and breathe on it three times with the intention of purification. Intention is the operative force.',
  },
  {
    id: 6, phase: 'invocation', title: 'Call Upon the Four Angels',
    instruction: 'Hold the talisman in your dominant hand, facing East. Speak each angel\'s name aloud, clearly and deliberately. Pause between each name.',
    vibration: 'TZADKIEL\nPARASIEL\nSACHIEL\nYOPHIEL',
    detail: 'These are the four angels whose names are inscribed on your talisman. You are calling them by name — not as a formality, but as a genuine invocation. Speak as if you expect to be heard, because you will be.',
    tip: 'Face East — the direction of the rising sun and of beginnings. If you cannot face East, face the direction that feels most open to you.',
  },
  {
    id: 7, phase: 'invocation', title: 'The Invocation of Jupiter',
    instruction: 'Speak the following invocation aloud. Hold the talisman against your heart as you speak.',
    detail: `"I call upon the sphere of Jupiter, the sphere of Chesed, the Loving-Kindness of the Most High.

I call upon Tzadkiel, Archangel of Jupiter, whose name means Righteousness of God — be present in this place and in this work.

I call upon Sachiel, Ruler of Thursday and of this hour — let the full force of the Jovian sphere flow through this talisman.

I call upon Parasiel, Lord of Treasures — open the gates of abundance and let them remain open.

I call upon Yophiel, Angel of Wisdom and Beauty — illuminate this talisman with divine light.

As it is written: 'Wealth and riches are in his house, and his righteousness endures forever.' — Psalm 112:3

In the name of El — the divine name of the sphere of Jupiter — I ask that this talisman be filled with Jovian power, that it draw to its wearer glory, honors, dignities, riches, and all kinds of good, and that it bring great tranquility of mind.

So it is, and so shall it be."`,
    tip: 'Speak slowly. Do not rush. If you feel emotion — gratitude, awe, or even tears — that is the energy moving. Let it.',
  },
  {
    id: 8, phase: 'consecration', title: 'The Consecration',
    instruction: 'Hold the talisman up toward the ceiling (or sky if outdoors) with both hands. Speak the consecration.',
    detail: `"I consecrate this Second Pentacle of Jupiter.

By the power of El, by the presence of Tzadkiel, Sachiel, Parasiel, and Yophiel, I declare this talisman to be a vessel of Jovian power.

Let it be charged with the energy of expansion, abundance, honor, and divine favor.

Let it protect its wearer from poverty, misfortune, and the diminishment of good.

Let it draw prosperity in all its forms — financial, social, spiritual, and physical.

This talisman is now consecrated. It is alive. It is working. So it is, and so shall it be."`,
    tip: 'After speaking the consecration, hold the talisman to your forehead for a moment, then to your heart. This seals the connection between the talisman and you specifically.',
  },
  {
    id: 9, phase: 'consecration', title: 'Seal It With the Psalm',
    instruction: 'Speak Psalm 112:3 three times over the talisman.',
    vibration: '"Wealth and riches are in his house,\nand his righteousness endures forever."\n\n— Psalm 112:3',
    detail: 'The Psalms are the traditional scriptural anchors of Solomonic magic. Repeating this verse three times (a sacred number) locks the consecration in place with divine authority.',
    tip: 'Three times means three complete recitations, not three words. Speak each one as if it is the first time you have ever said it.',
  },
  {
    id: 10, phase: 'closing', title: 'Give Thanks and Close',
    instruction: 'Thank each angel by name. Then perform the LBRP again to close the space.',
    detail: `Speak: "I give thanks to Tzadkiel, Sachiel, Parasiel, and Yophiel for your presence and your work. Go in peace, and return when called. The work is done."

Then perform the LBRP to close the ritual space. This is important — you opened a door, and now you are closing it properly.`,
    tip: 'Always close what you open. The closing LBRP is not just courtesy — it seals the work and returns the space to normal.',
  },
  {
    id: 11, phase: 'closing', title: 'Wear the Talisman and Journal',
    instruction: 'Put the talisman on immediately after the ritual. Write a journal entry about the experience — what you felt, what you noticed, any unusual sensations or thoughts.',
    detail: 'The talisman should be worn against the skin, close to the heart if possible, for at least 24 hours after consecration. This allows your personal energy to fully bond with it.\n\nYour journal entry is important. The AI mentor will give you feedback on the consecration experience and suggest what to do next.',
    tip: 'Do not be discouraged if you felt "nothing." Consecration is not always dramatic. The work was done whether you felt it or not. Trust the timing, trust the tradition, and keep practicing.',
  },
];

const PHASE_LABELS: Record<string, string> = {
  preparation: 'Preparation',
  purification: 'Purification',
  invocation: 'Invocation',
  consecration: 'Consecration',
  closing: 'Closing',
};
const PHASE_COLORS: Record<string, string> = {
  preparation: 'text-muted-foreground',
  purification: 'text-blue-400',
  invocation: 'text-purple-400',
  consecration: 'text-primary',
  closing: 'text-amber-400',
};

// ── Timing checker ────────────────────────────────────────────────────────────
function TimingStatus() {
  const now = new Date();
  const dayData = calculatePlanetaryHours(now);
  const currentHour = getCurrentHour(dayData, now);
  const nextJupiter = getNextJupiterHour(dayData, now);
  const moon = getMoonPhase(now);
  const isThursday = dayData.dayRuler === 'Jupiter';
  const isJupiterHour = currentHour?.planet === 'Jupiter';
  const isWaxingOrFull = moon.phaseName.toLowerCase().includes('waxing') || moon.phaseName.toLowerCase().includes('full');
  const isPeak = isThursday && isJupiterHour && isWaxingOrFull;
  const isGood = isJupiterHour && isWaxingOrFull;

  return (
    <Card className={cn(
      'border transition-all duration-300',
      isPeak ? 'border-primary/50 bg-primary/5' : isGood ? 'border-blue-400/30 bg-blue-400/5' : 'border-border bg-card'
    )}>
      <CardHeader className="pb-2">
        <CardTitle className="font-display text-xs tracking-widest text-muted-foreground uppercase">
          Current Timing
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <div className={cn('rounded-md p-2 text-center', isThursday ? 'bg-primary/10 border border-primary/20' : 'bg-muted/50')}>
            <div className="text-xs text-muted-foreground mb-1">Day</div>
            <div className={cn('text-sm font-display', isThursday ? 'text-primary' : 'text-foreground')}>
              {isThursday ? '✦ Thursday' : now.toLocaleDateString('en-US', { weekday: 'short' })}
            </div>
          </div>
          <div className={cn('rounded-md p-2 text-center', isJupiterHour ? 'bg-primary/10 border border-primary/20' : 'bg-muted/50')}>
            <div className="text-xs text-muted-foreground mb-1">Hour</div>
            <div className={cn('text-sm font-display', isJupiterHour ? 'text-primary' : 'text-foreground')}>
              {isJupiterHour ? '✦ Jupiter' : currentHour?.planet ?? '—'}
            </div>
          </div>
          <div className={cn('rounded-md p-2 text-center', isWaxingOrFull ? 'bg-primary/10 border border-primary/20' : 'bg-muted/50')}>
            <div className="text-xs text-muted-foreground mb-1">Moon</div>
            <div className={cn('text-sm font-display', isWaxingOrFull ? 'text-primary' : 'text-foreground')}>
              {isWaxingOrFull ? '✦ Waxing' : 'Waning'}
            </div>
          </div>
        </div>
        {isPeak && (
          <div className="bg-primary/10 border border-primary/20 rounded-md p-3 text-center">
            <p className="text-sm text-primary font-display tracking-wide">✦ Perfect timing — perform the consecration now</p>
          </div>
        )}
        {isGood && !isPeak && (
          <div className="bg-blue-400/10 border border-blue-400/20 rounded-md p-3">
            <p className="text-sm text-blue-400">Good timing — Jupiter hour + waxing moon. Not Thursday, but acceptable.</p>
          </div>
        )}
        {!isGood && (
          <div className="bg-muted/50 rounded-md p-3">
            <p className="text-xs text-muted-foreground">
              Not ideal timing. Wait for a Jupiter hour during a waxing or full moon, ideally on a Thursday.
            </p>
            {nextJupiter && (
              <p className="text-xs text-muted-foreground mt-1">
                Next Jupiter hour: <span className="text-foreground">{formatTime(nextJupiter.start)}</span>
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Consecration() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isComplete, setIsComplete] = useState(false);
  const [mode, setMode] = useState<'guided' | 'overview'>('guided');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setIsComplete(true);
  }, []);

  const step = STEPS[currentStep];
  const totalSteps = STEPS.length;
  const progressPct = Math.round((completedSteps.size / totalSteps) * 100);

  const markComplete = () => {
    const next = new Set(completedSteps);
    next.add(step.id);
    setCompletedSteps(next);
    if (currentStep < totalSteps - 1) {
      setCurrentStep(s => s + 1);
    } else {
      localStorage.setItem(STORAGE_KEY, new Date().toISOString());
      setIsComplete(true);
      toast.success('Consecration complete. Your talisman is activated.');
    }
  };

  const resetConsecration = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsComplete(false);
    setCurrentStep(0);
    setCompletedSteps(new Set());
  };

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl" style={{ color: GOLD }}>♃</span>
          <h1 className="font-display text-2xl lg:text-3xl text-foreground tracking-wide">Consecration Ritual</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          The formal activation of your Second Pentacle of Jupiter — Solomonic tradition
        </p>
        <div className="gold-rule mt-4" />
      </div>

      {/* Completion state */}
      {isComplete && (
        <Card className="border-primary/40 bg-primary/5 mb-6">
          <CardContent className="pt-6 pb-6 text-center">
            <div className="text-4xl mb-3" style={{ color: GOLD }}>♃</div>
            <h2 className="font-display text-xl text-primary mb-2">Consecration Complete</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
              Your Second Pentacle of Jupiter has been formally consecrated. Wear it daily, pray during Jupiter hours, and use the journal to track your practice. The talisman grows stronger with consistent attention.
            </p>
            <div className="mt-4 space-y-2">
              <p className="text-xs text-muted-foreground">
                Completed: {localStorage.getItem(STORAGE_KEY) ? new Date(localStorage.getItem(STORAGE_KEY)!).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) : ''}
              </p>
              <Button variant="outline" size="sm" onClick={resetConsecration}
                className="border-border text-muted-foreground text-xs">
                Redo Consecration (annual renewal)
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Intro card */}
      {!isComplete && (
        <>
          <Card className="bg-card border-border mb-4">
            <CardContent className="pt-5">
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                This is a one-time guided ritual to formally consecrate your Second Pentacle of Jupiter using the Solomonic tradition. Consecration activates the talisman — it transforms it from a piece of metal with symbols into a charged magical instrument.
              </p>
              <div className="bg-amber-400/10 border border-amber-400/20 rounded-md p-3">
                <p className="text-xs text-amber-400 leading-relaxed">
                  <strong>Important:</strong> Do not perform this ritual casually. Read through all 11 steps first. Prepare your timing, tools, and space. The consecration should be treated as a significant event, not a quick exercise.
                </p>
              </div>
            </CardContent>
          </Card>

          <TimingStatus />

          <div className="flex gap-2 mt-4 mb-4">
            <Button variant={mode === 'guided' ? 'default' : 'outline'} size="sm"
              onClick={() => setMode('guided')}
              className={mode === 'guided' ? 'bg-primary text-primary-foreground' : 'border-border text-muted-foreground'}>
              Guided Mode
            </Button>
            <Button variant={mode === 'overview' ? 'default' : 'outline'} size="sm"
              onClick={() => setMode('overview')}
              className={mode === 'overview' ? 'bg-primary text-primary-foreground' : 'border-border text-muted-foreground'}>
              Full Overview
            </Button>
          </div>

          {/* Progress bar */}
          {completedSteps.size > 0 && (
            <div className="mb-4">
              <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                <span>{completedSteps.size} of {totalSteps} steps complete</span>
                <span>{progressPct}%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%`, background: GOLD }} />
              </div>
            </div>
          )}

          {mode === 'guided' ? (
            <Card className={cn(
              'bg-card border transition-all duration-300',
              completedSteps.has(step.id) ? 'border-primary/30' : 'border-border'
            )}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={cn('font-display text-xs tracking-wider border-border', PHASE_COLORS[step.phase])}>
                    {PHASE_LABELS[step.phase]}
                  </Badge>
                  <span className="text-xs text-muted-foreground">Step {step.id} of {totalSteps}</span>
                </div>
                <CardTitle className="font-display text-lg text-foreground mt-2">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-foreground leading-relaxed">{step.instruction}</p>

                {step.vibration && (
                  <div className="bg-accent/30 border border-primary/20 rounded-md p-4">
                    <div className="text-xs text-muted-foreground mb-2 font-display tracking-widest uppercase">Speak Aloud</div>
                    <div className="font-display text-base text-primary whitespace-pre-line leading-relaxed">{step.vibration}</div>
                  </div>
                )}

                {step.detail && !step.vibration && (
                  <div className="bg-muted/40 rounded-md p-3 border-l-2 border-primary/30">
                    <div className="text-xs text-muted-foreground mb-2 font-display tracking-widest uppercase">Detail</div>
                    <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">{step.detail}</p>
                  </div>
                )}
                {step.detail && step.vibration && (
                  <div className="bg-muted/40 rounded-md p-3 border-l-2 border-primary/30">
                    <div className="text-xs text-muted-foreground mb-2 font-display tracking-widest uppercase">Context</div>
                    <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">{step.detail}</p>
                  </div>
                )}

                {step.tip && (
                  <div className="border-l-2 border-amber-400/40 pl-3">
                    <div className="text-xs text-amber-400 mb-1">Beginner's Note</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.tip}</p>
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <Button variant="outline" size="sm"
                    onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
                    disabled={currentStep === 0}
                    className="border-border text-muted-foreground flex-1">
                    ← Back
                  </Button>
                  <Button size="sm"
                    onClick={markComplete}
                    className="flex-1 font-display tracking-wider"
                    style={{ background: GOLD, color: '#0D0D14' }}>
                    {currentStep === totalSteps - 1 ? '✦ Complete Consecration' : 'Done → Next Step'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {(['preparation', 'purification', 'invocation', 'consecration', 'closing'] as const).map(phase => (
                <Card key={phase} className="bg-card border-border">
                  <CardHeader className="pb-2">
                    <CardTitle className={cn('font-display text-sm tracking-wide', PHASE_COLORS[phase])}>
                      {PHASE_LABELS[phase]}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {STEPS.filter(s => s.phase === phase).map(s => (
                        <div key={s.id} className={cn(
                          'flex gap-3 p-2 rounded-md',
                          completedSteps.has(s.id) ? 'bg-primary/10' : 'bg-muted/30'
                        )}>
                          <span className="text-xs mt-0.5 shrink-0" style={{ color: completedSteps.has(s.id) ? GOLD : '#64748B' }}>
                            {completedSteps.has(s.id) ? '✓' : s.id + '.'}
                          </span>
                          <div>
                            <div className="text-xs text-foreground font-medium">{s.title}</div>
                            <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{s.instruction.slice(0, 120)}...</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button className="w-full font-display tracking-wider"
                style={{ background: GOLD, color: '#0D0D14' }}
                onClick={() => setMode('guided')}>
                Begin Guided Mode →
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
