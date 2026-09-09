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

- All measurements, updates, listings, reserve locations, and movement examples are illustrative.
- Species are examples, not a confirmed selection native to your specific location.
- The 3D map is a procedural terrain visualization projected onto a canvas, not georeferenced GIS imagery or a live tracking service.
- Histories are sample arrays; no real-time ingestion pipeline is connected.
- Marketplace saves last only while the page session is open. Refreshing clears them. There are no purchases, payments, messages, or submissions.
- There is no shared database, authentication, upload service, or server-side API in this export.
- A future shared archive or live pipeline requires a separate backend or hosted data service. GitHub Pages only serves the static frontend.
- Protect sensitive species locations before publishing real records.

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
