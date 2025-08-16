import React from 'react';
import PropTypes from 'prop-types';

const GridDisplay = ({ grid }) => {
  if (!grid || grid.length === 0 || grid[0].length === 0) {
    return <div>No grid data available</div>;
  }

  return (
    <div className="grid-results">
      <h4>Extracted Grid:</h4>
      <div 
        className="grid-container"
        style={{ 
          display: 'grid',
          gridTemplateColumns: `repeat(${grid[0].length}, 1fr)`,
          gap: '5px',
          marginBottom: '20px'
        }}
      >
        {grid.map((row, rowIndex) => (
          row.map((cell, colIndex) => (
            <div 
              key={`${rowIndex}-${colIndex}`}
              className="grid-cell"
              style={{
                padding: '10px',
                border: '1px solid #ccc',
                textAlign: 'center',
                backgroundColor: '#f9f9f9'
              }}
            >
              {cell}
            </div>
          ))
        ))}
      </div>
    </div>
  );
};

GridDisplay.propTypes = {
  grid: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ])
    )
  ).isRequired
};

export default GridDisplay;