// src/components/layout/Navbar.jsx

import { useState, useEffect } from 'react';
import { Navbar as BsNavbar, Nav, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useScrollSpy } from '../../hooks/useScrollSpy';

function Navbar({ navigation, profile }) {
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const enabledSections = navigation.sections.filter((s) => s.enabled);
  const [activeId, setActiveId] = useScrollSpy(enabledSections.map((s) => s.id));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSectionClick = (sectionId) => {
    setExpanded(false);
    setActiveId(sectionId);
  };

  return (
    <header className={`site-navbar-wrapper ${scrolled ? 'scrolled' : ''}`}>
      <BsNavbar
        expand="lg"
        expanded={expanded}
        className="site-navbar"
        variant="dark"
      >
        <Container className="container-app p-0">
          <div className="d-flex align-items-center gap-3">
            <BsNavbar.Brand
              href="#home"
              onClick={() => handleSectionClick('home')}
              className="nav-brand-wrapper p-0 m-0"
            >
              <div className="brand-emblem">
                <span className="gradient-text">{navigation.brandText}</span>
              </div>
              {profile?.availableForWork && (
                <span className="status-badge d-none d-sm-inline-flex">
                  <span className="status-dot-pulse" aria-hidden="true" />
                  Available for work
                </span>
              )}
            </BsNavbar.Brand>
          </div>

          <button
            className={`custom-nav-toggle d-lg-none ${expanded ? 'open' : ''}`}
            onClick={() => setExpanded((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>

          <BsNavbar.Collapse id="main-nav">
            <Nav className="ms-auto align-items-lg-center">
              {enabledSections.map((section) => (
                <Nav.Link
                  key={section.id}
                  href={`#${section.id}`}
                  className={activeId === section.id ? 'active' : ''}
                  onClick={() => handleSectionClick(section.id)}
                >
                  {section.label}
                </Nav.Link>
              ))}
              <a
                href="#contact"
                className="nav-cta-btn"
                onClick={() => handleSectionClick('contact')}
              >
                <span>Get In Touch</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </Nav>
          </BsNavbar.Collapse>
        </Container>
      </BsNavbar>
    </header>
  );
}

Navbar.propTypes = {
  navigation: PropTypes.shape({
    brandText: PropTypes.string,
    sections: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        enabled: PropTypes.bool.isRequired,
      })
    ).isRequired,
  }).isRequired,
  profile: PropTypes.shape({
    availableForWork: PropTypes.bool,
  }),
};

export default Navbar;

