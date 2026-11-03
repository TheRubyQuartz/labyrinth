/** Section entry points foreground the subject, not the research administration. */
export const sectionExperiences:Record<string,{start:'collection'|'tools';label:string;layout:string;media?:string[]}>={
 overview:{start:'collection',label:'Species records',layout:'Desk'},
 infrastructure:{start:'tools',label:'Shelters & instruments',layout:'Desk'},
 transport:{start:'tools',label:'Movement records',layout:'Desk'},
 graphics:{start:'collection',label:'Visual gallery',layout:'Gallery',media:['image','pdf']},
 business:{start:'tools',label:'Behavior & communities',layout:'Desk'},
 fitness:{start:'tools',label:'Growth & condition',layout:'Desk'},
 agriculture:{start:'tools',label:'Defense & encounters',layout:'Desk'},
 modeling:{start:'tools',label:'Anatomy studio',layout:'Gallery',media:['model','image']},
 animation:{start:'collection',label:'Art gallery',layout:'Gallery',media:['image']},
 nature:{start:'tools',label:'Habitat & conditions',layout:'Desk'},
 survival:{start:'tools',label:'Pressures & responses',layout:'Desk'},
 film:{start:'tools',label:'Film records',layout:'Desk',media:['youtube','vimeo']},
 sounds:{start:'collection',label:'Listening room',layout:'Desk',media:['audio']}
};
