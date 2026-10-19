# Global GIS map — 18 October 2026

The map now uses a real-time CesiumJS 1.121 globe instead of the regional canvas projection. The regional NOAA measurement workspace remains available below the globe.

## Implemented

- Geographic terrain mesh over the entire globe, including polar caps and negative seabed elevations.
- Progressive detail: Mapzen / Tilezen Terrarium elevation tiles decoded into actual metre heights and reprojected to geographic terrain tiles.
- Bundled NOAA ETOPO1 relief: 1-degree world fallback; 5-arc-minute polar caps from 80° to each pole.
- Satellite, shaded-relief and ocean imagery; optional geographic labels.
- Smooth camera flights, drag/pinch/wheel controls, tilt, north reset, full-globe reset, expanded viewport and keyboard controls.
- Twelve worldwide landscape/ocean shortcuts, city search using Open-Meteo/GeoNames, and coordinate navigation.
- Terrain inspection, multi-point geodesic measurement and GeoJSON point export. Visual exaggeration is removed from reported heights.
- Existing archive location selection and regional seasonal/measurement tools preserved.
- Attribution, resolution limits, fallback notices and retry UI.

## Scope and accuracy

Global coverage does not imply uniform survey resolution. Satellite texture resolution and elevation resolution are separate. Deep-ocean relief is primarily a compiled bathymetric model; polar detail is deliberately identified as 5 arc-minutes. Terrain heights are approximate, use source vertical references, and are not navigation soundings. No buildings, live animal tracks or time-changing terrain are invented.

The base grid remains usable if live terrain requests fail. The renderer and imagery require internet access. Requests are cached in-memory and terrain source zoom is capped at 12. Search can fail independently; coordinates and destinations remain available.

## Blender

A separate Blender 3.0 review scene was generated from the same NOAA fallback heights (65,341 vertices, 30× visual exaggeration). It is a GIS geometry inspection, not the interactive map, and has not been integrated as a replacement asset. The Blender integration requires suitability approval before generated assets are incorporated. The live map uses streamed measured terrain rather than the coarse review render.

Review: `../Labyrinth-Engine-Workspaces/blender/Global_GIS_Relief_Review_v002/Project.blend` (workspace sibling location).

## Sources

## Selected-region inspector (18 October 2026)

The globe toolbar now opens a separate 3D terrain inspector at a selected point (or the current view center). Region widths: 5, 20, 80 and 200 km. It supports orbit/pan/zoom, satellite/elevation/clay surfaces, wireframe, 1×/2×/5× vertical display, sun-angle control and true-scale GLB export for Blender.

The user approved `Everest_GIS_Textured_Terrain_v001` for integration. Its actual Blender-exported GLB is now at `public/world-terrain/everest-gis.glb` and loads for the 20 km Himalayan region centered at 86.9°E, 27.9°N. Measured model heights: 3,941–8,741 m. Other regions are explicitly identified as browser-generated GIS meshes, not Blender assets. This does not convert every worldwide terrain tile into a Blender-authored model.

Satellite texture and elevation are separate datasets. A 257×257 output mesh does not imply 257×257 independent survey measurements. Export preserves georeferencing metadata and removes the display exaggeration.

## Data providers

- https://registry.opendata.aws/terrain-tiles/
- https://github.com/tilezen/joerd/blob/master/docs/attribution.md
- https://coastwatch.pfeg.noaa.gov/erddap/griddap/etopo180.html
- https://www.ncei.noaa.gov/products/etopo-global-relief-model
- Esri World Imagery, World Shaded Relief, Ocean World Ocean Base and World Boundaries and Places services (attribution shown on the map).
- https://open-meteo.com/en/docs/geocoding-api

Acquisition: `scripts/fetch-world-relief.mjs`. Runtime data and fallback metadata: `public/world-terrain/`.
