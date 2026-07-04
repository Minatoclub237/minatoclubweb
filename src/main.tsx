import { StrictMode } from 'react';
import { ViteReactSSG } from 'vite-react-ssg/single-page';
import App from './App.tsx';
import './index.css';

// SSG : le HTML est pré-rendu au build (Google/IA voient le contenu),
// puis React hydrate côté client. Conteneur par défaut : #root.
export const createRoot = ViteReactSSG(
  <StrictMode>
    <App />
  </StrictMode>,
);
