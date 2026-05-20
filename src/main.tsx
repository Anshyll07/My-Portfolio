import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// Automatically detect if we are on GitHub Pages or testing locally
const isGitHubPages = window.location.hostname.includes("github.io");
const basename = isGitHubPages ? "/My-Portfolio" : "/";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
