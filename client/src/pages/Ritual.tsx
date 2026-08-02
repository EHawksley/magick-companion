/**
 * Ritual Page — All 7 Planet Prayers + LBRP Guide
 * Planet selector at top; each planet shows dynamic prayer based on
 * current hour, day of week, and moon phase.
 * Sacred Observatory theme.
 */
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LBRP_STEPS, LBRP_INTRO, getMoonCategory } from '@/lib/ritualContent';
import { PLANET_PRAYER_SYSTEMS, selectPlanetPrayer, type PlanetPrayerSystem } from '@/lib/planetPrayers';
import { calculatePlanetaryHours, PLANET_INFO, type PlanetName, type PlanetaryHour } from '@/lib/planetaryHours';
import { getMoonPhase } from '@/lib/moonPhase';
import { cn } from '@/lib/utils';

// ── Planet selector colors ────────────────────────────────────────────────────
const PLANET_COLORS: Record<PlanetName, string> = {
  Sun: '#F59E0B',
  Moon: '#94A3B8',
  Mercury: '#F97316',
  Venus: '#F9A8D4',
  Mars: '#EF4444',
  Jupiter: '#C9A84C',
  Saturn: '#64748B',
};

const DISPLAY_ORDER: PlanetName[] = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'];

// ── LBRP phase colors ─────────────────────────────────────────────────────────
const PHASE_LABELS: Record<string, string> = {
  'kabbalistic-cross': 'Kabbalistic Cross',
  'pentagrams': 'The Pentagrams',
  'archangels': 'The Archangels',
  'kabbalistic-cross-2': 'Closing Cross',
};
const PHASE_COLORS: Record<string, string> = {
  'kabbalistic-cross': 'text-amber-400',
  'pentagrams': 'text-blue-400',
  'archangels': 'text-purple-400',
  'kabbalistic-cross-2': 'text-amber-400',
};

// ── Power level styling ───────────────────────────────────────────────────────
const POWER_COLORS: Record<1 | 2 | 3, string> = {
  1: 'text-muted-foreground border-muted-foreground/40',
  2: 'text-blue-400 border-blue-400/40',
  3: 'text-primary border-primary/40',
};
const POWER_LABELS: Record<1 | 2 | 3, string> = {
  1: 'Low resonance',
  2: 'Good resonance',
  3: '✦ Peak power',
};

// ── Ritual context hook ───────────────────────────────────────────────────────
interface RitualContext {
  currentPlanet: PlanetName | null;
  isPlanetHour: (planet: PlanetName) => boolean;
  isPlanetDay: (planet: PlanetName) => boolean;
  moonCategory: ReturnType<typeof getMoonCategory>;
  nextHourFor: (planet: PlanetName) => PlanetaryHour | null;
}

function useRitualContext(): RitualContext {
  const [ctx, setCtx] = useState<RitualContext>(() => buildCtx());

  function buildCtx(): RitualContext {
    const now = new Date();
    const dayData = calculatePlanetaryHours(now);
    const moon = getMoonPhase(now);
    const moonCategory = getMoonCategory(moon.phaseName);
    const currentHour = dayData.hours.find(
      (h: PlanetaryHour) => now >= h.start && now < h.end
    ) ?? null;
    const dayRuler = dayData.dayRuler;

    return {
      currentPlanet: currentHour?.planet ?? null,
      isPlanetHour: (p) => currentHour?.planet === p,
      isPlanetDay: (p) => dayRuler === p,
      moonCategory,
      nextHourFor: (p) =>
        dayData.hours.find((h: PlanetaryHour) => h.planet === p && h.start > now) ?? null,
    };
  }

  useEffect(() => {
    const interval = setInterval(() => setCtx(buildCtx()), 60_000);
    return () => clearInterval(interval);
  }, []);

  return ctx;
}

