// Resolve icon name strings (from JSON) to renderable React components.
// 
// JSON can't hold component references, so we store icon names as strings.
// This map translates them at render time. To add an icon: import it below,
// add it to ICON_MAP, then reference it by key name in your JSON files.

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

// Resolve an icon name string (from JSON) to a react-icons component.
// Returns FiCode as a safe fallback for typos — better than crashing on render.
export function getIcon(name) {
  return ICON_MAP[name] || FiCode;
}
