# Route expansion — 22 October 2026

## Delivered dataset

36 distinct endpoint connections: 12 Land, 12 Air, 12 Sea. Data is consumed directly by the Movement logistics layer; transport-count buttons select each family. Organization, activity, period, evidence and endpoint filters remain available.

This is a collection of reported connections, **not a global top-12 ranking**. Historical schedules, regional anchors and mixed-species manifests remain explicitly marked. Counts apply to transport families, not every organization/activity intersection. No comparable global tonnage dataset establishes rankings for these records.

## Research decisions

- Added eight distinct sea port pairs from published manifest transcriptions. Matching bill identifiers connect shipper and port evidence. Bills naming C. sapidus alongside P. segnis establish presence, not a species-specific cargo weight.
- Freeport–Savannah is a published arrival leg for Greek product, not Bahamian harvest. Other transshipment ports likewise are not treated as fishing origins.
- MAEU254526331 appears under two dates/port pairs in ImportKey. The July Cartagena–New Orleans record is labeled with this discrepancy rather than combined into an invented voyage.
- Added historical Handy road/air legs, Maryland–London and Gulf Coast–Los Angeles air connections, Hunter's trucking and White Marsh's Louisiana sourcing corridor. Regional anchors do not assert airports or exact loading facilities.
- Rejected North Carolina Sea Grant's illustrative Wanchese/Raleigh/Charlotte scenario as proof of individual shipments.
- Do not interpret historical records as current schedules, generic trade flows as live tracking, or the 12-per-family count as proof of major-route ranking.

## Validation

`scripts/check-crab-route-data.mjs` checks IDs, duplicate geographic corridors, valid coordinates, required provenance fields and per-family totals. TypeScript validation passed. Visual rendering was not re-inspected in this update.

Source URLs are recorded in `app/crab-route-research-sources.json`; each plotted record references its source ID and displays its date and evidence status.
