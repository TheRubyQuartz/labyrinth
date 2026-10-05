# Labyrinth homepage — Lando adaptation checkpoint

Date: 27 September 2026. Source: https://landonorris.com/ and its calendar. Scope: the 17 saved Lando feature records, adapted to Labyrinth's subject matter and requested dark theme. No work on the next reference site is approved yet.

This is an adaptation checklist, not a claim to reproduce Lando's proprietary assets, every race record, store checkout or email-service backend. Labyrinth's existing Archive content is retained. The only change in exploration.tsx initializes its existing view from the homepage's map/marketplace links.

## Source-to-implementation checks

- [x] LN-A01 — Segmented assembly: ten horizontally separated rendered globe bands arrive over a wire outline. Replay button and keyboard-accessible assembly scrubber added. Intermediate 30% state and full state inspected in browser.
- [x] LN-A02 — Organic contours: animated outline shapes with subtle fill phases, plus pointer-position offset. Motion can be disabled.
- [x] LN-A03 — Menu transition: animated dark full-screen dialog, staggered image arrival, preserved identity, lime close control. Open, navigate and close tested.
- [x] LN-A04 — Scroll-led manifesto and collection: oversized statement with contrasting lime serif emphasis; later four-column staggered gallery. Desktop visual inspection passed.
- [x] LN-N01 — Menu composition: four-image 2×2 grid, oversized numbered destinations, active strike line, close button, Archive and Marketplace routes, follow/source utilities. Menu destination to calendar tested.
- [x] LN-N02 — Next-event ticket: notched lower-left expedition ticket with route miniature. Opens the personal exploration calendar instead of a race calendar. Click target verified.
- [x] LN-N03 — Footer directory: exploration routes, calendar, source directory, settings, saved discoveries and follow/share destinations. Source-specific subscription and contact actions live in the connected footer section.
- [x] LN-V01 — Wordmark/type/palette: serif/sans identity contrast and lime actions, translated into the user's requested dark green scheme rather than copying the source's off-white background.
- [x] LN-V02 — Menu image treatment: subdued olive/monochrome photographs; lime accents and continuous dark composition. Broken landscape URL replaced after live image verification.
- [x] LN-V03 — Scale contrast: oversized display headlines versus small ticket/index metadata; clipped gallery corners and expedition ticket retained.
- [x] LN-L01 — Hero: full-height primary visual, anchored identity/utilities, rendered globe, lower-corner expedition ticket. Assembly, rotation and zoom remain available together.
- [x] LN-L02 — Split menu: image grid left, stacked navigation right, bottom utility rail. Desktop layout visually inspected.
- [x] LN-L03 — Editorial sequence and destinations: asymmetric captioned photo essay with statement, two photographic exploration paths, specimen collection, marketplace promotion, field-source organizations, follow/share/subscription/contact area. Photos outside the crab image are explicitly illustrative; organizations are sources, not invented sponsors.
- [x] LN-L04 — Gallery behavior: four desktop columns, alternate stagger, thin frames, notched lime action corner, record labels and contextual-image reveal on hover or keyboard focus. Four-column dimensions verified in browser.
- [x] LN-I01 — Menu interaction: native modal focus containment, open/close, Escape support, return focus and section navigation. Verified open and destination click; existing close action retained.
- [x] LN-F01 — Functional destinations: Archive/map split, local calendar with record selection and route drawing, date input, plan/schedule/completed views, persistence, calendar-file download and countdown; marketplace entry; source social/subscription/contact links. Schedule save, complete, export and removal tested. Existing marketplace and map destinations tested with selected tab visible.
- [x] LN-M01 — Media layering: original Labyrinth globe geometry plus the existing blue-crab image and a four-image menu/editorial collection; no Lando photographs or branded assets copied.

## Service distinctions (visible in the UI)

- Reading plans are personal, saved in this browser, not advertised field events. The route diagram is conceptual, not geographical.
- Local interests are not an email subscription or online account. A separate DNR subscription link opens the official GovDelivery destination published on DNR's site; no subscription was submitted during testing.
- Marketplace uses the existing sample listings, not a new payment flow.
- Social/contact destinations belong to the named source organizations, not nonexistent Labyrinth accounts. NOAA's original guessed social URL returned 404; replaced with its verified /stay-connected directory. DNR's guessed directory returned 404; replaced with its officially linked Instagram destination.
- Photo assets are not downloaded copies of reference-site artwork. The existing crab image and externally hosted illustrative landscapes are used.

## Verification

- TypeScript check passed.
- Production Vite build passed (existing large bundle warning; no build failure). Build output written separately, not into the tracked published docs.
- Dark homepage, menu, editorial images, four-column gallery and calendar inspected at desktop size.
- Replay/scrub control tested; assembly 30% visibly separates the globe into bands.
- Calendar: next record changed to Eastern oyster; plan saved; Schedule showed record/date; .ics download triggered; completed entry shown; test plan removed.
- Follow dialog: topic selection and local save confirmed; share button confirmed copied homepage URL. Test follow selection cleared afterward.
- Fixed chapter-navigation labels intercepting unrelated clicks: labels now have no pointer targets; only the small chapter buttons are interactive.
- Map and Marketplace URL routing verified. No Archive article/data/content edit.
- Nothing pushed to GitHub. Next-site additions await user approval of this preview.
