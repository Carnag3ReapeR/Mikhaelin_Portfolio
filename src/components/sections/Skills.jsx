// src/components/sections/Skills.jsx
//
// Skills section: renders one glass card per category (from
// skills.json#categories), each listing its skills as animated progress
// bars. Add a new skill by adding an entry to skills.json#items — no
// component changes required.

import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import SectionTitle from '../ui/SectionTitle';
import GlassCard from '../ui/GlassCard';
import { getIcon } from '../../utils/iconMap';

function SkillBar({ name, level, animate }) {
  return (
    <div className="skill-row">
      <div className="skill-row-labels">
        <span className="skill-name">{name}</span>
        <span className="skill-level">{level}%</span>
      </div>
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          style={{ width: animate ? `${level}%` : '0%' }}
        />
      </div>
    </div>
  );
}

SkillBar.propTypes = {
  name: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  animate: PropTypes.bool.isRequired,
};

function Skills({ skillsByCategory }) {
  const sectionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Animate the bars in only once, the first time the section scrolls
  // into view, rather than on every mount.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="section-shell" ref={sectionRef}>
      <Container className="container-app">
        <SectionTitle eyebrow="What I Work With" title="Skills & Technologies" />

        <Row className="g-4">
          {skillsByCategory.map((category) => {
            const CategoryIcon = getIcon(category.icon);
            return (
              <Col md={6} lg={3} key={category.id}>
                <GlassCard className="skill-category-card" interactive>
                  <div className="skill-category-title">
                    <CategoryIcon className="cat-icon" aria-hidden="true" />
                    {category.label}
                  </div>
                  {category.skills.map((skill) => (
                    <SkillBar
                      key={skill.id}
                      name={skill.name}
                      level={skill.level}
                      animate={hasAnimated}
                    />
                  ))}
                </GlassCard>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
}

Skills.propTypes = {
  skillsByCategory: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.string,
      skills: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          level: PropTypes.number.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default Skills;
