import type {CrabCollection,CrabRecord,CrabMedia} from './crab-collections';
import photographs from './crab-media-catalog.json';
// Successfully acquired licensed copies; source and creator metadata remain on each record.
const localPhotographs=new Set([1,2,7,9,10,21,22,23,24,25,26,27,28,29,31,35,40,42,45,46,47,48,49,50,52,53,55,56,57,58,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81]);
const photoAsset=(index:number)=>import.meta.env.BASE_URL+'crab-collection/image-'+index+([47,63].includes(index)?'.png':'.jpg');
const photoTitles:Record<number,string>={60:'Molting sequence · first stages',61:'Molting sequence · later stages',65:'Female abdominal forms',66:'Carapace detail',67:'Eye detail',68:'Ventral anatomy · view 1',69:'Ventral anatomy · view 2',70:'Ventral anatomy · view 3',71:'Ventral anatomy · view 4',72:'Ventral anatomy · view 5',73:'Ventral anatomy · view 8',74:'Ventral anatomy · view 9',75:'Megalops-stage illustration',76:'Zoeal development · plate 1',77:'Zoeal development · plate 2',78:'Juvenile appendages',79:'Zoeal development · plate 3',80:'Zoeal development · plate 4'};
const noaa='https://www.fisheries.noaa.gov/species/blue-crab';
const nursery='https://serc.si.edu/blue-crabs-and-fishery/identifying-blue-crab-nursery-hot-spots';
const parasite='https://www.vims.edu/research/units/programs/crustacean/research/diseases_blue_crab/';
const acoustic='https://upcommons.upc.edu/server/api/core/bitstreams/5cf8ba25-eb5b-4ffd-8263-4d2d52512b3c/content';
const noise='https://pmc.ncbi.nlm.nih.gov/articles/PMC8800386/';
const review='https://tethys.pnnl.gov/sites/default/files/publications/Sole_et_al_Marine_invertebrates_and_noise.pdf';
const foraging='https://repository.gatech.edu/server/api/core/bitstreams/1a2dfe0d-3c55-4f8a-a9ca-6e5ac6ba5b86/content';
const pots='https://spo.nmfs.noaa.gov/sites/default/files/pdf-content/2011/1091/sturdivant.pdf';
const autotomy='https://pubmed.ncbi.nlm.nih.gov/29304667/';
const cannibal='https://pubmed.ncbi.nlm.nih.gov/41838903/';
const migration='https://pubmed.ncbi.nlm.nih.gov/26018830/';
const delta='https://www.studisulqui.it/eng/stagione-04/fonografie-del-delta-provvisorio/';
const pdf=(url:string):CrabMedia=>({type:'pdf',url});
const item=(title:string,kind:string,description:string,source:string,credit:string,focus:string,media?:CrabMedia):CrabRecord=>({title,kind,focus,description,source,credit,scope:'Callinectes sapidus',media,inspect:['Read the object and its caption together.','Compare the documented observation with the surrounding archive account.','Keep the date, location and evidence type attached to any interpretation.']});
type Row=[string,string,string,string,string,string,CrabMedia?];
const additions:Record<string,Row[]>={
 overview:[
 ['NOAA species profile','Species account','A concise identification, life-history and management overview. Native range and fishery context are distinguished from introduced populations.',noaa,'NOAA Fisheries','Species identity'],
 ['Blue-crab life cycle','Life-history account','The egg, larval, juvenile and adult stages are organized as a development sequence, not as separate species.','https://www.cbf.org/resources/blue-crab-lifecycle/','Chesapeake Bay Foundation','Life cycle'],
 ['Early lives of blue crabs','Education collection','An investigation of early life stages and the risks faced before adulthood.','https://www.cbf.org/resources/early-lives-of-blue-crabs/','Chesapeake Bay Foundation','Development'],
 ['Nursery origins','Research project','Shell chemistry is investigated as a way to connect mature females to nursery locations.',nursery,'Smithsonian SERC','Research'],
 ['Crab identification worksheet','Illustrated document','A labeled-body and abdominal-form learning sheet from the Chesapeake estuary workbook.','https://serc.si.edu/sites/default/files/pictures/Education/estuary_chesapeake_workbook_pt2.pdf','Smithsonian SERC','Identification',pdf('https://serc.si.edu/sites/default/files/pictures/Education/estuary_chesapeake_workbook_pt2.pdf')],
 ['Panama Canal preserved specimen','Specimen record','A preserved male collected at Gatun Locks in 1974. The collection locality is Panama, not Chesapeake Bay.','https://www.si.edu/object/callinectes-sapidus%3Anmnhinvertebratezoology_12407282','Smithsonian NMNH · 1974 collection','Specimen provenance'],
 ['Long-term juvenile predation','Research study','A 37-year experiment separates juvenile size, habitat and predation; its site-specific results are not universal mortality rates.',cannibal,'Hines and collaborators · 1989–2025 field series','Ecology'],
 ['Disease research overview','Research program','A laboratory overview introduces the pathogens investigated in blue crabs and the questions behind disease ecology.','https://www.vims.edu/research/units/programs/crustacean/','VIMS · Crustacean Diseases','Health'],
 ['Atlantic range and invaded regions','Research document','A distribution review documents occurrence records and spatial patterns outside the native range.','https://gaia.oec.fr/documents/4a1a7223b11114e4afc3974f8004c8c9.pdf','Published distribution review · 2024','Geography',pdf('https://gaia.oec.fr/documents/4a1a7223b11114e4afc3974f8004c8c9.pdf')]
 ],
 infrastructure:[
 ['Biogeochemical shell tracers','Research method','Element and isotope signatures in hardened shell are investigated as natural location markers.',nursery,'Smithsonian SERC','Laboratory technology'],
 ['Mark–recapture tags','Research method','Known release sites and later recaptures provide an independent test of shell-origin assignments.',nursery,'Smithsonian SERC','Tracking'],
 ['Miniature pressure sensors','Research document','A spawning-migration study compares crab depth records with water-level and current measurements.','https://citeseerx.ist.psu.edu/document?doi=19bb80bbff4709504e3c5f6573267c753b2350c2&repid=rep1&type=pdf','Hench et al. · 2004','Instrumentation',pdf('https://citeseerx.ist.psu.edu/document?doi=19bb80bbff4709504e3c5f6573267c753b2350c2&repid=rep1&type=pdf')],
 ['Acoustic receiver network','Research study','Transmitter detections support migration tracking; the emitted pulses come from equipment, not crab vocalizations.',migration,'2015 · White Oak River migration study','Tracking'],
 ['Crab pots as sampling devices','Research document','Behavior can bias trap-based abundance estimates. This study investigates the interaction between capture equipment and the animals it samples.',pots,'Sturdivant & Clark · Fishery Bulletin · 2011','Sampling equipment',pdf(pots)],
 ['Recirculating shedding systems','Engineering record','An archived design publication concerns human-built soft-shell production systems, not structures built by crabs.','https://repository.library.noaa.gov/view/noaa/40274','NOAA repository','Aquaculture'],
 ['Hydrophone and maze apparatus','Research document','The experimental setup combines underwater sound measurement with recorded foraging trials.',acoustic,'Solé et al. · 2023','Acoustic instruments',pdf(acoustic)],
 ['Parasite detection methods','Research paper','Molecular detection methods examine pathogens in blue-crab samples.','https://journals.asm.org/doi/10.1128/AEM.02132-07','Applied and Environmental Microbiology · 2008','Laboratory technology'],
 ['Specimen digitization workflow','Research account','The Smithsonian describes the conversion of a crab specimen into a digital surface.','https://sercblog.si.edu/blue-crabs-come-to-life-in-3d/','Smithsonian SERC · 2014','3D scanning']
 ],
 transport:[
 ['Free-ranging spawning trajectories','Research study','Ultrasonic tracking investigates horizontal movement during spawning migration.','https://www.sciencedirect.com/science/article/pii/S0272771404000605','Estuarine, Coastal and Shelf Science · 2004','Adult migration'],
 ['Juvenile swimming rhythms','Research document','Swimming timing is investigated against light–dark and tidal cycles.','https://www.vliz.be/imisdocs/publications/ocrd/54794.pdf','Journal of Experimental Marine Biology and Ecology · 2004','Rhythms',pdf('https://www.vliz.be/imisdocs/publications/ocrd/54794.pdf')],
 ['Testing tidal-stream transport','Research document','Vertical migration observations test a proposed sequence of ebb- and flood-tide transport.','https://citeseerx.ist.psu.edu/document?doi=19bb80bbff4709504e3c5f6573267c753b2350c2&repid=rep1&type=pdf','Hench et al. · 2004','Tidal movement',pdf('https://citeseerx.ist.psu.edu/document?doi=19bb80bbff4709504e3c5f6573267c753b2350c2&repid=rep1&type=pdf')],
 ['White Oak River migration','Research study','Active and passive acoustic tracking examine female travel along an estuarine corridor.',migration,'2015 · migration study','Adult migration'],
 ['Tidal versus nontidal estuaries','Research study','A comparison of large-scale movements after mating across two estuary types.','https://doi.org/10.1002/tafs.10058','Darnell & Kemberling · 2018','Migration comparison'],
 ['Mediterranean lagoon activity','Research study','An acoustic-positioning study describes movements and activity in an invaded lagoon.','https://link.springer.com/article/10.1007/s12237-026-01768-5','Estuaries and Coasts · 2026','Introduced population'],
 ['Odor-guided searching','Research document','Chemical and flow information are studied together during food searches.',foraging,'Georgia Tech research repository','Foraging movement',pdf(foraging)],
 ['Nursery-to-spawning connection','Research project','Shell signatures and recapture evidence connect origin and later location; they do not reconstruct every turn taken.',nursery,'Smithsonian SERC','Migration evidence'],
 ['Larval distribution in coastal water','Research document','A 2024 study examines early stages and salinity in a colonized estuary/coastal system.','https://riunet.upv.es/server/api/core/bitstreams/01dec991-268a-4011-a729-10b33a7cc650/content','Gil-Fernández et al. · 2024','Larval transport',pdf('https://riunet.upv.es/server/api/core/bitstreams/01dec991-268a-4011-a729-10b33a7cc650/content')]
 ],
 business:[
 ['Color in mate choice','Behavioral study','Controlled choices investigate the role of female claw coloration in male courtship.','https://pubmed.ncbi.nlm.nih.gov/19880739/','Baldwin & Johnsen · 2009','Animal behavior'],
 ['Claw color and body size','Thesis','A study of female cheliped coloration and reproductive behavior.','https://oaktrust.library.tamu.edu/items/ad4905da-f264-4ca7-93b5-eac935affdc5','Texas A&M repository · 2004','Animal behavior'],
 ['Limb loss and mate competition','Behavioral study','Experiments investigate how missing appendages affect competition for mates.','https://pubmed.ncbi.nlm.nih.gov/28311879/','Oecologia · 1992','Competition'],
 ['Cannibalism across decades','Field study','Juvenile encounters with larger conspecifics are studied across habitats and years.',cannibal,'37-year Chesapeake field experiment','Animal interaction'],
 ['Trap encounters and competition','Research document','An investigation of animal behavior inside and around sampling pots.',pots,'Sturdivant & Clark · 2011','Animal interaction',pdf(pots)],
 ['Noise and competitive behavior','Research study','An exposure experiment includes competitive behavior as well as physiological measurements.',noise,'Hudson et al. · 2022','Behavior and disturbance'],
 ['Po Delta clam-farming impacts','Research preprint','Field data examine economic effects of an introduced crab on clam fishing. The record is a preprint.','https://arxiv.org/abs/2502.07095','Authors’ preprint · 2025','Human economy',pdf('https://arxiv.org/pdf/2502.07095')],
 ['Chesapeake fishery governance','Agency account','Three jurisdictions coordinate around shared scientific assessments while retaining their own management responsibilities.',noaa,'NOAA Fisheries','Human institutions'],
 ['Blue crabs: the soul of Chesapeake Bay','Student documentary','A Smithsonian-hosted class film examines blue crabs and the Bay.','https://www.si.edu/object/bluecrabs-soul-chesapeake-bay%3Ayt_iUOMVPo4tRk','Smithsonian SERC · student production','Human significance',{type:'youtube',url:'iUOMVPo4tRk'}]
 ],
 fitness:[
 ['Hematodinium infection','Disease record','A parasitic dinoflagellate infects blue-crab hemolymph. This historical reference is not a live outbreak report.',parasite,'VIMS · historical disease review','Parasites'],
 ['Ameson and cotton-crab disease','Disease record','The review describes a microsporidian associated with muscle damage.',parasite,'VIMS · historical disease review','Parasites'],
 ['Egg parasites','Disease record','The review distinguishes fungal egg infection from nemertean egg predators.',parasite,'VIMS · historical disease review','Reproductive health'],
 ['Gray-crab disease','Disease record','A historical account of amoebic infection and its tissue effects.',parasite,'VIMS · historical disease review','Parasites'],
 ['Parasite life cycle in culture','Research account','Laboratory work traces successive stages of Hematodinium.','https://www.vims.edu/newsandevents/topstories/archives/2012/hema_life_cycle.php','VIMS · 2012','Disease research'],
 ['Shell disease and tissue metals','Research study','Diseased and nondiseased animals from different estuaries were compared for tissue metal content.','https://pubmed.ncbi.nlm.nih.gov/1456781/','1992 · Albemarle–Pamlico study','Environmental health'],
 ['Infection and predator exposure','Behavioral study','Hematodinium infection is investigated alongside burial, habitat choice and predation.','https://www.sciencedirect.com/science/article/abs/pii/S0022098114002512','2015 · experimental marine ecology study','Disease effects'],
 ['Acoustic exposure and sensory systems','Research document','The study distinguishes olfactory performance from righting response and statocyst condition.',acoustic,'Solé et al. · 2023','Sensory health',pdf(acoustic)],
 ['Oysters and parasite transmission','Research account','A VIMS report describes experiments in which oyster filtration reduced parasite transmission.','https://glados.vims.edu/newsandevents/topstories/2026/ecology-oysters-filter-disease.php','VIMS · Ecology study · 2026','Ecological protection']
 ],
 agriculture:[
 ['Limb autotomy survey','Research study','Field comparisons document missing and regenerating limbs across regions, sizes and years.',autotomy,'Smith & Hines · 1991','Injury and escape'],
 ['Mate competition after limb loss','Research study','Appendage loss is investigated as a constraint on competitive encounters.','https://pubmed.ncbi.nlm.nih.gov/28311879/','Oecologia · 1992','Competition'],
 ['Cannibalism and shallow refuge','Field study','A long-term tethering experiment tests relative predation risk by depth and body size.',cannibal,'1989–2025 · Chesapeake experiment','Predation'],
 ['Disease and defensive habitat use','Behavioral study','Infection is compared with burial and substrate use under predator exposure.','https://www.sciencedirect.com/science/article/abs/pii/S0022098114002512','2015 · Hematodinium behavior study','Vulnerability'],
 ['Trap-mediated encounters','Research document','Confinement, bait and body size can alter the behavior observed in a sampling pot.',pots,'Sturdivant & Clark · 2011','Competition',pdf(pots)],
 ['Mediterranean bivalve predation','Research document','Mesocosm experiments investigate prey choice among native bivalves.','https://d-nb.info/1362402737/34','Feeding behavior and preference study · 2025','Feeding mechanics',pdf('https://d-nb.info/1362402737/34')],
 ['Predation in a stage-structured model','Research preprint','A mathematical model separates density-dependent predation, cannibalism and fishing; it is not a video of an encounter.','https://arxiv.org/abs/2011.08308','Authors’ preprint · 2020','Population consequences',pdf('https://arxiv.org/pdf/2011.08308')],
 ['Clam handling','Observation video','National Geographic footage selected in a Smithsonian education resource shows claws and mouthparts during feeding.','https://serchomeschool.wordpress.com/2013/09/','National Geographic · Smithsonian education selection','Feeding mechanics',{type:'youtube',url:'vJUG8UvY-lk'}],
 ['Competition after sound exposure','Research study','Behavioral effects are examined after simulated vessel and sonar noise.',noise,'Hudson et al. · 2022','Disturbance']
 ],
 nature:[
 ['Bay nursery contributions','Research project','Shell tracers examine which nursery areas contribute females to the spawning stock.',nursery,'Smithsonian SERC','Nursery habitat'],
 ['Juvenile habitat model','Research preprint','Bayesian models use long-term survey observations to investigate nursery habitat value.','https://arxiv.org/abs/2201.06926','Authors’ preprint · 2022','Habitat modeling',pdf('https://arxiv.org/pdf/2201.06926')],
 ['European distribution review','Research document','A georeferenced literature review compiles introduced-range observations and their location accuracy.','https://gaia.oec.fr/documents/4a1a7223b11114e4afc3974f8004c8c9.pdf','Distribution and spatial-structure review · 2024','Range expansion',pdf('https://gaia.oec.fr/documents/4a1a7223b11114e4afc3974f8004c8c9.pdf')],
 ['Bay of Cádiz invasion dynamics','Research paper','Monitoring compares habitat conditions and crab abundance in an aquaculture-modified salt marsh.','https://www.sciencedirect.com/science/article/pii/S0025326X25014481','Marine Pollution Bulletin · 2025','Introduced habitat'],
 ['Mediterranean lagoon movement','Research paper','Acoustic telemetry examines activity and movement of introduced adults.','https://link.springer.com/article/10.1007/s12237-026-01768-5','Estuaries and Coasts · 2026','Habitat use'],
 ['Blue crabs as trace-metal biomonitors','Research document','A study examines why opportunistic feeding complicates environmental metal interpretation.','https://airus.unisalento.it/retrieve/733cbf60-cf1d-47f2-9ac5-17f012d71bb0/101_MPB_5sites_callinectes.pdf','Marine Pollution Bulletin · 2024','Environmental chemistry',pdf('https://airus.unisalento.it/retrieve/733cbf60-cf1d-47f2-9ac5-17f012d71bb0/101_MPB_5sites_callinectes.pdf')],
 ['Early stages and estuarine salinity','Research document','Larval occurrence and salinity are examined in a colonized coastal system.','https://riunet.upv.es/server/api/core/bitstreams/01dec991-268a-4011-a729-10b33a7cc650/content','Gil-Fernández et al. · 2024','Larval environment',pdf('https://riunet.upv.es/server/api/core/bitstreams/01dec991-268a-4011-a729-10b33a7cc650/content')],
 ['Sound as an environmental stressor','Research study','Noise exposure is assessed alongside physiological and behavioral responses.',noise,'Hudson et al. · 2022','Acoustic environment'],
 ['Po Delta ecology and biochemistry','Research document','An integrated study examines management of an introduced lagoon population.','https://www.frontiersin.org/journals/marine-science/articles/10.3389/fmars.2026.1803835/pdf','Frontiers in Marine Science · 2026','Lagoon ecology',pdf('https://www.frontiersin.org/journals/marine-science/articles/10.3389/fmars.2026.1803835/pdf')]
 ],
 survival:[
 ['Juvenile refuge experiment','Field study','A multidecade experiment compares relative predation exposure by crab size and water depth.',cannibal,'37-year Chesapeake study','Predator avoidance'],
 ['Limb loss and regeneration','Research study','Patterns of missing and regrowing appendages provide evidence about injury and survival.',autotomy,'Smith & Hines · 1991','Injury response'],
 ['Migration corridors','Research study','Tracking examines routes relevant to protection of the spawning stock.',migration,'White Oak River study · 2015','Migration protection'],
 ['Nursery contributions to spawning','Research project','Nursery-origin methods seek to connect habitat protection with reproductive contribution.',nursery,'Smithsonian SERC','Nursery protection'],
 ['Disease life-cycle research','Research account','Understanding the parasite life cycle supports investigation of transmission and host losses.','https://www.vims.edu/newsandevents/topstories/archives/2012/hema_life_cycle.php','VIMS · 2012','Disease pressure'],
 ['Population model: fishing and cannibalism','Research preprint','A stage-structured model explores interactions among harvest and biological mortality.','https://arxiv.org/abs/2011.08308','Authors’ preprint · 2020','Population dynamics',pdf('https://arxiv.org/pdf/2011.08308')],
 ['North Carolina management evidence','Management document','A dated fishery-plan revision assembles disease and biological context; it should not be treated as the current rulebook.','https://www.deq.nc.gov/marine-fisheries/fisheries-management/blue-crab/fmp-amendment-3-2023-revision/open','North Carolina DEQ · 2023 revision','Management evidence',pdf('https://www.deq.nc.gov/marine-fisheries/fisheries-management/blue-crab/fmp-amendment-3-2023-revision/open')],
 ['2008 fishery disaster reporting','Historical news film','Contemporaneous reporting documents the fishery crisis and its human consequences.','https://www.youtube.com/watch?v=2kKlt8aw_5g','Voice of America · 26 September 2008','Historical pressures',{type:'youtube',url:'2kKlt8aw_5g'}],
 ['Oyster filtration and disease reduction','Research account','Experimental evidence links oyster filtration with reduced parasite transmission to crabs.','https://glados.vims.edu/newsandevents/topstories/2026/ecology-oysters-filter-disease.php','VIMS · 2026','Ecological resilience']
 ]
};

