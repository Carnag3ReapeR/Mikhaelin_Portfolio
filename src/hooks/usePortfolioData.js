// src/hooks/usePortfolioData.js
//
// This hook is the "query layer" of our JSON star schema. Components should
// never import the raw JSON files directly for anything that needs a join
// (e.g. a project's skill names) — instead they call this hook, which
// resolves foreign-key references (skillIds -> skill objects) the same way
// a SQL JOIN would against a real star schema.
//
// Why not just nest everything in one big JSON file? Because de-normalising
// (one source of truth per skill/entity) means renaming or re-levelling a
// skill happens in exactly one place, instead of hunting through every
// project and experience entry that mentions it.

import { useMemo } from 'react';

import profile from '../data/profile.json';
import skillsData from '../data/skills.json';
import projectsData from '../data/projects.json';
import experienceData from '../data/experience.json';
import educationData from '../data/education.json';
import socialData from '../data/social.json';
import siteData from '../data/site.json';

/**
 * Builds a lookup map of skillId -> skill object for O(1) joins.
 */
function buildSkillLookup(skills) {
  return skills.reduce((lookup, skill) => {
    lookup[skill.id] = skill;
    return lookup;
  }, {});
}

/**
 * Resolves an array of skillIds into full skill objects, silently dropping
 * any id that no longer exists (e.g. a skill was deleted but a project
 * reference wasn't updated yet) instead of throwing at render time.
 */
function resolveSkillIds(skillIds = [], skillLookup) {
  return skillIds
    .map((id) => skillLookup[id])
    .filter(Boolean);
}

/**
 * Central hook exposing all portfolio content, with cross-file references
 * already resolved. Memoised so the joins only run once per session since
 * the underlying JSON is static build-time data.
 */
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
