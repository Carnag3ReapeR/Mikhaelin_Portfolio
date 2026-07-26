// IntersectionObserver + Scroll bounds scroll spy for navbar active link highlighting.
// Tracks active section continuously during scroll, even after clicking a nav link.

import { useEffect, useState } from 'react';

/**
 * Hook that tracks the active section ID during scroll using IntersectionObserver and scroll bounds.
 * @param {string[]} sectionIds - Array of element IDs to observe (e.g., ['home', 'about', 'projects'])
 * @returns {[string, React.Dispatch<React.SetStateAction<string>>]} active section ID and setter
 */
export function useScrollSpy(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '');
  const idsKey = sectionIds.join(',');

  useEffect(() => {
    const ids = idsKey.split(',').filter(Boolean);
    if (ids.length === 0) return undefined;

    // Track visibility status and ratio for ALL observed elements
    const elementStatusMap = new Map();

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        elementStatusMap.set(id, { element, isIntersecting: false, ratio: 0 });
      }
    });

    if (elementStatusMap.size === 0) return undefined;

    const determineActiveSection = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // 1. Top of page check -> activate first section
      if (scrollY < 80) {
        if (ids[0]) {
          setActiveId(ids[0]);
          return;
        }
      }

      // 2. Bottom of page check -> activate last section
      if (scrollY + windowHeight >= documentHeight - 50) {
        const lastId = ids[ids.length - 1];
        if (lastId) {
          setActiveId(lastId);
          return;
        }
      }

      // 3. Find intersecting section with highest visibility ratio
      let bestId = null;
      let highestRatio = -1;

      elementStatusMap.forEach((status, id) => {
        if (status.isIntersecting && status.ratio > highestRatio) {
          highestRatio = status.ratio;
          bestId = id;
        }
      });

      // 4. Fallback if no section intersects the observer rootMargin (e.g. fast scrolling):
      // pick section whose top bound is closest to viewport top offset (~120px)
      if (!bestId) {
        let minDistance = Infinity;
        elementStatusMap.forEach((status, id) => {
          const rect = status.element.getBoundingClientRect();
          const distance = Math.abs(rect.top - 120);
          if (rect.top <= windowHeight && rect.bottom >= 0 && distance < minDistance) {
            minDistance = distance;
            bestId = id;
          }
        });
      }

      if (bestId) {
        setActiveId(bestId);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (elementStatusMap.has(id)) {
            const current = elementStatusMap.get(id);
            current.isIntersecting = entry.isIntersecting;
            current.ratio = entry.intersectionRatio;
          }
        });
        determineActiveSection();
      },
      {
        rootMargin: '-20% 0px -40% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    elementStatusMap.forEach(({ element }) => observer.observe(element));

    const handleScroll = () => {
      determineActiveSection();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [idsKey]);

  return [activeId, setActiveId];
}

