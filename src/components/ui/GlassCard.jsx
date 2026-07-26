// src/components/ui/GlassCard.jsx
//
// Reusable frosted-glass panel. Wraps the `.glass-panel` utility class from
// styles/glassmorphism.css so components don't repeat the same className
// string everywhere. Pass `interactive` for cards that should lift on
// hover (project cards, skill cards); pass `strong` for higher-contrast
// surfaces (e.g. over busy backgrounds).

import PropTypes from 'prop-types';

function GlassCard({
  as: Tag = 'div',
  interactive = false,
  strong = false,
  className = '',
  children,
  ...rest
}) {
  const classes = [
    'glass-panel',
    interactive ? 'glass-panel--interactive' : '',
    strong ? 'glass-panel--strong' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}

GlassCard.propTypes = {
  as: PropTypes.elementType,
  interactive: PropTypes.bool,
  strong: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default GlassCard;
