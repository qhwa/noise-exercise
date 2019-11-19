const GRID = 256; // 纹理划分 256 个格子
const GRID_MASK = GRID - 1;
const template = Array.from({length: GRID}, (_, k) => {
  return Math.floor(Math.random() * 255);
});

export default function valueNoise1D(w, h, t, l) {
  return Uint8ClampedArray.from({length: w * h}, (_, k) => {
    const SPEED = 2;
    const x = ((k % w + Math.floor(t * SPEED)) / l) % GRID;
    const x0 = x & GRID_MASK;
    const x1 = x0 + 1;

    return lerp(template[x0], template[x1], smoothstep(x - x0));
  });
}

function smoothstep(t) {
  return (1 - Math.cos(t * Math.PI)) * 0.5;
}

function lerp(min, max, t) {
  return min + (max - min) * t;
}
