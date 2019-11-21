const GRID = 256; // 纹理划分 256 个格子
const GRID_MASK = GRID - 1;

export default function valueNoise1D(x, y, permutation) {
  const x0 = x & GRID_MASK;
  const x1 = (x0 + 1) & GRID_MASK;

  return lerp(permutation[x0], permutation[x1], smoothstep(x - x0));
}

function smoothstep(t) {
  return (1 - Math.cos(t * Math.PI)) * 0.5;
}

function lerp(min, max, t) {
  return min + (max - min) * t;
}

export function seed() {
  return Array.from({length: GRID}, (_, k) => {
    return Math.floor(Math.random() * 255);
  });
}
