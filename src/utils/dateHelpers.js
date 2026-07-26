// Lightweight date formatting without external dependencies.
// 
// Keeps the bundle small for what is essentially a couple of string transforms.
// Handles the "YYYY-MM" format we use in experience.json and education.json.

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

// Format a "YYYY-MM" or "YYYY" date string into a human-readable label.
export function formatDate(value) {
  if (!value) return '';
  const parts = value.split('-');
  if (parts.length === 1) return parts[0];

  const [year, month] = parts;
  const monthIndex = parseInt(month, 10) - 1;
  const monthLabel = MONTH_NAMES[monthIndex] ?? '';
  return `${monthLabel} ${year}`.trim();
}

/**
 * Formats a start/end pair into a range label, handling ongoing roles.
 * @param {string} start - "YYYY-MM" or "YYYY"
 * @param {string|null} end - "YYYY-MM", "YYYY", or null for "Present"
 * @returns {string} e.g. "Mar 2021 – Jan 2023" or "Feb 2023 – Present"
 */
export function formatDateRange(start, end) {
  const startLabel = formatDate(start);
  const endLabel = end ? formatDate(end) : 'Present';
  return `${startLabel} – ${endLabel}`;
}
