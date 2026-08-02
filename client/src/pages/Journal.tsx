/**
 * Ritual Journal — AI-powered feedback using Claude API
 * Stores entries in localStorage. Each entry has: date, ritual type, notes, AI feedback.
 * AI suggests next steps and areas for improvement for a beginner practitioner.
 */
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface JournalEntry {
  id: string;
  date: string; // ISO string
  ritualType: string;
  notes: string;
  aiFeedback: string | null;
  planetaryHour?: string;
  hourNumber?: number;
  isDay?: boolean;
  moonPhase?: string;
  dayRuler?: string;
  isPlanetDay?: boolean;
}

const RITUAL_TYPES = [
  'LBRP Practice',
  'Jupiter Prayer',
  'Sun Prayer',
  'Moon Prayer',
  'Mercury Prayer',
  'Venus Prayer',
  'Mars Prayer',
  'Saturn Prayer',
  'LBRP + Jupiter Prayer',
  'LBRP + Sun Prayer',
  'LBRP + Moon Prayer',
  'LBRP + Mercury Prayer',
  'LBRP + Venus Prayer',
  'LBRP + Mars Prayer',
  'LBRP + Saturn Prayer',
  'Meditation',
  'Talisman Consecration',
  'Study Session',
  'Other',
];

const STORAGE_KEY = 'magick-journal-entries';

