export function isSameDate (a, b) {
  return a.getTime() === b.getTime();
}

export function asUtcIsoString (date) {
  const y = date.getUTCFullYear();
  const m = `${date.getUTCMonth() + 1}`.padStart(2, '0');
  const d = `${date.getUTCDate()}`.padStart(2, '0');
  return `${y}-${m}-${d}`;
}
