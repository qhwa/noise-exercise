import React, {useRef, useState, useEffect} from 'react';
import generateNoise from './noise';
import 'bulma/css/bulma.min.css';
import './App.css';

function App() {
  const canvasEl = useRef(null);
  const [t, setTime] = useState(50);
  const [l, setLattice] = useState(50);
  const [type, setType] = useState('perlin_noise_2d');
  const [mask, setMask] = useState(false);
  const [multiFreq, setMultiFreq] = useState(false);

  useEffect(() => {
    refresh();
  });

  return (
    <main>
      <canvas ref={canvasEl} />
      <form>
        <div className="field">
          <label className="label">noise type</label>
          <div className="select">
            <select onChange={e => setType(e.target.value)} value={type}>
              <option value="white_noise">white noise</option>
              <option value="value_noise_1d">value noise 1D</option>
              <option value="value_noise_2d">value noise 2D</option>
              <option value="perlin_noise_2d">original Perlin noise 2D</option>
              <option value="improved_perlin_noise_2d">improved Perlin noise 2D</option>
            </select>
          </div>
        </div>
        
        <div className="field">
          <div className="control">
            <label className="checkbox">
              <input type="checkbox" value={mask} onChange={
                e => setMask(e.target.checked)
              } />
              apply mask
            </label>
          </div>
        </div>
      
        <div className="field">
          <div className="control">
            <label className="checkbox">
              <input type="checkbox" value={multiFreq} onChange={
                e => setMultiFreq(e.target.checked)
              } />
              multiple frequencies
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
      </form>
    </main>
  );

  async function refresh() {
    const canvas = canvasEl.current;
    const {width, height} = canvas;
    const ctx = canvas.getContext('2d');

    const image = await generateImage(type, {width, height, mask, t, l, multiFreq});
    ctx.putImageData(image, 0, 0);
  }
}

async function generateImage(type, {width: w, height: h, mask, t, l, multiFreq}) {
  const grey = await generateNoise('grey', type, w, h, t, l, multiFreq);

  const numbers = Uint8ClampedArray.from({length: w * h * 4}, (_, k) => {
    const idx = k >> 2;
    const type = k % 4;

    if (type < 3) {
      return mask ? maskTransform(grey[idx], {w, h, i: idx}) : grey[idx];
    }
    return 255;
  });

  return new ImageData(numbers, w, h);
}

function maskTransform(n, {w, h, i}) {
  return (n * Math.floor(i / w) / h) & 255;
}

function sliderStyle(t) {
  return {
    background: `linear-gradient(90deg,#3273dc ${t}%, rgba(0,0,0,0.216) 0)`
  };
}

export default App;
