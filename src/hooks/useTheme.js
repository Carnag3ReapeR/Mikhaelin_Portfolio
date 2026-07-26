// Inject theme config from site.json into the document root as CSS variables.
// 
// This pattern keeps theming logic out of CSS files: all color/font decisions
// live in one JSON config. Update it, reload, and the whole site re-skins —
// no CSS edits needed. Makes it safe for non-developers to customize.

import { useEffect } from 'react';

export function useTheme(themeConfig) {
  useEffect(() => {       
    if (!themeConfig) return;

    const root = document.documentElement;

    Object.entries(themeConfig).forEach(([property, value]) => {
      // Only apply entries that look like CSS variables (start with --),
      // skip arbitrary metadata or documentation fields in the config.
      if (!property.startsWith('--')) return;
      root.style.setProperty(property, value);
    });
  }, [themeConfig]);
}
