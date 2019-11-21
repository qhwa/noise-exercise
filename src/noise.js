const permutation = {
};

export default function generateNoise(key, type, w, h, t = 0, l = 100) {
  return import(`./noise/${type}`).then(
    g => {
      key = `${type}_${key}`;
      permutation[key] = permutation[key] || g.seed();
      return make(w, h, t, l, permutation[key], g.default)
    }
  );
}

const SPEED = [2, 2];
const GRID = 256;

function make(w, h, t, l, permutation, fn) {
  return Uint8ClampedArray.from({length: w * h}, (_, k) => {
    const x = ((k % w + t * SPEED[0]) / l) % GRID;
    const y = ((Math.floor(k / w) + t * SPEED[1]) / l) % GRID;
    return fn.call(null, x, y, permutation);
  });
}

