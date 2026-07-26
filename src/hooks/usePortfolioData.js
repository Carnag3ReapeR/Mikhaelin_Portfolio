// Central data layer that resolves the JSON star schema at runtime.
// 
// This hook is to our static JSON what a query engine is to a relational database:
// it resolves foreign-key references (skillIds -> skill objects, project.skillIds, etc.)
// and hydrates normalized entities into full objects ready for rendering.
//
// Reasons for the normalized design:
// - Single source of truth per entity (rename a skill once, it updates everywhere)
// - Easy to extend (add a new skill category, no cascading updates)
// - Smaller JSON footprint (less duplication, faster load)
// - Query layer stays decoupled from view layer (memoized for perf)
//
// Components should never import raw JSON directly — they consume this hook.
// If you find yourself hydrating references in a component, refactor here instead.

import { useMemo } from 'react';

import profile from '../data/profile.json';
import skillsData from '../data/skills.json';
import projectsData from '../data/projects.json';
import experienceData from '../data/experience.json';
import educationData from '../data/education.json';
import socialData from '../data/social.json';
import siteData from '../data/site.json';

// Build a skill lookup for O(1) joins during resolution. Avoids nested loops.
function buildSkillLookup(skills) {
  return skills.reduce((lookup, skill) => {
    lookup[skill.id] = skill;
    return lookup;
  }, {});
}

// Hydrate skill ID references into full objects. Silently filters stale IDs
// (e.g., references to deleted skills) instead of erroring — keeps the site
// stable even if data transitions lag during editing.
function resolveSkillIds(skillIds = [], skillLookup) {
  return skillIds
    .map((id) => skillLookup[id])
    .filter(Boolean);
}

// Export all portfolio data with references pre-resolved.
// Memoized since the source data is static — we compute joins once on mount, not on every render.
export function usePortfolioData() {
  return useMemo(() => {
    const skillLookup = buildSkillLookup(skillsData.items);

    const skillsByCategory = skillsData.categories.map((category) => ({
      ...category,
      skills: skillsData.items.filter((skill) => skill.categoryId === category.id),
    }));

    const projects = projectsData.items.map((project) => ({
      ...project,
      skills: resolveSkillIds(project.skillIds, skillLookup),
    }));

    const experience = experienceData.items.map((entry) => ({
      ...entry,
      skills: resolveSkillIds(entry.skillIds, skillLookup),
    }));

    return {
      profile,
      site: siteData,
      social: socialData.items,
      education: educationData.items,
      skillsByCategory,
      allSkills: skillsData.items,
      projects,
      featuredProjects: projects.filter((p) => p.featured),
      experience,
    };
  }, []);
}
