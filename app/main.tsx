import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
const Exploration=lazy(()=>import('./exploration'));
const Destinations=lazy(()=>import('./labyrinth-destinations'));
import HomePage from './igloo-complete-home';
import './globals.css';
import './site-theme.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {['workshop','social'].includes(new URLSearchParams(window.location.search).get('view')||'') ? <Suspense fallback={<p role="status">Loading Labyrinth…</p>}><Destinations/></Suspense> : new URLSearchParams(window.location.search).has('entry') || new URLSearchParams(window.location.search).has('view') ? <Suspense fallback={<p role="status">Loading Labyrinth…</p>}><Exploration /></Suspense> : <HomePage />}
  </StrictMode>,
);
