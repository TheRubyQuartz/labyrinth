# Labyrinth homepage scene adaptation

## October 16 reference revision

The two supplied west-facade photos guide a revised vertical hierarchy, wider side portals, paired lancets/quatrefoils beside the rose, upper arcade, 28-figure Kings' Gallery and rear wall/buttress depth. This remains an original stylized model using the existing sculpted ice-block meshes/UVs and original assembly pipeline; it is not Ubisoft's model. Search did not establish an official downloadable Ubisoft model licensed for website reuse. Ubisoft describes its game/VR work at https://news.ubisoft.com/es-mx/article/3jsMF7A3sNwJQIZnAR3zkA/games-as-historical-immersion-and-preservation-creating-fun-and-plausible-worlds-for-players .

Final-scene volume targets now depict an open book, grandfather clock (dial, pendulum case and plinth), and hatchet. The existing journal/calendar/marketplace actions remain. Volcanic additions include 32 drifting ash fragments and five staggered background puffs with reduced-motion support. The social destination is labeled Network; its existing route remains `view=social` for compatibility.

## October 15, 2026

Earth drag-mode correction: pointer-down only starts globe rotation when `interacting` is explicitly enabled by Explore Globe. Default click/release/re-drag is left to the original page drag controller. Fire particle geometry and its interaction proxy are doubled (desktop scale 15, mobile 11.6).

Latest scene order: cathedral → ice exhibits → Air (Archive / Workshop / Social) → Earth → Fire (journal / calendar / kit). Earth captures ordinary wheel input while visible and forwards normalized deltas directly to the continuous scroll controller, including over its HTML overlay. Explicit exploration/Ctrl still enables globe zoom. Fire adds full-screen animated warm haze, 48 rising embers and ember-colored selected/hover/focus controls, with reduced-motion handling. `scripts/check-earth-fire.mjs` checks the order and actual wheel exits in both directions.

- Opening: a Notre-Dame-inspired fantasy gateway with two broad square towers, substantial beveled masonry, paired recessed belfry openings, three entrances, horizontal galleries and central rose-window tracery. Two rigid central doors swing around their jambs as scrolling advances; the camera travels through an animated cyan/violet portal before the original fog transition into the gallery. Original wireframe/materialization, weather and audio remain. The facade's idle displacement is reduced to preserve its architectural coherence; brighter stone lighting and specular highlights emphasize the blocks rather than only the trim.
- Collection: one vertical scene containing three horizontally arranged ice exhibits: blue crab, alpine habitat and environmental field instrument. Buttons, arrow keys, horizontal wheel input and sideways swipes select exhibits. Original ice shading, hover effects and detail views remain.
- World: an independent globe scene, without an ice shell. Surface imagery, normal detail, exaggerated relief, atmospheric rim and optional clouds accompany drag rotation, zoom controls, wheel-exploration mode, coordinate picking, searchable illustrative viewpoints and location pins. These are not live observation feeds or survey-grade terrain.
- Particle destinations remain Archive, Workshop and Social.
- Final scene: a horizontal three-stop carousel presents a modeled field journal, desk calendar and field kit. Each has 16,000 surface-sampled particles that assemble and disperse with selection and vertical transitions. Sideways swipes, horizontal wheel input, arrow keys and labeled buttons select exhibits. Journal/calendar actions reveal the six existing reading records, Plan/Schedule/Completed views, dates, calendar downloads and local journal; the kit opens the marketplace. The editor is closed by default. Continued vertical scrolling returns through fog to the cathedral. Storage remains `labyrinth-plans` and `labyrinth-expedition-journal`; no account sync or checkout.
- Earth and the final scene explicitly opt out of center/boundary auto-snapping. Ordinary wheel input flows forward and backward; wheel zoom requires Explore Globe mode or Ctrl. The global circular scene loop is retained.

Architecture research for the replacement: Notre-Dame's official western-facade description (`https://www.notredamedeparis.fr/en/understand/architecture/the-western-facade/`) informed the square-tower silhouette, horizontal galleries and rose. This is a fantasy adaptation, not an exact architectural reproduction or a reused game portal asset.

The local attributed reference runtime supplies the original rendering, transitions and audio. Labyrinth's model generation and scene adaptations live in `scripts/build-labyrinth-scene-assets.mjs`, `public/reference/igloo-complete/labyrinth-adapter.js` and `public/reference/igloo-complete/labyrinth-scenes.js`. The original provenance record is retained.

Earth assets are from the Three.js Earth example: `https://github.com/mrdoob/three.js/tree/dev/examples/textures/planets`. Individual source URLs are recorded in the generated model manifest. The globe's geographic viewpoints are illustrative; Chesapeake links to the existing regional map workspace.

Local verification: `scripts/check-cathedral-gallery-globe.mjs` captures the settled opening, gallery selection and globe search/zoom, and reports browser errors. Screenshots are under `.practice-qa/new-scenes`.
The portal and expedition revision is checked by `scripts/check-portal-expedition.mjs`, including hinge movement, reading-plan completion, journal storage and mobile overflow. Screenshots are under `.practice-qa/portal-expedition`.

### Original-block revision

### Follow-up: original interaction and fire simulation

Compact masonry correction: facade blocks overlap their course envelopes by 24% horizontally and 20% vertically, with wall depth increased from 0.92 to 1.45 model units. Original hover spring timing remains, but resting/hover translation is bounded to 0.12 world units rather than scaling with the cathedral's tall centroid. Scroll disassembly remains separate and unchanged. This supersedes the unbounded original displacement restoration below.

Superseding the earlier 48,000-point carousel: the final scene now instantiates the same `wF` GPU volume-particle implementation as the preceding destinations scene (150,000 particles, ping-pong position/velocity textures, original fluid pointer interaction, curl noise, friction and volume attraction). Journal, calendar and kit supply separate signed-distance volumes. Sideways selection uses the original half-second noise burst, rotation reset and volume switch. Fire colors and a small buoyancy term modify appearance without replacing the simulation. The older solid exhibit meshes are hidden; journal/calendar actions and device-local storage remain available through the carousel controls.

Removed the cathedral's 0.035 displacement multiplier and forced exploded-atlas blend. Original breathing, pointer displacement, bounce smoothing and atlas blend are restored; Notre-Dame geometry and the requested portal-door travel remain. Browser checks passed with no errors or missing assets, including carousel selection, persistence, mobile layout, Earth scrolling and circular return.

Blender Automation imported and inspected all 70 original igloo blocks in `Labyrinth-Engine-Workspaces/blender/Original_Igloo_Block_Inspection_v001/Project.blend`. The report records their geometry, dimensions and emission attributes. The website generator reuses selected original sculpted meshes, UV coordinates and emission data for Notre-Dame masonry, with the original texture/exploded atlas blend and shader. This replaces generic rounded-box masonry; small architectural trims remain procedural. Blender was used for source inspection, not claimed as the generator of the complete cathedral.

The updated browser check passed horizontal carousel selection, 48,000 particle vertices, Earth forward/reverse scrolling without auto-centering, portal hinges, local persistence, mobile overflow and the circular return. No browser errors or missing requests were reported. Native live-control bridges failed to initialize in this session; these interactions and screenshots were captured against the running site with browser automation.
