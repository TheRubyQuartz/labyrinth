import type {CrabRecord} from './crab-collections';
export const microscopySource='https://www.vims.edu/newsandevents/topstories/archives/2012/hema_life_cycle.php';
export const microscopyRecords:CrabRecord[]=[
 ['Filamentous trophonts','filamentous_trophonts','Inspect the elongated forms in this published parasite micrograph.'],
 ['Amoeboid trophonts','ameoboid_trophonts','Compare the cell outlines with the filamentous form.'],
 ['Arachnoid trophont','arachnoid_trophonts','Inspect the web-like network surrounding the enlarged cells.'],
 ['Dinospores','dinospores','A reproductive form of the parasite, not a crab larva.'],
 ['Sporoblasts','sporoblasts','Compare individual and aggregated cells in the published field.']
].map(([title,file,description])=>({title:'Hematodinium · '+title,kind:'Photomicrograph',focus:'Parasite microscopy',description,inspect:['Retain the original frame and any scale markings.','Do not infer elapsed time between these different fields.'],source:microscopySource,credit:'Jeff Shields / Virginia Institute of Marine Science · published 4 October 2012',scope:'Hematodinium from Callinectes sapidus',period:{start:2012,end:2012,label:'2012 · source publication',basis:'Publication year, not the date of microscope capture.'},media:{type:'image',url:`https://www.vims.edu/newsandevents/_photosets/hema_life_cycle/${file}_475.jpg`}}));
