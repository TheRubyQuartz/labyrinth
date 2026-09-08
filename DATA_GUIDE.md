# Labyrinth conservation data

The archive now contains sourced observations, replacing all invented species, habitat and equipment measurements. Map markers and marketplace links provide exploration context; they do not establish co-location, agency endorsement or wildlife tracking.

## Imported coverage (7 September 2026)

| Record | Metrics | Imported history | Scope |
|---|---|---|---|
| Blue crab | Adult females, juveniles, adult males, total abundance (million crabs) | 2000–2026 annually | Entire Chesapeake Bay |
| Eastern oyster | Spatfall intensity (spat/bushel); observed mortality (%) | Recruitment 2000–2025; mortality 2000–2024 | Maryland index monitoring bars |
| Tangier Sound grass habitat | Underwater grass hectares | 2000–2025 annually | Entire VIMS segment TANMH1 |
| Choptank mouth grass habitat | Underwater grass hectares | 2000–2025 annually | Entire VIMS segment CHOMH1 |
| Cambridge, NOAA 8571892 | Latest water temperature and water level; monthly mean sea level | Monthly series from January 2000; latest station readings | Exact NOAA station |
| Solomons Island, NOAA 8577330 | Latest water temperature and water level; monthly mean sea level | Monthly series from January 2000 with gaps; latest station readings | Exact NOAA station |

2025 oyster recruitment and 2025 SAV areas are preliminary. Some SAV years are only partly mapped. Missing observations are null or absent, never replaced with zero. The year selector exposes gaps through the current year. Current station temperature has no fabricated historical series: choose monthly mean sea level for the station history.

## Primary sources