function loadEntries(): JournalEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveEntries(entries: JournalEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

async function getAIFeedback(entry: Omit<JournalEntry, 'id' | 'aiFeedback'>, allEntries: JournalEntry[]): Promise<string> {
  const apiKey = import.meta.env.VITE_FRONTEND_FORGE_API_KEY;
  const apiUrl = import.meta.env.VITE_FRONTEND_FORGE_API_URL;

  const recentEntries = allEntries.slice(-5).map(e =>
    `[${new Date(e.date).toLocaleDateString()}] ${e.ritualType}: ${e.notes.slice(0, 200)}`
  ).join('\n');

  const systemPrompt = `You are a knowledgeable and encouraging mentor in Western ceremonial magick, specifically the Solomonic and Golden Dawn traditions. The practitioner is a complete beginner who has just started working with the Second Pentacle of Jupiter (Greater Key of Solomon) and is learning the LBRP (Lesser Banishing Ritual of the Pentagram).

Your role is to:
1. Acknowledge what they did well
2. Identify one or two specific areas for improvement
3. Suggest a concrete next step for their practice
4. Keep your tone warm, direct, and grounded — not mystical or vague

Keep your response to 3–4 short paragraphs. Be specific to what they actually wrote. Do not lecture about things they didn't mention.`;

  const userMessage = `Here is my ritual journal entry:

Date: ${new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
Ritual: ${entry.ritualType}
${entry.planetaryHour ? `Planetary Hour: ${entry.planetaryHour}` : ''}
${entry.moonPhase ? `Moon Phase: ${entry.moonPhase}` : ''}

My notes:
${entry.notes}

${recentEntries ? `My recent practice history:\n${recentEntries}` : ''}

Please give me feedback on my practice and suggest what I should focus on next.`;

  const response = await fetch(`${apiUrl}/v1/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5',
      max_tokens: 600,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`API error: ${err}`);
  }

  const data = await response.json();
  return data.content?.[0]?.text ?? 'No feedback received.';
}

function EntryCard({ entry, onDelete }: { entry: JournalEntry; onDelete: (id: string) => void }) {
  const date = new Date(entry.date);
  const dateStr = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  const timeStr = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="text-xs border-primary/30 text-primary font-display tracking-wide">
                {entry.ritualType}
              </Badge>
              {entry.planetaryHour && (
                <Badge variant="outline" className="text-xs border-border text-muted-foreground">
                  {entry.planetaryHour} hour{entry.hourNumber ? ` #${entry.hourNumber}` : ''}{entry.isDay === false ? ' · Night' : ''}
                </Badge>
              )}
              {entry.moonPhase && (
                <Badge variant="outline" className="text-xs border-border text-muted-foreground">
                  {entry.moonPhase}
                </Badge>
              )}
              {entry.dayRuler && (
                <Badge variant="outline" className={cn(
                  'text-xs border-border',
                  entry.isPlanetDay ? 'text-primary border-primary/30' : 'text-muted-foreground'
                )}>
                  {entry.dayRuler}&apos;s day{entry.isPlanetDay ? ' ✦' : ''}
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">{dateStr} · {timeStr}</p>
          </div>
          <button
            onClick={() => onDelete(entry.id)}
            className="text-muted-foreground hover:text-destructive text-xs transition-colors shrink-0"
          >
            ✕
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <div className="text-xs text-muted-foreground mb-1.5">Your Notes</div>
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{entry.notes}</p>
        </div>
        {entry.aiFeedback && (
          <div className="border-t border-border pt-3">
            <div className="text-xs text-muted-foreground mb-1.5 font-display tracking-widest uppercase">
              ✦ Mentor Feedback
            </div>
            <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{entry.aiFeedback}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [ritualType, setRitualType] = useState('LBRP + Jupiter Prayer');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setEntries(loadEntries());
  }, []);

  const handleSubmit = async () => {
    if (!notes.trim()) {
      toast.error('Please write some notes about your ritual before saving.');
      return;
    }
    setIsSubmitting(true);
    try {
      const now = new Date();
      // Get current planetary hour and moon phase for context
      const { calculatePlanetaryHours, getCurrentHour } = await import('@/lib/planetaryHours');
      const { getMoonPhase } = await import('@/lib/moonPhase');
      const dayData = calculatePlanetaryHours(now);
      const currentHour = getCurrentHour(dayData, now);
      const moon = getMoonPhase(now);

      const newEntry: Omit<JournalEntry, 'id' | 'aiFeedback'> = {
        date: now.toISOString(),
        ritualType,
        notes: notes.trim(),
        planetaryHour: currentHour?.planet,
        hourNumber: currentHour?.hourNumber,
        isDay: currentHour?.isDay,
        moonPhase: moon.phaseName,
        dayRuler: dayData.dayRuler,
        isPlanetDay: currentHour?.planet === dayData.dayRuler,
      };

      toast.info('Getting mentor feedback...');
      const aiFeedback = await getAIFeedback(newEntry, entries);

      const entry: JournalEntry = {
        ...newEntry,
        id: Date.now().toString(),
        aiFeedback,
      };

      const updated = [entry, ...entries];
      setEntries(updated);
      saveEntries(updated);
      setNotes('');
      setShowForm(false);
      toast.success('Journal entry saved with mentor feedback.');
    } catch (err) {
      console.error(err);
      // Save without AI feedback if API fails
      const now = new Date();
      const entry: JournalEntry = {
        id: Date.now().toString(),
        date: now.toISOString(),
        ritualType,
        notes: notes.trim(),
        aiFeedback: null,
      };
      const updated = [entry, ...entries];
      setEntries(updated);
      saveEntries(updated);
      setNotes('');
      setShowForm(false);
      toast.warning('Entry saved, but mentor feedback unavailable right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (id: string) => {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    saveEntries(updated);
    toast.success('Entry deleted.');
  };

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display text-2xl lg:text-3xl text-foreground tracking-wide">Ritual Journal</h1>
            <p className="text-muted-foreground text-sm mt-1">Record your practice. Receive guidance.</p>
          </div>
          <Button
            className="bg-primary text-primary-foreground font-display text-xs tracking-wider"
            onClick={() => setShowForm(o => !o)}
          >
            {showForm ? 'Cancel' : '✎ New Entry'}
          </Button>
        </div>
        <div className="gold-rule mt-4" />
      </div>

      {/* New entry form */}
      {showForm && (
        <Card className="bg-card border-border mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="font-display text-sm tracking-widest text-muted-foreground uppercase">
              New Journal Entry
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">Ritual Type</label>
              <Select value={ritualType} onValueChange={setRitualType}>
                <SelectTrigger className="bg-muted/50 border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {RITUAL_TYPES.map(type => (
                    <SelectItem key={type} value={type} className="text-foreground hover:bg-accent">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">
                Your Notes
                <span className="ml-2 text-muted-foreground/60">
                  (describe what you did, how it felt, what you noticed)
                </span>
              </label>
              <Textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="I performed the LBRP facing East. The Kabbalistic Cross felt natural but I struggled to visualize the pentagrams clearly. The archangel evocation felt powerful once I slowed down..."
                className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground/50 min-h-32 resize-none"
                rows={6}
              />
            </div>
            <div className="bg-muted/30 rounded-md p-3">
              <p className="text-xs text-muted-foreground leading-relaxed">
                After saving, an AI mentor will review your notes and provide specific feedback on your practice, including areas for improvement and your next suggested step.
              </p>
            </div>
            <Button
              className="w-full bg-primary text-primary-foreground font-display tracking-wider"
              onClick={handleSubmit}
              disabled={isSubmitting || !notes.trim()}
            >
              {isSubmitting ? 'Getting feedback...' : '✦ Save & Get Feedback'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Entries list */}
      {entries.length === 0 ? (
        <Card className="bg-card border-border">
          <CardContent className="pt-10 pb-10 text-center">
            <div className="text-4xl mb-4 text-muted-foreground">✎</div>
            <p className="font-display text-sm text-muted-foreground tracking-wide">No entries yet.</p>
            <p className="text-xs text-muted-foreground mt-2">
              After your first ritual, record your experience here. The AI mentor will help you progress.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="text-xs text-muted-foreground font-display tracking-widest uppercase mb-2">
            {entries.length} {entries.length === 1 ? 'Entry' : 'Entries'}
          </div>
          {entries.map(entry => (
            <EntryCard key={entry.id} entry={entry} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