const videoRows:Row[]=[
 ['Blue Crabs: Top Predator in Peril','Documentary','Historical Smithsonian film about blue-crab research and Chesapeake livelihoods.','https://ecosystemsontheedge.org/top-predator/','Smithsonian · Ecosystems on the Edge','Ecology',{type:'youtube',url:'4COzo5koWgk'}],
 ['Tracking and monitoring blue crabs','Research film','Researchers capture, identify, tag and release crabs during population studies.','https://serc.si.edu/resources/video-tracking-and-monitoring-blue-crab-populations','Smithsonian SERC','Fieldwork',{type:'youtube',url:'X_B1vwXFIF8'}],
 ['Molting and mating','Education film','A Smithsonian explanation of two linked parts of blue-crab life history.','https://collections.si.edu/search/detail/edanmdm%3Ayt_EFG87XDLZ6U','Smithsonian · 2008 · 2:16','Life cycle',{type:'youtube',url:'EFG87XDLZ6U'}],
 ['The soul of Chesapeake Bay','Student documentary','A class-project film on the blue crab and its regional significance.','https://www.si.edu/object/bluecrabs-soul-chesapeake-bay%3Ayt_iUOMVPo4tRk','Smithsonian SERC','Culture',{type:'youtube',url:'iUOMVPo4tRk'}],
 ['Bay 101: Blue Crabs','Education film','A Chesapeake Bay Program film about the crab’s cultural, economic and ecological roles.','https://www.chesapeakebay.net/discover/videos/bay-101-blue-crabs','Chesapeake Bay Program','Ecology',{type:'vimeo',url:'1118892072?h=12a936f59f'}],
 ['Introducing blue crabs','Education film','The VIMS summer learning series introduces the animal and its importance.','https://www.vims.edu/cbnerr/summer-on-bay/','VIMS · Chesapeake Bay NERR','Identification',{type:'youtube',url:'5VIeof3j2RQ'}],
 ['Identifying crab sex','Education film','Compare abdominal forms using the VIMS identification lesson.','https://www.vims.edu/cbnerr/summer-on-bay/','VIMS · Chesapeake Bay NERR','Anatomy',{type:'youtube',url:'JkkLkicCKdA'}],
 ['Blue crab shedding: time-lapse','Observation film','A time-lapse shows shedding; playback speed is not the duration of a natural molt.','https://www.vims.edu/cbnerr/summer-on-bay/','VIMS · Chesapeake Bay NERR','Molting',{type:'youtube',url:'R4Yc-pEB0dU'}],
 ['Draw a blue crab','Art lesson','A VIMS education video translates the crab’s outline into a drawing.','https://www.vims.edu/cbnerr/summer-on-bay/','VIMS · Chesapeake Bay NERR','Art',{type:'youtube',url:'WV67sNmvPBs'}],
 ['Clam feeding and mouthparts','Observation film','Blue-crab feeding footage selected in the Smithsonian’s teaching resources.','https://serchomeschool.wordpress.com/2013/09/','National Geographic · SERC education selection','Feeding',{type:'youtube',url:'vJUG8UvY-lk'}],
 ['Low-tide ambush pits','Field observation film','VIMS footage documents blue crabs hunting fiddler crabs from shallow marsh pits. These are structures the crabs occupy and excavate, rather than human-built research equipment.','https://www.vims.edu/newsandevents/topstories/2022/low_tide_attack.php','VIMS · David Johnson and collaborators · 2022','Habitat engineering and predation',{type:'youtube',url:'6TIJp2eUlqE'}],
 ['The 2008 Chesapeake crab crisis','Historical news film','A contemporary report from the declared fishery disaster. Historical numbers are not present-day estimates.','https://www.youtube.com/watch?v=2kKlt8aw_5g','Voice of America · 2008','History',{type:'youtube',url:'2kKlt8aw_5g'}]
];

