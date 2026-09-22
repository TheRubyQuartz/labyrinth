import {useState} from 'react';
import {CrabBiologyLab} from './crab-biology-lab';
import type {ReactNode} from 'react';
import {ArrowUpRight,Eye,Shield,Activity,Brain,Focus,ChevronRight} from 'lucide-react';

const features=[
 {title:'A living estuary specialist',label:'THE WHOLE ORGANISM',icon:Focus,body:'A swimmer, bottom-dwelling forager and seasonal migrant. Explore how one body supports life across changing coastal waters.',target:'crab-world-map'},
 {title:'Sense the surroundings',label:'SENSORY SYSTEM',icon:Eye,body:'Compound eyes gather visual information; chemical cues help the crab locate food and recognize potential mates.',target:'overview-mind'},
 {title:'Protection that can grow',label:'STRUCTURE',icon:Shield,body:'A mineralized external skeleton protects the body. Growth requires molting, temporarily exchanging rigid protection for a larger, soft new shell.',target:'overview-body'},
 {title:'Built for more than walking',label:'MOVEMENT',icon:Activity,body:'Rear swimming paddles complement walking legs and grasping claws. The crab can forage on the bottom and move through the water.',target:'overview-disposition'}
];
export function CrabOverviewHero(){const [active,setActive]=useState(0);const f=features[active];return <div className="crab-experience-hero"><div className="experience-image"><img src={`${import.meta.env.BASE_URL}blue-crab-hero.png`} alt="Illustrated blue crab with olive carapace, blue limbs and extended claws" width="1672" height="941"/><span className="experience-image-tag">CALLINECTES SAPIDUS / SPECIES ATLAS</span><div className="experience-image-caption">An estuary.<br/>An entire world.</div></div><div className="experience-hero-console"><div className="experience-feature-nav" role="group" aria-label="Explore blue crab features">{features.map((item,i)=><button key={item.title} aria-label={item.label} aria-pressed={active===i} onClick={()=>setActive(i)}><item.icon size={19}/><span>0{i+1}</span></button>)}</div><div aria-live="polite"><span className="experience-eyebrow">{f.label}</span><h3>{f.title}</h3><p>{f.body}</p><a href={'#'+f.target}>Explore this system <ArrowUpRight size={14}/></a></div><div className="experience-evidence-note">Illustrated portrait · features explained in the sourced profile below</div></div></div>}

const responses=[
 {name:'Food cues',signal:'Chemical information',response:'Search & approach',body:'Waterborne food cues guide searching. Odor detection works with water movement and contact sensing as the crab locates a possible meal.',source:'https://www.dnr.sc.gov/marine/pub/seascience/bluecrab.html'},
 {name:'An approaching threat',signal:'Visual / contact cues',response:'Defend or retreat',body:'A threatened blue crab may raise or extend its claws, move away or swim off. The response depends on the encounter and its ability to escape.',source:'https://www.dnr.sc.gov/marine/pub/seascience/bluecrab.html'},
 {name:'A recent molt',signal:'Soft new exoskeleton',response:'Seek protection',body:'A newly molted crab is more vulnerable until its covering hardens. Shelter and concealment reduce exposure during this transition.',source:'https://www.chesapeakebay.net/news/blog/clues-of-a-growing-blue-crab'},
 {name:'Cooling water',signal:'Seasonal conditions',response:'Reduce activity',body:'In the Chesapeake Bay, winter cold reduces activity and crabs shelter in bottom sediment. This is a seasonal response, not a permanent behavioral trait.',source:'https://www.chesapeakebay.net/discover/faq/category/blue-crabs'}
];
export function CrabBiologyExperience({children}:{children:ReactNode}){return <div className="biology-experience"><CrabBiologyLab responses={responses}/>{children}</div>}
