// src/components/layout/Footer.jsx

import PropTypes from 'prop-types';
import { getIcon } from '../../utils/iconMap';

function Footer({ tagline, name }) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer glass-panel">
      <div className="container-app">
        <p className="text-muted-custom font-mono mb-1" style={{ fontSize: '0.85rem' }}>
          {tagline}
        </p>
        <p className="text-muted-custom mb-0" style={{ fontSize: '0.8rem' }}>
          © {year} {name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  tagline: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Footer;