- [Maryland DNR Winter Dredge Survey](https://dnr.maryland.gov/fisheries/pages/blue-crab/dredge.aspx): published annual population table. The adapter preserves DNR rounding, rather than forcing demographic components to sum to the published total.
- [Maryland DNR Fall Oyster Survey reports](https://dnr.maryland.gov/fisheries/pages/shellfish-monitoring/reports.aspx): the adapter discovers the latest compatible full report and extracts Table 2 Spat Index and Table 5 Annual Means. Initial history: [2024 report](https://dnr.maryland.gov/fisheries/Documents/oysters/2024RptFinal.pdf), printed pages 56–58 and 71–74. The exact downloaded report URL is retained.
- [DNR preliminary 2025 oyster results, published March 9, 2026](https://news.maryland.gov/dnr/2026/03/09/governor-moore-announces-historic-year-for-oyster-reproduction-in-maryland-waters/): 250 spat/bushel. This source does not supply a numeric mortality value; none is inferred. A compatible final 2025 report supersedes the preliminary value when imported.
- [VIMS segment-area tables](https://mobjack.vims.edu/SAV/SegmentAreaTable.aspx?SalZone=MH&ZoneType=Salinity): hectares, by year and Chesapeake Bay segment. `nd` means not mapped; `pd` means not fully mapped. Each observation links to the requested year columns. Historical changes of survey coverage limit comparability.
- [NOAA CO-OPS Data API](https://api.tidesandcurrents.noaa.gov/api/prod/): `water_temperature`, `water_level`, `monthly_mean`. [Metadata API](https://api.tidesandcurrents.noaa.gov/mdapi/prod/) supplies station coordinates and establishment dates. [Response definitions](https://api.tidesandcurrents.noaa.gov/api/prod/responseHelp.html) explain preliminary/verified quality and flags.

## Refresh architecture

`lib/conservation-ingest.ts` fetches fixed official providers, validates their results and merges them with a dated snapshot. It never accepts a user-supplied proxy URL. `scripts/refresh-data.ts` runs a full historical import with Node 24 and `unpdf`, writing `app/conservation-snapshot.json` and `public/conservation-data.json` atomically after confirming all six records have validated data.

The privately hosted site exposes a read-only `/api/conservation` endpoint. Browser visits, returning to the visible tab after 15 minutes, and a 15-minute visible-tab timer check this endpoint. A manual refresh button is available. Shared response caching is 15 minutes; annual source checks and upstream responses use 24-hour caching; full PDF bodies use seven-day caching. The hosted SAV adapter refreshes the latest three published years; the full import script refreshes the entire imported history. Published data remain authoritative; the service cache is disposable, and the versioned snapshot provides a fallback.

The GitHub Pages export runs entirely in the browser. NOAA is queried directly on visits. DNR/VIMS annual histories require a manual data import and rebuild; GitHub Pages cannot execute a backend on a visitor request. The repository includes the manual import script. Scheduled imports are not enabled; run `npm run refresh:data` and `npm run build`, then commit the updated snapshots and `docs/`.

## Interpretation and failure behavior

- Observation periods and source-load timestamps are different fields. A successful HTTP request never changes an observation date. Station observations older than one hour show as older readings; NOAA flags remain visible.
- Annual population and habitat surveys are not real-time sensor measurements. There is no invented 2026 habitat survey or 2025 numeric oyster mortality value.
- Station water levels use the station **MSL tidal datum**. Terrain uses **NAVD 88**. These cannot be subtracted without a datum conversion. The map model is fixed, reduced-resolution topobathymetry, not current tidal depth or navigation soundings.
- Equipment battery, calibration and maintenance health are not available. A station feed is not a device-health certification.
- Oyster and crab metrics are regional indices, not Harris Creek or Tangier Sound-specific population estimates. VIMS segment totals are not local plot measurements or necessarily Maryland-only areas.
- Parsing errors, changed table layouts, invalid units, unexpected station IDs, invalid numeric ranges or unavailable providers retain prior values and expose a source error. Exact report links survive failed refreshes. No synthetic interpolation fills missing periods.
- A new PDF layout or preliminary release may require an adapter update. The importer fails closed rather than guessing table columns. No dataset is guaranteed to update on every check-in; availability and publication schedules remain under provider control.
- Species global conservation categories and regulatory thresholds are not inferred from these indices. Consult current assessments for official management status. Marketplace listings remain clearly labelled demonstrations.

## Ecology profiles, calendars and conservation news

The profile extensions in `app/ecology-data.ts` were reviewed on 7 September 2026 against Maryland DNR life-history pages, NOAA restoration updates, and Chesapeake Bay Program reports. Every risk, activity phase and news item links to its source. Risk statements distinguish regional mechanisms from evidence of a local decline; suggested monitoring variables are not presented as connected measurements.

Species calendars offer Recent, Monthly and Seasonal views. Recent shows the preceding three calendar months of **expected seasonal activity**, plus separately dated documented context. Monthly offers all twelve months; Seasonal groups overlapping activity windows. These are editorial summaries of life-history sources, not telemetry, sightings, or computed movement routes. Adult oysters remain attached; their calendar describes spawning, larval dispersal/settlement and condition recovery. Crab calendars distinguish mating, movement to saltier waters, spawning, nursery return and winter shelter. Weather and life stage shift these approximate windows.

The Conservation News panel contains curated primary-source reports, newest first, with a profile filter, event/data periods and links back to affected records. Its review date does not change when metrics refresh. New articles, changed life-history evidence and risk summaries require editorial review of this source file; no unreviewed news ingestion was added. Former sidebar assessment updates now appear inside the corresponding profiles and continue to read the existing data feed.

## Verification of data ingestion

### Activity calendar on the map

The 3D map and profile calendars share the same activity descriptions and month windows. The profile’s “Show this activity on the 3D map” action transfers its species and time selection; the map can reopen that species calendar. Recent, Monthly and Seasonal controls filter clickable cyan activity callouts. These are illustrative annotation anchors at datum height, not sampled locations, occupied-area polygons, telemetry or modeled flow paths. Oyster callouts use the Harris Creek exploration area only as an example of reef activity.

Lower-Bay spawning/coastal dispersal extends south of this Maryland terrain grid. Southern continuation arrows explicitly indicate that off-map context, not measured migration routes. Activity overlays are hidden during inspection and measurement and do not participate in distance, area, or elevation calculations. The historic assessment year slider remains independent of the seasonal calendar. No additional source data or unsourced movement observations are introduced.

The data tests check known source observations, complete starting coverage, unique periods, partial surveys, missing-versus-zero handling, NOAA timestamps/flags/station identity, changed source formats and outage preservation. The application is built for both hosted and GitHub Pages targets. No browser visual review was performed in this update.
