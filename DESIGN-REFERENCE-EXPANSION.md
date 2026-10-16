# Reference-driven exploration redesign

## References and scope

This extends the Archive reference catalogue. Apple Maps (https://www.apple.com/maps/), Apple Store (https://www.apple.com/store/), and Ecosia Blog (https://blog.ecosia.org/) were revisited on 2026-10-10. Store and Blog visual references from the previous inspection remain in `.practice-qa/references/`. Maps' published feature descriptions were reviewed; this is not a claim to have tested Apple's live map application. Ecosia's main search site remained outside the verified reference set after its earlier verification challenge.

| Destination | Recognizable reference patterns | Functional adaptation |
| --- | --- | --- |
| Map | Apple Maps' uncluttered hierarchy, dominant map stage, search and place cards | Existing 3D terrain retained; searchable record list, type chips, selected-place evidence and links to the Archive. Detailed coverage is still Chesapeake Bay, not a global terrain dataset. |
| Marketplace | Apple Store's large introductory typography, object/category strip, rounded product panels and benefit cards | Category and text filtering, session shortlist, listing detail dialog, map and archive links. Original schematic illustrations. All listings remain clearly marked demonstrations; no purchase or signup is implied. |
| News | Ecosia Blog topic pills, lead-story composition, image-first editorial grid, category/date metadata and green evidence panel | Search, topic filtering, session-saved stories and focused reading dialog; original sources, reporting periods and related archive records remain attached. Existing selected reports, not a newly researched worldwide feed. |
| Blue crab | Apple product-page hero, compact sticky local navigation, rounded visual galleries; Ecosia's readable editorial spacing | New illustrated introduction and shortcuts to models, graphics and sounds. All 13 section tabs, collection records, original tools, comparisons, descriptions and provenance retained. Collection descriptions remain visible and background reading is expanded by default. |

## Implementation

- `app/exploration-reference.tsx`: intros, crab hero, interactive Marketplace and News.
- `app/exploration-reference.css`: destination-specific presentation and responsive styles.
- `app/exploration.tsx`: routing integration, searchable/filterable map sidebar and source-status placement.
- `scripts/check-exploration-reference.mjs`: desktop/mobile checks for filters, listing save/detail, news search/reading, map selection, crab tabs and page overflow.

The adaptation uses Labyrinth content and original illustrations. It does not copy brand assets, claim Apple/Ecosia affiliation, add unavailable integrations, or remove underlying collection content.
