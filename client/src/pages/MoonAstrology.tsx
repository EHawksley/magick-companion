/**
 * Moon & Astrology Page
 * Deep lunar reference: current phase, ritual guidance, lunar mansion,
 * upcoming dates, 8-phase cycle guide, and Capricorn/Saturn personal context.
 */
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getMoonPhase } from '@/lib/moonPhase';
import { cn } from '@/lib/utils';

const MOON_SILVER = '#94A3B8';
const GOLD = '#C9A84C';
const SATURN_GRAY = '#64748B';

// ── 8-phase cycle reference ───────────────────────────────────────────────────
const PHASE_CYCLE = [
  {
    name: 'New Moon', emoji: '🌑', age: '0–1.85 days',
    energy: 'Seed / Intention',
    ritual: 'Set intentions. Write down what you want to call in. Begin new Jupiter work. This is the most powerful moment to start something new — the energy is entirely receptive and forward-looking.',
    jupiter: 'Write your Jupiter petition tonight. Be specific: what abundance, what opportunity, what door do you want opened? The new moon is the moment to plant the seed.',
    saturn: 'Begin new discipline practices. Start a new daily routine. The new moon is an excellent time to commit to a new Saturnian habit — a daily LBRP, a study schedule, a physical practice.',
    avoid: 'Do not perform banishing or releasing work — that is for the waning phase.',
  },
  {
    name: 'Waxing Crescent', emoji: '🌒', age: '1.85–7.38 days',
    energy: 'Growth / Attraction',
    ritual: 'Begin invoking. The moon is building power. Use this time for attraction prayers — ask for what you want to grow. Jupiter work is active and effective. This is the best phase for daily talisman prayers.',
    jupiter: 'Daily Jupiter prayers are most potent now. The talisman is actively drawing. Wear it close to your skin and pray during Jupiter hours.',
    saturn: 'Build your practice structure. Establish the daily habits you committed to at the new moon.',
    avoid: 'Avoid major banishing work — save that for the waning phase.',
  },
  {
    name: 'First Quarter', emoji: '🌓', age: '7.38–9.22 days',
    energy: 'Action / Overcoming',
    ritual: 'Take decisive action. The moon is at half-power and growing. Push through obstacles. If your Jupiter work has stalled, this is the time to push harder and be more direct in your petitions. Mars work is excellent now.',
    jupiter: 'Make the call. Send the email. Apply for the opportunity. The First Quarter moon supports decisive action toward your Jupiter goals.',
    saturn: 'Confront what you have been avoiding. The First Quarter is a good time for difficult but necessary Saturnian work — facing hard truths, cutting what needs to be cut.',
    avoid: 'Avoid passive waiting — this phase demands action.',
  },
  {
    name: 'Waxing Gibbous', emoji: '🌔', age: '9.22–14.77 days',
    energy: 'Refinement / Preparation',
    ritual: 'Refine and intensify. You are approaching peak power. Review your intentions — are they specific enough? Add detail to your prayers. Prepare for the full moon ritual. This is the time to prepare your altar, gather your tools, and plan your full moon work.',
    jupiter: 'Prepare your full moon Jupiter ritual. Review what you asked for at the new moon — has it begun to manifest? Refine your petition if needed.',
    saturn: 'Review your discipline practice. What is working? What needs adjustment? The Waxing Gibbous is a good time for honest self-assessment.',
    avoid: 'Avoid starting entirely new projects — finish what you started.',
  },
  {
    name: 'Full Moon', emoji: '🌕', age: '14.77–16.61 days',
    energy: 'Peak Power / Culmination',
    ritual: 'Peak power. Perform your most important rituals tonight. The full moon amplifies everything — Jupiter petitions, consecration renewals, and gratitude rituals. Stay up for the peak if you can. This is the most powerful single night of the lunar cycle.',
    jupiter: 'Perform the full Jupiter invocation tonight. If you have not yet consecrated your talisman, the full moon is the second-best time (after Thursday + Jupiter hour). Renew your talisman\'s charge with the full moon prayer.',
    saturn: 'Full moon + Saturn work is powerful for major banishing — removing deep-seated obstacles, ending significant patterns. Use with care.',
    avoid: 'Do not waste this night on minor work. Save it for your most important petitions.',
  },
  {
    name: 'Waning Gibbous', emoji: '🌖', age: '16.61–22.15 days',
    energy: 'Gratitude / Release',
    ritual: 'Gratitude and release. Give thanks for what was received during the waxing phase. Begin releasing what you no longer need. Saturn banishing work is excellent now. The energy is shifting from attraction to release.',
    jupiter: 'Give thanks to Tzadkiel, Sachiel, Parasiel, and Yophiel for what has come. Review what manifested since the new moon. The waning Gibbous Jupiter prayer is the "gratitude and release" variant.',
    saturn: 'Begin Saturnian banishing work. The waning moon amplifies Saturn\'s ability to remove what must go.',
    avoid: 'Do not begin new attraction work — that energy has passed for this cycle.',
  },
  {
    name: 'Last Quarter', emoji: '🌗', age: '22.15–23.99 days',
    energy: 'Banishing / Clearing',
    ritual: 'Banish and clear. This is the most powerful time for removing obstacles, breaking bad habits, and binding what harms you. Saturn work is at its peak. For a Capricorn with Saturn as chart ruler, this is your most powerful working window.',
    jupiter: 'Not ideal for Jupiter attraction work. Use this time to clear the obstacles that block your Jupiter goals instead.',
    saturn: 'Peak Saturn banishing window. Perform the Saturn banishing prayer. Name what must go and release it with authority.',
    avoid: 'Do not petition for new things — focus entirely on removal.',
  },
  {
    name: 'Waning Crescent', emoji: '🌘', age: '23.99–29.53 days',
    energy: 'Rest / Preparation',
    ritual: 'Rest and prepare. The cycle is ending. Do not begin new work — rest, reflect, and prepare your intentions for the new moon. This is the dark before the dawn. Use this time to journal, study, and plan.',
    jupiter: 'Review your Jupiter practice. What has worked this cycle? What will you ask for at the new moon? Write it down.',
    saturn: 'Rest. Even Saturn rests. Use this time to consolidate what you have built and released this cycle.',
    avoid: 'Avoid major ritual work of any kind — the energy is too low.',
  },
];

