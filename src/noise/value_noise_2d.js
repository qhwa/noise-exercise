const GRID = 256; // 纹理划分 256 个格子
const GRID_MASK = GRID - 1;

export function seed() {
  return Array.from({length: GRID * GRID}, (_, k) => {
    return [
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255)
    ]
  });
}

export default function valueNoise2D(x, y, template) {
  const x0 = x & GRID_MASK;
  const y0 = y & GRID_MASK;
  const x1 = (x0 + 1) & GRID_MASK;
  const y1 = (y0 + 1) & GRID_MASK;
  const c00 = template[x0 + y0 * GRID];
  const c01 = template[x0 + y1 * GRID];
  const c10 = template[x1 + y0 * GRID];
  const c11 = template[x1 + y1 * GRID];
  const tx = smoothstep(x - x0);
  const ty = smoothstep(y - y0);

  const nx0 = lerp(c00, c10, tx);
  const nx1 = lerp(c01, c11, tx);

  const value = lerp(nx0, nx1, ty);
  return (value[0] + value[1]) / 2;
}

function smoothstep(t) {
  return (1 - Math.cos(t * Math.PI)) * 0.5;
}

function lerp([minX, minY], [maxX, maxY], t) {
  return [
    minX + (maxX - minX) * t,
    minY + (maxY - minY) * t
  ];
}
