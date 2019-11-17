import React, {useRef} from 'react';
import generateNoise from './noise';
import 'bulma/css/bulma.min.css';
import './App.css';

function App() {
  const canvasEl = useRef(null);

  return (
    <div className="App">
      <canvas ref={canvasEl} />
      <form onSubmit={e => handleSubmit(e, canvasEl)}>
        <input type="submit" value="generate" className="button" />
      </form>
    </div>
  );
}

function handleSubmit(evt, ref) {
  evt.preventDefault();

  const canvas = ref.current;
  const {width, height} = canvas;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'green';
  ctx.fillRect(0, 0, width, height);

  const image = generateImage(width, height);
  ctx.putImageData(image, 0, 0);
}

function generateImage(w, h) {
  const data = generateNoise(w, h);
  const numbers = Uint8ClampedArray.from({length: w * h * 4}, (_, k) => {
    const idx = k >> 2;
    const type = k % 4;
    if (type < 3) {
      return data[idx];
    }
    return 255;
  });

  return new ImageData(numbers, w, h);
}

export default App;
