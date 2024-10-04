import React, { useState } from 'react';
import './App.css'; // Ensure you have a CSS file linked for basic styling
import flask from './images/flask.svg';
import cylinder from './images/cylinder.svg';
import beaker from './images/beaker.svg';

function App() {
  const [sourceMolarity, setSourceMolarity] = useState(1.0);
  const [sourceVolume, setSourceVolume] = useState(500);
  const [waterVolume, setWaterVolume] = useState(500);
  const [targetMolarity, setTargetMolarity] = useState(1.0);
  const [targetVolume, setTargetVolume] = useState(1000);

  const handleSourceMolarityChange = (e) => {
    let value = parseFloat(e.target.value);
    if (value >= 0) {
      setSourceMolarity(value.toFixed(1));
      updateTargetMolarity(value, sourceVolume, waterVolume);
    }
  };

  const handleSourceVolumeChange = (e) => {
    let value = parseFloat(e.target.value);
    if (value >= 0) {
      setSourceVolume(value);
      updateTargetVolume(value, waterVolume);
    }
  };

  const handleWaterVolumeChange = (e) => {
    let value = parseFloat(e.target.value);
    if (value >= 0) {
      setWaterVolume(value);
      updateTargetVolume(sourceVolume, value);
    }
  };

  const handleTargetMolarityChange = (e) => {
    let value = parseFloat(e.target.value);
    if (value >= 0) {
      setTargetMolarity(value.toFixed(1));
      const totalVolume = targetVolume;
      const calculatedWaterVolume = totalVolume - sourceVolume;
      setWaterVolume(calculatedWaterVolume);
    }
  };

  const handleTargetVolumeChange = (e) => {
    let value = parseFloat(e.target.value);
    if (value >= 0) {
      setTargetVolume(value);
      const newWaterVolume = value - sourceVolume;
      setWaterVolume(newWaterVolume >= 0 ? newWaterVolume : 0);
    }
  };

  const updateTargetMolarity = (sourceM, sourceV, waterV) => {
    const totalVolume = parseFloat(sourceV) + parseFloat(waterV);
    const newMolarity = (sourceM * sourceV) / totalVolume;
    setTargetMolarity(newMolarity.toFixed(1));
    setTargetVolume(totalVolume);
  };

  const updateTargetVolume = (sourceV, waterV) => {
    const totalVolume = parseFloat(sourceV) + parseFloat(waterV);
    setTargetVolume(totalVolume);
    const newMolarity = (sourceMolarity * sourceV) / totalVolume;
    setTargetMolarity(newMolarity.toFixed(1));
  };

  return (
    <div className="App">
      <h1>Molarity Calculator</h1>
      
      <div className="container">
        <div className="item source-solution">
          <img src={flask} alt="Flask" />
          <div>Source Solution</div>
          <label>Molarity (M):</label>
          <input
            type="number"
            value={sourceMolarity}
            onChange={handleSourceMolarityChange}
            step="0.1"
            min="0"
          />
          <label>Volume (ml):</label>
          <input
            type="number"
            value={sourceVolume}
            onChange={handleSourceVolumeChange}
            min="0"
          />
        </div>

        <div className="item water-solution">
          <img src={cylinder} alt="Cylinder" />
          <div>Water</div>
          <label>Volume (ml):</label>
          <input
            type="number"
            value={waterVolume}
            onChange={handleWaterVolumeChange}
            min="0"
          />
        </div>

        <div className="item target-solution">
          <img src={beaker} alt="Beaker" />
          <div>Target Solution</div>
          <label>Molarity (M):</label>
          <input
            type="number"
            value={targetMolarity}
            onChange={handleTargetMolarityChange}
            step="0.1"
            min="0"
          />
          <label>Volume (ml):</label>
          <input
            type="number"
            value={targetVolume}
            onChange={handleTargetVolumeChange}
            min="0"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
