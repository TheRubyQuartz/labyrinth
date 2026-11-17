# Subject-specific correction — 5 November 2026

The user's requirement is a visual feature for each major reference topic **applied to the archive subject**. Generic editors, calculators and sandbox tools do not satisfy this requirement.

## Removed from the Archive interface

The entire Practical tools menu has been disconnected in every section, including repeat patterns, typography, standalone sound synthesis/mixing, generic primitive modeling and general calculators. Source files remain recoverable; none is counted as delivered Archive topic coverage. Existing subject-specific tools, catalogs, notes and Graphics/Art grid views remain.

## Implemented in this correction

### Art

- Visual Language / Storytelling / Illustration: selected credited crab artwork occupies the study; toggle a composition-thirds guide over that specific work.
- Coloring Theory / Painting: switch the actual selected work to grayscale for value inspection. Original media is not modified.
- Materials / Form: inspect the selected crab depiction at increased scale, with original credits and species attribution beside it.
- Comparison: choose a second credited crab depiction, retaining both dates and attribution in the existing swipe/fade/side-by-side viewer.
- Interpretation: per-artwork private notes. Cultural depictions are not asserted to be blue-crab specimens.

This is a focused subset, not completion of the complete Art list. Default selection targets a named blue-crab illustration.

### Infrastructure

- Signals / Satellite / Instrumentation: selectable GPS endpoints on a crab-survey schematic; distinguishes the vessel tow from an animal track.
- Sensors / Probes: highlights water-column measurements in the crab sampling context; no unverified hardware model is named.
- Inspection / Data Collection: highlights spine-to-spine crab measurement; no fabricated dimensions.
- Three choices, one highlighted system at a time. Source: Maryland DNR Winter Dredge Survey methodology, checked during this pass. https://dnr.maryland.gov/fisheries/pages/blue-crab/dredge.aspx
- Collection / Storage / Inspection: Blue-crab-specific observation workflow with carapace width, body mass, sex, maturity, temperature, salinity, depth, date and site. Three fields per step; browser-local saving, two-observation width chart and measurement table, CSV export. Empty measurements stay missing. No sample observations, population estimates or sensor readings are invented.

## Remaining

## Checks in this pass

- TypeScript passed for the subject-specific components.
- Production build passed after removing generic tools and adding Art/Infrastructure studies; rebuilt after the observation workflow addition.
- Live Art test: selecting the named blue-crab illustration and enabling its composition overlay worked; credited image loaded.
- Live Infrastructure test: water-measurement selection updated the schematic and explanation; guided navigation presents one feature at a time.
- Live observation test: all three steps display the intended fields; attempted empty save correctly requires date and site. No test observations were saved into the user's notebook.
- Observation CSV export and two-record comparison have not yet been exercised end-to-end with real user measurements.

## Remaining scope

### Recovery and continuation — 16 November 2026

Recovered the interrupted November telemetry work and integrated source-integrity inspection into Infrastructure's existing one-feature-at-a-time navigation. Original content and Overview remain intact. No generic tool menu restored.

- **Sensors, probes, signals, acoustics, networks:** the published SERC/OTN blue-crab study provides an animal selector for 35 tagged crabs, 3,346 release/detection records, geographic locations, a detection timeline, scrubbable record sequence and source timestamps/uncertainty. Receiver records show at most three stations at once, with first/last dates and direct navigation to an actual detection. These cover specific research uses, not all terms in the broad reference lines.
- **Data extraction, storage, databases:** exact publisher event and occurrence files are joined by event ID; per-animal CSV export preserves source fields. Retained original files and metadata support reproducibility.
- **Cryptography:** a visual source-file pipeline now checks SHA-256 integrity of the exact ZIP, event table and occurrence table. This is explicitly an integrity check, not encryption, publisher authentication or scientific validation.
- **Validation:** 17 telemetry data checks, TypeScript and production build pass. Live browser checks confirm all three hashes match, the receiver cards show source summaries, selecting RHODEM opens record 42/44, and the timeline slider reaches record 44 with its published hourly-aggregation text and 1,000 m uncertainty. Screenshot: telemetry-recovery-preview.png.
- **Preserved limitations:** no invented paths between detections, no inferred depth, missing uncertainty is not zero, record counts are not population estimates. The unused measurement-extension alignment issue is documented in serc-blue-crab-source/README.md.

This completes recovery and verification of the saved telemetry feature, not the entire 184-line Archive program. Broad Infrastructure instruction lines remain partial; the other section/topic requirements remain open.

The 184-line reference checklist is still open. Every multi-topic line must be audited at term level; generic prior tools must not be counted as completed topic features. Most reference topics still need subject-specific implementation. No completion percentage is asserted.
