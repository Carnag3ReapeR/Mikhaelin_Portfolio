import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configure the Vite build and dev server.
// 
// Key insight: GitHub Pages serves project pages from a sub-path (e.g., github.com/user/repo
// → https://user.github.io/repo/), while user pages live at the root (https://user.github.io).
// The base path env var tells Vite where assets will be served from, so import() and <script src=>
// URLs resolve correctly in production.
//
// For local dev vs production:
// - Set VITE_BASE_PATH=/ for user pages (default, used locally)
// - Set VITE_BASE_PATH=/repo-name/ in CI/CD for project pages
// - Host 0.0.0.0 allows Docker containers to expose the dev server to the host machine.

export default defineConfig(() => ({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react()],
  server: {
    // Bind to 0.0.0.0 so Docker containers can reach the dev server on the host.
    host: '0.0.0.0',
    port: 5173,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
}));
