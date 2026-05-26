# Performance & SEO Audit – S-Visuals

## 1. Executive Summary

Die Website ist technisch sauber strukturiert (Next.js App Router, i18n, Metadata über `generateMetadata`, JSON-LD und Sitemap/Robots vorhanden). Gleichzeitig ist sie stark video-lastig, was das größte Risiko für **Core Web Vitals** und **Mobile-Performance** darstellt.

**Größte Performance-Risiken**
- **P0/LCP-Risiko:** Hero-Video-Panels werden per `dynamic(..., { ssr: false })` ausschließlich im Client geladen (`HeroSectionBackground.client.tsx`). Dadurch kann der LCP (oder sogar sichtbarer Hero-Content) verzögert starten.
- **P1-Netzwerk/CPU-Risiko:** Mehrere MP4-Playback-Strategien (Hero-Panels, Work-Preview-Videos, Preload von Off-DOM Videos) können auf Desktop und teilweise Mobile je nach Bedingungen spürbar Daten/CPU verbrauchen.

**Größte SEO-Risiken**
- **P0/H1-Risiko:** `impressum`/`datenschutz` scheinen **kein H1** zu rendern (LegalPageView nutzt `SectionHeader`, das nur ein `<h2>` erzeugt).
- **P1/Structured-Data-Risiko:** Client-Story-Detailseiten haben keine `VideoObject`/`BreadcrumbList` JSON-LD, während Work-Case-Detailseiten diese Daten liefern (`JsonLd`/`structured-data.ts`).

**Schnellste Hebel (ohne Umsetzung, nur als Plan)**
- H1-Struktur auf Legal-Seiten korrigieren.
- JSON-LD/Videosemantik für Client-Storys ergänzen.
- Hero-Video-SSR-/LCP-Strategie überarbeiten oder mindestens eine server-/noscript-freundliche Fallback-Strategie absichern.

## 2. Build / Lint / Typecheck Ergebnisse

### Commands
- `npm run lint`:
  - **Fehlgeschlagen (1 Error)** in `src/components/sections/work/VideoLightbox.client.tsx`
  - **Beleg:** `react-hooks/set-state-in-effect` (setState synchron in `useLayoutEffect` / Render-Cascades Risiko)
  - **Impact:** Performance-/Render-Kaskaden-Risiko; zusätzlich blockiert das ggf. CI/Quality Gates.
- `npm run build`:
  - **Erfolgreich** (Compiled + TypeScript + Static pages generiert)
  - Build-Ausgabe zeigt Routen u. a.:
    - `/[lang]/work/[slug]`, `/[lang]/client-stories/[slug]`, `/robots.txt`, `/sitemap.xml`
  - Hinweis: Next.js Warnung zur Middleware-Konvention (“middleware” deprecated) sichtbar.

### Build/Typecheck
- TypeScript: **Passed** (laut `next build` Output: “Finished TypeScript …”).

## 3. Performance Findings