// ── Capricorn / Saturn context ────────────────────────────────────────────────
const CAPRICORN_SECTIONS = [
  {
    title: 'Your Chart Ruler: Saturn',
    icon: '♄',
    color: SATURN_GRAY,
    content: `Capricorn is ruled by Saturn — which means Saturn is your chart ruler. This is significant. Saturn's energy is already woven into your nature: discipline, structure, long-term thinking, and the willingness to do difficult work over time. These are not just personality traits for you — they are the lens through which all planetary energy reaches you.

In practice, this means Saturn work will feel more natural and more powerful for you than for most people. When you perform the Saturn banishing prayer, you are working with your own ruling planet — the results tend to be clean and direct. When you build a disciplined daily practice, you are working with the grain of your chart.`,
  },
  {
    title: 'Jupiter in Capricorn: The Earned Benefic',
    icon: '♃',
    color: GOLD,
    content: `Jupiter is in its "detriment" in Capricorn — meaning Jupiter's expansive, generous energy is somewhat constrained by Capricorn's disciplined, restrictive nature. This does not mean your Jupiter talisman is weak. It means your Jupiter blessings tend to arrive through earned achievement rather than sudden luck.

Frame your Jupiter prayers accordingly: ask Jupiter to open doors that your effort can walk through. Ask for opportunities that reward discipline and long-term work. Ask for the recognition of genuine achievement. Do not ask for things to fall from the sky — ask for the path to be made clear so your work can bear fruit.

The Second Pentacle of Jupiter is particularly well-suited to Capricorn: it governs glory, honors, dignities, and riches — all things that Capricorn earns through sustained effort.`,
  },
  {
    title: 'The Saturn-Jupiter Partnership',
    icon: '⚖',
    color: '#A78BFA',
    content: `The traditional recommendation for a Capricorn practitioner is to work both planets as a team:

Saturn clears the path. Use Saturn hours (especially on Saturdays during the waning moon) to banish obstacles, remove what blocks your progress, and establish the discipline your practice requires. Saturn is your natural ally — use it.

Jupiter fills the path. Use Jupiter hours (especially on Thursdays during the waxing or full moon) to invoke abundance, honor, and good fortune into the space that Saturn has cleared.

This is not just theory — it reflects the actual structure of your chart. You are built for this combination.`,
  },
  {
    title: 'Your Solar Return Window',
    icon: '☉',
    color: '#F59E0B',
    content: `Your solar return — the moment the Sun returns to its natal position — occurs each year around December 22 to January 19 (depending on your exact birth date). This is your personal "magical new year."

The week of your birthday is an exceptionally powerful time for:
• Setting your annual Jupiter intentions (what do you want to build this year?)
• Performing a major Saturn clearing (what must you release to make room?)
• Renewing your talisman's consecration if it has been a year

The Sun entering Capricorn (December 21–22) is also a powerful annual threshold regardless of your exact birthday — it is the moment the solar cycle aligns with your natal sign.`,
  },
  {
    title: 'Capricorn Moon Timing',
    icon: '☽',
    color: MOON_SILVER,
    content: `When the Moon transits Capricorn (approximately every 27 days, for about 2.5 days), you have a personal lunar window. The Moon in Capricorn amplifies Saturnian energy and gives your Jupiter work a more grounded, practical quality.

The Moon in Capricorn is excellent for:
• Saturn banishing and binding work
• Setting long-term intentions (not quick wins — multi-year goals)
• Practical Jupiter work: career advancement, business decisions, financial planning
• Talisman work that focuses on sustained abundance rather than sudden windfalls

The Moon in Capricorn is not ideal for: emotional healing, dream work, or anything requiring receptivity and flow. Capricorn Moon is dry, practical, and structural.`,
  },
];

