# Reference matching and implementation status

## Dark-mode and inspection follow-up

The exploration destinations now share an explicit dark palette for cards, forms, dialogs, selected states, metadata and reading panels. `scripts/check-dark-readability.mjs` checks collection headings, descriptions, card titles and selected-record titles against 4.5:1 contrast in all 13 sections at 1440px and 390px. This is a targeted contrast check, not certification of every rendered pixel or external embed.

Collection shortcuts now use available media thumbnails. Every collection offers a focused modal viewer and a five-field evidence-comparison table (type, focus, subject, provenance and format), alongside the existing media and source details. Marketplace saves now persist on this device and appear in the shared shopping-bag panel; they remain demonstration listings, not purchases. These changes supersede the session-only marketplace descriptions below.

This is an applicability map, not a claim that every feature on Apple or Ecosia has been reproduced. The original inspection catalogue records the observed patterns and access limits. Existing Labyrinth data, original media and tools remain in place.

| Reference destination | Labyrinth destination | Applied patterns and current behavior |
| --- | --- | --- |
| Apple Home | Archive and existing homepage | Large visual sections, concise introductions, contrasting panels, equal entry lineup, feature rails and focused overlays. Homepage's existing visual experiences preserved. |
| Store | Marketplace | Category strip, product panels, listing previews, session shortlist and contextual archive/map links. No checkout. |
| Mac | Archive, Infrastructure | Object lineup, focused feature introduction, gallery/grid browsing, comparison and evidence details. |
| iPad | Graphics, Art | Creative-workspace introduction, visual collection browsing, topic filters and selected-object inspection. |
| iPhone | Overview, Graphics | Subject-centered introduction, gallery-first hierarchy, inspection and source details. |
| Watch | Health, Movement, Survival | Health/activity chapter presentation alongside retained anatomy, seasonal calendar, assessment and risk tools. No new biological measurements invented. |
| Vision | Models, Map | Spatial introduction, direct model shortcuts, existing rotate/zoom/component controls and terrain workspace. |
| AirPods | Sounds | Dedicated dark listening introduction, recording shortcuts, audio collection and source context; no automatic playback. |
| TV & Home | Videos, Infrastructure | Cinematic chapter presentation and tool/instrument collections. |
| Entertainment | Videos, Sounds, Art, Society | Curated media shortcuts, horizontal galleries and cultural-context collections. |
| Accessories | Marketplace, Infrastructure | Category browsing and related-tool context. No invented compatibility or stock information. |
| Support | All exploration destinations | Searchable self-service help panel covering map interpretation, models, comparisons, media, saves and news. |
| Search | Archive, Map, News, Marketplace, crab collections | Shared cross-section search, scope chips and suggested queries, plus existing destination-specific filters. Search results link to the owning section; they do not automatically select an individual collection object. |
| Shopping bag | Shared saved-archive panel; Marketplace shortlist | Device-saved archive bookmarks with removal and return-to-browse links. Marketplace saves remain separate session-only items, not orders. |
| Ecosia Blog / News | News; Society | Category pills, lead story, editorial cards, date/source metadata, reading panels and context. |
| Ecosia Newsletter | News | Interest selection and downloadable sourced digest. Email collection, subscription and automatic sending are not connected. |
| Ecosia Trees / environmental stories | Environment, Survival, Map | Habitat/impact-oriented chapter treatment; retained source context and environmental data. No claimed tree-planting impacts or new worldwide dataset. |
| Ecosia transparency / reports | Archive sources; News evidence; record provenance | Dates, source links, qualifications and original reports remain visible. No financial-report system is invented. |
| Ecosia main search | Shared search applicability only | Main site returned a verification challenge; not represented as a completed visual or behavioral inspection. |

## All crab sections

Overview → identity; Infrastructure → equipment; Movement → motion; Graphics → visual workspace; Society → editorial/culture; Health → development; Combat → defense; Models → spatial inspection; Art → creative work; Environment → ecology; Survival → impact/evidence; Videos → screening room; Sounds → listening room.

Every section now has a subject-specific introduction, labeled topics, direct shortcuts to available records, Grid/Gallery modes, alphabetical/curated ordering and the existing filters, object inspection, comparisons and source-catalog export. Topic labels are informational; record shortcuts open the named object. A section with only two media examples displays two, rather than inventing a third.

## Verification

`scripts/check-reference-features.mjs` exercises all 13 sections at 1440px and 390px, gallery scrolling, sorting, global search/help/saved panels and digest download. `scripts/check-exploration-reference.mjs` covers the four exploration destinations. External media playback, external accounts, real checkout and email delivery are not claimed verified.

## Still separate from this implementation

Account login, order history, checkout, paid subscriptions, financing/trade-in, repair booking, live support and third-party device/service integrations require real services and applicable product requirements. They were not added as misleading mock controls. Fine-grained parity with every responsive reference variant, animation or hidden account flow has not been established.