| Priorität | Bereich | Problem | Beleg / Datei | Impact | Empfehlung | Aufwand | Risiko |
|---|---|---|---|---|---|---|---|
| P0 | Core Web Vitals (LCP) | Hero-Visuals sind wegen `ssr:false` client-only; initialer sichtbarer Content kann verzögert sein | `HeroSectionBackground.client.tsx`: `dynamic(() => import("./HeroVideoPanels.client").then(...), { ssr: false })` | Verzögerter LCP; schlechteres First Paint auf langsamem Netz/CPU | SSR-/Fallback-Strategie prüfen (z. B. statischer Hero/Poster bis JS bereit) und LCP-geeigneten Content priorisieren | mittel | mittel |
| P1 | Runtime / CPU | Hero-Video-Panels rotieren & planen Video-Playback per Intervals; mehrere Video-Elemente + crossfade | `HeroVideoPanels.client.tsx`: `setInterval` pro Panel, Video-Elemente mit `autoPlay`, `loop`, `preload`/`video.play()` | CPU-Last, Energieverbrauch; potenziell INP bei schwachen Geräten | Playback/Rotation stärker an User-Interaktion & In-View koppeln; harte Kapselung (caps) für Intervals | hoch | mittel |
| P1 | Netzwerk | Off-DOM Preload lädt MP4s pro Grid (Desktop) auch vor Interaktion | `WorkVideoGrid.client.tsx`: initial `INITIAL_PRELOAD_COUNT = 3` + zusätzlich “more” beim Expand; ruft `preloadPreviewVideos` | Datenverbrauch; mögliches LCP/INP-Negativ bei schwachem Netz | Preload stärker an View/Idle koppeln (z. B. Intersection + `requestIdleCallback`) und Maximum begrenzen | mittel | mittel |
| P1 | Mobile/Frontend Network | Preview-Videos können bei Hover aktiviert werden; Video-Element wird gemountet und `autoPlay` ausgeführt | `WorkVideoCard.tsx`: `onMouseEnter/onFocus` → `shouldLoadPreview` → `<video autoPlay muted loop playsInline ...>` | Netzwerk/CPU bei Geräten mit Hover (z. B. Tablets) | Zusätzlich “in view”/Idle gating; Preview nur nach Nutzerintent oder nur Metadaten | mittel | mittel |
| P2 | JS/Scroll Performance | Scroll-Parallax hängt am globalen `scroll`-Event + rAF Updates (auch wenn mitigated) | `HeroParallaxLayer.client.tsx`: `window.addEventListener("scroll", ..., { passive: true })` + `requestAnimationFrame` | Risiko für INP/Frame Drops in Kombination mit weiteren Scroll-Handlern | Anzahl Layers/Work pro Frame reduzieren; rAF throttling + stärkere Intersection-Gates | mittel | gering-mittel |
| P2 | JS/Interaction | Globaler Click-Handler (capture) für Hash/Smooth Scroll auf allen Seiten | `SmoothScrollHandler.client.tsx`: `document.addEventListener("click", handleDocumentClick, true)` + `scrollIntoView` | Kann Interaktionen auf schwachen Devices beeinflussen | Handler scoped begrenzen oder nur auf Seiten mit Hashlinks | gering | gering |
| P2 | Render/Effects Hygiene | Lint-Fehler deutet auf mögliche Render-Kaskaden / Effect-Semantik-Probleme hin | `VideoLightbox.client.tsx`: `useLayoutEffect(() => setPortalReady(true), [])` + ESLint Error | Potentiell unnötige re-renders; in Worst-Case UX/INP | Codehygiene/React-Pattern prüfen (Achtung: im Audit keine Fixes) | gering | gering |
| P2 | GPU/Compositing | Extensive Blur/Backdrop-Filter in Overlays (teurer auf Mobile) | `VideoLightbox.module.css`: `backdrop-filter: blur(...) saturate(...)` + weitere Blurs | Risiko für GPU-Overdraw, Jank | Später optimieren: reduzierte Blur-Intensität, bessere Layer-Boundaries | niedrig-mittel | mittel |
| P3 | Animations/Scroll Reveal | Viele Reveal-Wrapper nutzen IntersectionObserver (je Component) | `ScrollReveal.tsx` + `WorkSectionRoot.client.tsx` + `SectionHeader.tsx` (ScrollReveal) | JS/Observer overhead (nicht gemessen) | Später observer reuse/Batching prüfen | mittel | gering-mittel |

**Nicht gemessen / nur Code-Indiz**
- CWV (LCP/CLS/INP) Werte wurden nicht mit Lighthouse/WebPageTest/Vercel gemessen.
- Die tatsächliche Video-Download- und Decode-Strategie hängt stark vom Gerät/Netz/Browser ab.

## 4. SEO Findings

