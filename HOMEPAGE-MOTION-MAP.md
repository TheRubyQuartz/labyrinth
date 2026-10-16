# Homepage motion implementation — superseded by full-screen journey

## Navigation and purpose repair (October 13)

Re-inspected Igloo's live opening, fractured-object and camera-travel states. Captures remain in `.practice-qa/igloo-boundaries`.

- Wheel input now settles to a complete chapter rather than leaving the visitor at a fractional, dispersed scene. Pointer capture supports upward/downward mouse dragging and touch swipes. Reading regions scroll independently, handing off to chapter movement at their boundaries.
- Camera positions interpolate continuously across chapter boundaries rather than jumping when the rounded chapter index changes.
- Removed the invisible rectangular hover gate. Mesh raycasting, eased movement and a release tolerance make object responses stronger and less prone to flicker. Zoom, wireframe and component-separation controls provide explicit inspection alternatives.
- Restored inline archive search, type filters, saved records, related-record traversal, evidence/context inspection, reading-plan scheduling/completion/calendar export, interest preferences and sharing. These sit directly in the scene without boxed panels. Existing field-kit and destination links remain accessible.
- Added globe outlines, instrument graduations and document markings. Entrance terrain now has repeated surface detail and finer relief; brighter fill/rim lighting separates forms. The entrance masonry is instanced to reduce draw calls. Mobile object framing leaves room for the functional controls.

Tests: `scripts/check-home-purpose.mjs` covers mouse wheel, forward/reverse drag and each functional chapter at desktop/phone widths. `scripts/check-home-input.mjs` separately checks mesh hover/release, reverse wheel, audio controls, reduced motion and native touch dispatch. Current screenshots: `.practice-qa/home-purpose`.

These changes restore functionality and repair specific motion defects; they are not evidence of exact artistic or frame-rate parity with Igloo.

## Current implementation (October 12)

The panel-based implementation described below is historical and no longer mounted on the homepage. `main.tsx` now mounts `home-journey.tsx`: one fixed viewport, one Three.js canvas and one active chapter. Archive and other destinations remain unchanged.

| Reference behavior | Current implementation |
| --- | --- |
| Loading → wireframe → assembled object | Loading overlay, edge reveal, surface particles and mineral-textured labyrinth blocks |
| Opening holds until scrolling | Entrance remains until wheel, touch, keyboard or chapter navigation |
| Opposite-corner identity and summary | Persistent top-left name and top-right description |
| One scene at a time | Document scrolling disabled; one active object group and copy block |
| Disassembly followed by next assembly | Scroll-controlled separated components and scattered surface particles |
| Skyward camera and ring travel | Camera rises through illuminated portal rings between chapters |
| Hover-reactive sculpture | Actual mesh raycasting triggers opening, sway and pulsation |
| Weather and moving mist | Wind-driven snow and drifting mist sprites |
| Wave and light effects | Expanding ground ring, emissive core and bloom |
| Sound | Opt-in synthesized wind, assembly/dispersal/travel effects and mute |

Ten chapters: entrance labyrinth; orbital world; connected nodes; archival blocks; layered shell; field-note sheets; expedition calendar rings; exploded field instrument; interwoven connection; closing portal. Calendar and interests are available in dialogs; the menu exposes destinations and all six archive records.

Verification: `scripts/check-home-journey.mjs` passed at 1440×900 and 390×900 for all chapters, one viewport/canvas, no panel flow, ring transitions, hidden outgoing copy, menu, sound controls, reduced motion and no browser exceptions. Desktop hover raycasting passed. Captures: `.practice-qa/fullscreen-journey`. Sound controls were tested programmatically; the audio was not independently auditioned.

Objects, textures and synthesized sounds are original adaptations, not extracted Igloo assets. Behavior tests do not prove identical artistic fidelity.

## Historical implementation below (not the current homepage)

Scope: homepage only. Archive and other destinations retain their existing interfaces.

## Reference inspection

Live Igloo captures are saved in `.practice-qa/igloo-motion` and `.practice-qa/igloo-chapters`. The site renders its journey inside a fixed-height canvas: document scroll position remains zero while wheel input changes the scene. Observed states include a textured igloo assembling over terrain, exploded blocks with annotation lines, a suspended fractured specimen, segmented illuminated rings, a tunnel transition, and a particle-built object on a circular platform. Text in these browser captures is incompletely rendered; exact typography/content parity cannot be verified from those frames.

## Section mapping

| Labyrinth chapter | Implemented presentation |
| --- | --- |
| Entrance | Monument wireframe, surface assembly, internal-light pulse, procedural terrain, restrained impact overlay and replay |
| Living world | Existing interactive globe assembly, rotation and zoom retained |
| Connections | Independent network sculpture, particle assembly, relationship rings; existing interactive connection viewer retained |
| A closer look | Layered open-shell sculpture with sampled surface particles |
| Collection | Rounded archival blocks assembling from separated positions |
| In focus | Layered optical rings and central lens |
| Sources & evidence | Stacked sheets and observation points |
| Reading calendar | Seasonal orbital rings and twelve markers |
| Field kit | Exploded cylindrical instrument components |
| Keep in touch | Interwoven connection form with satellite nodes |
| Closing invitation | Nested portal rings above the Archive link |

The new chapter renderer shares one WebGL context and renders only visible stages. Each stage has a separate scene, geometry, camera, entry timer, replay button, cursor response, expanding wave and surface-particle assembly. Desktop uses 11,000 surface samples per stage; mobile uses 4,500. Reduced motion resolves the object immediately without rotation or waves. Resource cleanup disposes geometry, materials and environment textures. Existing content and destination links remain available.

These are original procedural adaptations. Their simpler geometry, material detail and panel-based composition do not establish exact Igloo-level visual parity. Browser interaction tests establish behavior, not artistic equivalence.

## Verification

`scripts/check-home-chapters.mjs` checks all nine visible added stages at desktop and mobile widths, replay, reduced motion, overflow and page errors. Captures are written to `.practice-qa/home-chapters`. TypeScript and the production build are checked separately.
