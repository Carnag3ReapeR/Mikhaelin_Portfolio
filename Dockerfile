# Dockerfile
# -----------------------------------------------------------------------------
# PRODUCTION image. Two stages:
#   1. "build"  — installs deps and runs `vite build` to produce static files.
#   2. "serve"  — copies just the built static files into a tiny nginx image.
#
# The final image contains NO Node.js, NO source code, and NO node_modules —
# only the compiled HTML/CSS/JS and nginx. This keeps it small (~25MB) and
# is exactly how you'd serve this app from any static host, container
# platform, or VPS (GitHub Pages doesn't need Docker at all — see README
# for that path — but this is useful for self-hosting, e.g. on a VPS,
# behind Traefik, on Fly.io/Render, etc).
# -----------------------------------------------------------------------------

# ---- Stage 1: build the static site -----------------------------------------
FROM node:20-alpine AS build

WORKDIR /app

# Copy only the manifest files first so Docker can cache the npm install
# layer — it only re-runs if package.json/package-lock.json actually change,
# not on every source file edit.
COPY package.json package-lock.json* ./
RUN npm ci

# Now copy the rest of the source and build.
COPY . .

# Build-time base path for asset URLs. Override with:
#   docker build --build-arg VITE_BASE_PATH=/ .
ARG VITE_BASE_PATH=/
ENV VITE_BASE_PATH=$VITE_BASE_PATH

RUN npm run build

# ---- Stage 2: serve the static build with nginx -----------------------------
FROM nginx:1.27-alpine AS serve

# Our custom nginx config (gzip, caching headers, SPA-friendly fallback).
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Only the compiled output is copied into the final image.
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -qO- http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