| Priorität | Bereich | Problem | Beleg / Datei | Impact | Empfehlung | Aufwand | Risiko |
|---|---|---|---|---|---|---|---|
| P0 | On-Page SEO / Semantik | Legal Pages haben sehr wahrscheinlich kein H1 (nur h2 via SectionHeader) | `LegalPageView.tsx`: nutzt `<SectionHeader title={content.title} ... />`; `SectionHeader.tsx` rendert `<h2>` | SEO-Relevanzverlust; schlechteres Semantic Signals; potenziell schlechte Indexqualität | H1 einführen oder SectionHeader so erweitern, dass es optional H1 unterstützt | mittel | mittel |
| P1 | Structured Data | Client-Story-Detailseiten liefern keine JSON-LD für Video/Service/Breadcrumb | `client-stories/[slug]/page.tsx` zeigt kein `<JsonLd ... />`; `structured-data.ts` bietet VideoObject/Breadcrumb nur für Work | Video-/Rich Results Chancen geringer; schwächerer Kontext für Google | Client-Story spezifische JSON-LD ergänzen (mindestens BreadcrumbList + ggf. VideoObject) | mittel | mittel |
| P1 | Video SEO | Video-Object JSON-LD existiert nur für Work Case Detailseiten | `work/[slug]/page.tsx` + `structured-data.ts`: `buildCaseVideoJsonLd` | Videos auf Client-Stories bleiben “ohne VideoObject Signale” | VideoObject JSON-LD auf Client-Stories erweitern | hoch | mittel |
| P2 | Placeholder Content (Content-Qualität) | Testimonial/Content für einige Client-Stories ist als Placeholder markiert (isPlaceholder) | `src/content/testimonials.ts`: Ramon/Mario `isPlaceholder: true` und Placeholder-Quote | Risiko für Content-Qualitätsbewertungen/CTR (nicht gemessen) | Content vor Launch finalisieren/ersetzen | mittel | mittel |
| P2 | Indexierbarkeit / Qualität | Soziallinks-URL TODO könnte ungültige Outbound Links erzeugen | `client-stories.ts`: `TODO_SOCIAL_URL = "TODO_ADD_REAL_INSTAGRAM_URL"` für Ramon/Mario | Fehlerhafte Links reduzieren Trust/UX; potenziell “nofollow/open errors” | URLs finalisieren und ungültige Links aus JSON-LD/DOM entfernen | gering-mittel | gering |
| P2 | Twitter/OG Bild-Absolute URLs | `twitter.images` nutzt `ogImagePath` als String (relativ) – abhängig von Next metadata resolution | `lib/seo.ts`: `twitter.images: [ogImagePath]` | Risiko: Twitter Card kann Image ggf. nicht korrekt auslesen | später verifizieren; ggf. sicher absolute URLs | gering | gering |
| P3 | Crawl Budget | Video-lastige Seiten können Crawl/Index Aufwand erhöhen | Vielzahl von Video-Elementen & Preloads (siehe Performance) | Kann Crawling/Rendering beeinflussen (nicht gemessen) | später serverseitige Content-Vorschau/SEO Text-First prüfen | mittel | gering-mittel |

## 5. Route-by-Route SEO Check

**Öffentliche Slugs (aus Daten + Sitemap):**
- Home: `/de`, `/en`
- Work: `/de/work/prep-my-meal-leon-haegele` (+ Platzhalter-Slugs `client-one` … `client-three`, noindex)
- Client Stories: `leon-haegele`, `ramon-limacher`, `mario-scherthan`
- Legal: `/impressum`, `/datenschutz` je Locale

