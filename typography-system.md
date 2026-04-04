# Luxury Jewellery Typography System
**Bebas Neue · DM Sans · DM Mono**

---

## 01 — Reference Audit

### Jessica McCormack — jessicamccormack.com

| Element | Value |
|---|---|
| Primary font | SangBleu Empire / Serif |
| Secondary font | Neue Haas Grotesk / Sans |
| Accent font | Courier-style mono |
| Nav size | 12px / 0.14em tracking |
| Hero display | 52–72px / weight 300 |
| Body copy | 14px / 1.7 leading |
| Product name | 16–20px serif |
| Price display | Mono, 12–14px |

**Key insight:** JMC's power move is the serif/mono tension — warm vintage letterforms against cold tabular numerals. Photography dominates; type restrains itself. The serif creates intimacy; mono creates authority.

---

### Sophie Bille Brahe — sophiebillebrahe.com

| Element | Value |
|---|---|
| Primary font | Custom sans / Optima-adjacent |
| Secondary font | Helvetica Neue / system |
| Nav size | 11–12px / 0.08em tracking |
| Hero display | 36–56px / very light |
| Body copy | 13–14px / 1.7 leading |
| Letter-spacing rule | ≈ 0.06em ratio |
| Type scale range | 11px → 56px (restrained) |
| Colour philosophy | Near-black, no pure #000 |

**Key insight:** SBB runs an almost mathematical system — tracking scales with font-size at a consistent 0.06em ratio. Extreme restraint in the type scale forces photography to carry all drama.

---

### Principles Extracted

Both sites treat type as **architecture**, not decoration. Type sets the structure; imagery fills the emotion. Neither site uses type to shout — they use it to establish quiet authority.

Tracking (letter-spacing) is the primary tool for hierarchy, not just size. A 10px eyebrow at 0.22em tracking can feel more authoritative than a 14px body at 0.01em.

**Our departure:** Both references use serif or semi-serif primaries. We replace that with Bebas Neue — a condensed display sans that brings modern, fashion-forward boldness while keeping luxury restraint through tight leading and generous tracking. Bebas Neue is all-caps only, which enforces a typographic discipline where every heading is a structured label, never casual prose.

---

## 02 — The Stack

All three fonts are **free via Google Fonts**, licensed under the Open Font License (OFL). Safe for commercial use. Self-hosting via WOFF2 is recommended for production performance.

### Bebas Neue — Primary / Display
- **Role:** All headings, product names, brand mark, display text
- **Licence:** Free / Google Fonts (OFL)
- **Designer:** Ryoichi Tsunekawa
- **Key constraint:** All-capitals only — no lowercase glyphs. Always use `text-transform: uppercase` in CSS.
- **Character:** Condensed, bold, fashion-forward. Used widely in luxury, editorial, and fashion contexts.

### DM Sans — Secondary / Body & UI
- **Role:** Body copy, navigation, UI labels, CTAs, eyebrows
- **Licence:** Free / Google Fonts (OFL)
- **Designer:** Colophon Foundry for Google
- **Key features:** Optical size axis (9–40pt), low contrast, geometric humanist. Precise at small sizes, refined at large.
- **Weights in use:** 300 (editorial body), 400 (nav/UI), 500 (CTAs/labels)

### DM Mono — Tertiary / Numeric
- **Role:** All prices, specifications, SKUs, dimensions, certifications, dates
- **Licence:** Free / Google Fonts (OFL)
- **Key features:** Monospaced companion to DM Sans — shared optical proportions. Tabular numerals for price alignment.
- **Usage rule:** Mono = numbers only. Never use for paragraph text or general UI labels.

---

## 03 — Type Scale

### Google Fonts import

```css
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300;1,9..40,400&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');
```

---

### CSS Design Tokens

