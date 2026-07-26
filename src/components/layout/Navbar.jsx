// src/components/layout/Navbar.jsx


import { useState } from 'react';
import { Navbar as BsNavbar, Nav, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useScrollSpy } from '../../hooks/useScrollSpy';

function Navbar({ navigation }) {
  const [expanded, setExpanded] = useState(false);
  const enabledSections = navigation.sections.filter((s) => s.enabled);
  const [activeId, setActiveId] = useScrollSpy(enabledSections.map((s) => s.id));

  const handleSectionClick = (sectionId) => {
    setExpanded(false);
    setActiveId(sectionId);
  };

  return (
    <BsNavbar
      expand="lg"
      expanded={expanded}
      className="site-navbar glass-panel glass-panel--strong"
      variant="dark"
    >
      <Container className="container-app">
        <BsNavbar.Brand href="#home" onClick={() => setExpanded(false)}>
          {navigation.brandText}
        </BsNavbar.Brand>

        <BsNavbar.Toggle
          aria-controls="main-nav"
          onClick={() => setExpanded((prev) => !prev)}
          className="border-0 shadow-none"
        />

        <BsNavbar.Collapse id="main-nav">
          <Nav className="ms-auto">
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
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
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
};

export default Navbar;
