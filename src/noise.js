export default function generateNoise(type, w, h, t = 0, l = 100) {
  return import(`./noise/${type}`).then(
    g => g.default.call(null, w, h, t, l)
  );
}
