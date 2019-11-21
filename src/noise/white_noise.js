export default function whiteNoise(w, h) {
  return Uint8ClampedArray.from({length: w * h}, () => {
    return Math.floor(Math.random() * 255);
  });
}

export function seed() {
}
