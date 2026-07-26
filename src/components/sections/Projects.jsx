// src/components/sections/Projects.jsx
//
// Projects grid. Reads the already-joined `projects` array from
// usePortfolioData (skills resolved from skillIds). Add a new project by
// adding an entry to data/projects.json — this component needs no edits.

import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import SectionTitle from '../ui/SectionTitle';
import GlassCard from '../ui/GlassCard';
import SkillTag from '../ui/SkillTag';
import { getIcon } from '../../utils/iconMap';

function ProjectCard({ project }) {
  const PlaceholderIcon = project.icon ? getIcon(project.icon) : null;

  return (
    <div className="project-card-wrapper">
      <GlassCard as="article" className={`project-card ${project.featured ? 'project-card--featured' : ''}`} interactive>
        {project.featured && <span className="featured-badge" aria-hidden="true">Featured</span>}
        <div className="project-card-media">
          {project.image ? (
            <img src={project.image} alt={`${project.title} preview`} />
          ) : PlaceholderIcon ? (
            <span className="placeholder-icon" aria-hidden="true">
              <PlaceholderIcon />
            </span>
          ) : (
            <span className="placeholder-glyph" aria-hidden="true">
              {project.title
                .split(' ')
                .map((word) => word[0])
                .join('')
                .slice(0, 2)
                .toUpperCase()}
            </span>
          )}
        </div>

        <h3 className="project-title font-display">{project.title}</h3>
        <p className="project-summary">{project.summary}</p>

        <div className="project-tags">
          {project.skills.map((skill) => (
            <SkillTag key={skill.id} name={skill.name} />
          ))}
        </div>

        <div className="project-links">
          {project.links.live && (
            <a
              href={project.links.live}
              className="btn-glass"
              target="_blank"
              rel="noreferrer noopener"
            >
              Live <FiExternalLink aria-hidden="true" />
            </a>
          )}
          {project.links.repo && (
            <a
              href={project.links.repo}
              className="btn-glass"
              target="_blank"
              rel="noreferrer noopener"
            >
              Code <FiGithub aria-hidden="true" />
            </a>
          )}
        </div>
      </GlassCard>
    </div>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    featured: PropTypes.bool,
    image: PropTypes.string,
    skills: PropTypes.array.isRequired,
    links: PropTypes.shape({
      live: PropTypes.string,
      repo: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

function Projects({ projects }) {
  return (
    <section id="projects" className="section-shell">
      <Container className="container-app">
        <SectionTitle eyebrow="Selected Work" title="Projects" />

        {projects.length === 0 ? (
          // Edge case: no projects defined yet in data/projects.json
          <GlassCard className="p-4 text-center text-muted-custom">
            No projects added yet — add entries to <code>src/data/projects.json</code> to
            populate this section.
          </GlassCard>
        ) : (
          <Row className="g-4">
            {projects.map((project) => (
              <Col md={6} lg={4} key={project.id}>
                <ProjectCard project={project} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
}

Projects.propTypes = {
  projects: PropTypes.array.isRequired,
};

export default Projects;
