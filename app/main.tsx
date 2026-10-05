import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Exploration from './exploration';
import HomePage from './homepage';
import './globals.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {new URLSearchParams(window.location.search).has('entry') || new URLSearchParams(window.location.search).has('view') ? <Exploration /> : <HomePage />}
  </StrictMode>,
);