export default function MoonAstrology() {
  const now = new Date();
  const moon = getMoonPhase(now);
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<'current' | 'cycle' | 'astrology'>('current');

  const currentPhaseData = PHASE_CYCLE.find(p => p.name === moon.phaseName) ?? PHASE_CYCLE[0];

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl lg:text-3xl text-foreground tracking-wide">Moon & Astrology</h1>
        <p className="text-muted-foreground text-sm mt-1">Lunar cycles, ritual timing, and your personal astrology</p>
        <div className="gold-rule mt-4" />
      </div>

      {/* Section tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {(['current', 'cycle', 'astrology'] as const).map(s => (
          <button key={s} onClick={() => setActiveSection(s)}
            className={cn(
              'px-4 py-2 rounded-md text-sm font-display tracking-wider transition-all duration-200 border',
              activeSection === s
                ? 'bg-accent text-primary border-primary/30'
                : 'border-border text-muted-foreground hover:text-foreground hover:border-border/60'
            )}>
            {s === 'current' ? '☽ Current Moon' : s === 'cycle' ? '◎ Full Cycle' : '♄ Your Astrology'}
          </button>
        ))}
      </div>

      {/* ── CURRENT MOON ── */}
      {activeSection === 'current' && (
        <div className="space-y-4">
          {/* Phase card */}
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl">{moon.phaseEmoji}</span>
                <div>
                  <h2 className="font-display text-2xl text-foreground">{moon.phaseName}</h2>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {Math.round(moon.illumination * 100)}% illuminated · Day {Math.round(moon.age)} of cycle
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{moon.description}</p>
              <div className="h-2 bg-muted rounded-full overflow-hidden mb-4">
                <div className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${moon.illumination * 100}%`, background: MOON_SILVER }} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {moon.daysUntilFull > 0 && (
                  <div className="bg-muted/50 rounded-md p-3">
                    <div className="text-xs text-muted-foreground mb-1">Next Full Moon</div>
                    <div className="text-sm text-foreground font-display">in {moon.daysUntilFull} days</div>
                  </div>
                )}
                {moon.daysUntilNew > 0 && (
                  <div className="bg-muted/50 rounded-md p-3">
                    <div className="text-xs text-muted-foreground mb-1">Next New Moon</div>
                    <div className="text-sm text-foreground font-display">in {moon.daysUntilNew} days</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Ritual guidance */}
          <Card className="bg-card border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="font-display text-xs tracking-widest text-primary uppercase">
                ✦ Ritual Guidance for {moon.phaseName}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-foreground leading-relaxed">{moon.ritualGuidance}</p>
              <div className="grid grid-cols-1 gap-2">
                <div className="bg-muted/50 rounded-md p-3 border-l-2" style={{ borderColor: GOLD + '60' }}>
                  <div className="text-xs mb-1" style={{ color: GOLD }}>♃ Jupiter Work</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{currentPhaseData.jupiter}</p>
                </div>
                <div className="bg-muted/50 rounded-md p-3 border-l-2" style={{ borderColor: SATURN_GRAY + '80' }}>
                  <div className="text-xs mb-1" style={{ color: SATURN_GRAY }}>♄ Saturn Work</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{currentPhaseData.saturn}</p>
                </div>
                <div className="bg-muted/30 rounded-md p-3 border-l-2 border-destructive/30">
                  <div className="text-xs text-destructive/70 mb-1">Avoid</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{currentPhaseData.avoid}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lunar Mansion */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="font-display text-xs tracking-widest text-muted-foreground uppercase">
                Lunar Mansion #{moon.mansion.number}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3 mb-3">
                <div>
                  <div className="font-display text-base text-foreground">{moon.mansion.name}</div>
                  <div className="text-xs text-muted-foreground">{moon.mansion.arabicName} · Ruled by {moon.mansion.planet}</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                The 28 Lunar Mansions (from the Picatrix and Agrippa) divide the moon's monthly path into stations, each with specific magical properties. The moon currently occupies Mansion {moon.mansion.number}.
              </p>
              <div className="grid grid-cols-1 gap-2">
                <div className="bg-muted/50 rounded-md p-2.5">
                  <div className="text-xs text-muted-foreground mb-1">Keywords</div>
                  <div className="text-sm text-foreground">{moon.mansion.keywords}</div>
                </div>
                <div className="bg-muted/50 rounded-md p-2.5">
                  <div className="text-xs text-muted-foreground mb-1">Favorable For</div>
                  <div className="text-sm text-foreground">{moon.mansion.favorable}</div>
                </div>
                <div className="bg-muted/50 rounded-md p-2.5">
                  <div className="text-xs text-muted-foreground mb-1">Unfavorable For</div>
                  <div className="text-sm text-foreground">{moon.mansion.unfavorable}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming dates */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="font-display text-xs tracking-widest text-muted-foreground uppercase">
                Upcoming Lunar Dates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {moon.upcomingDates.slice(0, 6).map((d, i) => {
                  const isFullOrNew = d.type === 'Full Moon' || d.type === 'New Moon';
                  return (
                    <div key={i} className={cn(
                      'flex items-start gap-3 p-2.5 rounded-md',
                      isFullOrNew ? 'bg-accent/30 border border-primary/10' : 'bg-muted/30'
                    )}>
                      <span className="text-lg shrink-0 mt-0.5">
                        {d.type === 'New Moon' ? '🌑' : d.type === 'Full Moon' ? '🌕' : d.type === 'First Quarter' ? '🌓' : '🌗'}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={cn('text-sm font-display', isFullOrNew ? 'text-primary' : 'text-foreground')}>{d.type}</span>
                          <Badge variant="outline" className="text-xs border-border text-muted-foreground">
                            {d.daysAway === 0 ? 'Today' : d.daysAway === 1 ? 'Tomorrow' : `in ${d.daysAway} days`}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {d.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{d.ritualNote}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ── FULL CYCLE ── */}
      {activeSection === 'cycle' && (
        <div className="space-y-3">
          <Card className="bg-card border-border mb-2">
            <CardContent className="pt-4 pb-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                The lunar cycle is the primary timing system for ritual work. Each of the 8 phases has a distinct energy and purpose. Tap any phase to see detailed guidance for Jupiter and Saturn work.
              </p>
            </CardContent>
          </Card>
          {PHASE_CYCLE.map(phase => {
            const isCurrent = phase.name === moon.phaseName;
            const isOpen = selectedPhase === phase.name;
            return (
              <Card key={phase.name} className={cn(
                'bg-card border transition-all duration-200 cursor-pointer',
                isCurrent ? 'border-primary/40' : 'border-border hover:border-border/60'
              )} onClick={() => setSelectedPhase(isOpen ? null : phase.name)}>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl shrink-0">{phase.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={cn('font-display text-sm', isCurrent ? 'text-primary' : 'text-foreground')}>
                          {phase.name}
                        </span>
                        {isCurrent && (
                          <Badge variant="outline" className="text-xs border-primary/30 text-primary">Now</Badge>
                        )}
                        <span className="text-xs text-muted-foreground">{phase.energy}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">{phase.age}</div>
                    </div>
                    <span className="text-muted-foreground text-xs">{isOpen ? '▲' : '▼'}</span>
                  </div>
                  {isOpen && (
                    <div className="mt-4 space-y-3 border-t border-border pt-4">
                      <p className="text-sm text-foreground leading-relaxed">{phase.ritual}</p>
                      <div className="bg-muted/50 rounded-md p-3 border-l-2" style={{ borderColor: GOLD + '60' }}>
                        <div className="text-xs mb-1" style={{ color: GOLD }}>♃ Jupiter</div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{phase.jupiter}</p>
                      </div>
                      <div className="bg-muted/50 rounded-md p-3 border-l-2" style={{ borderColor: SATURN_GRAY + '80' }}>
                        <div className="text-xs mb-1" style={{ color: SATURN_GRAY }}>♄ Saturn</div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{phase.saturn}</p>
                      </div>
                      <div className="bg-muted/30 rounded-md p-3 border-l-2 border-destructive/30">
                        <div className="text-xs text-destructive/70 mb-1">Avoid</div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{phase.avoid}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* ── YOUR ASTROLOGY ── */}
      {activeSection === 'astrology' && (
        <div className="space-y-4">
          <Card className="bg-card border-border">
            <CardContent className="pt-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">♑</span>
                <div>
                  <div className="font-display text-lg text-foreground">Capricorn</div>
                  <div className="text-xs text-muted-foreground">Sun Sign · Chart Ruler: Saturn</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your natal sun sign shapes how planetary energies reach you. As a Capricorn, Saturn is your chart ruler — this has direct implications for your magical practice. The sections below explain what this means in concrete terms.
              </p>
            </CardContent>
          </Card>
          {CAPRICORN_SECTIONS.map(section => (
            <Card key={section.title} className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="font-display text-sm tracking-wide flex items-center gap-2">
                  <span style={{ color: section.color }}>{section.icon}</span>
                  <span style={{ color: section.color }}>{section.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {section.content.split('\n\n').map((para, i) => (
                    <p key={i} className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{para}</p>
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
