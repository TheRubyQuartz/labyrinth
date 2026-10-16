import {useState} from 'react';
import type {CrabRecord} from './crab-collections';
import './section-connections.css';
const routes:Record<string,[string,string,string][]>= {
 overview:[['modeling','Inspect the specimen','Move from identity to anatomical form.'],['fitness','Follow development','Compare anatomy and molt stages.']],
 infrastructure:[['nature','See the habitat','Place shelters and sampling tools in context.'],['graphics','Read survey visuals','Connect equipment with the evidence it produces.']],
 transport:[['modeling','Examine moving parts','Inspect legs, joints and swimming paddles.'],['business','Movement as communication','Compare locomotion with courtship display.']],
 graphics:[['overview','Check identification','Read the species context behind the image.'],['animation','Compare artistic interpretations','Separate observational images from creative work.']],
 business:[['sounds','Listen for context','Explore recordings and their attribution.'],['transport','Examine behavioral movement','Connect displays with locomotion.']],
 fitness:[['modeling','Inspect body structures','Compare external form and anatomical components.'],['survival','Understand vulnerability','Connect molt stages with refuge and risk.']],
 agriculture:[['modeling','Inspect claws and armor','Explore the structures involved in defense.'],['survival','Follow escape and refuge','Compare physical defenses with habitat protection.']],
 modeling:[['graphics','Compare reference images','Check the sculpt against illustrated anatomy.'],['transport','Understand articulation','Connect component shapes to movement.']],
 animation:[['graphics','Compare scientific imagery','Explore the boundary between depiction and evidence.'],['business','Read cultural context','Connect creative objects with human communities.']],
 nature:[['infrastructure','Understand sampling','See how observations are collected.'],['survival','Explore pressures','Connect habitats with conservation evidence.']],
 survival:[['nature','Inspect habitat context','Read conditions alongside conservation claims.'],['fitness','Explore life-stage differences','Consider growth and vulnerability together.']],
 film:[['infrastructure','Identify field equipment','Follow documentary methods into the archive.'],['business','Explore the human story','Read behavioral studies and cultural context.']],
 sounds:[['business','Read behavioral context','Keep interpretations attached to evidence.'],['film','Explore visual context','Compare recordings with field footage.']]
};
export function SectionConnections({section}:{section:string}){return <section className="sc-connections" aria-label="Related sections"><small>CONTINUE EXPLORING</small><h3>Follow the connection.</h3><div>{(routes[section]||[]).map(([id,title,description])=><a key={id} href={`?entry=SP-001#crab-category-${id}`}><h4>{title} ↗</h4><p>{description}</p></a>)}</div></section>}
export function RecordNotebook({section,record}:{section:string;record:CrabRecord}){const key=`labyrinth-note:${section}:${record.title}`;const [note,setNote]=useState(()=>{try{return localStorage.getItem(key)||''}catch{return ''}});const [status,setStatus]=useState('');return <section className="sc-notebook" aria-label="Record notebook"><div><h5>Your observation</h5><button onClick={async()=>{try{await navigator.clipboard.writeText(`${record.title}. ${record.credit}. ${record.source}`);setStatus('Citation copied.')}catch{setStatus('Copy unavailable. Use the source citation above.')}}}>Copy citation</button></div><label>Notes for this record<textarea maxLength={6000} value={note} placeholder="What did you notice? Keep observations separate from interpretations." onChange={e=>{setNote(e.target.value);try{localStorage.setItem(key,e.target.value);setStatus('Note saved on this device.')}catch{setStatus('Storage unavailable; this note will not persist.')}}}/></label><small>Private to this browser profile; not uploaded. Avoid sensitive information.</small><p role="status">{status}</p></section>}
const destinations:Record<string,[string,string,string][]>= {
 archive:[['?view=map','Explore by place','Locate archived subjects in their geographic context.'],['?view=news','Follow the evidence','Read sourced stories connected to archive records.']],
 map:[['?view=archive','Look beyond the map','Compare subjects and inspect source records.'],['?view=news#news-evidence','Read with context','Check reporting dates and original sources.']],
 marketplace:[['?view=map','Understand the location','Explore the places associated with sample listings.'],['?view=archive','Research before choosing','Review subject information and supporting evidence.']],
 news:[['?view=archive','Go deeper than the story','Inspect the objects and sources behind the reports.'],['?view=map','Put the story in place','Explore the geographic context of archive records.']]
};
export function DestinationConnections(){const params=new URLSearchParams(location.search);if(params.has('entry'))return null;const items=destinations[params.get('view')||''];if(!items)return null;return <section className="sc-connections" aria-label="Connected destinations"><small>YOUR NEXT DISCOVERY</small><h3>Keep exploring.</h3><div>{items.map(([url,title,description])=><a href={url} key={url}><h4>{title} ↗</h4><p>{description}</p></a>)}</div></section>}
