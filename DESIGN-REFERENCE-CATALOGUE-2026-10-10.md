# Apple / Ecosia design reference catalogue

Inspection date: 2026-10-10. Desktop reference viewport: 1440 × 1000.

## Scope and evidence

This is a saved catalogue of identified patterns and their Archive adaptations, **not a claim that every hidden interaction, page variant, animation timing or account flow on all three sites was inspected**. Apple Home, Store, Mac, iPad, iPhone, Watch, Vision, AirPods, TV & Home, Entertainment, Accessories, Support and Search loaded. Ecosia Blog Home, Trees, News, Finances, Newsletter and a linked article loaded. Ecosia's search homepage and search results returned a verification challenge (403); that boundary was not bypassed.

Evidence: `.practice-qa/references/` contains viewport captures, lower-page Apple captures, page inventories and interaction logs. These are local inspection evidence, not website assets. The scripts capture DOM inventories; an extracted control is not proof that its behavior worked. Screenshots of some blog media include lazy-loading placeholders.

## Interaction verification qualifications

- Apple educational feature panel: opened; rounded overlay, blur and close control visually confirmed.
- Apple global search: opened. Search-result semantics were not comprehensively tested.
- Apple menu hover: action ran, but screenshot did not show an expanded menu. Treat the expanded hierarchy as DOM-observed, **not behavior-verified**.
- Apple lineup category and next-control attempts: timed out; not verified.
- Ecosia Blog search: overlay opened; input attempt ran, but captured overlay remained at its initial presentation. Do not claim verified query result grouping from this pass.
- Ecosia More Posts: clicked; count selector returned zero both before and after, so successful pagination is **not established**.
- Ecosia newsletter: viewed, not submitted. No account actions, purchases or messages performed.
- Ecosia homepage/results: blocked, not inspected beyond challenge.

## Pattern-by-pattern catalogue

### Apple Home

Source: https://www.apple.com/

Evidence: Screenshot + page inventory.

| ID | Reference element / principle | Archive implementation or limit |
| --- | --- | --- |
| R001 | Slim full-width global bar | 44px global header and compact destination tabs |
| R002 | Small monochrome navigation labels | Low-emphasis navigation; Archive remains the local title |
| R003 | Centered hero heading | Centered two-line world archive headline |
| R004 | Short supporting line | Four subject families beneath the hero |
| R005 | Filled primary pill | Explore the archive action |
| R006 | Outlined secondary pill | Search anything action |
| R007 | Large object-led presentation | Six equal original subject illustrations |
| R008 | Full-width stacked stages | Hero → lineup → perspectives → globe → journal |
| R009 | Strong dark/light alternation | Black hero, pale lineup, dark perspectives, pale journal |
| R010 | Narrow gutters between visual panels | 12px gap around the world stage |
| R011 | Broad empty space around the headline | Hero spacing and uncluttered initial actions |
| R012 | Objects separate from body copy | Art above each entry title |
| R013 | Lower-page card/carousel rhythm | Perspective gallery with next/previous buttons |
| R014 | Quiet legal/source area | Source status below the Archive, not in its hero |

### Apple Mac

Source: https://www.apple.com/mac/

Evidence: Screenshot + DOM inventory; feature overlay verified.

| ID | Reference element / principle | Archive implementation or limit |
| --- | --- | --- |
| R015 | Large left-aligned category title | Explore the archive heading |
| R016 | Horizontal family navigation | Equal category strip with counts |
| R017 | Illustrated lineup destinations | All six subject illustrations appear at equal scale |
| R018 | Segmented category selection | Grid/Gallery/Connections segmented control |
| R019 | Rounded pale lineup stage | Light background around records |
| R020 | Large rounded individual cards | Identical entry card dimensions |
| R021 | Consistent information order | Art, category, title, identity, actions, location |
| R022 | Horizontal card rail | Gallery layout with scroll snap |
| R023 | Circular gallery arrows | Archive and perspective rail controls |
| R024 | Link to comparison | Compare entries action beside lineup title |
| R025 | Expandable feature card | Perspective cards open substantive guide panels |
| R026 | Blurred overlay background | Native modal backdrop with blur |
| R027 | Large rounded detail panel | Quick look and guide dialogs |
| R028 | Corner close control | Sticky circular close button |
| R029 | Prominent modal title | Large typography with narrow reading area |
| R030 | Supporting action inside panel | Open full entry or start exploring |
| R031 | Escape closes expanded content | Implemented and regression tested |
| R032 | Comparison context | Three-entry table preserves units, dates, scope and source |