```css
:root {
  /* Typefaces */
  --font-display: 'Bebas Neue', 'Arial Narrow', sans-serif;
  --font-sans:    'DM Sans', system-ui, sans-serif;
  --font-mono:    'DM Mono', 'Courier New', monospace;

  /* DISPLAY — hero / campaign */
  --type-display-size:    clamp(56px, 7vw, 112px);
  --type-display-lh:      0.95;
  --type-display-ls:      0.06em;

  /* H1 — page title */
  --type-h1-size:         clamp(36px, 4vw, 64px);
  --type-h1-lh:           1.0;
  --type-h1-ls:           0.06em;

  /* H2 — section heading */
  --type-h2-size:         clamp(24px, 2.8vw, 40px);
  --type-h2-lh:           1.05;
  --type-h2-ls:           0.07em;

  /* H3 — product name on card */
  --type-h3-size:         24px;
  --type-h3-lh:           1.1;
  --type-h3-ls:           0.06em;

  /* H4 — brand name / editorial subhead */
  --type-h4-size:         18px;
  --type-h4-lh:           1.1;
  --type-h4-ls:           0.08em;

  /* NAV — navigation links */
  --type-nav-size:        12px;
  --type-nav-weight:      400;
  --type-nav-lh:          1.0;
  --type-nav-ls:          0.14em;

  /* EYEBROW — category labels */
  --type-eyebrow-size:    10px;
  --type-eyebrow-weight:  500;
  --type-eyebrow-lh:      1.0;
  --type-eyebrow-ls:      0.22em;

  /* BODY LG — editorial copy */
  --type-body-lg-size:    16px;
  --type-body-lg-weight:  300;
  --type-body-lg-lh:      1.8;
  --type-body-lg-ls:      0.02em;

  /* BODY — standard copy */
  --type-body-size:       14px;
  --type-body-weight:     400;
  --type-body-lh:         1.75;
  --type-body-ls:         0.015em;

  /* BODY SM — captions / meta */
  --type-body-sm-size:    12px;
  --type-body-sm-weight:  400;
  --type-body-sm-lh:      1.6;
  --type-body-sm-ls:      0.025em;

  /* CAPTION — footnotes */
  --type-caption-size:    11px;
  --type-caption-weight:  400;
  --type-caption-lh:      1.5;
  --type-caption-ls:      0.04em;

  /* PRICE — monetary values */
  --type-price-size:      13px;
  --type-price-weight:    400;
  --type-price-lh:        1.0;
  --type-price-ls:        0.04em;

  /* SPECS — product details / SKU */
  --type-specs-size:      11px;
  --type-specs-weight:    400;
  --type-specs-lh:        1.6;
  --type-specs-ls:        0.06em;
}
```

---

### Scale reference table

| Level | Font | Size | Leading | Tracking | Weight | Use |
|---|---|---|---|---|---|---|
| Display | Bebas Neue | clamp(56–112px) | 0.95 | 0.06em | 400 | Campaign hero, full-width banner |
| H1 | Bebas Neue | clamp(36–64px) | 1.0 | 0.06em | 400 | Page title, PDP headline |
| H2 | Bebas Neue | clamp(24–40px) | 1.05 | 0.07em | 400 | Section heading, category title |
| H3 | Bebas Neue | 24px | 1.1 | 0.06em | 400 | Product name on card |
| H4 | Bebas Neue | 18px | 1.1 | 0.08em | 400 | Brand name, editorial subhead |
| Nav | DM Sans | 12px | 1.0 | 0.14em | 400 | Navigation, tabs, menu |
| Eyebrow | DM Sans | 10px | 1.0 | 0.22em | 500 | Category label, section marker |
| Body LG | DM Sans | 16px | 1.8 | 0.02em | 300 | Editorial copy, brand story |
| Body | DM Sans | 14px | 1.75 | 0.015em | 400 | Product descriptions, general copy |
| Body SM | DM Sans | 12px | 1.6 | 0.025em | 400 | Announcement bar, legal copy |
| Price | DM Mono | 13px | 1.0 | 0.04em | 400 | All monetary values |
| Specs | DM Mono | 11px | 1.6 | 0.06em | 400 | Materials, SKU, dimensions, certs |

---

## 04 — Common Patterns

### Navigation bar

```css
/* Brand name */
font-family: 'Bebas Neue', sans-serif;
font-size: 20px;
letter-spacing: 0.22em;
text-transform: uppercase;

/* Nav links */
font-family: 'DM Sans', sans-serif;
font-size: 12px;
font-weight: 400;
letter-spacing: 0.14em;
text-transform: uppercase;
color: #4a4845;
```

### Hero / Display

```css
/* Eyebrow label */
font-family: 'DM Sans', sans-serif;
font-size: 10px;
font-weight: 500;
letter-spacing: 0.22em;
text-transform: uppercase;
color: #b8a47a;

/* Hero title */
font-family: 'Bebas Neue', sans-serif;
font-size: clamp(56px, 7vw, 112px);
letter-spacing: 0.06em;
line-height: 0.95;
text-transform: uppercase;

/* Hero body */
font-family: 'DM Sans', sans-serif;
font-size: 14px;
font-weight: 300;
line-height: 1.75;
letter-spacing: 0.015em;
color: #4a4845;

/* CTA link */
font-family: 'DM Sans', sans-serif;
font-size: 11px;
font-weight: 500;
letter-spacing: 0.16em;
text-transform: uppercase;
border-bottom: 1px solid currentColor;
```

### Product card

```css
/* Collection label */
font-family: 'DM Sans', sans-serif;
font-size: 9px;
font-weight: 500;
letter-spacing: 0.18em;
text-transform: uppercase;
color: #8a8784;

/* Product name */
font-family: 'Bebas Neue', sans-serif;
font-size: 18px;
letter-spacing: 0.06em;
line-height: 1.1;
text-transform: uppercase;

/* Price */
font-family: 'DM Mono', monospace;
font-size: 12px;
font-weight: 400;
letter-spacing: 0.04em;
color: #4a4845;
```

### Product detail page

