# Personal Portfolio — React + Bootstrap 5 (Glassmorphism)

A production-ready portfolio site that gets out of your way.

**What you get:**
- A modern, responsive portfolio site (glassmorphism design, animated hero, scroll-linked nav)
- All content in simple JSON files — edit `profile.json` and `projects.json`, push to git, done
- Free hosting on GitHub Pages (linked directly from your CV)
- No database, no backend, no maintenance headaches
- Works offline as a static site; can self-host anywhere

**Who this is for:**
- Developers, designers, and other technical professionals who want a portfolio that reflects their standards
- People who'd rather edit JSON than fiddle with a GUI CMS
- Anyone who wants "own your content" semantics (it's all in git, versioned forever)

![Tech](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=0b1120)
![Tech](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=fff)
![Tech](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=fff)
![Tech](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker&logoColor=fff)

---

## Getting started in 3 steps

1. **Customize the data** — Edit `src/data/*.json` files with your info (name, role, projects, etc.)
2. **Add your photo & resume** — Drop files into `public/`
3. **Deploy to GitHub Pages** — Push to main, GitHub Actions handles the rest

That's it. Your site is live.

---

## Quick links

- **[5-minute setup](#5-minute-setup)** — Get it running locally
- **[Customization guide](#what-to-customize)** — Where to change what
- **[Deploy to GitHub Pages](#deploying-to-github-pages)** — Free hosting walkthrough
- **[Data model](#how-the-content-is-organized)** — How JSON files reference each other
- **[Docker (optional)](#running-with-docker)** — Containerized dev & prod

---

## 5-minute setup

**Prerequisites:** Node.js 20+ ([get it here](https://nodejs.org/))

```bash
# Clone or download this repo
git clone <repo-url>
cd personal-portfolio

# Install & start
npm install
npm run dev

# Open http://localhost:5173 in your browser
```

Made a change? Save a file → site reloads automatically (hot reload).

To build for production:
```bash
npm run build
npm run preview  # Test the production build locally
```

---

## What to customize

Everything below requires only editing JSON files or dropping in images — no code edits needed.

### Your identity (`src/data/profile.json`)

- `name`, `role`, `tagline` — Your headline
- `about.paragraphs` — Your bio (one paragraph per item)
- `availableForWork` — Shows/hides the "Available" status badge
- `terminal` — The hero section's typewriter animation (update `roles` to cycle through role titles)

### Your photo (`public/images/avatar.jpg`)

Drop your photo in, then update `profile.json#avatar`:
```json
"avatar": "/images/avatar.jpg"
```

To use a placeholder instead of a real photo, leave it as `null`.

### Your resume (`public/resume.pdf`)

Replace `public/resume.pdf` with your real CV (keep the filename). The "Download CV" button links to it.

### Skills (`src/data/skills.json`)

Add/remove skills. Each needs:
- `id` — Unique identifier (e.g., "react", "sql")
- `name` — Display name ("React", "SQL")
- `categoryId` — Must match a category in the same file
- `level` — 0–100 (used for the progress bar)

To add a new category, add an entry to the `categories` array.

### Projects (`src/data/projects.json`)

Each project:
- `id`, `title`, `description` — Basics
- `skillIds` — Array of skill IDs (references `skills.json`); these become skill tags
- `featured` — `true` shows a "Featured" badge
- `image` — URL to a screenshot, or `null` for auto-generated initials placeholder
- `links.demo` / `links.repo` — URLs to live site / GitHub

Example:
```json
{
  "id": "react-app",
  "title": "E-commerce Dashboard",
  "description": "Real-time inventory & sales dashboard.",
  "skillIds": ["react", "tailwind", "firebase"],
  "featured": true,
  "image": "/images/dashboard.png",
  "links": {
    "demo": "https://example.com/dashboard",
    "repo": "https://github.com/you/dashboard"
  }
}
```

### Work history (`src/data/experience.json`)

Most recent first. Set `endDate: null` to show "Present".

```json
{
  "id": "senior-dev",
  "company": "Acme Corp",
  "role": "Senior Developer",
  "startDate": "2021-03",
  "endDate": null,
  "bullets": ["Built...", "Led team..."],
  "skillIds": ["react", "node", "postgres"]
}
```

### Education (`src/data/education.json`)

Same format as experience, but without `skillIds` or `bullets`.

### Contact & social links (`src/data/social.json`)

Each link needs:
- `platform` — Display name ("GitHub", "LinkedIn")
- `url` — Where the button links
- `icon` — Icon name from `react-icons/fi` (e.g., "FiGithub")

To add new icons:
1. Find one at [react-icons.github.io/react-icons/icons/fi/](https://react-icons.github.io/react-icons/icons/fi/)
2. Import it in `src/utils/iconMap.js` and add it to `ICON_MAP`
3. Reference it in `social.json`

### Navigation & sections (`src/data/site.json`)

Show/hide sections:
```json
"navigation": {
  "sections": [
    { "id": "projects", "label": "Projects", "enabled": true },
    { "id": "contact", "label": "Contact", "enabled": false }
  ]
}
```

Set `enabled: false` to hide a section entirely (both nav and page).

### Theme & colors (`src/data/site.json#theme`)

Rebrand in seconds:
```json
"theme": {
  "--color-accent-1": "#7c5cff",
  "--color-accent-2": "#22d3ee",
  "--color-accent-3": "#f472b6",
  "--color-bg": "#0f0a1a",
  "--font-display": "Poppins",
  "--font-body": "Inter",
  "--font-mono": "Fira Code"
}
```

These are applied as CSS variables — the whole site re-skins on reload. To load different fonts from Google Fonts, also update the `<link>` in `index.html`.

### Favicon (`public/favicon.svg`)

Replace with your own SVG or PNG.

---

## Features that matter

- **JSON-first content** — No headless CMS, no API calls. Your content is version-controlled in git
- **Glassmorphism design** — Frosted glass cards, animated aurora background, polished micro-interactions
- **One-file theme** — Change colors and fonts in site.json without touching CSS
- **Fully responsive** — Mobile-first design that works on everything from phones to 4K
- **Accessibility included** — Semantic HTML, keyboard navigation, reduced-motion support, tested with screen readers
- **Super fast** — Builds to <500KB static files. Ships in seconds
- **Free hosting** — Deploy to GitHub Pages (or anywhere). No servers to manage
- **CI/CD ready** — GitHub Actions workflow included; automates building and deploying on every push
- **Works for self-hosting** — Docker setup for VPS / Render / Fly.io if you want an alternative to GitHub Pages

---

## Why this approach

| What | Why |
|------|-----|
| **React + Vite** | Fast dev experience and tiny production builds. Vite rebuilds in milliseconds |
| **Plain JSON files** | Content lives in git, versioned forever. Easy to edit, no database to maintain |
| **Bootstrap 5** | Production-tested component library. React-Bootstrap keeps it all React (no jQuery) |
| **React-icons** | Tree-shakeable icon library. Only the icons you use end up in the bundle |
| **CSS variables + CSS Grid** | Keep theming simple. One JSON file controls the entire color/font palette |

---

## File structure

```
├── public/                    # Static files (images, CV, favicon)
│   ├── resume.pdf            # Your CV — linked by the "Download" button
│   ├── favicon.svg           # Site icon
│   └── images/               # Your photos and project screenshots
│
├── src/
│   ├── data/                 # ← All your content lives here (JSON files)
│   │   ├── profile.json      # Name, bio, hero terminal
│   │   ├── projects.json     # Portfolio projects
│   │   ├── experience.json   # Work history
│   │   ├── education.json    # School, certs
│   │   ├── skills.json       # Skills grouped by category
│   │   ├── social.json       # Social / contact links
│   │   └── site.json         # Nav config, colors, fonts, section toggles
│   │
│   ├── components/           # React components
│   │   ├── sections/         # Page sections (Hero, About, Skills, etc.)
│   │   ├── layout/           # Navbar, Footer
│   │   └── ui/               # Reusable building blocks (GlassCard, etc.)
│   │
│   ├── hooks/                # Custom React hooks
│   │   ├── usePortfolioData.js    # Loads & joins JSON files
│   │   ├── useTheme.js            # Applies theme to CSS
│   │   ├── useScrollSpy.js        # Nav highlighting on scroll
│   │   └── useTypewriter.js       # Typewriter animation
│   │
│   ├── utils/                # Helpers
│   │   ├── iconMap.js        # Maps icon names to components
│   │   └── dateHelpers.js    # Date formatting
│   │
│   ├── styles/               # Global CSS
│   └── main.jsx              # React entry point
│
├── .github/workflows/
│   └── deploy.yml            # Automates build → deploy to GitHub Pages
│
├── Dockerfile                # Production image (Node build → nginx)
├── Dockerfile.dev            # Dev image (hot reload)
└── docker-compose.yml        # Docker convenience commands

---

## How the content is organized

Your data lives in `src/data/` as a "star schema" — similar to a relational database:

- **Hub:** `profile.json` — Your identity (name, bio, avatar)
- **Dimensions:** Standalone entities like `skills.json`, `projects.json`, `experience.json`
- **References:** Projects reference skills by ID instead of duplicating data

Example:
```json
// projects.json
{
  "id": "my-app",
  "title": "My App",
  "skillIds": ["react", "tailwind"]  // ← References skill IDs
}

// skills.json
{
  "items": [
    { "id": "react", "name": "React", "level": 90 },
    { "id": "tailwind", "name": "Tailwind", "level": 85 }
  ]
}
```

**Why?** Rename a skill once in `skills.json`, it updates everywhere. Add a new project, reference existing skills. No copy-paste, no stale references.

The `usePortfolioData()` hook (see `src/hooks/usePortfolioData.js`) resolves these references at runtime — components receive hydrated objects with full skill details already attached.

---

## Deploying to GitHub Pages

### Option A: User page (recommended if you're starting fresh)

Your site lives at `https://username.github.io`

1. **Create a repo** — Go to [github.com/new](https://github.com/new)
   - Name: `<your-username>.github.io` (e.g., `jsmith.github.io`)
   - Public
   - Create

2. **Add your code**
   ```bash
   git remote add origin https://github.com/<username>/<username>.github.io.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repo → **Settings → Pages**
   - Source: **"GitHub Actions"**
   - Save

4. **Deploy**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push
   ```
   
   Check **Actions** tab to watch the build. Site is live in ~2–3 minutes.

5. **Update the workflow** (optional)
   - Open `.github/workflows/deploy.yml`
   - `VITE_BASE_PATH` should be `/` — it's already set correctly for user pages

### Option B: Project page (if you want a different repo name)

Your site lives at `https://username.github.io/my-portfolio`

1. **Create a repo** — Go to [github.com/new](https://github.com/new)
   - Name: `my-portfolio` (or whatever)
   - Public
   - Create

2. **Add your code** — Same git commands as Option A, but use `my-portfolio` in the URL

3. **Update the workflow**
   - Open `.github/workflows/deploy.yml`
   - Change `VITE_BASE_PATH: /` to `VITE_BASE_PATH: /my-portfolio/`
   - Commit and push

4. **Enable GitHub Pages**
   - Go to your repo → **Settings → Pages**
   - Source: **"GitHub Actions"**
   - Save

5. **Trigger deployment** — Push any commit. Site is live in ~2–3 minutes.

---

## Updating after deploy

Make a change, push to `main`. Done.

```bash
# Edit a JSON file
vim src/data/projects.json

# Commit and push
git add src/data/projects.json
git commit -m "Add new project"
git push
```

GitHub Actions rebuilds and deploys automatically. Site updates in 2–3 minutes.

---

## Local testing (optional)

To test the production build before pushing:

```bash
npm run build
npm run preview
```

Open the URL it prints (usually http://localhost:4173). This is what GitHub Pages will serve.

---

## Running with Docker

**Why?** If you're self-hosting (not using GitHub Pages), Docker makes it easy to run the production build anywhere: VPS, Render, Fly.io, your own server, etc.

### Setup

1. **Install Docker Desktop** — [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
2. **Verify it works**
   ```bash
   docker --version
   docker compose version
   ```

### Development mode (with hot reload)

```bash
docker compose --profile dev up
```

Open http://localhost:5173. Edit files; changes reload instantly. Stop with `Ctrl+C`.

### Production mode (test the real build)

```bash
docker compose --profile prod up --build
```

Open http://localhost:8080. This is exactly what your visitors will see. Stop with `Ctrl+C`.

### Common commands

```bash
docker compose --profile dev up -d       # Start dev in background
docker compose logs -f                   # Stream logs from running containers
docker compose down                      # Stop and remove containers
docker system prune                      # Clean up unused images (frees disk)
```

For full Docker docs, see [docker.com](https://www.docker.com/).

---

## Browser support & accessibility

- ✅ Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile and tablet (iOS Safari, Android Chrome)
- ✅ Semantic HTML, keyboard nav, screen reader tested
- ✅ Respects `prefers-reduced-motion` (animations disabled for accessibility)
- ⚠️ `backdrop-filter` (frosted glass) requires Safari 15.4+, Chrome 76+, Firefox 103+
  - On older browsers, panels fall back to solid semi-transparent backgrounds

Older IE / very old Safari won't get the frosted glass effect, but the site remains fully usable.

---

## Commands reference

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start local dev server with hot reload |
| `npm run build` | Build for production (outputs to `/dist`) |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run static analysis (oxlint) |
| `npm run deploy` | Build and manually deploy to gh-pages branch (alternative to GitHub Actions) |

---

## Troubleshooting

**Q: Page loads blank on GitHub Pages**  
A: Your `VITE_BASE_PATH` doesn't match your repo URL.
- For user pages (`username.github.io`): set `VITE_BASE_PATH=/`
- For project pages (`username.github.io/repo`): set `VITE_BASE_PATH=/repo/`

Check `.github/workflows/deploy.yml` and push a new commit to trigger rebuild.

**Q: Assets return 404 on GitHub Pages**  
A: Same as above — verify `VITE_BASE_PATH` matches your deployment URL.

**Q: npm install fails**  
A: Try `npm install --legacy-peer-deps`, or delete `package-lock.json` and `node_modules/` and reinstall.

**Q: Dev server doesn't update on file changes (Docker)**  
A: On some Windows/WSL setups, file-change events don't propagate into containers. Already handled by `CHOKIDAR_USEPOLLING=true` in `docker-compose.yml`, but if it's still slow, increase Docker Desktop's CPU/memory allocation.

**Q: Fonts look different on GitHub Pages**  
A: Google Fonts require an internet connection to load from CDN. For offline usage, download fonts and self-host them in `public/fonts/`.

---

## Want more details?

- **[DATA_MODEL.md](./DATA_MODEL.md)** — Deep dive on the JSON star schema, why it's structured this way
- **[GITHUB_PAGES_SETUP.md](./GITHUB_PAGES_SETUP.md)** — Step-by-step GitHub Pages deployment guide
- **[GitHub Actions docs](https://docs.github.com/en/actions)**
- **[React documentation](https://react.dev)**
- **[Vite guide](https://vitejs.dev/guide/)**
