const GRID = 256; // 纹理划分 256 个格子
const GRID_MASK = GRID - 1;
const SPEED = [2, 2];

const arr = Array.from({length: GRID}, (_, k) => k).sort(() => Math.random() - 0.5);
const permutation = [...arr, ...arr];

export default function perlinNoise2D(w, h, t, l) {
  return Uint8ClampedArray.from({length: w * h}, (_, k) => {
    const x = ((k % w + t * SPEED[0]) / l) % GRID;
    const y = ((Math.floor(k / w) + t * SPEED[1]) / l) % GRID;
    return perlin(x, y);
  });
}

function perlin(x, y) {
  const xi0 = x & GRID_MASK;
  const yi0 = y & GRID_MASK;

  const xi1 = (xi0 + 1) & GRID_MASK;
  const yi1 = (yi0 + 1) & GRID_MASK;

  const tx = x - xi0;
  const ty = y - yi0;

  const u = quintic(tx);
  const v = quintic(ty);

  // generate vectors going from the grid points to p
  const x0 = tx;
  const x1 = tx - 1;
  const y0 = ty;
  const y1 = ty - 1;

  const a = gradientDotV(hash(xi0, yi0), x0, y0);
  const b = gradientDotV(hash(xi1, yi0), x1, y0);
  const c = gradientDotV(hash(xi0, yi1), x0, y1);
  const d = gradientDotV(hash(xi1, yi1), x1, y1);

  const k0 = a;
  const k1 = (b - a);
  const k2 = (c - a);
  const k4 = (a + d - b - c);

  return ((k0 + k1 * u + k2 * v + k4 * u * v) + 0.5) * 256;
}

function gradientDotV(perm, x, y, z = 0) {
  switch (perm & 15) {
    case  0: return  x + y; // (1,1,0)
    case  1: return -x + y; // (-1,1,0)
    case  2: return  x - y; // (1,-1,0)
    case  3: return -x - y; // (-1,-1,0)
    case  4: return  x + z; // (1,0,1)
    case  5: return -x + z; // (-1,0,1)
    case  6: return  x - z; // (1,0,-1)
    case  7: return -x - z; // (-1,0,-1)
    case  8: return  y + z; // (0,1,1),
    case  9: return -y + z; // (0,-1,1),
    case 10: return  y - z; // (0,1,-1),
    case 11: return -y - z; // (0,-1,-1)
    case 12: return  y + x; // (1,1,0)
    case 13: return -x + y; // (-1,1,0)
    case 14: return -y + z; // (0,-1,1)
    case 15: return -y - z; // (0,-1,-1)
    default: return 0;
  }
}

function hash(x, y) {
  return (permutation[(permutation[x] + y) & GRID_MASK]) & GRID_MASK;
}

function quintic(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}
