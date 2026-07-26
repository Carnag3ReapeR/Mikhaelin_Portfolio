# Personal Portfolio — React + Bootstrap 5 (Glassmorphism)

A fast, single-page personal portfolio built with **React**, **Bootstrap 5**,
and a modern **glassmorphism** design — built to be hosted for free on
**GitHub Pages** and linked from your CV.

All content (your bio, skills, projects, work history, education, and social
links) lives in **plain JSON files** — there's no database and no backend to
maintain. Edit a JSON file, push, and your live site updates.

![Tech](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=0b1120)
![Tech](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=fff)
![Tech](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=fff)
![Tech](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker&logoColor=fff)

---

## Table of contents

1. [Features](#features)
2. [Tech stack & why](#tech-stack--why)
3. [Project structure](#project-structure)
4. [Quick start](#quick-start)
5. [Data architecture](#data-architecture)
6. [Customisation guide](#customisation-guide)
7. [Running with Docker (beginner-friendly)](#running-with-docker-beginner-friendly)
8. [Deploying to GitHub Pages](#deploying-to-github-pages)
9. [Accessibility & browser support](#accessibility--browser-support)
10. [Scripts reference](#scripts-reference)
11. [Troubleshooting](#troubleshooting)
12. [License](#license)

---

## Features

- **Glassmorphism design** — frosted-glass cards, an animated aurora
  gradient background, and a signature "terminal window" hero component.
- **JSON-driven content** — no CMS, no database; everything is editable in
  `src/data/*.json`.
- **Star-schema data model** — content files reference each other by id
  (e.g. a project references the skills it used) instead of duplicating
  data. See [`DATA_MODEL.md`](./DATA_MODEL.md).
- **One-file theming** — change the entire colour palette and fonts from
  `src/data/site.json`, no CSS editing required.
- **Fully responsive** — mobile-first layout using Bootstrap's grid.
- **Accessible** — semantic landmarks, visible focus states, `aria-label`s
  on icon-only buttons, and `prefers-reduced-motion` support.
- **Section toggling & reordering** via config, not code.
- **Zero backend required** — deploys as static files to GitHub Pages for
  free, on your `username.github.io` domain (or a project sub-path).
- **Dockerised** — both a hot-reload dev container and a production nginx
  container are included, with detailed explanations below if you're new
  to Docker.
- **CI/CD included** — a GitHub Actions workflow builds and deploys the
  site automatically on every push to `main`.

---

## Tech stack & why

| Tool | Why it was chosen |
|------|--------------------|
| **React 19 + Vite** | Vite gives near-instant dev-server startup and hot reload, and produces small, fingerprinted production bundles — ideal for a static site with no backend. |
| **Bootstrap 5 + React-Bootstrap** | You asked for Bootstrap 5 for styling. React-Bootstrap wraps Bootstrap's components as real React components (no jQuery, no direct DOM manipulation), which plays nicely with React's rendering model. |
| **Plain JSON files** (no database) | GitHub Pages only serves static files — there's no server to run a database against. JSON files committed to the repo are simple, versioned (you get history via git), human-editable, and require zero hosting/maintenance. |
| **react-icons** | Tree-shakeable icon set (only the icons you use end up in the bundle) instead of a full icon font. |
| **Plain CSS + CSS custom properties** (no CSS-in-JS) | Keeps the theming system simple enough to edit by hand or from JSON, with no build-step "magic" to understand. |

---

## Project structure

```
personal-portfolio/
├── .github/workflows/deploy.yml   # CI/CD: builds & deploys to GitHub Pages
├── public/                        # Static files served as-is
│   ├── favicon.svg
│   ├── resume.pdf                 # ← replace with your real CV
│   └── images/
│       └── avatar.svg             # ← replace with your real photo
├── src/
│   ├── data/                      # ALL editable content lives here
│   │   ├── profile.json           # Name, bio, hero terminal, SEO
│   │   ├── site.json              # Nav config, section toggles, theme colours
│   │   ├── skills.json            # Skills grouped by category
│   │   ├── projects.json          # Portfolio projects
│   │   ├── experience.json        # Work history
│   │   ├── education.json         # Education & certifications
│   │   └── social.json            # Social / contact links
│   ├── components/
│   │   ├── layout/                # Navbar, Footer
│   │   ├── sections/               # Hero, About, Skills, Projects, Experience,
│   │   │                            # Education, Contact — one per page section
│   │   └── ui/                     # Reusable building blocks (GlassCard,
│   │                                # SectionTitle, TerminalWindow, etc.)
│   ├── hooks/
│   │   ├── usePortfolioData.js    # Loads + "joins" all JSON data (see DATA_MODEL.md)
│   │   ├── useTheme.js            # Applies site.json colours as CSS variables
│   │   ├── useScrollSpy.js        # Highlights the active nav link
│   │   └── useTypewriter.js       # Powers the hero terminal's typing effect
│   ├── styles/
│   │   ├── variables.css          # Default CSS custom properties (theme tokens)
│   │   ├── glassmorphism.css      # Reusable .glass-panel / .glass-pill classes
│   │   └── App.css                # All layout/component/section styles
│   ├── utils/
│   │   ├── iconMap.js             # Maps icon name strings (from JSON) to components
│   │   └── dateHelpers.js         # Date formatting helpers
│   ├── App.jsx                    # Root component — wires data + sections together
│   └── main.jsx                   # Entry point
├── Dockerfile                     # Production image (multi-stage → nginx)
├── Dockerfile.dev                 # Development image (hot reload)
├── docker-compose.yml             # Convenience commands for both of the above
├── nginx.conf                     # Web-server config used by the production image
├── DATA_MODEL.md                  # Deep-dive on the JSON "star schema"
└── README.md                      # You are here
```

---

## Quick start

**Prerequisites:** [Node.js](https://nodejs.org/) 20 or later, and npm
(comes with Node). Don't want to install Node locally? Skip to
[Running with Docker](#running-with-docker-beginner-friendly) instead.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (hot reload on file save)
npm run dev

# 3. Open the URL it prints (usually http://localhost:5173)
```

To produce an optimised production build:

```bash
npm run build      # outputs static files to /dist
npm run preview    # serves that build locally so you can sanity-check it
```

---

## Data architecture

Content is modelled as a lightweight **JSON star schema**: one hub file
(`profile.json`) plus independent "dimension" files (`skills.json`,
`projects.json`, `experience.json`, `education.json`, `social.json`) that
reference each other by `id` instead of repeating data. A `usePortfolioData()`
hook resolves those references at runtime, similar to a SQL `JOIN`.

**Full breakdown, diagrams, and the reasoning behind this design:**
see [`DATA_MODEL.md`](./DATA_MODEL.md).

---

## Customisation guide

Everything below can be done without touching component code.

### 1. Your identity & bio — `src/data/profile.json`

Update `name`, `role`, `tagline`, `location`, `email`, `about.paragraphs`,
and `about.highlights`. The `terminal` object controls the hero's typing
animation — `commandLines` are static, `roles` cycle continuously.

### 2. Your photo — `public/images/`

Drop your photo in as e.g. `public/images/avatar.jpg`, then update
`profile.json`:

```json
"avatar": "/images/avatar.jpg"
```

### 3. Your CV/resume — `public/resume.pdf`

Replace the placeholder `public/resume.pdf` with your real PDF (keep the
same filename, or update `profile.json#resumeFile` to match a new one). The
"Download CV" button in the hero links directly to this file.

### 4. Skills — `src/data/skills.json`

Add/remove entries under `items`. Each needs a unique `id`, a `name`, a
`categoryId` (must match one of the four `categories` entries — or add your
own category), and a `level` from 0–100 (used for the progress bar).

### 5. Projects — `src/data/projects.json`

Add an object per project. `skillIds` should reference existing skill ids
from `skills.json` (this is how the skill tags on each project card are
populated). Set `"featured": true` to show a "Featured" ribbon. Leave
`"image": null` to show an auto-generated initials placeholder instead of a
screenshot, or point it at a file under `public/images/`.

### 6. Work history — `src/data/experience.json`

Ordered most-recent-first. Set `"endDate": null` for your current role — it
will display as "Present".

### 7. Education & certifications — `src/data/education.json`

Same pattern as experience, without the `skillIds`/`bullets` fields.

### 8. Social/contact links — `src/data/social.json`

Each entry needs a `platform` label, a `url`, and an `icon` name. Available
icon names are listed in `src/utils/iconMap.js` — add more by importing
from [`react-icons/fi`](https://react-icons.github.io/react-icons/icons/fi/)
(or another react-icons set) and registering them in that file.

### 9. Navigation & section order/visibility — `src/data/site.json`

```json
"navigation": {
  "sections": [
    { "id": "projects", "label": "Projects", "enabled": true }
  ]
}
```

Set `"enabled": false` to hide a section from both the navbar *and* the
page entirely — no code changes needed. Note: the **visual order** of
sections on the page is controlled separately, in `src/App.jsx`'s
`buildSectionMap` — reorder the JSX there if you want the page order to
differ from the nav order.

### 10. Colour theme & fonts — `src/data/site.json#theme`

This is the fastest way to make the site "yours". Every hex value here is
applied live as a CSS variable:

```json
"theme": {
  "--color-accent-1": "#7c5cff",
  "--color-accent-2": "#22d3ee",
  "--color-accent-3": "#f472b6"
}
```

Try swapping in your own palette — e.g. warm oranges/reds, or a single-hue
monochrome scheme. The glass panels, gradient text, buttons, and skill bars
all derive their colour from these three accents plus `--color-bg`.

To change fonts, edit `--font-display` / `--font-body` / `--font-mono` here
**and** update the Google Fonts `<link>` in `index.html` to load the fonts
you choose.

### 11. Favicon — `public/favicon.svg`

A simple SVG favicon is included with your initials. Replace it with your
own SVG (or swap the `<link rel="icon">` in `index.html` to point at a
`.png`/`.ico` instead).

---

## Running with Docker (beginner-friendly)

You mentioned you haven't used Docker much — here's a from-scratch
explanation alongside the commands.

### What Docker actually does, in plain terms

- A **Dockerfile** is a recipe: "start from this base system, install these
  things, copy in this code, run this command." Running `docker build`
  turns that recipe into an **image** — a snapshot/template.
- A **container** is a running instance of an image — like an object
  instantiated from a class. You can start, stop, and remove containers
  without affecting the image they came from.
- **Volumes** let a container read/write files on your actual computer
  (used in dev mode below, so your code edits show up instantly inside the
  container).
- **Ports** are mapped from the container to your machine — e.g. `8080:80`
  means "the container's internal port 80 is reachable at
  `localhost:8080` on your machine."

This project includes **two** Docker setups for two different purposes:

| File | Purpose | When to use it |
|------|---------|-----------------|
| `Dockerfile.dev` | Runs the Vite dev server with hot reload | While actively developing/customising the site |
| `Dockerfile` | Multi-stage: builds the site, then serves the static output via nginx | To test exactly what production will look like, or to self-host on a server/VPS |
| `docker-compose.yml` | Convenience wrapper so you don't have to remember long `docker run` commands | Either of the above |
| `nginx.conf` | Configuration for the web server used in the production image (compression, caching, fallback routing) | Used automatically by the production image |
| `.dockerignore` | Tells Docker which files to exclude when building (keeps images small and builds fast) | Used automatically |

> **Note:** GitHub Pages itself does **not** use Docker — it just serves
> the static files produced by `npm run build`. Docker here is for local
> development convenience and for **self-hosting elsewhere** (a VPS, Fly.io,
> Render, your own server, etc.) if you ever want an alternative to GitHub
> Pages.

### Prerequisite

Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
(includes Docker Compose). Verify it's installed:

```bash
docker --version
docker compose version
```

### Option A — Development mode (hot reload)

```bash
docker compose --profile dev up
```

What this does:
1. Builds an image from `Dockerfile.dev` (installs Node + your npm
   dependencies inside a Linux container).
2. Starts a container from that image, running `npm run dev` inside it.
3. Mounts your project folder into the container, so any file you edit on
   your machine is instantly reflected inside the container (and Vite
   hot-reloads the browser).
4. Maps container port `5173` to your machine's port `5173`.

Open **http://localhost:5173** — this behaves identically to running
`npm run dev` locally, just inside a container.

Stop it with `Ctrl+C`, or from another terminal: `docker compose --profile dev down`.

### Option B — Production mode (test the real build)

```bash
docker compose --profile prod up --build
```

What this does:
1. Builds an image from `Dockerfile` — a **multi-stage build**: a temporary
   "build" stage compiles the React app (`npm run build`), then a second,
   much smaller stage copies *only* the compiled static files into an
   `nginx` image (Node.js itself isn't part of the final image).
2. Starts a container running nginx, serving those static files.
3. Maps container port `80` to your machine's port `8080`.

Open **http://localhost:8080** — this is what your visitors will actually
receive once deployed.

Stop it with `Ctrl+C`, or: `docker compose --profile prod down`.

### Common Docker commands you'll use

```bash
docker compose --profile dev up          # start dev container (foreground)
docker compose --profile dev up -d       # same, but detached (background)
docker compose --profile dev down        # stop & remove the dev container
docker compose --profile prod up --build # rebuild image then start prod container
docker ps                                # list currently running containers
docker compose logs -f                   # stream logs from running containers
docker system prune                      # clean up unused images/containers (frees disk space)
```

### Building & running without Compose (raw Docker commands)

If you want to understand what Compose is doing under the hood:

```bash
# Production image
docker build -t my-portfolio .
docker run -p 8080:80 my-portfolio

# Development image
docker build -f Dockerfile.dev -t my-portfolio-dev .
docker run -p 5173:5173 -v "$(pwd)":/app -v /app/node_modules my-portfolio-dev
```

---

## Deploying to GitHub Pages

GitHub Pages serves static files for free from a GitHub repository. There
are two ways to deploy this project — pick one.

### Understanding the base path (read this first)

GitHub Pages serves your site differently depending on your repo name:

- **Project page** — any repo name (e.g. `my-portfolio`) → served at
  `https://<username>.github.io/my-portfolio/` (note the sub-path).
- **User/organisation page** — a repo literally named `<username>.github.io`
  → served at `https://<username>.github.io/` (no sub-path).

This matters because the built app needs to know that sub-path to load its
CSS/JS correctly. See `vite.config.js` and `.env.example` for how
`VITE_BASE_PATH` controls this.

### Method 1 — GitHub Actions (recommended, fully automatic)

This repo already includes `.github/workflows/deploy.yml`, which rebuilds
and redeploys the site on every push to `main`.

1. Push this project to a new GitHub repository.
2. **Edit `.github/workflows/deploy.yml`**: set `VITE_BASE_PATH` to
   `/<your-repo-name>/` (or `/` if your repo is named
   `<username>.github.io`).
3. In your repo on GitHub: **Settings → Pages → Build and deployment →
   Source →** select **"GitHub Actions"**.
4. Push to `main`. Check the **Actions** tab to watch the build/deploy run.
5. Your site will be live at the URL shown under **Settings → Pages**
   once the workflow finishes (usually 1–2 minutes).

Every future push to `main` redeploys automatically — just edit a JSON
file, commit, and push.

### Method 2 — Manual deploy with `gh-pages` (simple, one command)

A `deploy` script is already set up using the `gh-pages` package, which
pushes your built `/dist` folder to a `gh-pages` branch.

1. Set the base path for this build. Either:
   - create a `.env.local` file (copy `.env.example`) with
     `VITE_BASE_PATH=/<your-repo-name>/`, **or**
   - run the command inline (see below).
2. Push this project to a new GitHub repository.
3. Run:

   ```bash
   VITE_BASE_PATH=/<your-repo-name>/ npm run deploy
   ```

   (On Windows PowerShell: `$env:VITE_BASE_PATH="/<your-repo-name>/"; npm run deploy`)

4. In your repo on GitHub: **Settings → Pages → Build and deployment →
   Source →** select **"Deploy from a branch"**, branch **`gh-pages`**,
   folder **`/ (root)`**.
5. Your site will be live at the URL shown under **Settings → Pages**.

With this method you re-run `npm run deploy` manually whenever you want to
publish changes.

### Using a custom domain instead of `github.io`

You mentioned wanting your "free domain" — that refers to the free
`username.github.io` subdomain GitHub provides, which both methods above
already use, no extra registration needed. If you later buy a real custom
domain, GitHub Pages supports that too via **Settings → Pages → Custom
domain**.

---

## Accessibility & browser support

- Semantic landmarks (`<header>`/`<main>`/`<footer>` via component
  structure), heading hierarchy, and `aria-label`s on all icon-only
  buttons/links.
- Visible focus outlines (`:focus-visible`) throughout — don't remove
  these if you customise styles further.
- Respects `prefers-reduced-motion` (disables the aurora drift, card-hover
  transitions, and terminal typing animation).
- Built and tested against evergreen Chrome, Firefox, Safari, and Edge.
  `backdrop-filter` (the frosted-glass blur) requires a reasonably modern
  browser — Safari 9+/15.4+, Chrome 76+, Firefox 103+; on unsupported
  browsers, panels degrade gracefully to a solid translucent background.

---

## Scripts reference

| Command | What it does |
|---------|----------------|
| `npm run dev` | Start the local dev server with hot reload |
| `npm run build` | Produce an optimised production build in `/dist` |
| `npm run preview` | Serve the production build locally, to sanity-check it |
| `npm run lint` | Run static analysis (oxlint) across the codebase |
| `npm run deploy` | Build, then publish `/dist` to the `gh-pages` branch |

---

## Troubleshooting

**Page loads blank / assets 404 on GitHub Pages.**
Your `VITE_BASE_PATH` doesn't match your repo name. See
[Understanding the base path](#understanding-the-base-path-read-this-first).

**Docker dev container starts but changes aren't picked up.**
On some Windows/WSL setups, file-change events don't propagate into
containers by default — this is already handled via `CHOKIDAR_USEPOLLING=true`
in `docker-compose.yml`, but if it's still slow, try increasing your Docker
Desktop's allocated resources.

**`npm install` fails on an unrelated peer-dependency warning.**
Try `npm install --legacy-peer-deps`, or delete `node_modules` and
`package-lock.json` and reinstall.

**Fonts look different from the preview.**
Google Fonts requires an internet connection on first load (they're loaded
via CDN in `index.html`). For a fully offline-capable build, download the
font files and self-host them instead.

---

## License

This project template is provided for personal use — customise it freely
for your own portfolio. No attribution required, though it's appreciated.
