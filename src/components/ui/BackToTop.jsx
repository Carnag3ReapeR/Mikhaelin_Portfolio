// src/components/ui/BackToTop.jsx
//
// Floating "back to top" button that fades in after the user scrolls past
// one viewport height. Controlled by site.json#footer.showBackToTop.

import { useEffect, useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > window.innerHeight * 0.6);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <button
      type="button"
      className={`icon-link back-to-top ${isVisible ? 'is-visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <FiArrowUp aria-hidden="true" />
    </button>
  );
}

export default BackToTop;
