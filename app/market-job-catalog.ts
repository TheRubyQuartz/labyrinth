import {Code,Database,Shield,Brain,PenTool,Camera,Music,Map,Leaf,Users,BookOpen,Compass,Layers,Microscope,Headphones,Video,ChartColumn,Box,Search,Wrench} from 'lucide-react';
// Illustrative role briefs, not active vacancies or verified employer offers.
const job=(title:string,tag:string,text:string,skills:string,icon:typeof Code)=>({title,tag:'SAMPLE ROLE · '+tag,text,icon,detail:`Responsibilities: ${text}\n\nCore skills: ${skills}.\n\nIllustrative role brief only. No employer, compensation, location or application process has been verified.`});
export const marketJobSections=[
 {title:'Creative work.',sub:'Find your next medium.',kind:'compact',cards:[
 job('Technical Writer','WRITING','Create technical guides, API documentation and clear reference material.','Technical editing, source verification, information architecture',BookOpen),
 job('3D Environment Artist','3D ART','Model, texture and light interactive environments.','Blender, PBR materials, topology, scene optimization',Box),
 job('Video Editor','VIDEO','Assemble footage, refine pacing and deliver accessible videos.','Timeline editing, color correction, captions, media QA',Video),
 job('Audio Engineer','SOUND','Edit recordings, balance mixes and diagnose signal problems.','Signal routing, EQ, noise reduction, critical listening',Headphones)]},
 {title:'People & support.',sub:'Help others move forward.',kind:'wide',cards:[
 job('Customer Support Specialist','SERVICE','Triage requests, investigate problems and document resolutions.','Clear communication, troubleshooting, queue management',Users),
 job('Instructional Designer','EDUCATION','Build lessons, assessments and learning activities.','Learning objectives, rubrics, accessibility, LMS workflows',BookOpen),
 job('Career Coach','COACHING','Support career planning, interview practice and professional development.','Active listening, structured feedback, career research',Compass),
 job('Community Program Coordinator','COMMUNITY','Coordinate events, volunteers and partner organizations.','Scheduling, logistics, facilitation, resource planning',Users)]},
 {title:'Precision matters.',sub:'Put your attention to work.',kind:'benefits',cards:[
 job('Data Quality Analyst','DATA','Validate records, reconcile discrepancies and document corrections.','SQL, data profiling, format validation, QA',Database),
 job('Privacy Analyst','PRIVACY','Review sensitive content and verify redaction workflows.','PII identification, anonymization checks, audit trails',Shield),
 job('Software QA Analyst','TESTING','Create repeatable tests and investigate defects.','Regression testing, bug reports, test automation',Search),
 job('Research Evaluator','RESEARCH','Check claims, triangulate sources and evaluate reasoning.','Citation review, analytical writing, evidence assessment',Microscope)]},
 {title:'Sound & vision.',sub:'Make every frame count.',kind:'compact',cards:[
 job('Multimodal Annotator','ANNOTATION','Label audiovisual events and maintain consistent temporal boundaries.','Timestamp review, annotation guidelines, calibration',Video),
 job('Vietnamese Language Evaluator','LANGUAGE','Review pronunciation, meaning and contextual accuracy.','Vietnamese fluency, transcription, written evaluation',Headphones),
 job('Field Videographer','CAPTURE','Plan and record clear, organized footage of real-world subjects.','Camera operation, capture planning, file management',Camera),
 job('Gameplay Capture Specialist','GAMES','Record gameplay sessions and review synchronized input telemetry.','Game engines, frame synchronization, QA logs',Layers)]},
 {title:'Engineering possibilities.',sub:'Build what comes next.',kind:'wide',cards:[
 job('Frontend Engineer','INTERFACES','Build responsive, accessible interfaces and interaction systems.','React, TypeScript, CSS, accessibility',Code),
 job('Backend Engineer','SERVICES','Develop APIs, optimize databases and maintain reliable services.','Java, SQL, REST APIs, automated testing',Database),
 job('Machine Learning Engineer','MODELS','Train, tune and benchmark reproducible machine-learning pipelines.','Python, PyTorch, feature engineering, evaluation',Brain),
 job('Application Security Engineer','SECURITY','Assess vulnerabilities and review secure implementation changes.','Threat modeling, OWASP, security testing, remediation',Shield)]},
 {title:'Beyond the screen.',sub:'Explore field and specialist roles.',cards:[
 job('Environmental Field Technician','ENVIRONMENT','Collect observations and maintain field sampling records.','Sampling protocols, instrument checks, field documentation',Leaf),
 job('GIS Analyst','GEOGRAPHY','Analyze spatial datasets and communicate geographic patterns.','GIS, coordinate systems, cartography, data validation',Map),
 job('CAD Designer','DESIGN','Create parametric models and validate dimensional requirements.','CAD, technical drawings, geometry, manufacturing constraints',Wrench),
 job('STEM Content Reviewer','SCIENCE','Verify scientific solutions, assumptions and mathematical reasoning.','Scientific methods, proof review, quantitative analysis',Microscope)]}
];
export const featuredJobs=[
 {id:101,type:'Task',name:'AI Response Evaluator',text:'Compare model responses for accuracy, safety and instruction adherence; write rubric-based rationales.',price:'Sample role · not an active vacancy',area:'Location not specified',record:'SP-001',tag:'AI evaluation',icon:Brain},
 {id:102,type:'Task',name:'Data Visualization Designer',text:'Create clear charts and dashboards; verify calculations, scales and explanatory annotations.',price:'Sample role · not an active vacancy',area:'Location not specified',record:'AS-001',tag:'Analytics',icon:ChartColumn},
 {id:103,type:'Task',name:'Open Source Maintainer',text:'Triage issues, review patches and maintain reproducible tests and release documentation.',price:'Sample role · not an active vacancy',area:'Location not specified',record:'AS-002',tag:'Engineering',icon:Code},
 {id:104,type:'Task',name:'Presentation Designer',text:'Reconstruct slides and organize research into compelling, accurate visual narratives.',price:'Sample role · not an active vacancy',area:'Location not specified',record:'HB-001',tag:'Communication',icon:PenTool}
];
