const GRID = 256; // 纹理划分 256 个格子
const GRID_MASK = GRID - 1;

const template = Array.from({length: GRID}, (_, k) => {
  const x = Math.random() * 2 - 1;
  const y = Math.random() * 2 - 1;
  return normalizedVector([x, y]);
});

function normalizedVector([x, y]) {
  const l = Math.sqrt(x * x + y * y);
  return [
    x / l,
    y / l
  ];
}

export default function perlin(xNoise, yNoise, permutation) {
  const x0 = xNoise & GRID_MASK;
  const y0 = yNoise & GRID_MASK;
  const x1 = (x0 + 1) & GRID_MASK;
  const y1 = (y0 + 1) & GRID_MASK;

  const c00 = getGradient(x0, y0, permutation);
  const c01 = getGradient(x0, y1, permutation);
  const c10 = getGradient(x1, y0, permutation);
  const c11 = getGradient(x1, y1, permutation);

  const tx = xNoise - x0;
  const ty = yNoise - y0;
  const u = smoothstep(tx);
  const v = smoothstep(ty);

  const p00 = [tx, ty];
  const p01 = [tx, ty - 1];
  const p10 = [tx - 1, ty];
  const p11 = [tx - 1, ty - 1];

  const nx0 = lerp(dot(c00, p00), dot(c10, p10), u);
  const nx1 = lerp(dot(c01, p01), dot(c11, p11), u);

  const value = lerp(nx0, nx1, v);
  return (value + 0.5) * 256;
}

function getGradient(x, y, permutation) {
  return template[(permutation[(permutation[x] + y) & GRID_MASK]) & GRID_MASK];
}

function dot([a, b], [c, d]) {
  return a * c + b * d;
}

function smoothstep(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(a0, a1, t) {
  return (1 - t) * a0 + t * a1;
}

export function seed() {
  const arr = Array.from({length: GRID}, (_, k) => k).sort(() => Math.random() - 0.5);
  return [...arr, ...arr];
}
