# Blue Crab: feature-by-feature reference map

This is a functional adaptation of observed interface patterns, not a claim that entire sites or proprietary assets were copied. Existing source evidence remains attributable. Newly generated artwork is kept separate until approved.

| Source and inspected feature | Blue Crab match | Status |
| --- | --- | --- |
| [Apple iPhone](https://www.apple.com/iphone/): large short headings, generous gutters, clear primary/secondary actions | Research question becomes the dominant heading; tool navigation is a single legible segmented strip | Implemented |
| Apple iPhone: horizontal product-family navigation, explicit selected item | Consistent four-workspace navigation within each of the 13 sections | Retained and visually refined |
| Apple iPhone: image-first cards with reserved media areas | Evidence gallery image sizing and restrained hover enlargement | Implemented; existing scientific images retained as evidence |
| [Apple Compare](https://www.apple.com/iphone/compare/): simultaneous labeled comparisons | Two-record research comparison retains source, date and subject on each side | Existing feature preserved |
| [Ecosia Blog](https://blog.ecosia.org/): prominent imagery, category above title, short descriptive text and source/date metadata | Record cards receive more deliberate type hierarchy, spacing and clear provenance | Implemented |
| [Igloo](https://www.igloo.inc/): user-controllable sound and spatial arrival motion | Optional synthetic navigation cue; motion pause and reduced-motion handling; restrained panel/plot arrival | Implemented adaptation, not the full Igloo scene engine |
| [Linear Search](https://linear.app/docs/search): workspace search, keyboard access, relevant result context | Search dialog across all 13 sections and catalog records, Ctrl/Cmd K, section labels and direct record navigation | Implemented |
| [Zotero Basics](https://www.zotero.org/support/quick_start_guide): item list and item metadata in adjacent panes | New Desk collection view keeps the source list beside the selected record, each with bounded scrolling; Grid and Gallery remain available | Implemented |
| [Linear Filters](https://linear.app/docs/filters): applied criteria visible beside results | Removable chips, reset and named local research views | Existing feature preserved |
| [Our World in Data](https://ourworldindata.org/grapher/life-expectancy): prominent date coverage, visible source limitations, visual/table alternatives | New selectable evidence-period diagram; date range and publication-versus-observation distinction | Implemented; diagram shows catalog periods, not population values |
| [NASA Worldview](https://worldview.earthdata.nasa.gov/): time selection beside the visual result | Year selection immediately filters evidence; A/B comparison remains in the same workspace | Adapted; earlier comparison study retained, current documentation URL returned 403 |
| [iNaturalist Explore](https://www.inaturalist.org/observations): count reflects active filters; alternate displays | Filtered counts, topic filtering and Timeline/Table views | Preserved |
| [WaveSurfer Regions](https://wavesurfer.xyz/examples/?regions.js): actual waveform, selected audio range and loop | Native audio review with first-channel waveform, A/B boundaries, loop, speed, seek and timestamped notes | Implemented; waveform loads only on request and depends on host sample-access permission |
| [WaveSurfer Timeline](https://wavesurfer.xyz/examples/?timeline.js): time-aligned controls | Accessible seek slider and timestamp labels separate recording time from historical date | Implemented |
| [WAI tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/): named panels, arrow navigation, explicit activation | Keyboard-accessible workspace tabs, native modal search focus handling | Preserved |
| [W3C reduced motion](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html): unnecessary animation can be disabled | System preference honored; explicit Motion control for archive animations | Implemented |

## Section-specific research destinations

The shared layout is intentional; the following functions and evidence remain distinct:

| Section | Research focus | Specialist destination |
| --- | --- | --- |
| Overview | Identification, distribution accounts, milestones | Evidence desk |
| Infrastructure | Shelter, sampling effort, gear changes | Sampling & gear |
| Movement | Seasons, routes, population and human transport | Movement atlas |
| Graphics | Photographic evidence and visual revisions | Image inspection |
| Society | Behavior, community practice, economic context | Behavior log |
| Health | Molt, condition, disease | Molt explorer |
| Combat | Injury, regeneration, mechanical observations | Claw mechanics |
| Models | Mesh revisions versus specimen changes | 3D inspection |
| Art | Period, material, interpretation | Art inspection |
| Environment | Habitat, salinity, temperature | Environmental plotting |
| Survival | Pressures, refuge, conservation responses | Pressure register |
| Videos | Recording date, sequences, conditions | Video analysis |
| Sounds | Recording date, events, methods | Audio analysis and new source-record listening controls |

## Artistic asset study

A new Blender optical-layer sculpture was rendered in a separate review version. It was rejected for integration during this pass because its abstract form does not clearly explain a crab research task. It is not counted as an implemented feature. No unapproved generated Blender assets were placed in the application.

## Boundaries

## Continuation verification

- All 13 section tabs were opened in the live preview; each exposes the shared evidence search.
- Cross-section search opened the selected Ca’ Mello recording directly without a page reload.
- Identification tracking opened a dated-record form with the correct topic prefilled; no test observation was saved.
- TypeScript completed without errors; 22 observation/date/mapping/saved-view/import checks passed.
- Added a newly generated editorial cover with an explicit AI-artwork label. Asset and exact prompt: [cover documentation](crab-cover-art.md). This is artwork, not research evidence.
- The narrower live preview was visually inspected. Desktop Desk arrangement still needs a wide-viewport visual pass.
- The Ca’ Mello host blocks waveform fetching; the native audio player remains available and the analysis limitation is explicit.

## Remaining boundaries

- No claim of controlled usability testing, universal “best UI” ranking, pixel-identical reproduction or accessibility certification.
- No new biological dates, recordings, population values or routes are fabricated for visual effect.
- Sound is off by default. The optional navigation tone is synthesized UI feedback, never a crab recording.
- Listening notes are temporary and explicitly exportable. Published evidence and personal observation histories stay separate.
