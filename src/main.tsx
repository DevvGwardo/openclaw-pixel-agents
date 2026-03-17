import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { loadAllAssets } from './api/assetLoader.js';
import { startAdapter } from './api/openclawAdapter.js';
import App from './App.js';

// Render the app immediately (shows "Loading..." until layout arrives)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Load assets FIRST (characters, floors, walls, furniture catalog),
// THEN start the adapter (which sends layout + agents to the UI).
// This ensures the furniture catalog is built before the layout arrives,
// so desks are recognized as seats and characters can be placed.
void loadAllAssets().then(() => {
  startAdapter();
});
