// src/components/sections/Education.jsx
//
// Education & certifications grid, sourced from data/education.json.

import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import { FiBookOpen } from 'react-icons/fi';
import SectionTitle from '../ui/SectionTitle';
import GlassCard from '../ui/GlassCard';

function Education({ education }) {
  return (
    <section id="education" className="section-shell">
      <Container className="container-app">
        <SectionTitle eyebrow="Learning Journey" title="Education & Certifications" />

        {education.length === 0 ? (
          // Edge case: no education entries defined yet
          <GlassCard className="p-4 text-center text-muted-custom">
            No education entries yet — add entries to <code>src/data/education.json</code>.
          </GlassCard>
        ) : (
          <Row className="g-4">
            {education.map((item) => (
              <Col md={6} lg={4} key={item.id}>
                <GlassCard className="education-card" interactive>
                  <FiBookOpen
                    className="mb-2"
                    style={{ color: 'var(--color-accent-1)', fontSize: '1.3rem' }}
                    aria-hidden="true"
                  />
                  <h3 className="education-credential font-display">{item.credential}</h3>
                  <p className="education-institution">{item.institution}</p>
                  <p className="education-years mb-2">
                    {item.startDate === item.endDate
                      ? item.startDate
                      : `${item.startDate} – ${item.endDate}`}
                  </p>
                  <p className="text-muted-custom mb-0" style={{ fontSize: '0.9rem' }}>
                    {item.description}
                  </p>
                </GlassCard>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
}

Education.propTypes = {
  education: PropTypes.array.isRequired,
};

export default Education;
