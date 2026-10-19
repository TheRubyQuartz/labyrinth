import fs from 'node:fs';const path='app/exploration-reference.tsx';let s=fs.readFileSync(path,'utf8');
s="import {EducationMarketHero,EducationMarketSections} from './education-market';\n"+s;
const start=s.indexOf('<header className="store-masthead">');const end=s.indexOf('</header>',start)+9;if(start<0)throw Error('Missing store hero');s=s.slice(0,start)+'<EducationMarketHero/>'+s.slice(end);
s=s.replace('<h2>The collection. <span>Find your next step.</span></h2>','<h2><span>Field collection.</span> Find your next step.</h2>');
s=s.replace('<section className="dn-market-compare"','<EducationMarketSections/><section className="dn-market-compare"');
fs.writeFileSync(path,s);
