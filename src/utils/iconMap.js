// src/utils/iconMap.js
//
// Our JSON data files store icon references as plain strings (e.g. "FiGithub")
// because JSON can't hold a component reference. This map translates those
// strings into actual react-icons components at render time.
//
// To add a new icon: import it below and add it to ICON_MAP with the exact
// same key you use in the JSON file.

import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiTwitter,
  FiMonitor,
  FiServer,
  FiDatabase,
  FiTool,
  FiExternalLink,
  FiArrowUp,
  FiDownload,
  FiMenu,
  FiX,
  FiCode,
  FiBriefcase,
  FiBookOpen,
} from 'react-icons/fi';

const ICON_MAP = {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiTwitter,
  FiMonitor,
  FiServer,
  FiDatabase,
  FiTool,
  FiExternalLink,
  FiArrowUp,
  FiDownload,
  FiMenu,
  FiX,
  FiCode,
  FiBriefcase,
  FiBookOpen,
};

/**
 * Resolve an icon name string (from JSON) to a renderable react-icons component.
 * Falls back to FiCode if the name isn't recognised, so a typo in a JSON file
 * never crashes the page — it just shows a generic icon.
 *
 * @param {string} name - e.g. "FiGithub"
 * @returns {React.ComponentType}
 */
export function getIcon(name) {
  return ICON_MAP[name] || FiCode;
}
