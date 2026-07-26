// Reusable glassmorphism card component that centralizes the frosted-glass styling.
// 
// Accepts polymorphic `as` prop to render any element type. Offers modifiers:
// - interactive: Lifts on hover (for project/skill cards)
// - strong: Increases contrast (for cards over busy backgrounds)
// This keeps our CSS DRY and makes styling updates easy.

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
