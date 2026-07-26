// src/main.jsx
//
// Application entry point. Import order matters for CSS:
//   1. Bootstrap 5 base styles (grid, utilities, components)
//   2. Our CSS variables (theme tokens, may override Bootstrap defaults)
//   3. Glassmorphism utility classes (built on top of the variables)
//   4. App-wide layout/typography/component styles (highest specificity)

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/variables.css';
import './styles/glassmorphism.css';
import './styles/App.css';

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