### Apple Store

Source: https://www.apple.com/store

Evidence: Screenshot + DOM inventory.

| ID | Reference element / principle | Archive implementation or limit |
| --- | --- | --- |
| R033 | Separate category strip and card area | Archive categories separated from results |
| R034 | Consistent thumbnails in strip | Uniform small lineup art |
| R035 | Horizontal browsing rather than stacked utility boxes | Optional Gallery mode |
| R036 | Large rounded card treatment | 22px entry and 25px feature corners |
| R037 | Different content families in repeated rails | Entry rail and exploration-guide rail |
| R038 | Muted secondary text | Scientific identity and location metadata |
| R039 | Persistent shopping-style save affordance | Bookmark button on each entry (no purchase) |

### Apple iPad

Source: https://www.apple.com/ipad/

Evidence: Page inventory + captured scroll; behavior not separately verified.

| ID | Reference element / principle | Archive implementation or limit |
| --- | --- | --- |
| R040 | Product-family categories | Archive subject categories |
| R041 | Model lineup headings | Consistent entry names |
| R042 | Shared site navigation hierarchy | One browse menu across subject families |
| R043 | Related product pathways | Related entries inside each quick look |

### Apple iPhone

Source: https://www.apple.com/iphone/

Evidence: Page inventory + captured scroll; behavior not separately verified.

| ID | Reference element / principle | Archive implementation or limit |
| --- | --- | --- |
| R044 | Family-level product browsing | No single record promoted above the others |
| R045 | Comparison destination | Working comparison dialog |
| R046 | Feature story headings | Short perspective titles with detailed panel bodies |
| R047 | Repeated learn-more action pattern | Quick look consistently opens information |

### Apple Watch

Source: https://www.apple.com/watch/

Evidence: Page inventory + captured scroll; behavior not separately verified.

| ID | Reference element / principle | Archive implementation or limit |
| --- | --- | --- |
| R048 | Category-specific lineup | Filterable subject roster |
| R049 | Consistent navigation across variants | Filters never change card-control semantics |
| R050 | Specification context | Measurement provenance in modal and comparison |

### Apple Vision

Source: https://www.apple.com/apple-vision-pro/

Evidence: Screenshot + page inventory.

| ID | Reference element / principle | Archive implementation or limit |
| --- | --- | --- |
| R051 | Large immersive visual stage | Interactive world stage |
| R052 | Few actions beside dominant visual | Connection action and pause/resume only |
| R053 | Edge-aligned caption/action composition | World copy beside globe |
| R054 | Scale change between stages | Compact entry cards followed by expansive globe |

### Apple AirPods

Source: https://www.apple.com/airpods/

Evidence: Page inventory + captured scroll; behavior not separately verified.

| ID | Reference element / principle | Archive implementation or limit |
| --- | --- | --- |
| R055 | Compare family models | Side-by-side record comparison |
| R056 | Feature discovery below lineup | Perspectives follows records |
| R057 | Clear footer group hierarchy | Explore / Your archive / Understand footer columns |

### Apple TV & Home

Source: https://www.apple.com/tv-home/

Evidence: Page inventory + captured scroll; behavior not separately verified.

