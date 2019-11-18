const GRID = 256; // 纹理划分 256 个格子
const GRID_MASK = GRID - 1;
const SPEED = [2, 2];

const template = Array.from({length: GRID * GRID}, (_, k) => {
  return [
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255)
  ]
});

export default function valueNoise2D(w, h, t) {
  return Uint8ClampedArray.from({length: w * h}, (_, k) => {
    const x = k % w;
    const y = Math.floor(k / w);
    const xNoise = normalize(x, t * SPEED[0]) % GRID;
    const yNoise = normalize(y, t * SPEED[1]) % GRID;
    const x0 = xNoise & GRID_MASK;
    const y0 = yNoise & GRID_MASK;
    const c00 = template[x0 + y0 * GRID];
    const c01 = template[x0 + (y0 + 1) * GRID];
    const c10 = template[x0 + 1 + y0 * GRID];
    const c11 = template[x0 + 1 + (y0 + 1) * GRID];
    const tx = smoothRemap(xNoise - x0);
    const ty = smoothRemap(yNoise - y0);

    const nx0 = lerp(c00, c10, tx);
    const nx1 = lerp(c01, c11, tx);

    const value = lerp(nx0, nx1, ty);
    return (value[0] + value[1]) / 2;
  });
}

function normalize(x, offset) {
  return (x + offset) / 10;
}

function smoothRemap(t) {
  return (1 - Math.cos(t * Math.PI)) * 0.5;
}

function lerp([minX, minY], [maxX, maxY], t) {
  return [
    minX + (maxX - minX) * t,
    minY + (maxY - minY) * t
  ];
}
