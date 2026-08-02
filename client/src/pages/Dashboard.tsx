/**
 * Dashboard / Observatory — The main view
 * Shows: current time, planetary hour, moon phase, next Jupiter hour, all 24 hours of the day
 * Sacred Observatory theme: dark, gold accents, Cinzel display font
 */
import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  calculatePlanetaryHours,
  getCurrentHour,
  getNextJupiterHour,
  formatDuration,
  formatTime,
  getHourProgress,
  PLANET_INFO,
  CHALDEAN_ORDER,
  type DayData,
  type PlanetaryHour,
  type PlanetName,
} from '@/lib/planetaryHours';
import { getMoonPhase } from '@/lib/moonPhase';
import { cn } from '@/lib/utils';
import { useLocation } from 'wouter';

const PLANET_DAY_MESSAGES: Record<PlanetName, string> = {
  Sun: 'Sunday — Day of the Sun. Ideal for vitality, success, authority, and health work.',
  Moon: 'Monday — Day of the Moon. Ideal for intuition, dreams, emotional healing, and divination.',
  Mercury: 'Wednesday — Day of Mercury. Ideal for communication, study, contracts, and travel.',
  Venus: 'Friday — Day of Venus. Ideal for love, beauty, creative work, and harmony.',
  Mars: 'Tuesday — Day of Mars. Ideal for protection, courage, and breaking through obstacles.',
  Jupiter: "Thursday — Jupiter's Day. Your most powerful window for talisman work and abundance.",
  Saturn: 'Saturday — Day of Saturn. Ideal for banishing, binding, and long-term foundation work.',
};

const PLANET_COLORS: Record<PlanetName, string> = {
  Sun: '#F59E0B',
  Moon: '#94A3B8',
  Mercury: '#F97316',
  Venus: '#F9A8D4',
  Mars: '#EF4444',
  Jupiter: '#C9A84C',
  Saturn: '#64748B',
};

function PlanetGlyph({ planet, size = 'md' }: { planet: PlanetName; size?: 'sm' | 'md' | 'lg' }) {
  const info = PLANET_INFO[planet];
  const sizeClass = size === 'lg' ? 'text-4xl' : size === 'md' ? 'text-2xl' : 'text-base';
  return (
    <span
      className={cn('font-display', sizeClass)}
      style={{ color: PLANET_COLORS[planet] }}
    >
      {info.glyph}
    </span>
  );
}

