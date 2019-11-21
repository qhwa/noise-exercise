export default function generateNoise(key, type, w, h, t = 0, l = 100) {
  const permutation = {
  };

  return import(`./noise/${type}`).then(
    g => {
      permutation[key] = permutation[key] || g.seed(Math.random());
      return g.default.call(null, w, h, t, l, permutation[key]);
    }
  );
}
