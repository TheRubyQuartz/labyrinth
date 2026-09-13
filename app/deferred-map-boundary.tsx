import {Component} from 'react';
import type {ReactNode} from 'react';
export class DeferredMapBoundary extends Component<{children:ReactNode;onReturn:()=>void},{failed:boolean}>{
 state={failed:false};
 static getDerivedStateFromError(){return {failed:true}}
 render(){return this.state.failed?<div className="terrain-load-error" role="alert"><h3>The 3D workspace could not load</h3><p>The article and archive are still available. A connection interruption or missing cached asset may have prevented the map from opening.</p><button onClick={this.props.onReturn}>Return to archive</button><button onClick={()=>window.location.reload()}>Reload site</button></div>:this.props.children}
}