function HourRow({ hour, isCurrent }: { hour: PlanetaryHour; isCurrent: boolean }) {
  const info = PLANET_INFO[hour.planet];
  const color = PLANET_COLORS[hour.planet];
  return (
    <div className={cn(
      'flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200',
      isCurrent ? 'bg-accent/60 border border-primary/20' : 'hover:bg-accent/30',
    )}>
      <span className="text-muted-foreground text-xs w-6 text-right font-mono">{hour.hourNumber}</span>
      <span className="text-lg w-7 text-center" style={{ color }}>{info.glyph}</span>
      <div className="flex-1 min-w-0">
        <div className={cn('text-sm font-medium', isCurrent ? 'text-primary' : 'text-foreground')}>
          {hour.planet}
        </div>
        <div className="text-xs text-muted-foreground">
          {formatTime(hour.start)} – {formatTime(hour.end)}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {!hour.isDay && <span className="text-xs text-muted-foreground">☽</span>}
        {isCurrent && <Badge variant="outline" className="text-xs border-primary/40 text-primary">Now</Badge>}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [now, setNow] = useState(() => new Date());
  const [dayData, setDayData] = useState<DayData | null>(null);
  const [currentHour, setCurrentHour] = useState<PlanetaryHour | null>(null);
  const [nextJupiterHour, setNextJupiterHour] = useState<PlanetaryHour | null>(null);
  const [timeUntilJupiter, setTimeUntilJupiter] = useState<string>('');
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [progress, setProgress] = useState(0);

  const refresh = useCallback(() => {
    const current = new Date();
    setNow(current);
    const data = calculatePlanetaryHours(current);
    setDayData(data);
    const ch = getCurrentHour(data, current);
    setCurrentHour(ch);
    const nj = getNextJupiterHour(data, current);
    setNextJupiterHour(nj);
    if (nj) setTimeUntilJupiter(formatDuration(nj.start.getTime() - current.getTime()));
    if (ch) {
      setTimeRemaining(formatDuration(ch.end.getTime() - current.getTime()));
      setProgress(Math.round(getHourProgress(ch, current) * 100));
    }
  }, []);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 10000); // update every 10s
    return () => clearInterval(interval);
  }, [refresh]);

  const moon = getMoonPhase(now);
  const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' });
  const dateStr = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true });
  const isJupiterHour = currentHour?.planet === 'Jupiter';
  const isJupiterDay = dayData?.dayRuler === 'Jupiter';
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen p-4 lg:p-8">
      {/* Planet Day Banner */}
      {dayData && (
        <div
          className="mb-4 rounded-lg border px-4 py-3 flex items-center justify-between gap-3 cursor-pointer transition-all duration-300 hover:opacity-90"
          style={{
            borderColor: PLANET_COLORS[dayData.dayRuler] + '50',
            background: PLANET_COLORS[dayData.dayRuler] + '12',
          }}
          onClick={() => navigate('/ritual')}
        >
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-2xl shrink-0" style={{ color: PLANET_COLORS[dayData.dayRuler] }}>
              {PLANET_INFO[dayData.dayRuler].glyph}
            </span>
            <p className="text-sm leading-snug" style={{ color: PLANET_COLORS[dayData.dayRuler] }}>
              {PLANET_DAY_MESSAGES[dayData.dayRuler]}
            </p>
          </div>
          <span className="text-xs shrink-0 font-display tracking-wider" style={{ color: PLANET_COLORS[dayData.dayRuler] + 'aa' }}>
            Pray →
          </span>
        </div>
      )}
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display text-2xl lg:text-3xl text-foreground tracking-wide">The Observatory</h1>
            <p className="text-muted-foreground text-sm mt-1">{dayOfWeek}, {dateStr}</p>
          </div>
          <div className="text-right">
            <div className="font-mono text-xl text-foreground">{timeStr}</div>
            <div className="text-xs text-muted-foreground mt-0.5">Salt Lake City, UT</div>
          </div>
        </div>
        <div className="gold-rule mt-4" />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">

        {/* Current Hour — large primary card */}
        <div className="lg:col-span-2">
          <Card className={cn(
            'bg-card border-border transition-all duration-500',
            isJupiterHour && 'jupiter-glow border-primary/30'
          )}>
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-xs tracking-widest text-muted-foreground uppercase">
                Current Planetary Hour
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentHour ? (
                <>
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-3xl border-2 transition-all duration-500"
                      style={{
                        borderColor: PLANET_COLORS[currentHour.planet] + '60',
                        background: PLANET_COLORS[currentHour.planet] + '15',
                        boxShadow: `0 0 20px ${PLANET_COLORS[currentHour.planet]}30`,
                      }}
                    >
                      {PLANET_INFO[currentHour.planet].glyph}
                    </div>
                    <div>
                      <div
                        className="font-display text-3xl lg:text-4xl font-semibold"
                        style={{ color: PLANET_COLORS[currentHour.planet] }}
                      >
                        {currentHour.planet}
                      </div>
                      <div className="text-muted-foreground text-sm mt-0.5">
                        Hour {currentHour.hourNumber} · {currentHour.isDay ? 'Day' : 'Night'}
                      </div>
                    </div>
                    {isJupiterHour && (
                      <Badge className="ml-auto bg-primary/20 text-primary border-primary/30 font-display text-xs tracking-wider">
                        ✦ Jupiter Hour
                      </Badge>
                    )}
                  </div>

                  {/* Progress bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                      <span>{formatTime(currentHour.start)}</span>
                      <span>{timeRemaining} remaining</span>
                      <span>{formatTime(currentHour.end)}</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${progress}%`,
                          background: PLANET_COLORS[currentHour.planet],
                        }}
                      />
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {PLANET_INFO[currentHour.planet].keywords}
                  </p>
                </>
              ) : (
                <div className="text-muted-foreground text-sm">Calculating...</div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right column: Moon + Day Ruler */}
        <div className="space-y-4">
          {/* Moon Phase */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="font-display text-xs tracking-widest text-muted-foreground uppercase">
                Moon Phase
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{moon.phaseEmoji}</span>
                <div>
                  <div className="font-display text-base text-foreground">{moon.phaseName}</div>
                  <div className="text-xs text-muted-foreground">{Math.round(moon.illumination * 100)}% illuminated</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{moon.description}</p>
            </CardContent>
          </Card>

          {/* Day Ruler */}
          <Card className={cn('bg-card border-border', isJupiterDay && 'border-primary/20')}>
            <CardHeader className="pb-2">
              <CardTitle className="font-display text-xs tracking-widest text-muted-foreground uppercase">
                Day Ruler
              </CardTitle>
            </CardHeader>
            <CardContent>
              {dayData && (
                <div className="flex items-center gap-3">
                  <span
                    className="text-2xl"
                    style={{ color: PLANET_COLORS[dayData.dayRuler] }}
                  >
                    {PLANET_INFO[dayData.dayRuler].glyph}
                  </span>
                  <div>
                    <div
                      className="font-display text-lg"
                      style={{ color: PLANET_COLORS[dayData.dayRuler] }}
                    >
                      {dayData.dayRuler}
                    </div>
                    {isJupiterDay && (
                      <div className="text-xs text-primary mt-0.5">✦ Jupiter's day — ideal for talisman work</div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Next Jupiter Hour */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="font-display text-xs tracking-widest text-muted-foreground uppercase">
                Next Jupiter Hour
              </CardTitle>
            </CardHeader>
            <CardContent>
              {nextJupiterHour ? (
                <div>
                  <div className="font-display text-lg text-primary">{formatTime(nextJupiterHour.start)}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">in {timeUntilJupiter}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Hour {nextJupiterHour.hourNumber} · {nextJupiterHour.isDay ? 'Day' : 'Night'}
                  </div>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">Tomorrow's hours loading...</div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sunrise / Sunset */}
        {dayData && (
          <Card className="bg-card border-border lg:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="font-display text-xs tracking-widest text-muted-foreground uppercase">
                Solar Times
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Sunrise</div>
                  <div className="font-mono text-sm text-amber-400">{formatTime(dayData.sunrise)}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Sunset</div>
                  <div className="font-mono text-sm text-amber-600">{formatTime(dayData.sunset)}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* All 24 hours */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-xs tracking-widest text-muted-foreground uppercase">
                All Planetary Hours Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              {dayData ? (
                <div className="space-y-0.5 max-h-96 overflow-y-auto pr-1">
                  {/* Day hours header */}
                  <div className="text-xs text-muted-foreground px-3 py-1.5 font-display tracking-widest uppercase">
                    ☀ Day Hours
                  </div>
                  {dayData.hours.filter(h => h.isDay).map(hour => (
                    <HourRow
                      key={hour.hourNumber}
                      hour={hour}
                      isCurrent={currentHour?.hourNumber === hour.hourNumber}
                    />
                  ))}
                  {/* Night hours header */}
                  <div className="text-xs text-muted-foreground px-3 py-1.5 mt-2 font-display tracking-widest uppercase">
                    ☽ Night Hours
                  </div>
                  {dayData.hours.filter(h => !h.isDay).map(hour => (
                    <HourRow
                      key={hour.hourNumber}
                      hour={hour}
                      isCurrent={currentHour?.hourNumber === hour.hourNumber}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-muted-foreground text-sm">Loading...</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
