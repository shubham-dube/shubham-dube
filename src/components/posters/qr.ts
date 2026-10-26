/**
 * A deterministic, QR-looking 21×21 module grid (finder patterns + seeded
 * noise). Decorative only — it does not encode data.
 */
export function qrModules(seed: number, size = 21): boolean[][] {
  let x = seed >>> 0 || 1;
  const rand = () => {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return (x >>> 0) / 4294967296;
  };
  const inFinder = (r: number, c: number) =>
    (r < 8 && c < 8) || (r < 8 && c >= size - 8) || (r >= size - 8 && c < 8);
  const finder = (r: number, c: number) => {
    const lr = r < 8 ? r : r - (size - 7);
    const lc = c < 8 ? c : c - (size - 7);
    if (lr === 7 || lc === 7 || lr < 0 || lc < 0) return false;
    const edge = lr === 0 || lr === 6 || lc === 0 || lc === 6;
    const core = lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4;
    return edge || core;
  };
  return Array.from({ length: size }, (_, r) =>
    Array.from({ length: size }, (_, c) => (inFinder(r, c) ? finder(r, c) : rand() > 0.52)),
  );
}
