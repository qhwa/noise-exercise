const SPEED = [2, 2];
const GRID = 256;

const permutation = {
};

export default function generateNoise(key, type, w, h, t, l, multi) {
  return import(`./noise/${type}`).then(
    g => {
      key = `${type}_${key}`;
      permutation[key] = permutation[key] || g.seed();
      const perm = permutation[key];
      const fn = g.default;

      return Uint8ClampedArray.from({length: w * h}, (_, k) => {
        const x = ((k % w + t * SPEED[0]) / l) % GRID;
        const y = ((Math.floor(k / w) + t * SPEED[1]) / l) % GRID;
        return multi ?
          (fn(x, y, perm) +
          fn(x * 2, y * 2, perm) * 0.5 +
          fn(x * 4, y * 4, perm) * 0.25 +
          fn(x * 8, y * 8, perm) * 0.125) / 1.875 :

          fn(x, y, perm);
      });
    }
  );
}
