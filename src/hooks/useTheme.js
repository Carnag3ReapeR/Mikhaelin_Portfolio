// src/hooks/useTheme.js
//
// Applies the colour/font values from data/site.json#theme onto the
// document root as CSS custom properties. This means the single source of
// truth for "what colour is the accent" is the JSON file, not scattered
// hex codes across component CSS — update site.json and the whole site
// re-skins on next load, no CSS edits required.

import { useEffect } from 'react';

export function useTheme(themeConfig) {
  useEffect(() => {       
    if (!themeConfig) return;

    const root = document.documentElement;

    Object.entries(themeConfig).forEach(([property, value]) => {
      // Skip metadata fields like "_comment" that aren't real CSS variables.
      if (!property.startsWith('--')) return;
      root.style.setProperty(property, value);
    });
  }, [themeConfig]);
}
