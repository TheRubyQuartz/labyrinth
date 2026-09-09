# Labyrinth — Exploration

An interactive conservation website mockup with three separate, connected views:

- **Archive:** species, habitats, field assets, measurements, histories, illustrative updates, search, and tags.
- **3D Map:** simulated terrain, orbit/tilt/zoom controls, selectable records, layer filters, and sample movements across an observation timeline.
- **Marketplace:** sample tasks, products, and supplies linked to archive records and map locations; session-only listing saves.

Workshop and Network are marked as future sections, not implemented features.

## Publish on GitHub Pages — no local installation needed

This download includes both editable source and a ready-built `docs/` folder.

1. Unzip the download.
2. Create a new GitHub repository, for example `labyrinth`. A public repository is the simplest option for a public prototype.
3. Upload the **contents inside `labyrinth-github`** to the repository root, not the ZIP and not the enclosing folder. The repository should show `package.json`, `app/`, `docs/`, and this README at its top level. Preserve the folder structure. GitHub Desktop is an alternative to browser uploads.
4. Commit the files to `main`.
5. Open the repository's **Settings → Pages**.
6. Under **Build and deployment**, set **Source → Deploy from a branch**.
7. Select branch **main**, folder **/docs**, and click **Save**.
8. Wait for the Pages deployment to finish. Open the website URL shown on that settings page; for a repository named `labyrinth`, it normally looks like `https://YOUR-USERNAME.github.io/labyrinth/`.

The compiled `docs/index.html` is the published entry point. The repository-root `index.html` is a development entry point; do not select `/(root)` for this package.

GitHub Pages availability for private repositories depends on your plan. Treat the deployed site as publicly accessible unless your account explicitly supports and configures restricted Pages access. Do not upload credentials or confidential conservation data.

## Edit and run locally

Install Node.js 22.13 or later (Node 22 LTS recommended). Open a terminal in the unzipped `labyrinth-github` folder and run:

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite. Stop it with Ctrl+C.

After editing, regenerate the publishable files:

```bash
npm run build
```

Commit/upload the updated source **and updated `docs/` directory** to `main`. GitHub Pages then republishes the compiled files. Editing source alone does not update the prebuilt site. Do not hand-edit the generated files inside `docs/`.

Optional checks:

```bash
npm run typecheck
npm run preview
```

`preview` serves the compiled site locally; it is not a production hosting service. Opening an HTML file by double-clicking it is not supported for this module-based app.

## Important files

| File or directory | Purpose |
| --- | --- |
| `app/exploration.tsx` | Main interface, records, listings, map rendering, filters, and interactions |
| `app/globals.css` | Colors, typography, layouts, responsive rules, and component styling |
| `app/main.tsx` | React application entry point |
| `components/ui/` | Reused tabs, sheet, slider, and select primitives |
| `lib/utils.ts` | CSS class-name helper |
| `public/favicon.svg` | Labyrinth icon |
| `index.html` | Page title, description, and development entry point |
| `vite.config.ts` | Static build, relative asset paths, and `docs/` output |
| `docs/` | Ready-to-publish compiled website |
| `package-lock.json` | Locked dependency versions for reproducible installation |

## What changed for this export

The Exploration interface and behavior were carried over from the hosted prototype. The export uses a standalone React + TypeScript + Vite static build instead of the original server-hosting wrapper, so GitHub Pages does not need a backend. The home link and asset paths are repository-subfolder safe. The original live site was not changed.

No API keys, account credentials, platform-specific deployment identity, Git history, or `node_modules` are included. Only components needed by this interface are included. The generated assets are included for deployment convenience; the source remains editable.

## Prototype limitations

