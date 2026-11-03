import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const categories=JSON.parse(read('app/crab-categories.json'));
const overview=categories.find(c=>c.id==='overview');
for(const title of ['Summary','Significance across Beliefs','Origins and development','Mind, Body and Disposition','Crabs in culture']){
 assert(overview.sections.some(s=>s.cluster===title),'Missing original chapter: '+title);
}
const merged=read('app/crab-merged.tsx');
for(const component of ['CrabRisks','CrabWorldMap','CrabEvolutionLab','CrabBiologyExperience','CrabCultureSelections','CrabNetworkPreview','CrabTestingPreview','CrabQuestions']){
 assert(merged.includes('<'+component),'Missing original feature: '+component);
}
assert.equal(JSON.parse(read('app/crab-belief-index.json')).length,460);
const beliefs=read('app/crab-overview-structure.tsx');
assert(beliefs.includes('<details open className="crab-belief-examples">'));
assert(beliefs.includes('{e.content}'),'Original source paragraphs must remain');
const wrapper=read('app/crab-collection-view.tsx');
assert(wrapper.includes('className="crab-overview-restored">{props.context}'));
assert(!wrapper.includes("import {CrabOverviewExhibit}"),'Rejected alternate exhibit must not replace original content');
console.log('Overview preservation checks passed: 5 original chapters, 8 feature components, 460 belief entries, inline source content.');
const experiences=read('app/crab-section-experience.ts');
for(const section of ['overview','infrastructure','transport','graphics','business','fitness','agriculture','modeling','animation','nature','survival','film','sounds']){
 assert(experiences.includes(section+':{start:'),'Missing subject-specific starting view: '+section);
}
assert(wrapper.includes('<CrabCatalogTimeline records={collection.records}'),'Chronology must stay beside the collection');
assert(wrapper.includes('<CrabObjectJournal'),'Dated observations must stay beside objects');
assert(wrapper.includes('<RecordNotebook'),'Existing private notes must remain available');
assert(wrapper.includes('<CrabImageComparison'),'Image comparison must remain available');
assert(wrapper.includes("['context','Full description']"),'Original descriptions must remain reachable');
console.log('All 13 section entry policies, inline chronology, existing notes, image comparisons and descriptions are retained.');
