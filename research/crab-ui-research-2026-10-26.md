# Blue-crab research workspace: reference audit

Research phase started no later than 2026-10-26 20:01:46 UTC. This pass separates research from implementation. The goal is immediate understanding of each section's purpose and a short, repeatable route from evidence to a cited finding. This is an expert interface review, not a claim of user-tested superiority.

## Reference patterns and decisions

| Reference | Observed/documented pattern | Applicable decision |
| --- | --- | --- |
| [Our World in Data](https://ourworldindata.org/grapher/life-expectancy) | Visual result dominates; timeline sits beside the result; explicit source, units and date coverage; table and chart are alternative views. | Keep chronology and its filters together. Make counts and date coverage visible. Never turn counts of catalog records into a biological trend. |
| [NASA Worldview comparison](https://www.earthdata.nasa.gov/learn/blog/introducing-worldviews-comparison-feature?page=18) | Explicit A/B comparison, swipe/opacity modes, visible exit; dates and layers remain attributable to each side. | Keep both source titles and dates visible during comparison; retain existing image swipe/fade tools and warn when views are not registered. |
| [Linear filters](https://linear.app/docs/filters) | Applied filters update the result set and can be represented in a shareable URL. | Show removable filter chips, an unambiguous reset, and keep public view state shareable without private notes. |
| [Linear display options](https://linear.app/docs/display-options) | Layout and ordering are distinct from data filters; personal display choices persist. | Preserve selected view and query when returning to a section. Do not silently discard work when navigating to tools. |
| [Zotero searching](https://www.zotero.org/support/searching) | Quick search operates within a collection; saved searches retain criteria rather than frozen results. | Scope search to the current subject/section, and allow named reusable research views stored locally. |
| [iNaturalist search](https://help.inaturalist.org/en/support/solutions/articles/151000169670-how-to-search-inaturalist-observations) | Result counts reflect filters; display choices persist; date and media filters are recognizable. | Make the active period and filtered count explicit, separate evidence format from chronology, and retain the selected display. |
| [NN/g recognition versus recall](https://www.nngroup.com/articles/recognition-and-recall/) | Visible choices and recent work reduce dependence on memory. | Use plain action labels and keep selected comparison records visible. Provide an obvious way back to evidence and saved work. |
| [NN/g progressive disclosure](https://www.nngroup.com/articles/progressive-disclosure/) | Common actions remain visible; advanced controls are deferred with clear labels. | Keep date/topic/search available; optional measurement metadata stays secondary. Do not collapse source descriptions by default. |
| [GOV.UK questions](https://design-system.service.gov.uk/patterns/question-pages/) | Ask necessary questions, mark optional inputs, reuse known information, preserve back navigation. | Prefill source citations, preserve drafts, and avoid requiring exact dates from year-only sources. |
| [W3C form feedback](https://www.w3.org/WAI/tutorials/forms/notifications/) | Clear success/error feedback close to the action, with accessible notifications. | Confirm saving, explain storage failures, and move focus to actionable errors rather than silently hiding the form. |
| [W3C focus visibility](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html) | Sticky headers must not conceal focused controls. | Remove the overlapping article contents bar; use one correctly offset workspace navigation layer. |
| [W3C tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) | Panels have named tabs, selected states and keyboard navigation. | Give workspace switching real tab semantics and manual arrow-key navigation without automatically loading heavy tools. |

GBIF's live occurrence page presented a security verification screen; it was not bypassed. GBIF documentation was reviewed, but no live-layout claims are based on that blocked page.

## Local interface audit before implementation

- All 13 sections expose a specific question and three tracking topics. Preserve this semantic mapping.
- A 116px sticky article contents block begins at 16px. The workspace navigation begins at 46px and is 68px tall: it is completely covered by the contents block.
- The repeated chapter banner, section question, purpose, caution, workspace status, research heading and three-step introduction delay access to evidence.
- Current chronology has nested scrolling; source rows and controls should be easier to scan together.
- The Add observation action opens a distant form below the source chronology. A direct personal-observation view is more predictable.
- Closing the form says it keeps the draft, but reopening currently clears the note/value. Correct this contradiction.
- Selected comparison records are retained through filtering, but that state should be explicitly explained.
- A museum accession identifier, 1992.11.69, is incorrectly interpreted as a year. Exclude identifiers from date parsing and cover this with tests.
- Graphics, Models and Art have sparse catalog-year coverage. Preserve undated records without guessing dates or implying an empty archive.
- Existing 3D, maps, galleries, audio/video tools and full background text remain in their current section-specific workspaces.

## Planned acceptance checks

### Priority and restraint

The first priority is orientation: one section heading, one research question, one primary workspace switcher. The second is continuity: returning from a tool must not erase search or a draft. The third is evidence integrity: identifier-like numbers cannot become dates, and publication chronology is not a population series. The fourth is recoverability: save feedback, export, editing and undo remain available. Richer charts are useful only for comparable numeric observations already supported by the data.

Avoid copying complexity from the references: no Boolean query builder, forced onboarding tour, new account system, extra map layers, or invented trend values are needed for this task. The existing narrow section topics provide enough scope. The screenshot baseline is `artifacts/crab-research-before.png`.

### Manual research audit coverage

Infrastructure, Movement, Graphics, Society, Health, Combat, Models, Art, Environment, Survival, Videos and Sounds were each opened after Overview. Their section questions and chronology headings were inspected. Sounds' tool workspace and A/B comparison were inspected in detail. At the baseline, the active section's workspace tab bar was hidden behind the article contents block; comparison headings could also be obscured. The visible control sizes were mostly 32–47px high with 12–13px text, so action text and hit areas should be strengthened without increasing the introductory header height.

1. All 13 sections expose purpose, research navigation, evidence count and appropriate tools.
2. Primary navigation is readable and not covered while scrolling.
3. Search, topic and year filters update results and removable active-filter labels.
4. Saved views restore their criteria; malformed storage or URL values do not break rendering.
5. A/B comparison works, with titles/citations and a clear return action.
6. Personal observation entry opens directly, preserves a cancelled draft, saves with feedback, and retains import/export/edit/undo.
7. Keyboard navigation and focus remain usable; narrow layouts reflow without clipping controls.
8. Type checking and date/schema regression tests pass.

## Implemented and checked

Research ran from 20:01:46 to 20:11:51 UTC on October 26. Implementation began afterward and was resumed on October 27; the intervening idle time is not counted as work.

- Replaced overlapping sticky headers with a single workspace navigation layer; shortened the introduction without removing its section-specific purpose or cautions.
- Added proper workspace tabs with manual arrow-key navigation and Enter activation. All 13 sections were revisited in the browser and retain their question, catalog count, specialist tools and background view.
- Separated published evidence from personal observations, with direct observation entry and focused validation messages.
- Added removable filter labels, reusable named views, session-restored criteria and session-preserved observation drafts. Verified saving, resetting and restoring a temporary telemetry view; removed the test view afterward with undo available.
- Verified a two-source acoustic comparison with both citations, date labels and a visible return action. Existing image comparison remains available when suitable images are selected.
- Verified cancel/reopen and live-reload draft preservation, then cleared the temporary test text. No test observations were saved as research evidence.
- Prevented accession numbers from being treated as years. Sections without indexed catalog years now show their records directly for qualitative comparison rather than an empty chronology. Date controls are omitted there.
- Confirmed the saved sculpt loads and exposes disassembly controls. Movement atlas remains in the tools workspace; no map data, model geometry or gallery content was replaced in this pass.
- TypeScript check passed. The regression script passed 22 checks covering observations, imports, catalog dates and saved-view normalization. The preview's error log was empty at the final check.

Desktop browser behavior was checked directly. Narrow-layout CSS is included, but a separate mobile-device session was not tested. This is a functional/UI audit, not a claim of accessibility certification or controlled user-testing results.
