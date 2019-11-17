import React, {useRef, useState, useEffect} from 'react';
import generateNoise from './noise';
import 'bulma/css/bulma.min.css';
import './App.css';

function App() {
  const canvasEl = useRef(null);
  const [throt, setThrot] = useState(false);
  const [t, setTime] = useState(0);

  useEffect(() => {
    refresh();
  });

  return (
    <div className="App">
      <canvas ref={canvasEl} />
      <form onSubmit={e => {
        handleSubmit(e)
      }}>
        <div>
          <label>
            <input type="checkbox" value={throt} onChange={
              e => setThrot(e.target.checked)
            } />
            throt
          </label>
        </div>
      
        <div>
          <label>
            <input
              type="range"
              max="100"
              value={t}
              onChange={e => {
                setTime(e.target.value);
              }}
              style={{background: `linear-gradient(90deg, rgb(11, 30, 223) ${t}%, rgba(255, 255, 255, 0.216) ${t}%)`}}
            />
            {t}
          </label>
        </div>

        <input type="submit" value="generate" className="button" />
      </form>
    </div>
  );

  function handleSubmit(evt) {
    evt.preventDefault();
    refresh();
  }

  function refresh() {
    const canvas = canvasEl.current;
    const {width, height} = canvas;
    const ctx = canvas.getContext('2d');

    const image = generateImage(width, height, throt, t);
    ctx.putImageData(image, 0, 0);
  }
}

function generateImage(w, h, throt, t) {
  const grey = generateNoise(w, h, t);
  const numbers = Uint8ClampedArray.from({length: w * h * 4}, (_, k) => {
    const idx = k >> 2;
    const type = k % 4;
    if (type < 3) {
      return throt ?
        uvTransform(grey[idx], [0, 158], [0, 255]) :
        grey[idx];
    }
    return 255;
  });

  return new ImageData(numbers, w, h);
}

function uvTransform(n, [min, max], [minV, maxV]) {
  if (n > max) {
    return maxV;
  }

  if (n < min) {
    return minV;
  }

  return 128;
}

export default App;