export function expandCrabCollections(base:Record<string,CrabCollection>){const result:Record<string,CrabCollection>=Object.fromEntries(Object.entries(base).map(([k,v])=>[k,{...v,records:[...v.records]}]));for(const [section,rows]of Object.entries(additions))result[section].records.push(...rows.map(r=>item(...r)));
 const imageRecord=(index:number,title?:string)=>{const p=photographs.find(p=>p.researchIndex===index)!;const local=localPhotographs.has(index)?photoAsset(index):undefined;return item(title||photoTitles[index]||p.title.replace(/\.(jpg|jpeg|png|svg)$/i,'').replace(/^FMIB \d+ /,'').replace(/_/g,' ').replace('BlueCrab','Blue crab'),'Image',p.description||'Source-catalogued blue-crab visual.',p.source,p.credit||'Creator not supplied in source metadata',p.category.includes('illustrations')?'Historical illustration':p.category.includes('anatomy')?'Anatomy':p.category.includes('developmental')?'Development':'Photography',{type:'image',url:local||p.original,thumbnail:local||p.image,license:p.license,licenseUrl:p.licenseUrl})};
 result.graphics.records.push(...[1,7,9,10,21,22,28,31,40,42,46,47,48,49,62,65].map(i=>imageRecord(i)));
 result.animation.records.push(...[50,52,53,55,56,57,60,61,62,63].map(i=>imageRecord(i)));
 result.modeling.records.push(...[28,65,66,67,68,69,70,71,72,73,74,75,78].map(i=>imageRecord(i)));
 result.fitness.records.push(...[60,61,81,76,77].map(i=>imageRecord(i)));
 result.infrastructure.records.push(item(...videoRows[10]));
 result.infrastructure.records.push(imageRecord(45,'Experimental aquarium installation'),imageRecord(46,'Crab with attached tracking equipment'));
 result.film.records=videoRows.map(r=>item(...r));
 const soundRows:Row[]=[
 ['Ca’ Mello hydrophone recording','Field recording','A real underwater recording from the Po Delta. The recordist attributes the pulses to blue crabs; species attribution has not been independently validated. No claim of an isolated crab vocalization is made.',delta,'Studi sul qui · Fonografie del Delta · recording 6','Recordist-attributed crab sounds',{type:'audio',url:'https://www.studisulqui.it/public/wp-content/uploads/SS4_FRVLL_Fonografie_6.mp3'}],
 ['Cross-sensory interference','Research document','Full open-access paper on sound exposure, foraging and sensory effects in blue crabs.',acoustic,'Solé et al. · 2023','Species acoustics',pdf(acoustic)],
 ['Vessel noise and sonar exposure','Research study','An open-access study of blue crabs and lobsters measures behavioral and physiological responses.',noise,'Hudson et al. · 2022','Species acoustics'],
 ['Marine invertebrates and noise','Research document','Review with blue-crab sensory-organ illustrations and exposure evidence. Other species are explicitly comparative.',review,'Solé and collaborators · review','Sensory anatomy',pdf(review)],
 ['Ultrasonic muscle telemetry','Research document','Electrodes and a transmitter turn feeding-muscle activity into receiver signals. The audible beeps are instrument output, not animal calls.','https://pdfs.semanticscholar.org/ca4a/f1b0627abc9311f485939d8822231f7a6716.pdf','Biological Bulletin · 1989','Acoustic instrumentation',pdf('https://pdfs.semanticscholar.org/ca4a/f1b0627abc9311f485939d8822231f7a6716.pdf')],
 ['Acoustic migration tracking','Research study','Transmitter and receiver methods follow female crabs along an estuary.',migration,'2015 · White Oak River study','Acoustic instrumentation'],
 ['Mediterranean acoustic tracking dataset','Dataset record','The catalog describes crab-tag detections collected in S’Ena Arrubia. These are telemetry signals, not natural calls.','https://www.vliz.be/en/imis?dasid=9042&module=dataset','VLIZ · European Tracking Network · 2022–2024','Acoustic instrumentation'],
 ['Lagoon acoustic-positioning study','Research paper','A 2026 study uses receiver detections to reconstruct introduced-crab activity.','https://link.springer.com/article/10.1007/s12237-026-01768-5','Estuaries and Coasts · 2026','Acoustic instrumentation'],
 ['River-edge soundscape','Field recording','A Po Delta water-edge recording contextualizes the habitat. It is not attributed to the crab.',delta,'Studi sul qui · recording 4','Habitat soundscape',{type:'audio',url:'https://www.studisulqui.it/public/wp-content/uploads/SS4_FRVLL_Fonografie_4.mp3'}],
 ['River-lock vibration','Field recording','A contact/hydrophone recording of infrastructure vibration provides an anthropogenic contrast—not a crab sound.',delta,'Studi sul qui · recording 5','Habitat soundscape',{type:'audio',url:'https://www.studisulqui.it/public/wp-content/uploads/SS4_FRVLL_Fonografie_5.mp3'}],
 ['Urban river hydrophone','Field recording','The recordist describes a human-dominated sound environment without audible aquatic animals.',delta,'Studi sul qui · recording 7','Habitat soundscape',{type:'audio',url:'https://www.studisulqui.it/public/wp-content/uploads/SS4_FRVLL_Fonografie_7.mp3'}],
 ['Soft Shell Crab','Spoken-word recording','Karen Holmberg reads a poem about Callinectes sapidus. Human cultural audio, not a species recording.','https://www.fishousepoems.org/soft-shell-crab/','Karen Holmberg · Fishouse · poem first published 2005','Cultural audio',{type:'audio',url:'https://www.fishousepoems.org/wp-content/themes/replay-new/archives/audio/Soft-Shell-Crab.mp3'}]
 ];
 result.sounds.records=soundRows.map(r=>item(...r));result.sounds.intro='Listen to the recordist-attributed crab field recording first. The collection separates species attribution, habitat soundscapes, acoustic research and human cultural audio; it does not claim twelve verified crab calls.';
 result.graphics.records[2].media=pdf(result.graphics.records[2].source);
 result.graphics.records[0].media={type:'image',url:import.meta.env.BASE_URL+'blue-crab-hero.png'};
 result.modeling.records[1].media={type:'model',url:'6cf206cdd27c4b42a0fc439ffb2e7505'};
 result.animation.records[0].media={type:'model',url:'6cf206cdd27c4b42a0fc439ffb2e7505'};
 result.animation.records[1].media={type:'image',url:import.meta.env.BASE_URL+'crab-collection/met-bronze-crab.jpg',license:'Public domain'};
 result.animation.records[2].media={type:'image',url:import.meta.env.BASE_URL+'crab-collection/met-obelisk-crab.jpg',license:'Public domain'};
 return result;
}
