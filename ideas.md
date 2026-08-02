# Magick Companion — Design Document

## Three Approaches Considered

**Approach A — Illuminated Manuscript** (probability: 0.04)
Parchment tones, sepia ink, decorative borders inspired by medieval grimoires. Warm and antiquarian.

**Approach B — Sacred Observatory** (probability: 0.07) ← CHOSEN
A professional, dark-mode instrument panel aesthetic — like a precision astronomical observatory combined with a scholar's private study. Deep charcoal backgrounds, gold and steel-blue accents, clean sans-serif typography. Feels like a serious tool, not a costume.

**Approach C — Botanical Alchemical** (probability: 0.03)
Cream backgrounds, botanical illustration motifs, muted earth tones. Quiet and contemplative.

---

## Chosen Approach: Sacred Observatory

**Design Movement:** Precision Instrument / Scholar's Atelier — where a 17th-century astronomer's study meets a modern data dashboard.

**Core Principles:**
1. Every element earns its place — no decoration for decoration's sake.
2. Information hierarchy is sacred — the most important thing (current planetary hour) is always visible at a glance.
3. Dark backgrounds reduce eye strain during low-light ritual use.
4. Gold accents are used sparingly, only for Jupiter/primary elements.

**Color Philosophy:**
- Background: Deep charcoal `oklch(0.12 0.01 260)` — not pure black, has a slight cool undertone like night sky.
- Surface: Slightly lighter `oklch(0.17 0.01 260)` for cards.
- Primary accent: Antique gold `oklch(0.75 0.12 75)` — warm, metallic, Jupiter's color.
- Secondary accent: Steel blue `oklch(0.55 0.12 230)` — celestial, cool, for informational elements.
- Muted text: `oklch(0.55 0.01 260)` — readable but not harsh.
- Destructive/warning: Muted amber.

**Layout Paradigm:** Asymmetric dashboard grid. A persistent left sidebar for navigation (desktop) collapses to a bottom tab bar on mobile. Main content uses a 2-column asymmetric grid — a wide primary panel and a narrower secondary panel — rather than centered single-column.

**Signature Elements:**
1. A thin gold horizontal rule (`border-t border-gold/20`) separates section headers from content throughout the app.
2. Planetary glyphs rendered as SVG inline icons, used as visual anchors in lists and headers.
3. Subtle radial gradient behind the current hour indicator — like a halo of light.

**Interaction Philosophy:** Deliberate and calm. No bouncy animations. Transitions are slow enough to feel intentional (200–300ms ease-out). Modals slide up from the bottom on mobile. Hover states use a gentle gold border glow.

**Animation:** Entrance animations use `opacity: 0 → 1` with `translateY(8px → 0)` over 250ms. The live clock ticks with no animation — it just updates. The planetary hour progress bar fills smoothly via CSS transition.

**Typography System:**
- Display/headings: `Cinzel` (Google Fonts) — a Roman-inspired serif with classical authority. Used for section titles and the app name only.
- Body: `Inter` (system fallback acceptable) — clean, readable, professional.
- Monospace: System mono — for time displays and coordinates.
- Scale: 12/14/16/20/28/40px. No intermediate sizes.

**Brand Essence:** A private instrument for serious practice — precise, calm, and deeply informed.
Personality: Scholarly, Grounded, Precise.

**Brand Voice:** Direct and instructional. No mystical fluff, no marketing speak.
Example headline: "Hour of Jupiter — Begin your practice now."
Example CTA: "Open the ritual."

**Wordmark & Logo:** The Jupiter glyph (♃) inscribed in a circle of 8 points, rendered in antique gold. No wordmark text in the logo itself.

**Signature Brand Color:** Antique gold `oklch(0.75 0.12 75)` — unmistakably Jovian.

## Style Decisions
- Dark theme is default and only theme (no toggle needed for a ritual tool).
- Planetary colors: Sun=amber, Moon=silver, Mercury=teal, Venus=rose, Mars=red, Jupiter=gold, Saturn=slate.
- The LBRP guide uses a step-by-step stepper component, not a wall of text.
- Journal entries are stored in localStorage (no backend needed for v1).
