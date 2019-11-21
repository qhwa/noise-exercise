const permutation = {
};

export default function generateNoise(key, type, w, h, t = 0, l = 100) {
  return import(`./noise/${type}`).then(
    g => {
      key = `${type}_${key}`;
      permutation[key] = permutation[key] || g.seed();
      return g.default.call(null, w, h, t, l, permutation[key]);
    }
  );
}
