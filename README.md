# Labyrinth — Chesapeake Bay Exploration

Three connected views: Archive, interactive 3D Map, and Marketplace.

This version includes NOAA terrain elevation and bathymetry with measurement tools; sourced conservation histories beginning in 2000 where available; dated NOAA station readings; ecological risks; profile assessments; conservation news; and linked Recent, Monthly and Seasonal species calendars on the map.

## Publishing

The committed `docs/` directory is the ready-built website. GitHub Pages should use **main → /docs** with **Deploy from a branch**. Keep this setting for source updates committed together with their built files.

## Development

Use Node.js 24 or later. Run `npm ci`, then `npm run dev`. After edits run `npm run build` and commit source plus `docs/`. Run `npm run refresh:data` to import the published agency data before rebuilding.

## Data updates

NOAA readings refresh in the browser on visits, tab return and every 15 minutes while visible. Annual DNR/VIMS data use a saved snapshot. To update annual data, run `npm run refresh:data`, then `npm run build`, and commit the updated source snapshots and `docs/`. Scheduled GitHub Actions imports are not enabled. Failed provider requests retain prior observations with their original dates.

See [DATA_GUIDE.md](DATA_GUIDE.md) for coverage, source links, datum distinctions, missing data and refresh behavior. Ecology and news are curated and require editorial updates; they are not automatic news feeds. Seasonal map callouts describe typical activity, not telemetry or observed movement tracks. Marketplace listings remain demonstrations. Workshop and Network are future modules.

The terrain grid is fixed, reduced-resolution NOAA topobathymetry, not navigation soundings or live water depth. Existing repository license and domain configuration are preserved.