// ── Planet Prayer Panel ───────────────────────────────────────────────────────
function PlanetPrayerPanel({ planet, ctx }: { planet: PlanetName; ctx: RitualContext }) {
  const [prayerOpen, setPrayerOpen] = useState(false);
  const [corrOpen, setCorrOpen] = useState(false);
  const system: PlanetPrayerSystem = PLANET_PRAYER_SYSTEMS[planet];
  const variant = selectPlanetPrayer(
    system,
    ctx.isPlanetHour(planet),
    ctx.isPlanetDay(planet),
    ctx.moonCategory
  );
  const color = PLANET_COLORS[planet];
  const info = PLANET_INFO[planet];
  const nextHour = ctx.nextHourFor(planet);

  return (
    <div className="space-y-4">
      {/* Timing banner */}
      <Card className={cn(
        'bg-card border transition-all duration-300',
        variant.powerLevel === 3 ? 'border-primary/40' : variant.powerLevel === 2 ? 'border-blue-400/30' : 'border-border'
      )}>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl border-2 shrink-0"
              style={{ borderColor: color + '50', background: color + '15' }}
            >
              {info.glyph}
            </div>
            <div>
              <CardTitle className="font-display text-lg" style={{ color }}>
                {variant.title}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">{variant.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className={cn('font-display text-xs tracking-wider', POWER_COLORS[variant.powerLevel])}>
              {variant.timingBadge}
            </Badge>
            <span className="text-xs text-muted-foreground">{POWER_LABELS[variant.powerLevel]}</span>
          </div>
        </CardHeader>
        <CardContent>
          {/* Why this prayer now */}
          <div className="bg-muted/40 rounded-md p-3 mb-4 border-l-2 border-primary/30">
            <div className="text-xs text-muted-foreground mb-1 font-display tracking-widest uppercase">Why this prayer now</div>
            <p className="text-xs text-muted-foreground leading-relaxed">{variant.timingExplanation}</p>
          </div>
          <div className="bg-muted/50 rounded-md p-3 mb-4">
            <div className="text-xs text-muted-foreground mb-1">Intent</div>
            <div className="text-sm text-foreground">{variant.intent}</div>
          </div>
          <div className="bg-muted/50 rounded-md p-3 mb-4">
            <div className="text-xs text-muted-foreground mb-1">Tradition</div>
            <div className="text-sm text-foreground">{system.tradition}</div>
          </div>
          {/* Angels */}
          <div className="text-xs text-muted-foreground mb-2 font-display tracking-widest uppercase">Angels</div>
          <div className="grid grid-cols-1 gap-2 mb-0">
            {system.angels.map(angel => (
              <div key={angel} className="bg-accent/30 rounded-md p-2.5">
                <div className="text-sm font-display" style={{ color }}>{angel}</div>
                <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  {system.angelDescriptions[angel]}
                </div>
              </div>
            ))}
          </div>
          {/* Correspondences — collapsible */}
          <button
            onClick={() => setCorrOpen(o => !o)}
            className="w-full mt-4 flex items-center justify-between text-xs text-muted-foreground hover:text-foreground transition-colors py-2 border-t border-border"
          >
            <span className="font-display tracking-widest uppercase">Correspondences</span>
            <span>{corrOpen ? '▲' : '▼'}</span>
          </button>
          {corrOpen && (
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="bg-muted/50 rounded-md p-2.5">
                <div className="text-xs text-muted-foreground mb-1">Day</div>
                <div className="text-sm text-foreground">{info.day}</div>
              </div>
              <div className="bg-muted/50 rounded-md p-2.5">
                <div className="text-xs text-muted-foreground mb-1">Metal</div>
                <div className="text-sm text-foreground">{info.metal}</div>
              </div>
              <div className="bg-muted/50 rounded-md p-2.5">
                <div className="text-xs text-muted-foreground mb-1">Color</div>
                <div className="text-sm text-foreground">{info.color}</div>
              </div>
              <div className="bg-muted/50 rounded-md p-2.5">
                <div className="text-xs text-muted-foreground mb-1">Number</div>
                <div className="text-sm text-foreground">{info.number}</div>
              </div>
              <div className="bg-muted/50 rounded-md p-2.5 col-span-2">
                <div className="text-xs text-muted-foreground mb-1">Keywords</div>
                <div className="text-sm text-foreground">{info.keywords}</div>
              </div>
              <div className="bg-muted/50 rounded-md p-2.5 col-span-2">
                <div className="text-xs text-muted-foreground mb-1">Description</div>
                <div className="text-xs text-foreground leading-relaxed">{info.description}</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="font-display text-xs tracking-widest text-muted-foreground uppercase">Before You Begin</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {system.instructions.map((inst, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-xs mt-0.5 shrink-0" style={{ color }}>✦</span>
                <p className="text-sm text-muted-foreground leading-relaxed">{inst}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Psalm */}
      {system.psalm && (
        <Card className="bg-card border-border">
          <CardContent className="pt-5">
            <blockquote className="border-l-2 pl-4" style={{ borderColor: color + '40' }}>
              <p className="text-sm text-foreground italic leading-relaxed">{system.psalm.text}</p>
              <cite className="text-xs text-muted-foreground mt-2 block">— {system.psalm.reference}</cite>
            </blockquote>
          </CardContent>
        </Card>
      )}

      {/* Prayer button */}
      <Button
        className={cn(
          'w-full font-display tracking-wider',
          variant.powerLevel === 3
            ? 'text-primary-foreground'
            : variant.powerLevel === 2
            ? 'text-primary-foreground opacity-90'
            : 'bg-muted text-muted-foreground border border-border'
        )}
        style={variant.powerLevel >= 2 ? { background: color } : {}}
        size="lg"
        onClick={() => setPrayerOpen(o => !o)}
      >
        {prayerOpen ? 'Close Prayer' : `✦ Open the ${variant.title}`}
      </Button>

      {prayerOpen && (
        <Card className={cn('bg-card', variant.powerLevel === 3 ? 'border-primary/20' : 'border-border')}>
          <CardHeader className="pb-3">
            <CardTitle className="font-display text-sm tracking-widest uppercase" style={{ color }}>
              {variant.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {variant.prayer.split('\n\n').map((para, i) => (
                <p key={i} className="text-sm text-foreground leading-loose">{para}</p>
              ))}
            </div>
            {!ctx.isPlanetHour(planet) && nextHour && (
              <div className="mt-4 bg-muted/50 border border-border rounded-md p-3">
                <div className="text-xs text-muted-foreground mb-1">Next {planet} Hour</div>
                <div className="text-sm font-display" style={{ color }}>
                  {nextHour.start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ── LBRP Guide ────────────────────────────────────────────────────────────────
function LBRPGuide() {
  const [currentStep, setCurrentStep] = useState(0);
  const [mode, setMode] = useState<'guided' | 'reference'>('guided');
  const step = LBRP_STEPS[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === LBRP_STEPS.length - 1;

  return (
    <div className="space-y-4">
      <Card className="bg-card border-border">
        <CardContent className="pt-5">
          <p className="text-sm text-muted-foreground leading-relaxed">{LBRP_INTRO.description}</p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-muted/50 rounded-md p-3">
              <div className="text-xs text-muted-foreground mb-1">Time Required</div>
              <div className="text-sm text-foreground">{LBRP_INTRO.timeRequired}</div>
            </div>
            <div className="bg-muted/50 rounded-md p-3">
              <div className="text-xs text-muted-foreground mb-1">Frequency</div>
              <div className="text-sm text-foreground">{LBRP_INTRO.frequency}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Opening vs Closing */}
      <Card className="bg-card border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="font-display text-xs tracking-widest text-primary uppercase">
            ✦ {LBRP_INTRO.openingVsClosing.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-xs text-muted-foreground leading-relaxed">{LBRP_INTRO.openingVsClosing.explanation}</p>
          <div className="bg-blue-400/10 border border-blue-400/20 rounded-md p-3">
            <div className="text-xs text-blue-400 font-display tracking-wider mb-1">{LBRP_INTRO.openingVsClosing.opening.label}</div>
            <div className="text-xs text-muted-foreground mb-1"><span className="text-foreground">When:</span> {LBRP_INTRO.openingVsClosing.opening.when}</div>
            <p className="text-xs text-muted-foreground leading-relaxed">{LBRP_INTRO.openingVsClosing.opening.intent}</p>
            <p className="text-xs text-muted-foreground italic mt-2 border-l-2 border-blue-400/30 pl-2">{LBRP_INTRO.openingVsClosing.opening.mindset}</p>
          </div>
          <div className="bg-amber-400/10 border border-amber-400/20 rounded-md p-3">
            <div className="text-xs text-amber-400 font-display tracking-wider mb-1">{LBRP_INTRO.openingVsClosing.closing.label}</div>
            <div className="text-xs text-muted-foreground mb-1"><span className="text-foreground">When:</span> {LBRP_INTRO.openingVsClosing.closing.when}</div>
            <p className="text-xs text-muted-foreground leading-relaxed">{LBRP_INTRO.openingVsClosing.closing.intent}</p>
            <p className="text-xs text-muted-foreground italic mt-2 border-l-2 border-amber-400/30 pl-2">{LBRP_INTRO.openingVsClosing.closing.mindset}</p>
          </div>
          <div className="bg-muted/40 rounded-md p-3 border border-border">
            <div className="text-xs text-primary font-display tracking-wider mb-2">{LBRP_INTRO.openingVsClosing.closingStatement.label}</div>
            <p className="text-xs text-muted-foreground mb-2">{LBRP_INTRO.openingVsClosing.closingStatement.text}</p>
            <blockquote className="border-l-2 border-primary/40 pl-3 mb-2">
              <p className="text-sm text-foreground italic leading-relaxed">{LBRP_INTRO.openingVsClosing.closingStatement.statement}</p>
            </blockquote>
            <p className="text-xs text-muted-foreground leading-relaxed">{LBRP_INTRO.openingVsClosing.closingStatement.note}</p>
          </div>
        </CardContent>
      </Card>
      <div className="flex gap-2">
        <Button variant={mode === 'guided' ? 'default' : 'outline'} size="sm"
          onClick={() => { setMode('guided'); setCurrentStep(0); }}
          className={mode === 'guided' ? 'bg-primary text-primary-foreground' : 'border-border text-muted-foreground'}>
          Guided Mode
        </Button>
        <Button variant={mode === 'reference' ? 'default' : 'outline'} size="sm"
          onClick={() => setMode('reference')}
          className={mode === 'reference' ? 'bg-primary text-primary-foreground' : 'border-border text-muted-foreground'}>
          Reference Card
        </Button>
      </div>

      {mode === 'guided' ? (
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className={cn('font-display text-xs tracking-wider border-border', PHASE_COLORS[step.phase])}>
                {PHASE_LABELS[step.phase]}
              </Badge>
              <span className="text-xs text-muted-foreground">Step {step.id} of {LBRP_STEPS.length}</span>
            </div>
            <CardTitle className="font-display text-lg text-foreground mt-2">{step.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / LBRP_STEPS.length) * 100}%` }} />
            </div>
            <p className="text-sm text-foreground leading-relaxed">{step.instruction}</p>
            {step.gesture && (
              <div className="bg-muted/50 rounded-md p-3">
                <div className="text-xs text-muted-foreground mb-1">Gesture</div>
                <div className="text-sm text-foreground">{step.gesture}</div>
              </div>
            )}
            {step.vibration && (
              <div className="bg-accent/30 border border-primary/20 rounded-md p-4">
                <div className="text-xs text-muted-foreground mb-2 font-display tracking-widest uppercase">Vibrate</div>
                <div className="font-display text-xl text-primary whitespace-pre-line">{step.vibration}</div>
                {step.pronunciation && (
                  <div className="text-xs text-muted-foreground mt-2">Pronunciation: {step.pronunciation}</div>
                )}
              </div>
            )}
            {step.direction && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Direction:</span>
                <Badge variant="outline" className="text-xs border-blue-400/40 text-blue-400">{step.direction}</Badge>
              </div>
            )}
            {step.tip && (
              <div className="border-l-2 border-primary/30 pl-3">
                <div className="text-xs text-muted-foreground mb-1">Beginner's Note</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.tip}</p>
              </div>
            )}
            <div className="flex gap-3 pt-2">
              <Button variant="outline" size="sm" onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
                disabled={isFirst} className="border-border text-muted-foreground flex-1">← Previous</Button>
              {isLast ? (
                <Button size="sm" onClick={() => setCurrentStep(0)} className="bg-primary text-primary-foreground flex-1">
                  ✦ Complete — Begin Again
                </Button>
              ) : (
                <Button size="sm" onClick={() => setCurrentStep(s => Math.min(LBRP_STEPS.length - 1, s + 1))}
                  className="bg-primary text-primary-foreground flex-1">Next →</Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {LBRP_INTRO.phases.map(phase => (
            <Card key={phase.id} className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className={cn('font-display text-sm tracking-wide', PHASE_COLORS[phase.id])}>
                  {phase.name} <span className="text-muted-foreground font-normal text-xs">Steps {phase.steps}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-3">{phase.description}</p>
                <div className="space-y-2">
                  {LBRP_STEPS.filter(s => s.phase === phase.id).map(s => (
                    <div key={s.id} className="flex gap-3">
                      <span className="text-xs text-muted-foreground w-4 shrink-0 mt-0.5">{s.id}.</span>
                      <div>
                        <div className="text-xs text-foreground font-medium">{s.title}</div>
                        {s.vibration && <div className="text-xs text-primary font-display mt-0.5 whitespace-pre-line">{s.vibration}</div>}
                        {s.pronunciation && <div className="text-xs text-muted-foreground">{s.pronunciation}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main Ritual Page ──────────────────────────────────────────────────────────
export default function Ritual() {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetName>('Jupiter');
  const ctx = useRitualContext();

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl lg:text-3xl text-foreground tracking-wide">Ritual</h1>
        <p className="text-muted-foreground text-sm mt-1">Planetary prayers and the Lesser Banishing Ritual</p>
        <div className="gold-rule mt-4" />
      </div>

      <Tabs defaultValue="prayer" className="space-y-4">
        <TabsList className="bg-muted/50 border border-border">
          <TabsTrigger value="prayer" className="font-display text-xs tracking-wider data-[state=active]:bg-accent data-[state=active]:text-primary">
            ✦ Planetary Prayers
          </TabsTrigger>
          <TabsTrigger value="lbrp" className="font-display text-xs tracking-wider data-[state=active]:bg-accent data-[state=active]:text-primary">
            ✦ LBRP Guide
          </TabsTrigger>
        </TabsList>

        <TabsContent value="prayer">
          {/* Planet selector */}
          <div className="flex gap-2 flex-wrap mb-5">
            {DISPLAY_ORDER.map(planet => {
              const info = PLANET_INFO[planet];
              const color = PLANET_COLORS[planet];
              const isSelected = selectedPlanet === planet;
              const isActive = ctx.isPlanetHour(planet);
              const isDay = ctx.isPlanetDay(planet);
              return (
                <button
                  key={planet}
                  onClick={() => setSelectedPlanet(planet)}
                  className={cn(
                    'relative flex items-center gap-2 px-3 py-2 rounded-md border text-sm transition-all duration-200',
                    isSelected
                      ? 'border-current bg-accent/40'
                      : 'border-border text-muted-foreground hover:border-current hover:text-foreground'
                  )}
                  style={isSelected ? { borderColor: color + '70', color } : {}}
                >
                  <span className="text-base" style={{ color }}>{info.glyph}</span>
                  <span className="font-display text-xs tracking-wide">{planet}</span>
                  {isActive && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-green-400 border border-background" title="Current hour" />
                  )}
                  {isDay && !isActive && (
                    <span className="text-xs" style={{ color }}>✦</span>
                  )}
                </button>
              );
            })}
          </div>
          {/* Current hour indicator */}
          {ctx.currentPlanet && (
            <div className="mb-4 text-xs text-muted-foreground">
              <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-2 align-middle" />
              Current hour: <span className="text-foreground font-medium">{ctx.currentPlanet}</span>
              {ctx.isPlanetDay(ctx.currentPlanet) && <span className="text-primary ml-2">✦ Its own day</span>}
            </div>
          )}
          <PlanetPrayerPanel planet={selectedPlanet} ctx={ctx} />
        </TabsContent>

        <TabsContent value="lbrp">
          <LBRPGuide />
        </TabsContent>
      </Tabs>
    </div>
  );
}
