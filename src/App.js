import React, { useState } from 'react';
import './App.css';
import flask from './images/flask.svg';
import cylinder from './images/cylinder.svg';
import beaker from './images/beaker.svg';

function App() {
  const [sourceMolarity, setSourceMolarity] = useState(1.0);
  const [sourceVolume, setSourceVolume] = useState(500);
  const [waterVolume, setWaterVolume] = useState(500);
  const [targetMolarity, setTargetMolarity] = useState(1.0);
  const [targetVolume, setTargetVolume] = useState(1000);

  const handleSourceMolarityChange = (value) => {
    if (value >= 0) {
      setSourceMolarity(value.toFixed(1));
      updateTargetMolarity(value, sourceVolume, waterVolume);
    }
  };

  const handleSourceVolumeChange = (value) => {
    if (value >= 0) {
      setSourceVolume(value);
      updateTargetVolume(value, waterVolume);
    }
  };

  const handleWaterVolumeChange = (value) => {
    if (value >= 0) {
      setWaterVolume(value);
      updateTargetVolume(sourceVolume, value);
    }
  };

  const handleTargetMolarityChange = (value) => {
    if (value >= 0) {
      setTargetMolarity(value.toFixed(1));
      const totalVolume = targetVolume;
      const calculatedWaterVolume = totalVolume - sourceVolume;
      setWaterVolume(calculatedWaterVolume);
    }
  };

  const handleTargetVolumeChange = (value) => {
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

  // Increment/Decrement functions for Molarity
  const incrementSourceMolarity = (amount) => {
    const newMolarity = parseFloat(sourceMolarity) + amount;
    handleSourceMolarityChange(newMolarity);
  };

  const decrementSourceMolarity = (amount) => {
    const newMolarity = parseFloat(sourceMolarity) - amount;
    handleSourceMolarityChange(newMolarity);
  };

  // Increment/Decrement functions for Volume
  const incrementSourceVolume = (amount) => {
    const newVolume = parseFloat(sourceVolume) + amount;
    handleSourceVolumeChange(newVolume);
  };

  const decrementSourceVolume = (amount) => {
    const newVolume = parseFloat(sourceVolume) - amount;
    handleSourceVolumeChange(newVolume);
  };

  // Increment/Decrement functions for Water Volume
  const incrementWaterVolume = (amount) => {
    const newVolume = parseFloat(waterVolume) + amount;
    handleWaterVolumeChange(newVolume);
  };

  const decrementWaterVolume = (amount) => {
    const newVolume = parseFloat(waterVolume) - amount;
    handleWaterVolumeChange(newVolume);
  };

  return (
    <div className="App">
      <h1>Molarity Calculator</h1>

      <div className="container">
        <div className="item source-solution">
          <img src={flask} alt="Flask" />
          <div>Source Solution</div>
          <label>Molarity (M):</label>
          <div className="input-group">
            <button onClick={() => decrementSourceMolarity(1)}>-1</button>
            <button onClick={() => decrementSourceMolarity(0.1)}>-0.1</button>
            <input
              type="number"
              value={sourceMolarity}
              onChange={(e) => handleSourceMolarityChange(parseFloat(e.target.value))}
              step="0.1"
              min="0"
              inputMode="decimal"
            />
            <button onClick={() => incrementSourceMolarity(0.1)}>+0.1</button>
            <button onClick={() => incrementSourceMolarity(1)}>+1</button>
          </div>

          <label>Volume (ml):</label>
          <div className="input-group">
            <button onClick={() => decrementSourceVolume(10)}>-10</button>
            <button onClick={() => decrementSourceVolume(1)}>-1</button>
            <input
              type="number"
              value={sourceVolume}
              onChange={(e) => handleSourceVolumeChange(parseFloat(e.target.value))}
              min="0"
              inputMode="numeric"
            />
            <button onClick={() => incrementSourceVolume(1)}>+1</button>
            <button onClick={() => incrementSourceVolume(10)}>+10</button>
          </div>
        </div>

        <div className="item water-solution">
          <img src={cylinder} alt="Cylinder" />
          <div>Water</div>
          <label>Volume (ml):</label>
          <div className="input-group">
            <button onClick={() => decrementWaterVolume(10)}>-10</button>
            <button onClick={() => decrementWaterVolume(1)}>-1</button>
            <input
              type="number"
              value={waterVolume}
              onChange={(e) => handleWaterVolumeChange(parseFloat(e.target.value))}
              min="0"
              inputMode="numeric"
            />
            <button onClick={() => incrementWaterVolume(1)}>+1</button>
            <button onClick={() => incrementWaterVolume(10)}>+10</button>
          </div>
        </div>

        <div className="item target-solution">
          <img src={beaker} alt="Beaker" />
          <div>Target Solution</div>
          <label>Molarity (M):</label>
          <input
            type="number"
            value={targetMolarity}
            onChange={(e) => handleTargetMolarityChange(parseFloat(e.target.value))}
            step="0.1"
            min="0"
            inputMode="decimal"
          />
          <label>Volume (ml):</label>
          <input
            type="number"
            value={targetVolume}
            onChange={(e) => handleTargetVolumeChange(parseFloat(e.target.value))}
            min="0"
            inputMode="numeric"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
