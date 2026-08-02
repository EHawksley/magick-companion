/**
 * Planets Page — All 7 classical planets with correspondences
 * Jupiter has a special "active" state since it's the user's focus
 * Other planets show info cards for learning
 */
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PLANET_INFO, CHALDEAN_ORDER, type PlanetName } from '@/lib/planetaryHours';
import { cn } from '@/lib/utils';

const PLANET_COLORS: Record<PlanetName, string> = {
  Sun: '#F59E0B',
  Moon: '#94A3B8',
  Mercury: '#6EE7B7',
  Venus: '#F9A8D4',
  Mars: '#EF4444',
  Jupiter: '#C9A84C',
  Saturn: '#64748B',
};

// Display order: traditional from slowest to fastest (Chaldean)
const DISPLAY_ORDER: PlanetName[] = ['Saturn', 'Jupiter', 'Mars', 'Sun', 'Venus', 'Mercury', 'Moon'];

export default function Planets() {
  const [selected, setSelected] = useState<PlanetName>('Jupiter');

  const planet = PLANET_INFO[selected];
  const color = PLANET_COLORS[selected];

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl lg:text-3xl text-foreground tracking-wide">The Seven Planets</h1>
        <p className="text-muted-foreground text-sm mt-1">The classical planetary system of ceremonial magick</p>
        <div className="gold-rule mt-4" />
      </div>

      {/* Planet selector */}
      <div className="flex gap-2 flex-wrap mb-6">
        {DISPLAY_ORDER.map(name => {
          const info = PLANET_INFO[name];
          const isSelected = selected === name;
          const c = PLANET_COLORS[name];
          return (
            <button
              key={name}
              onClick={() => setSelected(name)}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-md border text-sm transition-all duration-200',
                isSelected
                  ? 'border-current bg-accent/40'
                  : 'border-border text-muted-foreground hover:border-current hover:text-foreground'
              )}
              style={isSelected ? { borderColor: c + '60', color: c } : {}}
            >
              <span className="text-base" style={{ color: c }}>{info.glyph}</span>
              <span className="font-display text-xs tracking-wide">{name}</span>
              {name === 'Jupiter' && (
                <span className="text-xs text-primary">✦</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Detail card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card
          className={cn('bg-card border-border transition-all duration-300', selected === 'Jupiter' && 'jupiter-glow border-primary/20')}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-3xl border-2"
                style={{ borderColor: color + '50', background: color + '15' }}
              >
                {planet.glyph}
              </div>
              <div>
                <CardTitle className="font-display text-2xl" style={{ color }}>
                  {planet.name}
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">Day: {planet.day}</p>
              </div>
              {planet.prayerAvailable && (
                <Badge className="ml-auto bg-primary/20 text-primary border-primary/30 text-xs">
                  ✦ Your Talisman
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">{planet.description}</p>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-muted/50 rounded-md p-3">
                <div className="text-xs text-muted-foreground mb-1">Color</div>
                <div className="text-sm text-foreground">{planet.color}</div>
              </div>
              <div className="bg-muted/50 rounded-md p-3">
                <div className="text-xs text-muted-foreground mb-1">Metal</div>
                <div className="text-sm text-foreground">{planet.metal}</div>
              </div>
              <div className="bg-muted/50 rounded-md p-3 col-span-2">
                <div className="text-xs text-muted-foreground mb-1">Keywords</div>
                <div className="text-sm text-foreground">{planet.keywords}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chaldean order explanation */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="font-display text-xs tracking-widest text-muted-foreground uppercase">
              The Chaldean Order
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              The seven classical planets are arranged in the Chaldean order — from slowest to fastest apparent motion as seen from Earth. This order governs the sequence of planetary hours throughout each day and night.
            </p>
            <div className="space-y-1.5">
              {DISPLAY_ORDER.map((name, i) => {
                const info = PLANET_INFO[name];
                const c = PLANET_COLORS[name];
                return (
                  <div
                    key={name}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-150 cursor-pointer',
                      selected === name ? 'bg-accent/50' : 'hover:bg-accent/30'
                    )}
                    onClick={() => setSelected(name)}
                  >
                    <span className="text-xs text-muted-foreground w-4">{i + 1}</span>
                    <span className="text-lg w-7 text-center" style={{ color: c }}>{info.glyph}</span>
                    <div className="flex-1">
                      <span className="text-sm font-display" style={selected === name ? { color: c } : {}}>{name}</span>
                      <span className="text-xs text-muted-foreground ml-2">{info.day}</span>
                    </div>
                    {name === 'Jupiter' && <span className="text-xs text-primary">✦</span>}
                  </div>
                );
              })}
            </div>
            <div className="mt-4 border-t border-border pt-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Each day is named after its ruling planet (e.g., Thursday = Thor's day = Jupiter's day). The first planetary hour of each day is ruled by that day's planet, and the remaining 23 hours follow the Chaldean sequence in order.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