| Route | Title | Meta Description | H1 | Canonical | OG | hreflang | Indexierbarkeit | Probleme |
|---|---|---|---|---|---|---|---|---|
| `/` | — (307/Redirect) | — | — | → `/${locale}` | — | — | nicht indexierbar als Inhalt | Doppel-Redirect-Pfad: `page.tsx` + `middleware.ts` (nicht gemessen) |
| `/de` | DE `meta.title` in `dictionaries.ts` | DE `meta.description` | sr-only `hero.seoH1` | `buildCanonical("de")` | `/og/og-default.svg` | de, en, x-default | index | Sichtbarer Hero „VISUALS“ nur visuell; SEO-H1 versteckt; Hero-Video client-only |
| `/en` | EN `meta.title` | EN `meta.description` | sr-only `hero.seoH1` | `buildCanonical("en")` | Default OG | de, en, x-default | index | wie `/de` |
| `/de/work/prep-my-meal-leon-haegele` | Case-Titel + Site-Name | Case-Beschreibung | `<h1>{content.title}</h1>` | `/de/work/...` | `workCase.posterSrc` | ja | index | JSON-LD inkl. VideoObject |
| `/de/work/client-one` (Platzhalter) | wie oben | Platzhalter-Text | H1 vorhanden | ja | Poster SVG | ja | **noindex, follow** | In Sitemap nur indexierbare Cases (`getIndexableWorkCases`) — Platzhalter nicht in Sitemap |
| `/de/client-stories/leon-haegele` | Page-Title-Template + Name | `metaDescription` | `<h1>{pageTitle}</h1>` | ja | Default OG | ja | index | Kein JsonLd; OG nicht story-spezifisch |
| `/de/impressum` | Legal title + Markenname | Erster Abschnitt (slice) | **fehlt** (nur `<h2>`) | ja | Default | ja | index | **P0: kein H1** |
| `/de/datenschutz` | wie Impressum | wie Impressum | **fehlt** | ja | Default | ja | index | **P0: kein H1** |
| `/robots.txt` | — | — | — | — | — | — | allow `/` | Sitemap-URL gesetzt |
| `/sitemap.xml` | — | — | — | — | — | alternates pro URL | — | Home, Legal, indexierbare Work-Cases, alle Client Stories |

**Belege (wichtige Code-Stellen)**
- Locale Redirect: `src/app/page.tsx` (Home redirect).
- Metadata Alternates/Canonical/OG/Twitter: `src/lib/seo.ts` (`buildPageMetadata`, `buildPageAlternates`).
- Home H1: `HeroSection.tsx` → `<h1 ... className="sr-only">{dict.hero.seoH1}</h1>`.
- Work H1: `WorkCaseDetailView.tsx` → `<h1 ...>{content.title}</h1>`.
- Client Story H1: `ClientStoryDetailView.tsx` → `<h1 ...>{pageTitle}</h1>`.
- Legal “H1” Problem: `SectionHeader.tsx` rendert nur `<h2>`, `LegalPageView` nutzt `SectionHeader` ohne H1.

## 6. Asset Audit

### Bilder (Top nach Größe in `public/`)

| Datei/Pfad | Größe (MB) | Nutzung | Risiko | Empfehlung |
|---|---:|---|---|---|
| `assets/mockups/hero-mockup1.webp` | 1.66 | Hero-Mockup (Code-Indiz, nicht gemessen) | P2 (LCP risk if used as hero media) | später prüfen, ob preloaded/priority und ob responsive sizing korrekt |
| `assets/videos/collaboration/ramon1.png` | 1.64 | Testimonial-/Avatar/Collaboration | niedrig-mittel | sicherstellen, dass nur benötigte Formate/Kanten verwendet werden |
| `assets/videos/collaboration/mario1.png` | 1.32 | Testimonial-/Avatar/Collaboration | niedrig-mittel | —
| `assets/hero/hero-frame-02-fitness-filming.webp` | 0.17 | Hero Panels | niedrig | — |

### Videos (Top nach Größe in `public/`)

| Datei/Pfad | Größe (MB) | Nutzung | Risiko | Empfehlung |
|---|---:|---|---|---|
| `assets/videos/raw/savas/AYO X KOOLSAVAS.mp4` | 146.38 | **nicht gemessen (Code-Indiz: nicht in `src` gefunden)** | P0-Potential, falls versehentlich referenziert | sicherstellen, dass “raw” nicht in Deploy/Runtime ungefiltert genutzt wird |
| `assets/videos/raw/diamten/sinnvoll_final.mp4` | 88.48 | **nicht gemessen (Code-Indiz: nicht referenziert)** | P0 potential | —
| `assets/videos/raw/random/ayo.mp4` | 85.05 | **nicht gemessen (nicht referenziert)** | P0 potential | —
| `assets/videos/lightbox/savas/AYO X KOOLSAVAS-lightbox.mp4` | 51.07 | Lightbox Content (interaktionsgetrieben) | P1 (Network auf Mobile) | später prüfen: richtige bitrate/codec, poster + keine unnötigen preloads |
| `assets/videos/raw/diamten/negative final.mp4` | 50.15 | nicht referenziert | P0 potential | —
| `assets/videos/preview/savas/AYO X KOOLSAVAS-web.mp4` | 11.35 | Preview (Hover/Preload) | P1 (Network/Decode) | später cap & tie to interaction/in-view |
| `assets/videos/lightbox/diamten/bracen-lightbox.mp4` | 7.67 | Lightbox | P1 (Mobile data) | ggf. progressive loading/bitrate tiers (später) |

