import React, {useRef, useState, useEffect} from 'react';
import generateNoise from './noise';
import 'bulma/css/bulma.min.css';
import './App.css';

function App() {
  const canvasEl = useRef(null);
  const [throt, setThrot] = useState(false);
  const [t, setTime] = useState(50);
  const [l, setLattice] = useState(50);
  const [type, setType] = useState('perlin_noise_2d');

  useEffect(() => {
    refresh();
  });

  return (
    <main>
      <canvas ref={canvasEl} />
      <form onSubmit={e => {
        handleSubmit(e)
      }}>
        <div className="field">
          <label className="label">noise type</label>
          <div className="select">
            <select onChange={e => setType(e.target.value)} value={type}>
              <option value="white_noise">white noise</option>
              <option value="value_noise_1d">value noise 1D</option>
              <option value="value_noise_2d">value noise 2D</option>
              <option value="perlin_noise_2d">original Perlin noise 2D</option>
            </select>
          </div>
        </div>
        
        <div className="field">
          <div className="control">
            <label className="checkbox">
              <input type="checkbox" value={throt} onChange={
                e => setThrot(e.target.checked)
              } />
              throt
            </label>
          </div>
        </div>
      
        <div className="field">
          <label className="label">offset: {t}</label>
          <input
            type="range"
            max="100"
            value={t}
            onChange={e => {
              setTime(e.target.value);
            }}
            style={sliderStyle(t)}
          />
        </div>

        <div className="field">
          <label className="label">lattice: {l}</label>
          <input
            type="range"
            min="1"
            max="256"
            value={l}
            onChange={e => {
              setLattice(e.target.value);
            }}
            style={sliderStyle((l - 1) / 255 * 100)}
          />
        </div>

        <input type="submit" value="generate" className="button" />
      </form>
    </main>
  );

  function handleSubmit(evt) {
    evt.preventDefault();
    refresh();
  }

  async function refresh() {
    const canvas = canvasEl.current;
    const {width, height} = canvas;
    const ctx = canvas.getContext('2d');

    const image = await generateImage(type, width, height, throt, t, l);
    ctx.putImageData(image, 0, 0);
  }
}

async function generateImage(type, w, h, throt, t, l) {
  const grey = await generateNoise(type, w, h, t, l);

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

function sliderStyle(t) {
  return {
    background: `linear-gradient(90deg,#3273dc ${t}%, rgba(0,0,0,0.216) 0)`
  };
}

export default App;