```css
/* PDP title */
font-family: 'Bebas Neue', sans-serif;
font-size: clamp(36px, 4vw, 64px);
letter-spacing: 0.06em;
line-height: 1.0;
text-transform: uppercase;

/* Price */
font-family: 'DM Mono', monospace;
font-size: 14px;
letter-spacing: 0.05em;

/* Description */
font-family: 'DM Sans', sans-serif;
font-size: 14px;
font-weight: 300;
line-height: 1.8;
letter-spacing: 0.015em;

/* Spec key */
font-family: 'DM Sans', sans-serif;
font-size: 11px;
font-weight: 400;
letter-spacing: 0.1em;
text-transform: uppercase;
color: #8a8784;

/* Spec value */
font-family: 'DM Mono', monospace;
font-size: 11px;
letter-spacing: 0.06em;
```

---

## 05 — Dark Surface Treatment

Use `#111010` (not pure `#000000`) as the dark background. Near-black reads as more considered and avoids harsh digital contrast.

| Role | Value | Notes |
|---|---|---|
| Background | `#111010` | Near-black, not pure #000 |
| Headings | `#ffffff` | Display, H1, H2, brand name |
| Body copy | `rgba(255,255,255,0.45)` | Never pure white — too harsh |
| Nav links | `rgba(255,255,255,0.45)` | Secondary, subdued |
| Eyebrow labels | `#b8a47a` | Gold accent — same as light mode |
| Dividers | `rgba(255,255,255,0.12)` | Subtle, not heavy |
| Product cards | `#161614` | Slightly lifted from background |
| Card image bg | `#1d1d1b` | One step lighter than card |

---

## 06 — Colour Palette

| Name | Hex | Use |
|---|---|---|
| Ink | `#111010` | Primary text, dark background |
| Ink Mid | `#4a4845` | Body copy, secondary text |
| Ink Soft | `#8a8784` | Captions, meta, labels |
| Paper | `#faf9f7` | Primary background |
| Paper Warm | `#f0ede8` | Alternate sections, product bg |
| Rule | `#dddad5` | Borders, dividers |
| Gold | `#b8a47a` | Accent — eyebrows, section labels |
| White | `#ffffff` | Cards, overlays, dark surface text |

---

## 07 — Usage Guidelines

### 1. Bebas Neue is always uppercase
Bebas Neue has no lowercase glyphs. Every heading, product name, brand mark, and display text must be uppercase. Always enforce with `text-transform: uppercase` in CSS — never rely on the copywriter to capitalise manually.

### 2. Track proportionally
Follow the 0.06em ratio as a baseline for Bebas Neue: `letter-spacing = font-size × 0.06`. Eyebrows in DM Sans run at 0.2–0.22em because small text needs more air to breathe.

### 3. Mono = numbers only
DM Mono is reserved exclusively for numeric, data, and code content: prices, dimensions, SKUs, carats, certifications, dates. Never use it for paragraph text or UI labels. Its presence should signal "precise information".

### 4. Weight restraint in DM Sans
- Body and editorial: weight **300** (light)
- Navigation and UI: weight **400** (regular)
- CTAs and labels: weight **500** (medium)

Never use 600 or 700. Heavy weights break the luxury register. Hierarchy comes from tracking and size, not bold text.

### 5. Near-black, not pure black
Use `#111010` for ink on light surfaces. Pure `#000000` feels harsh and digital. On dark surfaces, use `rgba(255,255,255,0.45)` for body — not pure white.

### 6. Let space do the work
Whitespace is the primary typographic tool. Tight, crowded type reads as mass market. Space = confidence = luxury.

---

### Do

- Use Bebas Neue for all headings and product names — the uppercase-only constraint creates visual consistency
- Use DM Sans weight 300 for editorial and body copy
- Use the gold accent `#b8a47a` sparingly: one or two instances per screen maximum
- Use `clamp()` for fluid sizing on Display and H1 levels
- Pair every price with DM Mono — even on dark surfaces

### Don't

- Use DM Mono for body copy or navigation
- Use bold (600+) weights in DM Sans on jewellery copy
- Overuse gold — when everything is highlighted, nothing is
- Use Bebas Neue below 16px — its compressed forms become illegible at small sizes (use DM Sans uppercase instead)
- Use pure `#000000` black anywhere in the system

---

## 08 — Responsive Behaviour

| Viewport | Display | H1 | Notes |
|---|---|---|---|
| 375px mobile | ~56px | ~36px | `clamp()` floor |
| 768px tablet | ~75px | ~48px | fluid midpoint |
| 1440px desktop | 112px | 64px | `clamp()` ceiling |

Nav, body, eyebrow, price, and spec sizes remain **fixed** across breakpoints — the luxury register does not scale copy sizes up on desktop. Only Display and H1 fluid-scale.

---

*Typography System v1.0 — Bebas Neue + DM Sans + DM Mono — All fonts free via Google Fonts (OFL)*
