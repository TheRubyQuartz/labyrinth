# Overview: in-place redesign — 28 October 2026

This pass supersedes the disconnected overview-exhibit experiment. It changes presentation in the original Overview rather than replacing the article.

## Inspected references and implementation

| Reference inspected live | Specific treatment | Implementation |
| --- | --- | --- |
| https://www.apple.com/iphone/ | Large chapter headings; named product/feature selectors; deliberate hierarchy between a featured subject and its explanation | Overview chapter hierarchy; four explicitly named organism selectors; animated changes of feature explanation |
| https://art.seattleartmuseum.org/objects/23561/ | Object-first presentation with date, culture, medium, accession and image credit adjacent to the object | Moche vessel viewer in Significance across Beliefs; actual museum-served photograph, not a synthetic reconstruction |
| https://www.nationalgallery.org.uk/paintings/vincent-van-gogh-two-crabs | Dominant inspectable artwork; keyboard pan/zoom guidance; about-the-work and facts below the viewer | Moche object inspection: keyboard +/−, arrows, Home, pointer inspection, reset and visible zoom level. The existing blue-crab illustration also supports inspection |

These are adaptations of observed interaction/layout treatments, not claims of pixel-identical reproductions. The National Gallery painting was inspected but is not republished in this pass.

## Content preservation

- Summary and the original category/group rendering remain.
- All four belief narratives, four roles per narrative, original examples and source links remain. Examples now open by default.
- All 460 supplied belief-index entries remain, including their existing filters.
- Risks, world map, evolution, biology, culture, network, workshops, connected records, questions and references remain in the original article.
- Evolution pan/zoom/playback, library, comparisons and exports remain; the library now uses a wrapping grid rather than a narrow horizontal strip.
- Biology state, diagrams and selectors remain.
- No source-data JSON was changed by this pass.
- No autoplay audio was introduced. Reduced-motion preferences disable added motion.
- Six original risk accounts now have distinct qualitative diagrams and immediately visible source links. The diagrams do not encode measured severity.
- Museum image sizing was verified against the rendered frame; switching traditions restores the beginning of the selected narrative when necessary.
- Other archive chapters are not claimed redesigned by this Overview pass.

## Media

Moche vessel: Seattle Art Museum object 77.18, ca. AD 500–750; reduction ware, 22.9 × 15.2 cm; Margaret E. Fuller Purchase Fund; photograph by Elizabeth Mann. Embedded from the museum, with a visible failure state if unavailable. No local media copy or claim of ownership.

## Not part of this pass

## Plan audit and outstanding work — 28 October

Implemented and active: original article preserved; portrait inspection; named feature selectors; readable chapter hierarchy; beliefs role rows and open examples; Moche museum viewer; six risk diagrams; wrapped evolution library; biology header/layout refinement; reference links beside objects; responsive alignment rules.

Implemented in the subsequent culture pass: source-image galleries for the NGA bronze crab box and Gutenberg illustrated folktale; per-work date labels; chronological browsing with explicit interval/edition caveats; side-by-side work comparison; private dated observations and comparison of those observations. All original culture descriptions, save controls, source links and read-all mode remain.

Verified media sources: https://www.nga.gov/artworks/43806-box-form-crab (two public-domain object photographs); https://www.gutenberg.org/cache/epub/25021/pg25021-images.html (two Eitaku illustrated pages, edition attribution preserved). Dates also checked against the National Gallery, Met object 715519 and Canon's Hokusai record. Canon facsimile images were not copied.

Still not completed: comprehensive visual rebuilding of every Overview subsection; actual imagery for every cultural work; integrated time-comparison experiences throughout all subjects; new 3D/film/audio/VFX production; redesign of all 13 archive chapters. Existing tools in these areas are not evidence that this redesign work is finished.

Rejected/disconnected: alternate exhibit, replacement mini-navigation and full-profile drawer. These must not be restored as a way to claim completion.

No new Blender model, generated film, simulated historical data or scientific observations. Those would require subject-specific production and validation; none is represented as completed here.

## Cross-section continuation — 28 October

Implemented in the shared collection workspace, without replacing the original Overview:

