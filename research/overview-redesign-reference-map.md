# Overview redesign — 27 October 2026

> ARCHIVED IMPLEMENTATION RECORD: the alternate exhibit described below is disconnected. Its replacement of the original article was rejected. This document is not a current completion checklist. See overview-inplace-reference-map.md for the active implementation.

Scope: Overview only. The other 12 specialist sections retain their implementations. No claim of pixel-identical reproduction or objective best-site ranking.

## Inspected references → implemented treatment

| Reference | Observed feature | Overview implementation |
| --- | --- | --- |
| [Apple iPhone](https://www.apple.com/iphone/) — live page and screenshots | Large subject headline, generous separation, selected-item gallery controls, explicit playback | Split editorial heading; dominant life-cycle stage; four directly selectable stages; explicit play/pause |
| [Ecosia Blog](https://blog.ecosia.org/) — live page and screenshot | Strong lead/secondary hierarchy, compact topic navigation, credits beside stories | Compact Overview anchors; large scene and supporting copy; contextual source line; dated story strip |
| [NASA World of Change](https://science.nasa.gov/earth/earth-observatory/world-of-change/) — live page and source | Changes organized as subject stories, not an administrative dashboard | Dated specimen/study/distribution stories with direct inspection; period comparisons accessible from the story |
| [South Carolina DNR](https://www.dnr.sc.gov/marine/pub/seascience/bluecrab.html) — source content reviewed | Species anatomy, development, estuary/coastal connection | Original qualitative life-stage illustration and short biological descriptions with adjacent citation |

## New visual production

Original vector scene built for Overview: separate egg cluster, larval silhouette, juvenile and adult illustrations; shaded surfaces; suspended particles; animated light/current lines; staged entrance transitions. This is a stylized educational illustration, **not** a measured model, specimen scan, or simulation. Stage sizes and timing are not quantitative. Navigation tones are opt-in synthetic UI feedback, not animal recordings. Reduced-motion preferences are honored; scene movement and stage playback have separate controls.

## Information architecture

- Removed the generic Overview dashboard and separate Browse evidence destination from the default experience.
- Dates, source credits, original-source links and private notes stay with the record being inspected.
- All 12 existing Overview catalog records remain searchable in the contextual record viewer.
- Existing comparison, saved views, export/import, notes, biology, maps and full text remain accessible through the contextual tools/full-profile views.
- Existing specialist sections and their tools are unchanged.

## Verification

- TypeScript passes.
- Live browser: adult → larval scene updates; all-record drawer opens; 1974 specimen retains provenance; comparison workspace opens; close returns to Overview.
- Narrow preview inspected; wide reference sites inspected. A wide application screenshot is not claimed.
