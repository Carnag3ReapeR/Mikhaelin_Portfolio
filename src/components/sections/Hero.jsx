// Landing section: hero intro, CTA buttons, social links, and the terminal visual.
// All copy is sourced from site.json and profile.json — edit those to customize.

import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import { FiDownload, FiArrowRight } from 'react-icons/fi';
import TerminalWindow from '../ui/TerminalWindow';
import { getIcon } from '../../utils/iconMap';

function Hero({ profile, social }) {
  return (
    <section id="home" className="hero-section">
      <Container className="container-app">
        <Row className="align-items-center g-5">
          <Col lg={6}>
            {profile.availableForWork && (
              <div className="hero-status mb-3">
                <span className="status-dot" aria-hidden="true" />
                Available for new opportunities
              </div>
            )}

            <span className="eyebrow">{profile.role}</span>
            <h1 className="hero-name font-display mt-2">
              <span className="gradient-text">{profile.name}</span>
            </h1>
            <p className="hero-tagline">{profile.tagline}</p>

            <div className="d-flex flex-wrap gap-3 mt-4">
              <a href="#projects" className="btn-glass btn-glass-primary">
                View my work <FiArrowRight aria-hidden="true" />
              </a>
              <a href={profile.resumeFile} className="btn-glass" download>
                Download CV <FiDownload aria-hidden="true" />
              </a>
            </div>

            <div className="d-flex gap-3 mt-4">
              {social.map((link) => {
                const Icon = getIcon(link.icon);
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    className="icon-link"
                    target={link.url.startsWith('http') ? '_blank' : undefined}
                    rel={link.url.startsWith('http') ? 'noreferrer noopener' : undefined}
                    aria-label={link.platform}
                  >
                    <Icon aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </Col>

          <Col lg={6}>
            <TerminalWindow terminal={profile.terminal} />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

Hero.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    tagline: PropTypes.string.isRequired,
    resumeFile: PropTypes.string,
    availableForWork: PropTypes.bool,
    terminal: PropTypes.object.isRequired,
  }).isRequired,
  social: PropTypes.array.isRequired,
};

export default Hero;
