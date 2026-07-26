// src/App.jsx
//
// Root component. Responsibilities:
//   1. Load & join all portfolio data via usePortfolioData().
//   2. Apply the colour theme from data/site.json via useTheme().
//   3. Render the fixed aurora background, navbar, every enabled section
//      (in the order defined by site.json#navigation.sections), and footer.
//
// To reorder sections, reorder the entries in data/site.json#navigation.sections
// AND the JSX below (the nav order and the visual order are intentionally
// kept separate so you have full control over each).

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

// Map each section id (from site.json) to its rendered component. Sections
// not present in site.json#navigation, or with enabled: false, are skipped.
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
