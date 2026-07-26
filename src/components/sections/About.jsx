// src/components/sections/About.jsx

import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import SectionTitle from '../ui/SectionTitle';
import GlassCard from '../ui/GlassCard';

function About({ profile }) {
  const { about } = profile;

  return (
    <section id="about" className="section-shell">
      <Container className="container-app">
        <SectionTitle eyebrow="About Me" title={about.heading} />

        <Row className="align-items-center g-5">
          <Col lg={4} className="order-lg-2 text-center">
            <GlassCard className="about-avatar-frame" interactive>
              <img src={profile.avatar} alt={`Portrait of ${profile.name}`} />
            </GlassCard>
          </Col>

          <Col lg={8} className="order-lg-1">
            {about.paragraphs.map((paragraph, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <p key={index} className="text-muted-custom" style={{ fontSize: '1.02rem' }}>
                {paragraph}
              </p>
            ))}

            <Row className="g-3 mt-2">
              {about.highlights.map((item) => (
                <Col xs={4} key={item.id}>
                  <GlassCard className="about-highlight">
                    <div className="highlight-value gradient-text">{item.value}</div>
                    <div className="highlight-label">{item.label}</div>
                  </GlassCard>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

About.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    about: PropTypes.shape({
      heading: PropTypes.string.isRequired,
      paragraphs: PropTypes.arrayOf(PropTypes.string).isRequired,
      highlights: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export default About;
