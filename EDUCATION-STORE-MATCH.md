# Education Store / Marketplace match

Reference inspected live: https://www.apple.com/us-edu/store, October 17, 2026, at 1440 × 1000.
Reference screenshots: `.practice-qa/edu-0.png` through `edu-7.png`.

| Live reference feature | Marketplace implementation |
|---|---|
| Black education masthead; large left title; right slogan/help | Dark fire masthead; left Marketplace title; right slogan and working links |
| Animated stickers; irregular lower boundary | Animated local SVG stickers; torn lower edge; reduced-motion support |
| Product category object strip | Existing category filters with subject/equipment illustrations |
| Education savings rail | Field collection with existing listings, details and saves |
| Additional ways to save rail | More ways to explore: task/equipment/supply categories and scope dialog |
| Store difference rail | Evidence, comparison, shortlist help, location and guidance |
| Accessories with narrower cards | Field essentials, 313px cards |
| Endless potential rail | Archive, Workshop, News and Network |
| More to love rail | Related subjects and map |
| Experience with wider cards | Investigations, map, digest and workshop, 480px cards |
| Highlighted heading + muted continuation | Orange highlighted title + muted descriptive continuation |
| 400 × 500px cards; 20px gutters; clipped next card | Matching desktop card dimensions and horizontal overflow |
| Per-rail arrows, touch scroll, disabled end controls | Implemented in each supplementary rail |
| Informational card overlays | Native modal dialogs with Escape, focus restoration and backdrop |
| Persistent specialist bubble | Marketplace guidance bubble, explicitly self-service |
| Quick links and disclosures | Working local destinations; demo-service disclosure |

Preserved intentional differences: Labyrinth identity, fire colors, persistent Archive/Map/Marketplace/News tabs, actual catalog content. No Apple brand/product assets or claimed live financial/retail services. Illustrations are not equivalent to Apple's photographed product artwork. This is not a verified pixel-identical copy.

Runtime checks: all six supplementary rails scroll; guidance opens/closes; mobile page has no horizontal overflow; no browser exceptions in these checks. TypeScript check passed.
