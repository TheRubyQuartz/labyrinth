# Crab archive: change-oriented workspace

All thirteen sections use four task destinations. Existing source records, viewers, notes, comparisons, maps, and interactive tools have been retained.

1. **History & changes** — catalog chronology, year/topic filters, undated-source list, personal dated observations, before/after comparison, comparable numeric trends, JSON export and validated restore.
2. **Section collection** — existing searchable records, Grid/Gallery, focused viewer, citations, provenance, notebook and source comparison. “Record a dated observation” carries the selected source into History.
3. **Section tools** — existing interactive features, placed before reference examples. Switching workspace keeps mounted tools and personal history state; switching the subject section unloads its tools.
4. **Context & sources** — complete descriptions, historical reading and references. Further-reading links are drawn from the current section rather than repeating mythology links everywhere.

| Section | Tracks | Main tools retained / remapped |
|---|---|---|
| Overview | Identification, distribution accounts, discoveries | Evidence desk; species accounts and overview context |
| Infrastructure | Shelter conditions, gear versions, sampling effort | Sampling calculator and survey footprint |
| Movement | Seasonal routes, distribution, population and trade | Full subject map and activity calendar |
| Graphics | Dated visuals, visible features, presentation revisions | Image pins, magnification, anatomy inspection and observation graphic |
| Society | Behavior, community practices, economic context | Behavior log, measurements/history; historical fishery context |
| Health | Molt stages, condition, disease | Molt playback and existing population assessments |
| Combat | Encounters, injury, regeneration, mechanics | Claw lever model and defense evidence |
| Models | Specimen form and explicitly separate mesh revisions | Detailed sculpt, disassembly, isolation and specimen viewer |
| Art | Creation periods, materials, interpretation | Image annotation and artwork collection |
| Environment | Habitat, salinity, temperature, food web | User-data plots and habitat diagram |
| Survival | Pressure, refuge, conservation response | Pressure register and ecological-risk material |
| Videos | Recording dates and within-clip events | Local playback, looping, speed and timed notes; embedded collection |
| Sounds | Recording dates, events, acoustic methods | Audio playback, looping, speed and timed notes; recording collection |

## Date and evidence boundaries

- Catalog chronology reads only explicit years/ranges in existing catalog credits. It does not use dates from URLs or invent precise days.
- A catalog year is labeled as such, not silently treated as a biological observation date.
- Personal observations remain distinct from catalog research and are stored on this device.
- Numeric trends require matching metric, unit, location, method and record type. Lines connect observed points for reading, not prediction.
- Import validates schema, calendar dates, finite values, section identity and size. It merges rather than replacing current records.
- External embeds and specimen source availability have not been repaired by this layout change.

## Checks

- TypeScript check.
- Automated validation/date/comparison/import assertions in `scripts/crab-observation-data.test.ts`.
- Browser navigation through all thirteen History workspaces.
- Browser checks of the main tool destinations.
- Temporary interface-only observations confirmed a 12-to-14 comparison produces a difference of 2; the test records were removed afterward.
