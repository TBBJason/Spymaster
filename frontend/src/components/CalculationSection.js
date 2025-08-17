import React from 'react';

const CalculationSection = ({ 
  comboSize, 
  setComboSize, 
  handleCalculate 
}) => (
  <div style={{ marginTop: "20px" }}>
    <label>
      Number of words in combination:{" "}
      <input
        type="number"
        min="2"
        value={comboSize}
        onChange={(e) => setComboSize(parseInt(e.target.value) || 2)}
      />
    </label>
    <div style={{ marginTop: "10px" }}>
      <button onClick={() => handleCalculate("blue")}>
        Blue Combinations
      </button>
      <button onClick={() => handleCalculate("red")} style={{ marginLeft: "10px" }}>
        Red Combinations
      </button>
    </div>
  </div>
);

export default CalculationSection;