const GRID = 256; // 纹理划分 256 个格子
const GRID_MASK = GRID - 1;
const SPEED = [2, 2];

const template = Array.from({length: GRID * GRID}, (_, k) => {
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

export default function perlinNoise2D(w, h, t, l) {
  return Uint8ClampedArray.from({length: w * h}, (_, k) => {
    const x = ((k % w + t * SPEED[0]) / l) % GRID;
    const y = ((Math.floor(k / w) + t * SPEED[1]) / l) % GRID;
    return perlin(x, y);
  });
}

function perlin(xNoise, yNoise, w, h) {
  const x0 = xNoise & GRID_MASK;
  const y0 = yNoise & GRID_MASK;

  const c00 = template[x0 + y0 * GRID];
  const c01 = template[x0 + (y0 + 1) * GRID];
  const c10 = template[x0 + 1 + y0 * GRID];
  const c11 = template[x0 + 1 + (y0 + 1) * GRID];

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

function dot([a, b], [c, d]) {
  return a * c + b * d;
}

function smoothstep(t) {
  return (1 - Math.cos(t * Math.PI)) * 0.5;
}

function lerp(a0, a1, t) {
  return (1 - t) * a0 + t * a1;
}
