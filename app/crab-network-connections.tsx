import {useId,useRef,useState} from 'react';
import {Building2,Users,ArrowUpRight,ShieldCheck,ShieldAlert,Link2,X} from 'lucide-react';
import './crab-network-connections.css';

const slots=[
 {id:'aligned-person',type:'Person',alignment:'Aligned',Icon:Users},
 {id:'aligned-organization',type:'Organization',alignment:'Aligned',Icon:Building2},
 {id:'misaligned-person',type:'Person',alignment:'Misaligned',Icon:Users},
 {id:'misaligned-organization',type:'Organization',alignment:'Misaligned',Icon:Building2},
] as const;
export function CrabNetworkPreview(){
 const id=useId(),trigger=useRef<HTMLButtonElement|null>(null);
 function close(){setSelected(null);trigger.current?.focus({preventScroll:true})}
 const [alignment,setAlignment]=useState('All'),[type,setType]=useState('All profiles'),[selected,setSelected]=useState<string|null>(null);
 const visible=slots.filter(s=>(alignment==='All'||s.alignment===alignment)&&(type==='All profiles'||s.type===type));
 const active=visible.find(s=>s.id===selected);
 function filterAlignment(value:string){setAlignment(value);setSelected(null)}
 return <section id="crab-profiles" className="crab-section crab-level-1 network-connections">
 <header className="network-heading"><div><h3>Network Connections</h3><p>People and organizations connected to blue-crab conservation.</p></div><span className="network-preview-label">Preview · no profiles linked</span></header>
 <div className="network-controls"><div role="group" aria-label="Conservation alignment">{['All','Aligned','Misaligned'].map(value=><button key={value} aria-pressed={alignment===value} onClick={()=>filterAlignment(value)}>{value==='All'?'All connections':value}</button>)}</div><label><span className="network-sr-only">Profile type</span><select aria-label="Profile type" value={type} onChange={e=>{setType(e.target.value);setSelected(null)}}><option>All profiles</option><option value="Person">People</option><option value="Organization">Organizations</option></select></label></div>
 <div className="network-relationship-map">
 <div className="network-species"><img src="/blue-crab-hero.png" alt="" loading="lazy"/><div><span>Conservation interests</span><strong>Blue crab</strong><em>Callinectes sapidus</em></div></div>
 <div className={'network-branches '+(alignment!=='All'?'single-branch':'')}>
 {(['Aligned','Misaligned'] as const).filter(side=>alignment==='All'||alignment===side).map(side=><section className={'network-branch '+(side==='Misaligned'?'network-conflict':'')} key={side} aria-label={side+' profile placeholders'}>
 <div className="network-branch-heading">{side==='Aligned'?<ShieldCheck size={19}/>:<ShieldAlert size={19}/>}<div><h4>{side==='Aligned'?'Supports conservation':'Conflicts with conservation'}</h4><p>{side==='Aligned'?'Activities that benefit the species':'Activities that put the species at risk'}</p></div></div>
 <div className="network-profile-slots">{visible.filter(s=>s.alignment===side).map(slot=><button key={slot.id} className="network-profile-slot" aria-expanded={active?.id===slot.id} aria-controls={id+'-connection'} onClick={e=>{trigger.current=e.currentTarget;setSelected(selected===slot.id?null:slot.id)}}><span className="network-avatar"><slot.Icon size={23}/></span><span><strong>{slot.type} profile</strong><small>Unlinked placeholder</small></span><ArrowUpRight size={17} aria-hidden="true"/></button>)}</div>
 </section>)}</div></div>
 <div id={id+'-connection'}>{active&&<section className="network-detail" aria-label="Connection preview" onKeyDown={e=>{if(e.key==='Escape'){e.preventDefault();close()}}}><header><div><span>{active.alignment} · {active.type}</span><h4>Connection details</h4></div><button aria-label="Close connection details" onClick={close}><X size={18}/></button></header><div className="network-detail-fields"><div><span>Profile</span><strong>Not linked</strong><p>Name and full profile from Networks.</p></div><div><span>Conservation relationship</span><strong>Not documented</strong><p>Relevant activities, location and effects on blue crabs.</p></div><div><span>Supporting evidence</span><strong>No sources attached</strong><p>Source links and review date for the relationship.</p></div></div><footer><Link2 size={16}/><span>Full profiles will open in Networks when available.</span></footer></section>}</div>
 <p className="network-scope-note">These are empty design placeholders, not assessments of real people or organizations. Alignment refers to documented activities, not overall character.</p>
 </section>;
}
