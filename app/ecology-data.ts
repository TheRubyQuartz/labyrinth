export const ECOLOGY_REVIEWED = '2026-09-07';
export const ecologySources = {
  crabLife:{name:'Maryland DNR · blue crab life history',url:'https://dnr.maryland.gov/fisheries/Pages/fish-facts.aspx?fishname=Shellfish+-+Blue+Crab'},
  oysterLife:{name:'Maryland DNR · eastern oyster life history',url:'https://dnr.maryland.gov/fisheries/Pages/fish-facts.aspx?fishname=shellfish+-+eastern+oyster'},
  oysterGuide:{name:'Chesapeake Bay Program · eastern oyster',url:'https://www.chesapeakebay.net/discover/field-guide/entry/eastern-oyster'},
  crabReport:{name:'Chesapeake Bay Program · June 30, 2026 report',url:'https://www.chesapeakebay.net/news/blog/2026-blue-crab-advisory-report-shows-below-average-population-but-no-overfishing'},
  grassReport:{name:'Chesapeake Bay Program · August 5, 2025 report',url:'https://www.chesapeakebay.net/news/pressrelease/underwater-grass-skyrockets-in-parts-of-the-chesapeake-bay-decreases-in-others'},
  grassRisks:{name:'Chesapeake Bay Program · underwater grass pressures',url:'https://www.chesapeakebay.net/issues/whats-at-risk/underwater-grasses'},
  restoration:{name:'NOAA · restoration update, February 20, 2026',url:'https://www.fisheries.noaa.gov/chesapeake-bay/oyster-reef-restoration-chesapeake-bay-were-making-significant-progress'},
  nutrients:{name:'Chesapeake Bay Program · August 6, 2026 report',url:'https://www.chesapeakebay.net/news/pressrelease/chesapeake-bay-watershed-jurisdictions-continue-working-toward-nitrogen-and-phosphorus-goals-with-sediment-goal-already-achieved'},
  oysterRecent:{name:'Maryland DNR · March 9, 2026 release',url:'https://news.maryland.gov/dnr/2026/03/09/governor-moore-announces-historic-year-for-oyster-reproduction-in-maryland-waters/'}
};
export type EcologySource = keyof typeof ecologySources;
export type Risk = {title:string;mechanism:string;watch:string;source:EcologySource};
const grassRisks:Risk[] = [
  {title:'Light lost to pollution',mechanism:'Algae and suspended sediment shade grass leaves.',watch:'Water clarity; nutrients',source:'grassRisks'},
  {title:'Heat and altered freshwater flow',mechanism:'High temperatures and heavy runoff can stress sensitive grass species.',watch:'Temperature; salinity',source:'grassRisks'},
  {title:'Physical disturbance',mechanism:'Propellers and dredges can uproot shallow beds.',watch:'Scarring; mapped area',source:'grassRisks'}
];
export const ecologicalRisks:Record<string,{context:string;risks:Risk[]}> = {
  'SP-001':{context:'These are regional pressures and research questions. The June 2026 report did not find overfishing under the reference points it used; it did recommend caution.',risks:[
    {title:'Loss of nursery refuge',mechanism:'Underwater grasses shelter young and molting crabs. Habitat loss reduces this refuge.',watch:'SAV area; juvenile abundance',source:'crabLife'},
    {title:'Winter cold and water stress',mechanism:'The 2026 report documented elevated winter mortality. Oxygen, temperature and salinity remain important environmental pressures.',watch:'Winter mortality; water conditions',source:'crabReport'},
    {title:'Uncertain recruitment and predation',mechanism:'Scientists are investigating predator effects, habitat availability and ocean circulation; their contributions to decline are not yet resolved.',watch:'Juvenile recruitment; spawning females',source:'crabReport'},
    {title:'Harvest and spawning-stock protection',mechanism:'Managers were advised to remain cautious because adult females were below the target used in the report.',watch:'Current assessment; harvest guidance',source:'crabReport'}
  ]},
  'SP-002':{context:'Historic causes of oyster decline do not prove a current disease event in Harris Creek. The archive’s mortality and recruitment indices cover Maryland monitoring bars.',risks:[
    {title:'MSX and Dermo disease',mechanism:'These diseases have caused substantial oyster losses historically.',watch:'Disease surveys; observed mortality',source:'oysterLife'},
    {title:'Prolonged low salinity',mechanism:'Extended exposure below 5 ppt can cause significant mortality.',watch:'Salinity duration; freshwater flow',source:'oysterLife'},
    {title:'Sediment and low oxygen',mechanism:'Sediment can bury reefs; nutrient-driven blooms can contribute to low-oxygen water.',watch:'Sedimentation; dissolved oxygen',source:'nutrients'},
    {title:'Harvest legacy and limited reef material',mechanism:'Historic overfishing contributed to decline. Shell shortages also constrain restoration and hatchery production.',watch:'Reef structure; recruitment; restoration',source:'restoration'}
  ]},
  'HB-001':{context:'The 2024 survey reported losses in Tangier Sound. The news report does not assign a single measured cause to TANMH1. Check survey coverage before comparing years.',risks:[...grassRisks,
    {title:'Changes in habitat composition',mechanism:'Species differ in their responses to salinity and weather; regional totals can mask local shifts.',watch:'Grass species; survey extent',source:'grassReport'}]},
  'HB-002':{context:'The 2024 report linked some Choptank grass losses to lower salinity and changing runoff. This is regional evidence, not a causal measurement at the Harris Creek marker.',risks:[...grassRisks,
    {title:'Salinity shifts in the Choptank',mechanism:'The report described reduced salinity as one contributor to the 2024 decline.',watch:'Salinity; grass composition',source:'grassReport'}]}
};