**Nicht gemessen / nur Code-Indiz**
- Ob `assets/videos/raw/*` tatsächlich in der App referenziert werden: In `src` wurde kein Treffer für `videos/raw` gefunden (nur Code-Indiz).
- Tatsächliche Dateigrößen beim Serving (komprimiert/Range Requests) und CDN-Handling: nicht gemessen.

## 7. Bundle / Client JS Audit

### Größte Client-Komponenten (Code-Indiz)
- `src/components/hero/HeroVideoPanels.client.tsx`: Video Playback + Rotation + IntersectionObserver + mehrere Video-Elemente
- `src/components/sections/work/WorkVideoGrid.client.tsx`: Video Preload + Hover-to-preview Logik + Lightbox orchestration
- `src/components/sections/work/VideoLightbox.client.tsx` & `VideoLightboxPlayer.client.tsx`: Modal + Video player
- `src/components/sections/HeroParallaxLayer.client.tsx`: Scroll-Listener + rAF transform updates
- `src/components/layout/SmoothScrollHandler.client.tsx`: globaler click handler
- `src/components/animation/ScrollReveal.tsx` & `src/components/sections/SectionHeader.tsx`: viele Reveal Wrapper via IntersectionObserver
- `src/components/sections/impact-snapshot/*client.tsx`: chart/animation heavy (SVG path animation + ResizeObserver)

### Auffälligkeiten
- **Dynamic import mit `ssr:false`** für Hero Videos: `HeroSectionBackground.client.tsx` (Performance + SEO-LCP Risiko).
- Keine Hinweise auf Framer Motion; keine `next/script` externen Third-Party Scripts (nur JSON-LD via inline `<script type="application/ld+json">`).

**Nicht gemessen**
- tatsächliche Bundle Sizes / transferSize pro Route und i18n-Language: nicht gemessen (kein Bundle-Analyzer im Projektkontext gesichtet).

## 8. Accessibility / UX Risks

| Bereich | Risiko | Beleg / Datei | Impact | Empfehlung |
|---|---|---|---|---|
| Modal/Lightbox | Kein Focus-Trap / kein garantierter Fokus-Rücksprung beim Close | `VideoLightbox.client.tsx`: fokussiert `closeButtonRef.current?.focus()` beim Open; speichert aber nicht “previously focused element” und nutzt keinen focus trap | Keyboard/Screenreader UX | später: focus trap + Fokus auf Trigger zurück |
| Modal/Lightbox | Hintergrund-Scroll-Sperre: multiple Stellen, aber Interaktion kann browserabhängig sein | `VideoLightbox.client.tsx`: `body` + `html` overflow hidden + `touchmove` preventDefault | UX-Regression Risiko je nach iOS | später testen auf iOS Safari/Chrome |
| Video Controls | Tastatur-Fokus auf Range/Buttons: labels existieren, aber Modal semantics + Trap fehlt | `VideoLightboxPlayer.client.tsx`: aria-label pro Controls | mittel | focus trap und roving tabindex prüfen |
| Scroll Animations | `ScrollReveal` reduziert Motion via media query (gut), aber mehrere Observer möglich | `ScrollReveal.tsx` | niedrig-mittel | observer reuse prüfen (später) |

## 9. Priorisierter Maßnahmenplan (keine Umsetzung)

### Phase 1 – Sofortmaßnahmen mit hohem Impact
1. **Legal-Seiten H1 korrigieren**
   - Ziel: eindeutige H1-Semantik, besseres SEO-Signal
   - Dateien: `src/components/legal/LegalPageView.tsx`, `src/components/sections/SectionHeader.tsx`
   - Erwarteter Impact: hoch (P0)
   - Aufwand: mittel
   - Risiko visuell: mittel (H-Tag Styling/Size)
