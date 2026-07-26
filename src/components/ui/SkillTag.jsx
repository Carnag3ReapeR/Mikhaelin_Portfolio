// src/components/ui/SkillTag.jsx
//
// Small glass "pill" showing a single skill name. Used on project cards to
// show which technologies a project used (resolved via usePortfolioData).

import PropTypes from 'prop-types';

function SkillTag({ name }) {
  return <span className="glass-pill">{name}</span>;
}

SkillTag.propTypes = {
  name: PropTypes.string.isRequired,
};

export default SkillTag;
