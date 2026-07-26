// src/utils/dateHelpers.js
//
// Small, dependency-free date helpers so we don't need a date library
// just to format "2023-02" -> "Feb 2023".

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/**
 * Formats a "YYYY-MM" or "YYYY" string into a readable label.
 * @param {string} value - e.g. "2023-02" or "2018"
 * @returns {string} e.g. "Feb 2023" or "2018"
 */
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
