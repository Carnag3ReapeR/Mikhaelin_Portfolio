// src/components/ui/SectionTitle.jsx
//
// Consistent section heading: a small mono "eyebrow" label above a large
// display heading. Used at the top of every section for visual rhythm.

import PropTypes from 'prop-types';

function SectionTitle({ eyebrow, title, align = 'start' }) {
  const textAlignClass = align === 'center' ? 'text-center mx-auto' : '';

  return (
    <div className={`mb-4 ${textAlignClass}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="section-heading font-display">{title}</h2>
    </div>
  );
}

SectionTitle.propTypes = {
  eyebrow: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  align: PropTypes.oneOf(['start', 'center']),
};

export default SectionTitle;
