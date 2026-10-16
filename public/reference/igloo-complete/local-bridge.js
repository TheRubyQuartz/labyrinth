// Local hosting adapter. Original renderer and artwork are credited in provenance.json.
(() => {
 const root='/reference/igloo-complete/';
 if(location.pathname.endsWith('/index.html'))history.replaceState(null,'',root+location.search+location.hash);
 const notify=(type,detail={})=>{if(parent!==window)parent.postMessage({source:'labyrinth-igloo',type,...detail},location.origin)};
 addEventListener('error',event=>notify('error',{message:event.message}));
 addEventListener('unhandledrejection',event=>notify('error',{message:String(event.reason)}));
 const roots=[];
 const attachShadow=Element.prototype.attachShadow;
 Element.prototype.attachShadow=function(options){const root=attachShadow.call(this,options);roots.push(root);return root};
 const canvasIn=root=>root.querySelector('canvas')||roots.some(shadow=>shadow.querySelector('canvas'));
 const loading=setInterval(()=>{if(canvasIn(document)&&!document.querySelector('#loader')){notify('ready');clearInterval(loading)}},250);
 addEventListener('keydown',event=>{if(event.key==='Escape')notify('escape')});
})();
