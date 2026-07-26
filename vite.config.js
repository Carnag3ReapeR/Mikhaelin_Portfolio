import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ---------------------------------------------------------------------------
// GitHub Pages base path
// ---------------------------------------------------------------------------
// GitHub Pages serves "project pages" (github.com/you/my-repo) from a
// sub-path: https://you.github.io/my-repo/ — so the built app needs to know
// that sub-path, or all its asset URLs will 404.
//
// "User/organisation pages" (a repo literally named you.github.io) are
// served from the domain root instead, so no sub-path is needed.
//
// We read this from the VITE_BASE_PATH env var (set it in
// .github/workflows/deploy.yml, or a local .env file — see .env.example)
// so you never have to hand-edit this file:
//
//   - Project page (most common):  VITE_BASE_PATH=/my-repo-name/
//   - User/organisation page:      VITE_BASE_PATH=/   (or leave unset)
// ---------------------------------------------------------------------------

export default defineConfig(() => ({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react()],
  server: {
    // Allows `docker compose up` to expose the dev server outside the
    // container — see Dockerfile.dev / docker-compose.yml.
    host: '0.0.0.0',
    port: 5173,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
}));
