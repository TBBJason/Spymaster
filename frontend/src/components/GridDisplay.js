import React from 'react';

const GridDisplay = ({ grid, cellStates, onCellClick }) => {
  if (!grid || grid.length === 0) return null;

  return (
    <div style={{ margin: "20px 0" }}>
      <h4>Word Grid:</h4>
      <div style={{ 
        display: "inline-block", 
        border: "2px solid #333",
        backgroundColor: "#f0f0f0"
      }}>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: "flex" }}>
            {row.map((cell, colIndex) => {
              const state = cellStates[rowIndex]?.[colIndex] || "default";
              const colors = {
                default: "#ffffff",
                blue: "#1890ff",
                red: "#ff4d4f",
                black: "#000000"
              };
              
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => onCellClick(rowIndex, colIndex)}
                  style={{
                    width: "80px",
                    height: "60px",
                    border: "1px solid #999",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    backgroundColor: colors[state],
                    color: state === "black" ? "white" : "black",
                    fontWeight: "bold",
                    transition: "background-color 0.2s"
                  }}
                >
                  {cell}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridDisplay;