/**
 * Convert an ISO string from Supabase (e.g. 2024-05-15T14:30:00.000Z)
 * to a local datetime-local string (e.g. 2024-05-15T09:30).
 */
export function isoToLocalDatetime(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return '';
  
  // Format as YYYY-MM-DDTHH:mm
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

/**
 * Convert a local datetime-local string (e.g. 2024-05-15T09:30)
 * to a UTC ISO string for Supabase.
 */
export function localDatetimeToIso(localString) {
  if (!localString) return null;
  const date = new Date(localString);
  if (isNaN(date.getTime())) return null;
  return date.toISOString();
}

/**
 * Check if a given date string is in the past.
 */
export function isDateInPast(isoString) {
  if (!isoString) return false;
  const date = new Date(isoString);
  return date.getTime() < Date.now();
}
