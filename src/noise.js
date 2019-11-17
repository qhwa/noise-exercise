export default function generateNoise(w, h, t = 0) {
  return valueNoise(w, h, t);
}

export function whiteNoise(w, h) {
  return Uint8ClampedArray.from({length: w * h}, () => {
    return Math.floor(Math.random() * 255);
  });
}

const GRID = 10; // 纹理划分 10 个格子
const template = Array.from({length: GRID}, (_, k) => {
  return Math.floor(Math.random() * 255);
});

export function valueNoise(w, h, t) {
  return Uint8ClampedArray.from({length: w * h}, (_, k) => {
    const SPEED = 2;
    const x = normalize(k % w, Math.floor(t * SPEED), GRID);
    const x0 = Math.floor(x);
    const x1 = x0 === GRID - 1 ? 0 : x0 + 1;

    return cosineRemap(template[x0], template[x1], x - x0);
  });
}

function normalize(x, offset, grids) {
  let n = ((x - offset) / 20 % grids);
  if (n < 0) {
    n += grids;
  }
  return n;
}

function cosineRemap(min, max, t) {
  return lerp(min, max, (1 - Math.cos(t * Math.PI)) * 0.5);
}

function lerp(min, max, t) {
  return min + (max - min) * t;
}
