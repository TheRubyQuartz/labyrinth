import {useState} from 'react';
import './crab-research-questions.css';
import {CrabQuestionSubmission} from './crab-future-panels';
const common=[
 {q:'Are soft-shell crabs a different species?',a:'No. A soft-shell blue crab has recently molted. Its new covering is still flexible and hardens afterward; molting lets the crab grow.',href:'https://www.chesapeakebay.net/news/blog/clues-of-a-growing-blue-crab',source:'Chesapeake Bay Program'},
 {q:'Can blue crabs swim, or only walk sideways?',a:'They do both. Three pairs of walking legs move them along the bottom, while the flattened rear legs paddle through the water.',href:'https://www.dnr.sc.gov/marine/pub/seascience/bluecrab.html',source:'South Carolina DNR'},
 {q:'What do blue crabs eat?',a:'They hunt and scavenge, eating foods such as clams, oysters, worms, fish and other crabs. Their diet changes with what is available.',href:'https://www.dnr.sc.gov/marine/pub/seascience/bluecrab.html',source:'South Carolina DNR'},
 {q:'Where do they go in winter?',a:'Cold water reduces their activity. In the Chesapeake Bay, blue crabs shelter in bottom sediment until warmer conditions return.',href:'https://www.chesapeakebay.net/discover/faq/category/blue-crabs',source:'Chesapeake Bay Program'}
];
const unresolved=[
 {q:'What determines how many young crabs survive each year?',a:'Currents, nursery habitat, predators and environmental conditions all matter. Their relative contributions vary, making recruitment—the arrival of young crabs into the population—difficult to predict precisely.',href:'https://www.fisheries.noaa.gov/species/blue-crab',source:'NOAA Fisheries · population research'},
 {q:'What does a blue crab consciously experience?',a:'Research supports sentience in true crabs, but the character of a blue crab’s subjective experience remains unresolved. Species-specific studies are needed to separate sensory responses, learning and felt experience.',href:'https://www.lse.ac.uk/news/latest-news-from-lse/k-november-21/octopuses-crabs-and-lobsters-welfare-protection',source:'LSE · evidence review'},
 {q:'Which extinct species were its direct ancestors?',a:'Early fossils document crab evolution, but they do not provide a complete species-by-species ancestry for the blue crab. Fossil placement and gaps in the record leave parts of that lineage uncertain.',href:'https://palaeo-electronica.org/content/2021/3427-new-bajocian-crab-from-france',source:'Palaeontologia Electronica · fossil evidence'}
];

const researchDirections=[
 {topic:'Population dynamics',gap:'How do these influences combine from one year to the next?',directions:['Compare survival across nursery habitats and seasons.','Link environmental observations with later recruitment estimates.','Test whether predictions hold in years not used to develop them.'],target:'crab-world-map',link:'Explore regional context',draft:'How could we distinguish the effects of nursery habitat, currents and predators on young blue-crab survival?'},
 {topic:'Mind & experience',gap:'Which observations distinguish sensory processing from felt experience?',directions:['Define what a study could measure—and what it could not infer.','Compare learning and choices under controlled conditions.','Prioritize non-harmful methods and appropriate welfare review.'],target:'overview-mind',link:'Explore mind and consciousness',draft:'What non-harmful studies could improve our understanding of conscious experience in blue crabs?'},
 {topic:'Evolutionary history',gap:'Where does the fossil record leave the blue-crab lineage uncertain?',directions:['Compare proposed fossil placements and their uncertainties.','Identify which anatomical features support each relationship.','Distinguish a close relative from a demonstrated direct ancestor.'],target:'crab-group-overview-2',link:'Explore origins and development',draft:'What evidence would help identify the closest extinct relatives of the blue crab?'}
];
export function CrabQuestions(){
 const [query,setQuery]=useState('');
 const matches=(item:{q:string;a:string})=>(item.q+' '+item.a).toLowerCase().includes(query.trim().toLowerCase());
 const count=[...common,...unresolved].filter(matches).length;
 return <section id="crab-questions" className="crab-section crab-level-1 crab-questions">
 <h3>Common &amp; Unresolved Questions</h3>
 <label className="question-search"><span>Find a question</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Try molting, swimming, consciousness…" type="search"/></label>
 <p className="question-count" role="status">{count} {count===1?'question':'questions'}{query.trim()?' matching your search':''}</p>
 {!count&&<div className="question-empty"><p>No questions match “{query}”. Try a broader term.</p><button onClick={()=>setQuery('')}>Clear search</button></div>}
 <section id="crab-questions-common" className="crab-question-category common"><header><h4>Common questions</h4></header><div className="crab-question-grid">{common.filter(matches).map((item,i)=><article className="crab-question-card" key={item.q}><span className="crab-question-number">{String(i+1).padStart(2,'0')}</span><h5>{item.q}</h5><p>{item.a}</p><a href={item.href} target="_blank" rel="noreferrer">{item.source} ↗</a></article>)}</div></section>
 <section id="crab-questions-unresolved" className="crab-question-category unresolved"><header><div><h4>Unresolved questions</h4><p>What we know, where the evidence stops, and questions worth pursuing.</p></div><span>Open research</span></header>
 <div className="unresolved-research-grid">{unresolved.map((item,i)=>({item,direction:researchDirections[i],i})).filter(({item})=>matches(item)).map(({item,direction,i})=><article className="crab-question-card" key={item.q}>
 <div className="research-question-kicker"><span>{direction.topic}</span><span aria-hidden="true">{String(i+1).padStart(2,'0')}</span></div><h5>{item.q}</h5><p>{item.a}</p>
 <div className="research-gap"><span>The evidence gap</span><strong>{direction.gap}</strong></div>
 <a href={item.href} target="_blank" rel="noreferrer">{item.source} ↗</a>
 <details className="research-directions"><summary>How could we investigate?</summary><div><p>Suggested research directions—not established findings or active projects.</p><ul>{direction.directions.map(text=><li key={text}>{text}</li>)}</ul><a href={'#'+direction.target}>{direction.link} →</a><button onClick={()=>window.dispatchEvent(new CustomEvent('crab-question-draft',{detail:direction.draft}))}>Draft a related question ↗</button></div></details>
 </article>)}</div></section>
 <CrabQuestionSubmission/>
 </section>
}
