import {Music2,Play,SkipBack,SkipForward} from 'lucide-react';
import {useState} from 'react';
import './crab-music-dock.css';

export function CrabMusicDock(){
 const [open,setOpen]=useState(true);
 if(!open)return <button type="button" className="crab-music-toggle" aria-expanded={false} onClick={()=>setOpen(true)}><Music2 size={18}/>Show music</button>;
 return <aside id="crab-category-music" className="crab-music-dock" aria-label="Music player" tabIndex={-1}>
  <div className="music-dock-track"><Music2 size={24} aria-hidden="true"/><div><strong>Music</strong><span>No track selected · Library not connected</span></div></div>
  <div className="music-dock-controls" aria-label="Playback unavailable until a library is connected">
   <button disabled aria-label="Previous track"><SkipBack size={18}/></button>
   <button disabled className="music-dock-play" aria-label="Play · no music library connected"><Play size={20}/></button>
   <button disabled aria-label="Next track"><SkipForward size={18}/></button>
  </div>
  <div className="music-dock-timeline"><span>0:00</span><input type="range" min="0" max="100" value="0" readOnly disabled aria-label="Playback progress · unavailable"/><span>—:—</span></div>
  <button type="button" className="music-dock-hide" aria-expanded={true} onClick={()=>setOpen(false)}>Hide player</button>
 </aside>;
}