| ID | Reference element / principle | Archive implementation or limit |
| --- | --- | --- |
| R058 | Distinct panels within one coherent system | Dark tools, light editorial and lime evidence |
| R059 | Connected ecosystem messaging | Recorded relationships, explicitly not co-location |
| R060 | Related destinations | Map, Marketplace and News remain adjacent destinations |

### Apple Entertainment

Source: https://www.apple.com/services/

Evidence: Page inventory + captured scroll; behavior not separately verified.

| ID | Reference element / principle | Archive implementation or limit |
| --- | --- | --- |
| R061 | Multiple content families | Entry, guide, editorial and evidence areas |
| R062 | Large media-style feature cards | Tall perspective cards |
| R063 | Consistent cross-section calls to action | Rounded primary buttons and quiet text links |

### Apple Accessories

Source: https://www.apple.com/shop/accessories/all

Evidence: Page inventory + captured scroll; behavior not separately verified.

| ID | Reference element / principle | Archive implementation or limit |
| --- | --- | --- |
| R064 | Category browsing | Species, Habitats, Objects & technology |
| R065 | Saved-selection utility | Local saved entries filter |
| R066 | Related-item recommendations | Explicit linked records, not algorithmic recommendations |

### Apple Support

Source: https://support.apple.com/

Evidence: Page inventory + captured scroll; behavior not separately verified.

| ID | Reference element / principle | Archive implementation or limit |
| --- | --- | --- |
| R067 | Task-first search | Search shortcut and input |
| R068 | Recognizable topic entry points | Category strip and topic buttons |
| R069 | Common-question support area | Five functional help disclosures |
| R070 | Direct next steps | Each guide includes a relevant action |

### Apple Search

Source: https://www.apple.com/us/search/mac?src=globalnav

Evidence: Page inventory; global search overlay separately opened.

| ID | Reference element / principle | Archive implementation or limit |
| --- | --- | --- |
| R071 | Dedicated search surface | Focused native search dialog |
| R072 | Search separate from normal browse | Header shortcut plus Ctrl/Cmd+K |
| R073 | Quick topic destinations | Topic chips in search panel |
| R074 | Clear search affordance | Explicit clear button |
| R075 | Grouped navigation hierarchy | Topics separated from entry results |
| R076 | Return to previous context | Close/Escape restores the trigger focus |

### Ecosia Blog home

Source: https://blog.ecosia.org/

Evidence: Screenshot + page inventory; search opened.

| ID | Reference element / principle | Archive implementation or limit |
| --- | --- | --- |
| R077 | Simple horizontal editorial navigation | Compact Archive navigation |
| R078 | Lime active/utility accent | Lime actions and saved-entry strip |
| R079 | Rounded editorial imagery | 12px journal illustration panels |
| R080 | Topic label above article heading | Journal category labels |
| R081 | Strong headline followed by excerpt | Journal title and concise summary |
| R082 | Small byline metadata | Labyrinth exploration-guide label; no invented date |
| R083 | Three-column editorial grid | Three equal guide articles |
| R084 | Whitespace instead of boxed text everywhere | Journal body has no enclosing cards |
| R085 | Search in a focused overlay | Search dialog with topic and entry sections |
| R086 | Dismissible bottom utility strip | Saved-entry prompt with close button |
| R087 | Outlined utility action | Saved-entry button in bottom strip |
| R088 | Footer separated from content | Muted multi-column footer |

### Ecosia Trees

Source: https://blog.ecosia.org/tag/where-does-ecosia-plant-trees/

Evidence: Screenshot + page inventory.

| ID | Reference element / principle | Archive implementation or limit |
| --- | --- | --- |
| R089 | Subject introduction above roster | World introduction then full catalog |
| R090 | Consistent editorial tiles | Same journal image and copy dimensions |
| R091 | Topic-driven browsing | Category filters |
| R092 | Readable multi-line summaries | Visible journal descriptions |

### Ecosia News

Source: https://blog.ecosia.org/tag/news/

