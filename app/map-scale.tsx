import {useEffect,useState} from 'react';
import {createPortal} from 'react-dom';
export function MapScale({viewer:v,C}:{viewer:any;C:any}){
 const [text,setText]=useState(''),[heading,setHeading]=useState(0);
 useEffect(()=>{if(!v||!C)return;let last=0;const update=()=>{if(performance.now()-last<500)return;last=performance.now();setHeading(Math.round(((C.Math.toDegrees(v.camera.heading)%360)+360)%360));const w=v.canvas.clientWidth,h=v.canvas.clientHeight,a=v.camera.pickEllipsoid(new C.Cartesian2(w/2-50,h/2),v.scene.globe.ellipsoid),b=v.camera.pickEllipsoid(new C.Cartesian2(w/2+50,h/2),v.scene.globe.ellipsoid);if(!a||!b){setText('');return}const distance=new C.EllipsoidGeodesic(C.Cartographic.fromCartesian(a),C.Cartographic.fromCartesian(b)).surfaceDistance;setText(distance>=1000?`${(distance/1000).toFixed(distance>100000?0:1)} km`:`${Math.round(distance)} m`)};const off=v.scene.postRender.addEventListener(update);v.scene.requestRender();return off},[v,C]);
 const host=v?.canvas.closest('.gm-stage');return host?createPortal(<div className="gm-map-scale" aria-label="Map scale and heading"><span>Heading {heading}°</span>{text&&<><div/><span>{text} / 100 px at map center</span></>}<small>Ellipsoid scale; terrain & perspective vary</small></div>,host):null;
}
