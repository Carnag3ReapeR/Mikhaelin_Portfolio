// src/hooks/useScrollSpy.js
//
// Tracks which section is currently in view using the IntersectionObserver
// API (much cheaper than listening to scroll events) so the navbar can
// highlight the active link as the user scrolls through a single-page app.

import { useEffect, useState } from 'react';

/**
 * @param {string[]} sectionIds - element ids to observe, e.g. ['home', 'about']
 * @returns {[string, React.Dispatch<React.SetStateAction<string>>]} the active section id and a setter for manual updates
 */
export function useScrollSpy(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the greatest visible ratio to avoid flicker
        // when two sections are both partially on screen.
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (mostVisible) {
          setActiveId(mostVisible.target.id);
        }
      },
      {
        // Treat a section as "active" once it occupies the middle band of
        // the viewport, which feels more natural than the very top edge.
        rootMargin: '-30% 0px -60% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  return [activeId, setActiveId];
}
