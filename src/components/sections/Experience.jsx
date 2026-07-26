// src/components/sections/Experience.jsx
//
// Work history rendered as a vertical timeline, most recent first (the
// order defined in data/experience.json is preserved as-is).

import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import SectionTitle from '../ui/SectionTitle';
import GlassCard from '../ui/GlassCard';
import SkillTag from '../ui/SkillTag';
import { formatDateRange } from '../../utils/dateHelpers';

function Experience({ experience }) {
  return (
    <section id="experience" className="section-shell">
      <Container className="container-app">
        <SectionTitle eyebrow="Where I've Worked" title="Experience" />

        <Row>
          <Col lg={10} xl={9}>
            {experience.length === 0 ? (
              // Edge case: no experience entries defined yet
              <GlassCard className="p-4 text-center text-muted-custom">
                No experience added yet — add entries to{' '}
                <code>src/data/experience.json</code>.
              </GlassCard>
            ) : (
              <div className="timeline">
                {experience.map((job) => (
                  <div className="timeline-item" key={job.id}>
                    <span className="timeline-dot" aria-hidden="true" />
                    <GlassCard className="timeline-card">
                      <h3 className="timeline-role font-display">
                        {job.role} · {job.company}
                      </h3>
                      <div className="timeline-meta">
                        <span>{formatDateRange(job.startDate, job.endDate)}</span>
                        <span>{job.location}</span>
                      </div>
                      <ul className="timeline-bullets">
                        {job.bullets.map((bullet) => (
                          <li key={bullet.slice(0, 24)}>{bullet}</li>
                        ))}
                      </ul>
                      <div className="project-tags">
                        {job.skills.map((skill) => (
                          <SkillTag key={skill.id} name={skill.name} />
                        ))}
                      </div>
                    </GlassCard>
                  </div>
                ))}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
}

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default Experience;
