# Local Igloo reference homepage

The homepage mounts a locally hosted copy of the public Igloo experience, not an iframe of the live remote site and not a from-scratch recreation. The original runtime, artwork, and audio remain third-party work. Asset provenance and original hashes are recorded in `public/reference/igloo-complete/provenance.json`. No redistribution license is asserted; this work has not been published or pushed.

## Included sequence

- Loading and wireframe/assembly opening; textured igloo, mountainous terrain, snow, mist, hover displacement, and sound.
- Frozen project exhibits with refraction, responsive hover effects, project-detail scenes, and return transitions.
- Shattered-ring descent, particles, final link chamber, and looping return.
- Original responsive renderer, camera transitions, typography animations, and audio controls.
- A separate Labyrinth destination menu preserving access to Archive, World map, Conservation news, and Marketplace.

## Local adaptations

- Asset and worker paths localized; remote marketing scripts omitted.
- Isolated same-origin frame prevents reference styles/router from replacing Labyrinth destinations.
- Canvas readiness bridge accounts for the renderer's closed shadow root.
- MSDF shader derivative receives a small minimum to avoid undefined smoothstep edges and corrupted text on software/WebGL drivers. `scripts/patch-igloo-compatibility.mjs` applies this reproducibly after asset preparation.
- Existing custom reconstruction files remain available but are no longer the homepage entry point.

## Checks

- TypeScript and production build passed.
- Full scroll-through reached all three scene systems and looped back to the opening, with no runtime errors, missing assets, or external requests in the recorded run.
- Browser evidence is in `.practice-qa/igloo-complete/`; test scripts distinguish scene flow from direct interaction checks.
- Desktop sound toggle, project click/open, and return transition passed. Mobile scene loading and destination dialog open/close passed at 390 × 844.
