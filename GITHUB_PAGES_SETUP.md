# Deploying to GitHub Pages with GitHub Actions — Step-by-Step Guide

This guide walks you through setting up automatic deployment of your portfolio to GitHub Pages using GitHub Actions.

---

## Table of Contents

1. [Before you start](#before-you-start)
2. [Step 1: Create a GitHub repository](#step-1-create-a-github-repository)
3. [Step 2: Determine your base path](#step-2-determine-your-base-path)
4. [Step 3: Configure the GitHub Actions workflow](#step-3-configure-the-github-actions-workflow)
5. [Step 4: Enable GitHub Pages](#step-4-enable-github-pages)
6. [Step 5: Push to GitHub](#step-5-push-to-github)
7. [Step 6: Monitor the deployment](#step-6-monitor-the-deployment)
8. [Troubleshooting](#troubleshooting)

---

## Before you start

**What you need:**
- A GitHub account (free tier works fine)
- Your portfolio project ready locally
- Git installed and configured
- Command line / terminal access

---

## Step 1: Create a GitHub repository

### Option A: User/Organization Page (recommended if you don't have a portfolio repo yet)

This gives you a clean `username.github.io` domain.

1. Go to [github.com/new](https://github.com/new)
2. **Repository name:** `<your-username>.github.io`
   - Example: `jsmith.github.io` if your username is `jsmith`
3. **Description:** "Personal Portfolio"
4. **Visibility:** Public (required for free GitHub Pages)
5. Click **Create repository**
6. Follow the instructions shown to add your local code (e.g., `git remote add origin https://github.com/<your-username>/<your-username>.github.io.git`)

### Option B: Project Page (if you prefer a different repo name)

This serves your site at `username.github.io/my-portfolio/`.

1. Go to [github.com/new](https://github.com/new)
2. **Repository name:** anything you want (e.g., `my-portfolio`)
3. **Visibility:** Public
4. Click **Create repository**
5. Follow the instructions to add your local code

---

## Step 2: Determine your base path

The **base path** tells Vite where your site will be served from. This is critical for assets to load correctly.

### If using Option A (User Page: `<username>.github.io`)

Your base path is `/` (the root).

In your project, check/create `.env.local` and set:
```
VITE_BASE_PATH=/
```

Or keep it blank (the default in `vite.config.js` is already `/`).

### If using Option B (Project Page: `<username>.github.io/my-portfolio/`)

Your base path is `/<repo-name>/`.

In your project, create `.env.local` and set:
```
VITE_BASE_PATH=/my-portfolio/
```

(Replace `my-portfolio` with your actual repository name.)

**Note:** Do NOT commit `.env.local` — it's in `.gitignore` so it stays local. The GitHub Actions workflow will pass the correct value as an environment variable.

---

## Step 3: Configure the GitHub Actions workflow

Your project already has `.github/workflows/deploy.yml`. You just need to update one line.

1. Open `.github/workflows/deploy.yml` in your editor
2. Find the line that sets `VITE_BASE_PATH` (around line 30–40)
3. Update it to match your repository setup:

   **For User Page (`<username>.github.io`):**
   ```yaml
   VITE_BASE_PATH: /
   ```

   **For Project Page (`<username>.github.io/my-portfolio/`):**
   ```yaml
   VITE_BASE_PATH: /my-portfolio/
   ```

4. Save the file

### Example (Project Page)

```yaml
name: Build and Deploy

on:
  push:
    branches:
      - main

env:
  VITE_BASE_PATH: /my-portfolio/  # ← Update this to your repo name

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pages: write
      id-token: write

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm install

      - name: Build the project
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top-right menu)
3. In the left sidebar, click **Pages**
4. Under **"Build and deployment"**:
   - **Source:** select **"GitHub Actions"**
   - (You should **not** select "Deploy from a branch" — GitHub Actions will handle deployment)
5. Leave **Branch** and **Folder** alone (GitHub Actions configures this automatically)
6. Click **Save** (if visible) or just close this tab — the setting is automatic once you have GitHub Actions enabled

---

## Step 5: Push to GitHub

Commit your changes (the updated workflow) and push to the `main` branch:

```bash
git add .github/workflows/deploy.yml
git commit -m "chore: configure GitHub Actions for GitHub Pages deployment"
git push origin main
```

(Replace `main` with `master` if your default branch is called `master`.)

---

## Step 6: Monitor the deployment

1. Go to your repository on GitHub
2. Click the **Actions** tab (top menu)
3. You should see your workflow job appear (called "Build and Deploy" or similar) with a yellow running indicator
4. Click on it to watch the build progress
5. Once complete, you'll see a green checkmark ✓

### Your site is live!

- **User Page:** Visit `https://<username>.github.io`
- **Project Page:** Visit `https://<username>.github.io/<repo-name>`

It usually takes 1–3 minutes for GitHub Pages to serve your site after the workflow completes.

---

## Making updates

From now on, every time you:

1. Edit a JSON file in `src/data/`
2. Commit the change: `git commit -am "update: add new project"`
3. Push to main: `git push origin main`

The workflow **automatically rebuilds and redeploys your site** — usually within 2–3 minutes.

---

## Troubleshooting

### "Page loads blank / assets are 404"

**Cause:** Your `VITE_BASE_PATH` doesn't match your actual GitHub Pages URL.

**Fix:**
- Double-check the `VITE_BASE_PATH` in `.github/workflows/deploy.yml`
- Make sure it matches your repo name (for project pages)
- Rebuild: push a dummy commit to trigger the workflow again

### "GitHub Actions workflow fails with 'npm install' error"

**Cause:** Usually a peer dependency mismatch.

**Fix:**
1. Locally, run: `npm install --legacy-peer-deps`
2. Commit the updated `package-lock.json`
3. Push to trigger the workflow again

### "GitHub Pages is still set to 'Deploy from a branch'"

**Cause:** You selected the wrong source in Settings → Pages.

**Fix:**
1. Go to Settings → Pages
2. Change **Source** to **"GitHub Actions"**
3. Trigger the workflow again by pushing a new commit

### "I pushed but GitHub Actions didn't run"

**Cause:** The workflow might be disabled, or the branch isn't `main`.

**Fix:**
1. Check **Actions** tab — if you see "Workflows are disabled", re-enable them in your repo Settings
2. Make sure you're pushing to the correct default branch (usually `main`)

### "Site works locally but not on GitHub Pages"

**Cause:** Static asset paths (images, CSS, JS) are wrong.

**Fix:**
- Verify `VITE_BASE_PATH` matches your GitHub Pages URL
- Run `npm run build && npm run preview` locally to test the production build
- If it works in preview, the issue is GitHub Pages config — check the base path again

---

## Next steps

✅ Site is live!

- Customize the content in `src/data/` JSON files
- Change the color theme in `src/data/site.json`
- Upload your own avatar image to `public/images/`
- Replace `public/resume.pdf` with your real CV

Every push to `main` updates your live site automatically.

---

## Additional resources

- [GitHub Pages docs](https://docs.github.com/en/pages)
- [GitHub Actions docs](https://docs.github.com/en/actions)
- [Your project's README](./README.md) — more context on customization
- [Your data model docs](./DATA_MODEL.md) — how the JSON structure works
