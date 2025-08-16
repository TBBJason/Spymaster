import React from 'react';
import PropTypes from 'prop-types';

const colors = {
  default: "#f9f9f9",
  blue: "#3b82f6",
  red: "#ef4444",
  black: "#000000"
};

const textColors = {
  default: "#000000",
  blue: "#ffffff",
  red: "#ffffff",
  black: "#ffffff"
};

const GridDisplay = ({ grid, cellStates, onCellClick }) => {
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
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const state = cellStates[rowIndex][colIndex];
            return (
              <button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => onCellClick(rowIndex, colIndex)}
                className={`grid-cell-${state}`}
                style={{
                  padding: '10px',
                  border: '1px solid #ccc',
                  textAlign: 'center',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  backgroundColor: colors[state],
                  color: textColors[state],
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
              >
                {cell}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};

GridDisplay.propTypes = {
  grid: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    )
  ).isRequired,
  cellStates: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.string)
  ).isRequired,
  onCellClick: PropTypes.func.isRequired
};

export default GridDisplay;
