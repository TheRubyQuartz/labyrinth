import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Exploration from './exploration';
import './globals.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Exploration />
  </StrictMode>,
);
