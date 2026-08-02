/**
 * Ritual Page — Jupiter Prayer + LBRP Guide
 * Two tabs: Prayer (Jupiter) and LBRP (step-by-step guide)
 * Sacred Observatory theme
 */
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { JUPITER_PRAYER, LBRP_STEPS, LBRP_INTRO } from '@/lib/ritualContent';
import { cn } from '@/lib/utils';

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

function LBRPGuide() {
  const [currentStep, setCurrentStep] = useState(0);
  const [mode, setMode] = useState<'guided' | 'reference'>('guided');
  const step = LBRP_STEPS[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === LBRP_STEPS.length - 1;

  return (
    <div className="space-y-4">
      {/* Intro */}
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

      {/* Mode toggle */}
      <div className="flex gap-2">
        <Button
          variant={mode === 'guided' ? 'default' : 'outline'}
          size="sm"
          onClick={() => { setMode('guided'); setCurrentStep(0); }}
          className={mode === 'guided' ? 'bg-primary text-primary-foreground' : 'border-border text-muted-foreground'}
        >
          Guided Mode
        </Button>
        <Button
          variant={mode === 'reference' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setMode('reference')}
          className={mode === 'reference' ? 'bg-primary text-primary-foreground' : 'border-border text-muted-foreground'}
        >
          Reference Card
        </Button>
      </div>

      {mode === 'guided' ? (
        /* Guided step-by-step */
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <Badge
                variant="outline"
                className={cn('font-display text-xs tracking-wider border-border', PHASE_COLORS[step.phase])}
              >
                {PHASE_LABELS[step.phase]}
              </Badge>
              <span className="text-xs text-muted-foreground">Step {step.id} of {LBRP_STEPS.length}</span>
            </div>
            <CardTitle className="font-display text-lg text-foreground mt-2">{step.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Progress bar */}
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / LBRP_STEPS.length) * 100}%` }}
              />
            </div>

            {/* Instruction */}
            <p className="text-sm text-foreground leading-relaxed">{step.instruction}</p>

            {/* Gesture */}
            {step.gesture && (
              <div className="bg-muted/50 rounded-md p-3">
                <div className="text-xs text-muted-foreground mb-1">Gesture</div>
                <div className="text-sm text-foreground">{step.gesture}</div>
              </div>
            )}

            {/* Vibration */}
            {step.vibration && (
              <div className="bg-accent/30 border border-primary/20 rounded-md p-4">
                <div className="text-xs text-muted-foreground mb-2 font-display tracking-widest uppercase">Vibrate</div>
                <div className="font-display text-xl text-primary whitespace-pre-line">{step.vibration}</div>
                {step.pronunciation && (
                  <div className="text-xs text-muted-foreground mt-2">Pronunciation: {step.pronunciation}</div>
                )}
              </div>
            )}

            {/* Direction */}
            {step.direction && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Direction:</span>
                <Badge variant="outline" className="text-xs border-celestial/40 text-celestial">
                  {step.direction}
                </Badge>
              </div>
            )}

            {/* Tip */}
            {step.tip && (
              <div className="border-l-2 border-primary/30 pl-3">
                <div className="text-xs text-muted-foreground mb-1">Beginner's Note</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.tip}</p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
                disabled={isFirst}
                className="border-border text-muted-foreground flex-1"
              >
                ← Previous
              </Button>
              {isLast ? (
                <Button
                  size="sm"
                  onClick={() => setCurrentStep(0)}
                  className="bg-primary text-primary-foreground flex-1"
                >
                  ✦ Complete — Begin Again
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={() => setCurrentStep(s => Math.min(LBRP_STEPS.length - 1, s + 1))}
                  className="bg-primary text-primary-foreground flex-1"
                >
                  Next →
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        /* Reference card — all steps at once */
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
                        {s.vibration && (
                          <div className="text-xs text-primary font-display mt-0.5 whitespace-pre-line">{s.vibration}</div>
                        )}
                        {s.pronunciation && (
                          <div className="text-xs text-muted-foreground">{s.pronunciation}</div>
                        )}
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

function JupiterPrayer() {
  const [prayerOpen, setPrayerOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Talisman info */}
      <Card className="bg-card border-border jupiter-glow">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-2xl">
              ♃
            </div>
            <div>
              <CardTitle className="font-display text-lg text-primary">{JUPITER_PRAYER.title}</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">{JUPITER_PRAYER.subtitle}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/50 rounded-md p-3 mb-4">
            <div className="text-xs text-muted-foreground mb-1">Your Talisman</div>
            <div className="text-sm text-foreground">Second Pentacle of Jupiter</div>
            <div className="text-xs text-muted-foreground mt-0.5">{JUPITER_PRAYER.tradition}</div>
          </div>
          <div className="text-xs text-muted-foreground mb-2 font-display tracking-widest uppercase">Angels of this Pentacle</div>
          <div className="grid grid-cols-2 gap-2">
            {JUPITER_PRAYER.angels.map(angel => (
              <div key={angel} className="bg-accent/30 rounded-md p-2.5">
                <div className="text-sm font-display text-primary">{angel}</div>
                <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  {JUPITER_PRAYER.angelDescriptions[angel as keyof typeof JUPITER_PRAYER.angelDescriptions]}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="font-display text-xs tracking-widest text-muted-foreground uppercase">
            Before You Begin
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {JUPITER_PRAYER.instructions.map((inst, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-primary text-xs mt-0.5 shrink-0">✦</span>
                <p className="text-sm text-muted-foreground leading-relaxed">{inst}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-primary/10 border border-primary/20 rounded-md p-3">
            <div className="text-xs text-muted-foreground mb-1">Best Timing</div>
            <div className="text-sm text-primary font-display">{JUPITER_PRAYER.bestTiming}</div>
          </div>
        </CardContent>
      </Card>

      {/* Psalm */}
      <Card className="bg-card border-border">
        <CardContent className="pt-5">
          <blockquote className="border-l-2 border-primary/40 pl-4">
            <p className="text-sm text-foreground italic leading-relaxed">{JUPITER_PRAYER.psalm.text}</p>
            <cite className="text-xs text-muted-foreground mt-2 block">— {JUPITER_PRAYER.psalm.reference}</cite>
          </blockquote>
        </CardContent>
      </Card>

      {/* Prayer toggle */}
      <Button
        className="w-full bg-primary text-primary-foreground font-display tracking-wider"
        size="lg"
        onClick={() => setPrayerOpen(o => !o)}
      >
        {prayerOpen ? 'Close Prayer' : '✦ Open the Ritual Prayer'}
      </Button>

      {prayerOpen && (
        <Card className="bg-card border-primary/20 jupiter-glow">
          <CardHeader className="pb-3">
            <CardTitle className="font-display text-sm tracking-widest text-primary uppercase">
              The Prayer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              {JUPITER_PRAYER.prayer.split('\n\n').map((para, i) => (
                <p key={i} className="text-sm text-foreground leading-loose mb-4 last:mb-0">
                  {para.startsWith('+') ? para.slice(1) : para}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function Ritual() {
  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl lg:text-3xl text-foreground tracking-wide">Ritual</h1>
        <p className="text-muted-foreground text-sm mt-1">Jupiter prayer and the Lesser Banishing Ritual</p>
        <div className="gold-rule mt-4" />
      </div>

      <Tabs defaultValue="prayer" className="space-y-4">
        <TabsList className="bg-muted/50 border border-border">
          <TabsTrigger value="prayer" className="font-display text-xs tracking-wider data-[state=active]:bg-accent data-[state=active]:text-primary">
            ♃ Jupiter Prayer
          </TabsTrigger>
          <TabsTrigger value="lbrp" className="font-display text-xs tracking-wider data-[state=active]:bg-accent data-[state=active]:text-primary">
            ✦ LBRP Guide
          </TabsTrigger>
        </TabsList>
        <TabsContent value="prayer">
          <JupiterPrayer />
        </TabsContent>
        <TabsContent value="lbrp">
          <LBRPGuide />
        </TabsContent>
      </Tabs>
    </div>
  );
}

