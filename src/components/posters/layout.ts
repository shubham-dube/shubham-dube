/** Running start offsets for items laid end to end: [{...item, start}, …]. Pure, so posters stay render-safe. */
export function stack<T>(items: T[], size: (item: T) => number, origin = 0): (T & { start: number })[] {
  const out: (T & { start: number })[] = [];
  let at = origin;
  for (const item of items) {
    out.push({ ...item, start: at });
    at += size(item);
  }
  return out;
}
