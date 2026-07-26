// Root component that orchestrates the portfolio experience.
// 
// Responsibilities:
// - Load all portfolio content and resolve cross-file references (see usePortfolioData)
// - Apply the active theme from site.json as CSS variables
// - Compose enabled sections based on site config, rendering them in declared order
// - Wrap everything with the aurora background, nav, and footer
//
// Design note: section visibility and order are controlled separately (nav vs page).
// Reorder sections by updating site.json#navigation.sections AND the JSX below —
// this lets you tweak nav vs page layout independently without fighting config.

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AuroraBackground from './components/ui/AuroraBackground';
import BackToTop from './components/ui/BackToTop';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import Contact from './components/sections/Contact';
import { usePortfolioData } from './hooks/usePortfolioData';
import { useTheme } from './hooks/useTheme';

// Map section IDs (from site.json) to their rendered components.
// Disabled or missing sections are filtered out before rendering.
function buildSectionMap({ profile, social, skillsByCategory, projects, experience, education }) {
  return {
    home: <Hero key="home" profile={profile} social={social} />,
    about: <About key="about" profile={profile} />,
    skills: <Skills key="skills" skillsByCategory={skillsByCategory} />,
    projects: <Projects key="projects" projects={projects} />,
    experience: <Experience key="experience" experience={experience} />,
    education: <Education key="education" education={education} />,
    contact: <Contact key="contact" profile={profile} social={social} />,
  };
}

function App() {
  const data = usePortfolioData();
  useTheme(data.site.theme);

  const sectionMap = buildSectionMap(data);
  const enabledSectionIds = data.site.navigation.sections
    .filter((section) => section.enabled)
    .map((section) => section.id);

  return (
    <>
      <AuroraBackground />
      <Navbar navigation={data.site.navigation} />

      <main>
        {enabledSectionIds.map((id) => sectionMap[id] ?? null)}
      </main>

      <Footer
        tagline={data.site.footer.tagline}
        name={data.profile.name}
        social={data.social}
      />

      {data.site.footer.showBackToTop && <BackToTop />}
    </>
  );
}

export default App;
