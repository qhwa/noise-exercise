export default function generateNoise(w, h) {
  return whiteNoise(w, h);
}

function whiteNoise(w, h) {
  return Uint8ClampedArray.from({length: w * h}, () => {
    return Math.floor(Math.random() * 255);
  });
}

