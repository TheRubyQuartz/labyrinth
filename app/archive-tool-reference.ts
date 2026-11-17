import reference from '../research/user-section-definitions-reference.md?raw';

export const referenceSectionNames:Record<string,string>={infrastructure:'Infrastructure',transport:'Transport',graphics:'Graphics',business:'Society',fitness:'Health',agriculture:'Combat',modeling:'Models',animation:'Art',nature:'Environment',survival:'Survival',film:'Videos',sounds:'Sounds'};
// Exact reference terms supporting each limited tool. A match never means the
// full source line (often dozens of disciplines) is implemented.
export const toolTerms:Record<string,RegExp>={
 'Repeat patterns':/Patterns|Textile|Graphic Design/,
 'Typography & title cards':/Typography|Lettering|Titles|Text Edits|Illustrator/,
 'Stereo mixing':/Mixing|Audio|Mastering|Sound Analysis\/Design/,
 'Electrical & power':/AC\/DC|Power, Energy|Electrical Engineering/,
 'Component prototype':/Prototyping|Prototype|Modeling|Sculpting/,
 'Systems & relationships':/Networking|Networks|Graph Modeling|Organization|Supply|Food|Systems Design|World Design/,
 'File integrity':/Cryptography|Preservation|Preservations|Version Control|Library Archiving|Privacy/,
 'Material quantities':/Materials|Manufacturing|3D Prints|3D Printing/,
 'Data analysis':/Analytics|Statistics|Analysis|Measurements|Monitoring|Research/,
 'Journey planning':/Navigation|Logistics|Navigating|Plotting|Hiking|Travel/,
 'Image production':/Editing|Photography|Texturing|Color|Painting|Medical Imagery/,
 'Calibrated image ruler':/Microscopy|Clinical Lab|Medical Imagery|Inspection|Anatomy|Scans|Photography/,
 'Drawing & illustration':/Drawing|Sketch|Illustration|Concept Art/,
 'Text & publication':/Literature|Writing|Scripts|Typography|Publishing|Editing/,
 'Budget & funding':/Budget|Funding|Accounting|Finance|Producing|Production Design/,
 'Recipe scaling':/Cooking|Food Preservation\/Prep|Nutrition|Food\/Chemical Processing/,
 'Mechanical work':/Biomechanics|Strength|Physical Durability/,
 'Motion frames':/Motion Editing|Tracking|Film Editing|Cinematography|Choreography/,
 'Color palette':/Physical Color|Coloring Theory|Color, Illustration/,
 'Level design & route finding':/Game\/Level Design|Rules, Travel Mechanics|Game FX\/Physics/,
 'Shot timeline':/Film Editing|Producing\/Directing|Film Production Processes|Production Design/,
 'Cue timeline':/Composition|Sound Design|Mixing|Recording|Production/,
 'Sound synthesis':/Acoustics|Sound Analysis\/Design|Waves|Effects|Sampling/
};
export function referenceLines(section:string,tool:string){const heading=tool==='Text & publication'?'Text':referenceSectionNames[section];const lines=reference.split('\n');let active=false;return lines.flatMap((text,index)=>{if(text.startsWith('## '))active=text.slice(3).startsWith(heading||'__none__');if(!active||!/^\d+\. |^(Learn|Include|Follow|Translate)\b/.test(text))return [];return toolTerms[tool]?.test(text)?[{line:index+1,text:text.replace(/^\d+\. /,'')}]:[]})}
