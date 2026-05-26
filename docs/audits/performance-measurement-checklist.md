# Performance Measurement Checklist (Production)

## Welche Routen messen (DE)
- `/de`
- `/de/client-stories/leon-haegele`
- `/de/work/prep-my-meal-leon-haegele`
- `/de/impressum`

## Tools
- Chrome Lighthouse (auf `next build` / Production)
- Vercel Speed Insights (falls aktiv)
- Chrome DevTools: Network + Performance

## Metriken
- LCP
- CLS
- INP / TBT
- JS Transfer Size
- Initial MP4 Requests (wie viele MP4s kommen initial/early)
- Largest asset requests

## Prüffragen (konkret)
- Werden MP4s schon vor Scroll/User-Interaktion geladen?
- Ist der Hero-LCP Text/Headline, Bild oder Video (welches Element)?
- Lädt die Work-Section Videos erst nach View/Idle?
- Gibt es Layout Shift im Hero-Bereich?
- Sind Legal-Seiten leichtgewichtig (wenig/keine Video-Last)?

## Manuelle Repeatability
- Mindestens 3 Runs pro Route (Cold + Warm where possible).
- Testbedingungen: Mobile (z. B. 4G/Slow) und Desktop.
- Bei Video: Network Throttling explizit notieren.