| Section | Starting experience | Retained specialist features |
| --- | --- | --- |
| Overview | Original complete article | Beliefs, risks, evolution, biology, culture, all original paragraphs |
| Infrastructure | Sampling and gear | Survey diagram and study tools |
| Movement | Movement atlas | Existing globe, filters, routes and tracking tools |
| Graphics | Image-first gallery | Magnification, focused viewer and image comparison |
| Society | Behavior and community records | Behavior log, notes and full descriptions |
| Health | Molt explorer | Existing health tools and source collection |
| Combat | Claw mechanics | Existing mechanical study tools and source collection |
| Models | 3D inspection | Existing component sculpt, with study forms below the model |
| Art | Artwork-first gallery | Full-size selected work above thumbnail browsing, image comparison |
| Environment | Environmental plotting | Habitat diagram and existing plotting tools |
| Survival | Pressures and responses | Original conservation records and pressure register |
| Videos | Screening room | Selected recording above the recording browser |
| Sounds | Listening room | Selected audio above the recording browser; existing audio analysis |

All collection views now include catalog-date filtering, chronological sorting, inline date labels, dated private observations, and a source chronology with direct record selection and comparison. Unknown dates remain unknown. The two ancient Met objects use the creation periods already stated in their descriptions; accession numbers are not interpreted as creation years. The chronology is not a measured ecological trend.

The initial record-creation buttons were moved into Changes over time, rather than removed. Duplicate collection titles were removed. Existing short-form private notebooks remain to avoid losing access to saved notes. The full-description view, media controls, comparisons, exports and existing specialist tools remain.

Checked: TypeScript compilation; preservation assertions for the five Overview chapters, eight major features and 460 belief entries; all 13 entry policies and existing notebook/comparison bindings. Live Art inspection verified chronological selection, displayed ancient-object dating, and image-frame containment (343px frame / 343px image, no unzoomed vertical overflow).

This continuation is not completion of the entire outstanding visual-production scope. New section-specific 3D/film/audio/VFX, missing cultural imagery and comprehensive redesign of every subsection remain outstanding. No new generated media or scientific measurements are claimed.

### Further production and usability work

- Listening annotations now persist privately per recording URL, retaining export and timestamp seeking. Storage failures explicitly advise export.
- Search navigation now respects section-specific starting views rather than opening the history form by default.
- Collection images support keyboard +/− zoom and Home reset, with explicit Fit image and Inspect detail controls.
- A new Blender habitat cutaway was produced in `Labyrinth-Engine-Workspaces/blender/Estuary_Habitat_Cutaway_v002`, with animated vegetation and sediment geometry. It is an illustrative review asset, not surveyed habitat, and is **not integrated** pending the explicit suitability approval required by the Blender tool.
- Compilation passed after these changes. The live Sounds view exposes one audio player and the persistent-note message.
- Follow-up: dated notebooks now export JSON; observation comparisons use neutral A/B labels rather than incorrectly assuming the selected dates are ordered. Image comparisons now offer side-by-side viewing in addition to swipe and opacity. Media chronology follows the viewing workspace rather than delaying the selected recording or artwork. Repeated heading and utility-bar spacing is reduced without removing subject descriptions.

## Infrastructure continuation — 30 October 2026

The survey footprint now has user-started playback, a reversible progress scrubber, reset, adjustable distance/width, and a kept-baseline comparison. The gear and the swept-footprint endpoint are aligned. Playback pauses on document hiding or leaving the Infrastructure tools workspace, and frame delays are capped to avoid jumps after suspension. The scene remains explicitly illustrative; normalization is not field time. The original density calculator remains available.

Dated sampling-method observations sit beside the sequence and retain local storage/export. Live checks confirmed the 100 m × 2 m completed footprint equals 200 m², the comparison panel opens, and reset returns swept-so-far to zero without discarding the dimension settings.

Shared change charts now allow keyboard-accessible point selection and a date-index scrubber. The selected value, date and source are displayed together. Connecting lines are optional and off by default. Axis labels now correspond to the padded plotted extent rather than incorrectly labeling it with the data minimum/maximum. The 22 observation-data tests and TypeScript compilation pass.

This is a verified Infrastructure interaction pass, not a claim that every remaining section or media-production item is complete.

Health continuation: the source-first molt viewer now displays the existing published molting plates before the schematic stage animation, with magnification, direct attribution, comparison and a per-plate dated notebook. Live checks confirmed both first-stage and later-stage images load and side-by-side mode works. The original schematic sequence and collection remain; historical plate order is explicitly not treated as calibrated elapsed time.