Evidence: Page inventory + captured viewport.

| ID | Reference element / principle | Archive implementation or limit |
| --- | --- | --- |
| R093 | Separate news destination | Conservation News remains its own tab |
| R094 | Category context before articles | Journal category labels |
| R095 | Chronological metadata | Preserved in existing Conservation News component |

### Ecosia Finances

Source: https://blog.ecosia.org/ecosia-financial-reports-tree-planting-receipts/

Evidence: Correct destination loaded; initial guessed URL was 404.

| ID | Reference element / principle | Archive implementation or limit |
| --- | --- | --- |
| R096 | Evidence/report destination | Source catalogue dialog |
| R097 | Transparency presented as a feature | Visible evidence stage |
| R098 | Verifiable figures with context | Counts computed from current archive records, not impact claims |

### Ecosia Newsletter

Source: https://blog.ecosia.org/newsletter/

Evidence: Page inventory + captured viewport; no submission.

| ID | Reference element / principle | Archive implementation or limit |
| --- | --- | --- |
| R099 | Dedicated invitation block | Saved-entry invitation instead of an unimplemented newsletter |
| R100 | Single clear action | View saved entries |
| R101 | Privacy/terms context near signup | Local storage explanation instead of collecting personal data |

### Ecosia article

Source: https://blog.ecosia.org/

Evidence: Article reached from first homepage headline; screenshot captured.

| ID | Reference element / principle | Archive implementation or limit |
| --- | --- | --- |
| R102 | Dominant visual with article title | Quick-look illustration followed by large heading |
| R103 | Readable long-form width | Modal reading column |
| R104 | Related content | Connected-entry actions |
| R105 | Visible source context | Primary source, record dates and qualifications |

### Ecosia search website

Source: https://www.ecosia.org/

Evidence: BLOCKED: verification challenge / HTTP 403.

| ID | Reference element / principle | Archive implementation or limit |
| --- | --- | --- |
| R106 | Homepage design | Not claimed freshly verified; no bypass |
| R107 | Search results / tools | Not claimed freshly verified; query request also blocked |
| R108 | Sound and account behaviors | Not tested or copied |
| R109 | Prior Graphics notes | Historical reference only; not substituted for current live verification |

## Implementation map

- `app/archive-reference.tsx`: navigation, browse menu, centered hero, equal entry roster, search, filters, Gallery/Grid/Connections, saved entries, three-entry comparison, quick-look dialogs, guide gallery, world stage, editorial area, evidence, help and footer.
- `app/archive-reference.css`: panel proportions, visual rhythm, light/dark stages, typography, whitespace, pills, cards, overlays and responsive adaptations.
- `app/archive-record-art.tsx`: original schematic subject illustrations; not Apple/Ecosia assets or scientific measurements.
- `scripts/check-reference-archive.mjs`: actual implemented interaction tests at desktop and mobile widths. Reference research remained desktop-first.

## Deliberate adaptations

No Apple/Ecosia trademarks, text blocks, photos, proprietary code or live services are republished. UI patterns are recreated in Labyrinth's identity. No entry is a hero subject; all six receive equal hero slots, card dimensions, save controls, preview controls and comparison access. The world scope remains; location is individual-record metadata. No fabricated international entries, verified credentials, impact totals, subscription backend or working toolchain claims were introduced. Maps retain their actual data coverage.

Apple's two-column promotion layout and Ecosia's unequal featured-article layout were **not** used to privilege one subject, because equal entry treatment is an explicit user requirement. The six-entry grid can be switched to a horizontal gallery. Large-stage attention is assigned to general archive concepts, not to the crab.

Counts in the evidence section reflect the current records, unique record types, unique source URLs and locally saved entries. Illustrations identify subjects and are labeled schematic. Existing full-entry content is preserved.

Catalogue contains 109 individually marked rows, including explicitly blocked and unverified items. It is not an exhaustive inventory of those companies' entire websites.

