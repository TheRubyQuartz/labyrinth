/** Qualitative diagrams illustrating the adjacent account, never measured data. */
export function CrabRiskIllustration({issue}:{issue:number}){
 return <figure className="risk-illustration"><svg viewBox="0 0 360 150" aria-hidden="true" fill="none">
 <path d="M0 35Q45 24 90 35T180 35T270 35T360 35V150H0Z" fill="#173a4b"/>
 <path d="M0 133Q95 117 180 131T360 126V150H0Z" fill="#33434a"/>
 {[32,80,260,310].map((x,i)=><path key={x} d={`M${x} 135q-15 -30 0 -60m0 60q20 -30 10 -46`} stroke={issue===0&&i>1?'#526169':'#94b6ae'} strokeWidth="4" opacity={issue===0&&i>1?.35:1}/>)}
 <g stroke="#d2e5ec" strokeWidth="2" transform="translate(165 112)"><ellipse rx="17" ry="10" fill="#6e9eae"/><path d="M-14 -5l-14 -13 -10 5m24 9l-24 3m24 5l-21 11M14 -5l14 -13 10 5m-24 9l24 3m-24 5l21 11"/></g>
 {issue===0&&<g stroke="#e6b09b" strokeWidth="2"><path d="M245 75l35 40m0 -40l-35 40M295 75l35 40m0 -40l-35 40"/></g>}
 {issue===1&&<g fill="#c5dcea" fontSize="15"><text x="60" y="75">O₂</text><text x="230" y="85" opacity=".3">O₂</text><path d="M160 55v35m-7 -8l7 8 7 -8" stroke="#e6b09b" strokeWidth="2"/></g>}
 {issue===2&&<g transform="translate(240 65)" stroke="#bad4df" strokeWidth="2"><path d="M-40 0Q-15 -26 20 0Q-15 26 -40 0Zm60 0 18 -15v30Z" fill="#50788c"/><circle cx="-27" cy="-4" r="2" fill="#fff"/></g>}
 {issue===3&&<g stroke="#d5bd99" strokeWidth="2"><path d="M120 45h85l15 64h-115ZM120 45l100 64m-15 -64 -100 64M111 82h103M116 63h94M145 45v64m32 -64v64M162 45V0"/></g>}
 {issue===4&&<g stroke="#e7bf97" strokeWidth="3"><path d="M245 57v32a10 10 0 1 0 12 0V57a6 6 0 0 0 -12 0Z"/><path d="M251 70v31"/><path d="M70 65q15 -12 30 0t30 0M70 81q15 -12 30 0t30 0" stroke="#99cadd" strokeWidth="2"/></g>}
 {issue===5&&<g stroke="#cbdde4" strokeWidth="2"><path d="M105 65h130m-12 -8 12 8 -12 8"/><circle cx="88" cy="65" r="10"/><circle cx="253" cy="65" r="10" strokeDasharray="3 3"/></g>}
 </svg><figcaption>Conceptual illustration · not a measurement or forecast</figcaption></figure>
}
