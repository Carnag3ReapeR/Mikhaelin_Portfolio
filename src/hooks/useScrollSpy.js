// IntersectionObserver-based scroll spy for navbar active link highlighting.
// 
// Tracks which section is currently in view — much more efficient than scroll
// event listeners for single-page apps. Picks the most-visible section when
// multiple are partially on screen to avoid nav flicker.

import { useEffect, useState } from 'react';

/**
 * Hook that tracks active section during scroll via IntersectionObserver.
 * @param {string[]} sectionIds - Element IDs to observe (e.g., ['home', 'about', 'projects'])
 * @returns {[string, React.Dispatch<React.SetStateAction<string>>]} active section ID and manual update setter
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
        // when two sections are both partially on screen (common near breakpoints) to avoid flicker
        // when two sections are both partially on screen.
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (mostVisible) {
          setActiveId(mostVisible.target.id);
        }
      },
      {
        // Treat section as "active" once it reaches the middle viewport band.
        // Feels more natural than triggering at the very top edge.
        rootMargin: '-30% 0px -60% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  return [activeId, setActiveId];
}