export type ActivityPhase={id:string;months:number[];title:string;region:string;text:string;source:EcologySource};
// Month windows organize published seasonal descriptions; they are not observations.
export const activityPhases:Record<string,ActivityPhase[]>={
  'SP-001':[
    {id:'winter',months:[0,1,2,11],title:'Overwintering',region:'Bay bottom; females farther down-Bay',text:'Crabs shelter in bottom sediment; growth is limited in December–March.',source:'crabLife'},
    {id:'spring',months:[2,3,4],title:'Spring reactivation',region:'Bay and tributaries',text:'Warming water brings renewed feeding and activity.',source:'crabLife'},
    {id:'mating',months:[4,5,6,7,8,9],title:'Mating season',region:'Brackish Bay waters',text:'Females mate at their final molt, generally May–October.',source:'crabLife'},
    {id:'spawn',months:[5,6,7,8],title:'Female migration and spawning',region:'Saltier lower Bay, near the ocean',text:'Mated females move down-Bay; fertilization generally occurs June–September.',source:'crabLife'},
    {id:'larvae',months:[5,6,7,8],title:'Larval dispersal and nursery return',region:'Coastal waters → lower-Bay grass beds',text:'Currents transport larvae; returning young settle in nursery habitat.',source:'crabLife'},
    {id:'autumn',months:[8,9,10],title:'Autumn redistribution',region:'Grass beds, mud and channel edges',text:'Cooling water prompts movement toward winter shelter; females remain farther down-Bay.',source:'crabLife'}
  ],
  'SP-002':[
    {id:'resident',months:[0,1,2,3,4,5,6,7,8,9,10,11],title:'Resident reef population',region:'Hard-bottom oyster bars and reefs',text:'Settled oysters remain attached. Adults do not undertake a seasonal migration.',source:'oysterLife'},
    {id:'spawn',months:[5,6,7,8],title:'Spawning',region:'Water above oyster bars',text:'June–September is the usual spawning window; eggs and sperm enter the water.',source:'oysterLife'},
    {id:'larvae',months:[5,6,7,8],title:'Larval dispersal and settlement',region:'Water column → suitable hard substrate',text:'Larvae spend about two to three weeks in the water before attaching as spat. Transport depends on currents.',source:'oysterLife'},
    {id:'recovery',months:[8,9,10],title:'Post-spawning recovery',region:'Existing reefs',text:'Adults rebuild condition as weather cools after spawning.',source:'oysterGuide'}
  ]
};
export const recentActivityEvidence:Record<string,{date:string;period:string;text:string;source:EcologySource}[]>={
  'SP-001':[{date:'2026-06-30',period:'Winter 2025–26',text:'The advisory report documented winter mortality while crabs overwintered in bottom sediment. It did not provide individual movement tracks.',source:'crabReport'}],
  'SP-002':[{date:'2026-03-09',period:'Summer–fall 2025',text:'DNR reported strong juvenile settlement in the fall survey following summer spawning. These are recruitment observations, not tracked larval routes.',source:'oysterRecent'}]
};
export type ConservationStory={id:string;published:string;period:string;category:string;title:string;summary:string;relevance:string;records:string[];source:EcologySource};
export const conservationStories:ConservationStory[]=[
  {id:'pollution-2026',published:'2026-08-06',period:'Modeled 2009–2025 change',category:'Conservation effort',title:'Pollution reductions advance; nutrient goals remain unfinished',summary:'The Bay Program reported that the watershed sediment goal had been met, while nitrogen and phosphorus work continues. Wastewater upgrades and runoff controls contributed to reductions.',relevance:'Clearer water supports grass beds; less nutrient pollution can reduce low-oxygen stress. These are watershed model results, not local sensor readings.',records:['SP-001','SP-002','HB-001','HB-002'],source:'nutrients'},
  {id:'crab-management-2026',published:'2026-06-30',period:'2026 advisory recommendations',category:'Species management',title:'Crab managers advised to remain cautious',summary:'The annual advisory recommended cautious fishery management despite improved recruitment. It reported no overfishing under the biological reference points used.',relevance:'Spawning-stock protection remains relevant to blue crab conservation. Population measurements are in the species profile.',records:['SP-001'],source:'crabReport'},
  {id:'oyster-restoration-2026',published:'2026-02-20',period:'Restoration milestone by end of 2025',category:'Restoration',title:'Oyster restoration reaches all ten target tributaries',summary:'NOAA’s updated restoration overview confirms completion of the ten-tributary goal, plus an additional tributary. Monitoring and continued restoration remain priorities.',relevance:'Harris Creek is part of Maryland’s restoration effort. This milestone does not measure underwater grass recovery in CHOMH1.',records:['SP-002','HB-002'],source:'restoration'},
  {id:'grass-change-2025',published:'2025-08-05',period:'2024 aerial survey',category:'Ecological change',title:'Mid-Bay grass losses offset gains elsewhere',summary:'The Bay Program reported 2024 grass losses in the Choptank, Little Choptank and Tangier Sound, despite recovery in other regions.',relevance:'Both archived grass habitats are relevant to this regional change. Salinity and runoff were discussed as pressures; the report is not a diagnosis of every bed.',records:['HB-001','HB-002','SP-001'],source:'grassReport'}
];
