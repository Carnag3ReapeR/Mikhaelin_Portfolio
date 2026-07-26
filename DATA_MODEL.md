# Data Model — JSON "Star Schema"

This project has no database and no backend (see `README.md` for why). Instead,
content lives in plain JSON files under `src/data/`, structured the same way
you'd design a **star schema** in a real data warehouse: one central hub, and
several independent "dimension" tables that the hub — and each other — refer
to **by id**, rather than duplicating data inline everywhere it's used.

```
                        ┌───────────────────┐
                        │   profile.json    │   ← the "fact" / hub table
                        │  (identity, bio,   │
                        │  hero terminal,    │
                        │  SEO metadata)     │
                        └─────────┬──────────┘
                                  │
        ┌───────────┬────────────┼────────────┬────────────┐
        │            │            │            │            │
   ┌────▼───┐  ┌─────▼─────┐ ┌───▼────┐  ┌─────▼─────┐ ┌────▼────┐
   │skills  │  │projects   │ │experience│ │education │ │social   │
   │.json   │◄─┤.json      │ ├.json     │ │.json     │ │.json    │
   │        │  │(skillIds) │ │(skillIds)│ │          │ │         │
   └────────┘  └───────────┘ └──────────┘ └──────────┘ └─────────┘

   dimension     dimension      dimension    dimension    dimension
   (skills &     tables reference
   categories)   skills.json via
                 the "skillIds"
                 foreign key array
```

## Why this structure?

| Problem with a single flat JSON blob                              | How the star schema fixes it |
|---------------------------------------------------------------------|-------------------------------|
| Renaming a skill means editing every project/experience entry that mentions it | Skill names live in **one place** (`skills.json`); everything else references it by `id` |
| Hard to reason about what data belongs together | Each file has one clear responsibility (single-responsibility, applied to data) |
| Adding a new project/skill/job risks breaking unrelated sections | Files are independent — add a row to `projects.json` and nothing else needs to change |
| No way to know what "shape" the data should be | Each file's top-level `_comment` documents its purpose and relationships inline |

## The files

| File | Role | Primary key | Foreign keys |
|------|------|-------------|---------------|
| `profile.json` | Hub — name, bio, hero terminal config, SEO | — | — |
| `site.json` | Site-wide config — nav, section visibility, theme colours | — | — |
| `skills.json` | Dimension — skills grouped by category | `items[].id`, `categories[].id` | `items[].categoryId → categories[].id` |
| `projects.json` | Dimension — portfolio projects | `items[].id` | `items[].skillIds[] → skills.json#items[].id` |
| `experience.json` | Dimension — work history | `items[].id` | `items[].skillIds[] → skills.json#items[].id` |
| `education.json` | Dimension — education & certifications | `items[].id` | — |
| `social.json` | Dimension — social/contact links | `items[].id` | — |

## The "join" layer

Because JSON has no native way to resolve `skillIds: ["skill-react"]` into
`{ id: "skill-react", name: "React", level: 90 }`, that resolution happens in
code, at runtime, in **one place**: [`src/hooks/usePortfolioData.js`](./src/hooks/usePortfolioData.js).

This hook is the equivalent of a SQL `JOIN` — it builds an `id → skill` lookup
map once, then resolves every `skillIds` array into full skill objects before
handing the data to components. Components never import the raw JSON files
directly when they need joined data; they call `usePortfolioData()` and get
back fully-resolved objects. This keeps the "query logic" out of your UI
components entirely.

## Adding or editing content

You never need to touch component code to update content:

- **New skill** → add an object to `skills.json#items` with a unique `id`.
- **New project** → add an object to `projects.json#items`; reference any
  skills used via `skillIds` (must match existing skill `id`s).
- **New job** → add an object to `experience.json#items`.
- **New qualification** → add an object to `education.json#items`.
- **Reorder or hide a nav section** → edit `site.json#navigation.sections`.
- **Re-theme the whole site** → edit the hex values in `site.json#theme`.

See `README.md` → "Customisation Guide" for a walkthrough with examples.