- **Regional coverage:** Exploration currently focuses on Maryland’s Chesapeake Bay, with blue crab and eastern oyster profiles, selected habitats, and NOAA monitoring stations. It is not a comprehensive inventory of Bay species or conservation assets.
- **Sourced data and historical gaps:** Conservation metrics use published agency observations, with histories beginning in 2000 where available. Some years are missing, preliminary, or only partially surveyed. Regional population and habitat indices should not be interpreted as measurements at individual map markers.
- **Refresh frequency:** NOAA readings refresh on visits, eligible tab returns, and every 15 minutes while visible. A daily GitHub Actions workflow imports published annual data, rebuilds, and deploys the site. Annual surveys are not real-time measurements; provider outages or source-format changes can delay updates. Failed imports retain earlier values with their original dates.
- **3D terrain and measurements:** The map uses a fixed, reduced-resolution NOAA land-elevation and seafloor grid. Point inspection, distance, area, and cross-section measurements are approximate. Terrain elevations reference NAVD 88; station water levels use a separate MSL tidal datum. Displayed depths are not live water depths or navigation soundings, and vertical exaggeration changes only the visual relief.
- **Species activity:** Recent, Monthly, and Seasonal calendars are linked to the map, but describe typical activity windows and illustrative regional locations. They do not show live animal tracking, confirmed sightings, or measured migration routes. Adult oysters remain attached to reefs; their activity includes spawning and larval dispersal.
- **Ecological context and news:** Risk summaries and conservation stories are sourced and curated. They require editorial review and do not update automatically with the measurement feeds. Regional risks do not establish the cause of a specific local decline.
- **Asset health:** NOAA station readings are available, but battery levels, calibration records, and maintenance condition are not connected. A functioning data feed does not certify equipment health.
- **Marketplace:** Listings remain demonstrations. Saved listings last only during the page session and clear on refresh. Purchases, payments, messaging, and submissions are not implemented.
- **Shared services:** The GitHub Pages version has no shared application database, user authentication, upload service, or application server API. It uses public NOAA APIs and scheduled GitHub Actions imports; shared user records and collaboration would require additional services.
- **Future modules and sensitive locations:** Workshop and Network remain future modules. Sensitive species locations must be reviewed before publishing additional records.

See [DATA_GUIDE.md](DATA_GUIDE.md) for source coverage, refresh behavior, and interpretation details.

## Troubleshooting

- **404 or blank page:** confirm the files are at the repository root and Pages targets `main` → `/docs`. Check that `docs/assets/` was uploaded.
- **Old changes still showing:** run `npm run build`, upload the rebuilt `docs/` folder, wait for the deployment, then refresh.
- **Missing module errors locally:** run `npm ci` in the folder containing `package.json`.
- **Unexpected repository name:** relative asset paths are configured, so this single-page mockup does not require changing a hard-coded repository name.
- **Opening a tab resets after refresh:** the three views use in-memory state, not separate URL routes.

## Documentation references

- [GitHub: configuring a Pages publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Vite: deploying static builds](https://vite.dev/guide/static-deploy)
- [Vite: relative base paths](https://vite.dev/guide/build#relative-base)

## Third-party notices

Third-party libraries retain their own licenses. The vendored stylesheet license is included in `vendor/shadcn-tailwind-4.13.0.LICENSE.md`; see dependency packages for their licenses. This export does not assign an open-source license to your original project; choose one if you want to grant reuse rights when publishing its source.

---

## Addendum — Chesapeake Bay updates (September 2026)

The original README above is preserved for reference. This addendum describes the current version and supersedes earlier statements about simulated terrain, sample species and histories, unavailable data ingestion, and the Node.js requirement. Use **Node.js 24 or later**. The repository's `LICENSE` file governs the project license.

### Labyrinth — Chesapeake Bay Exploration

Three connected views: Archive, interactive 3D Map, and Marketplace.

This version includes NOAA terrain elevation and bathymetry with measurement tools; sourced conservation histories beginning in 2000 where available; dated NOAA station readings; ecological risks; profile assessments; conservation news; and linked Recent, Monthly and Seasonal species calendars on the map.

### Publishing

The committed `docs/` directory is the ready-built website. GitHub Pages should use **main → /docs** with **Deploy from a branch**. Keep this setting for source updates committed together with their built files.

### Development

Use Node.js 24 or later. Run `npm ci`, then `npm run dev`. After edits run `npm run build` and commit source plus `docs/`. Run `npm run refresh:data` to import the published agency data before rebuilding.

### Data updates

NOAA readings refresh in the browser on visits, tab return and every 15 minutes while visible. Annual DNR/VIMS data use a saved snapshot. To update annual data, run `npm run refresh:data`, then `npm run build`, and commit the updated source snapshots and `docs/`. The **Refresh conservation data** workflow runs daily at 10:23 UTC, commits validated snapshots and rebuilt files, and deploys GitHub Pages. Run it manually from Actions → Refresh conservation data → Run workflow. Failed provider requests retain prior observations with their original dates.

See [DATA_GUIDE.md](DATA_GUIDE.md) for coverage, source links, datum distinctions, missing data and refresh behavior. Ecology and news are curated and require editorial updates; they are not automatic news feeds. Seasonal map callouts describe typical activity, not telemetry or observed movement tracks. Marketplace listings remain demonstrations. Workshop and Network are future modules.

The terrain grid is fixed, reduced-resolution NOAA topobathymetry, not navigation soundings or live water depth. Existing repository license and domain configuration are preserved.
