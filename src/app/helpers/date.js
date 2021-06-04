export function isSameDate (a, b) {
  return asUtcIsoString(a) === asUtcIsoString(b);
}

export function asUtcIsoString (date) {
  if (!(date instanceof Date)) return '';

  const y = date.getUTCFullYear();
  const m = `${date.getUTCMonth() + 1}`.padStart(2, '0');
  const d = `${date.getUTCDate()}`.padStart(2, '0');
  return `${y}-${m}-${d}`;
}