2. **Client Story JSON-LD ergänzen**
   - Ziel: VideoObject/BreadcrumbList/Service Semantik wie bei Work Cases
   - Dateien: `src/app/[lang]/client-stories/[slug]/page.tsx` + ggf. `src/lib/structured-data.ts`
   - Impact: hoch (P1)
   - Aufwand: mittel-hoch
   - Risiko: mittel (structured data correctness)
3. **Hero-SSR/Fallback Strategie absichern**
   - Ziel: LCP verbessern, JS-Abhängigkeit reduzieren
   - Dateien: `src/components/hero/HeroSectionBackground.client.tsx` + ggf. Hero Video Panels
   - Impact: hoch (P0)
   - Aufwand: hoch
   - Risiko visuell: mittel (Hero Look & Timing)

### Phase 2 – Performance-Struktur sauberziehen
1. **Video Preload “cap” + View gating**
   - Ziel: Preload-Menge/Timing kontrollieren
   - Dateien: `src/components/sections/work/WorkVideoGrid.client.tsx`, `preloadPreviewVideos.ts`
   - Impact: mittel-hoch (P1)
   - Aufwand: mittel
   - Risiko: mittel (Video previews Timing)
2. **Hero Video Rotation/Scheduling reduzieren**
   - Ziel: CPU-/Battery-Last senken, INP stabilisieren
   - Datei: `HeroVideoPanels.client.tsx`
   - Impact: mittel-hoch (P1/P2)
   - Aufwand: hoch
   - Risiko: mittel
3. **Global click handler reduzieren**
   - Ziel: Interaktions-Pfade entkoppeln
   - Datei: `SmoothScrollHandler.client.tsx`
   - Impact: mittel (P2)
   - Aufwand: gering-mittel
   - Risiko: gering-mittel

### Phase 3 – SEO-Ausbau
1. Video SEO für Client Stories ergänzen (VideoObject oder zumindest Video-relevante Entities)
2. Rich Results Opportunity: BreadcrumbList auf Client Storys
3. Content-Qualität: Placeholder Testimonials final ersetzen (für Ramon/Mario) oder zuverlässig kennzeichnen

### Phase 4 – Optional / Feinschliff
1. Twitter/OG absolute URL Verifizierung
2. Focus Trap & A11y polish für Lightbox
3. Observer reuse & JS event throttling

## 10. Nicht messbare Punkte / offene Fragen
- Keine Lighthouse-/WebPageTest/CWV Daten im Audit vorhanden.
- Vercel/CDN Cache, HTTP Range Requests, Codec/Bitrate pro Device: nicht gemessen.
- Exakte JS Bundle Sizes und “which dependency dominates”: nicht gemessen.
- Mobile Browser-Spezifika für Hintergrund-Scroll/`touchmove` Handling (insb. iOS): nur Code-Indiz.

## Top 10 nächste Optimierungen
1. **H1 Semantik auf `impressum`/`datenschutz` sicherstellen** (P0 SEO)
2. **Client-Story JSON-LD (VideoObject + BreadcrumbList) ergänzen** (P1 SEO)
3. **Hero-Visual SSR/Fallback verbessern (LCP)** (P0 Performance)
4. **Video Preload Menge/Timing für Work Grids begrenzen & stärker view-/idle-gated machen** (P1 Performance)
5. **Hero-Video Rotation Scheduling reduzieren (CPU/Battery/INP)** (P1 Performance)
6. **Focus Trap + Fokus-Rücksprung für Lightbox ergänzen** (A11y/UX)
7. **Globaler Click Handler in SmoothScrollHandler auf Wirkung prüfen/scopen** (INP)
8. **Reduce observers/JS overhead (ScrollReveal/WorkSectionRoot)** (P2 Performance)
9. **Twitter Card Image URL Validierung (absolute URLs)** (SEO)
10. **Content Placeholder Risiken reduzieren (Testimonials Ramon/Mario)** (SEO-Content Quality)

