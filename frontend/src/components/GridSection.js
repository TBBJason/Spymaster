import React from 'react';
import GridDisplay from './GridDisplay'; 

const GridSection = ({ result, cellStates, handleCellClick }) => (
  result && result.grid && (
    <div>
      <h3>Processing Results</h3>
      <p><strong>Filename:</strong> {result.filename}</p>
      <p><strong>Grid Size:</strong> {result.size}</p>

      <GridDisplay 
        grid={result.grid} 
        cellStates={cellStates} 
        onCellClick={handleCellClick} 
      />
    </div>
  )
);

export default GridSection;