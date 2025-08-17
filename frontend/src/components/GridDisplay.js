import React from 'react';

const GridDisplay = ({ grid, cellStates, onCellClick }) => {
  if (!grid || grid.length === 0) return null;

  // Calculate column count for responsive sizing
  const columnCount = grid[0].length;

  return (
    <div style={{ 
      width: "100%",
      margin: "20px 0",
      boxSizing: "border-box"
    }}>
      <h4>Spymaster Grid:</h4>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
          gap: "10px",
          width: "100%",
          padding: "10px",
          backgroundColor: "#f8f9fa",
          borderRadius: "12px",
          boxSizing: "border-box"
        }}
      >
        {grid.flat().map((cell, index) => {
          const rowIndex = Math.floor(index / columnCount);
          const colIndex = index % columnCount;
          
          const colors = {
            neutral: "#e9ecef",  // Light gray - proper neutral color
            blue: "#339af0",     // Team blue
            red: "#ff6b6b",      // Team red
            black: "#212529",    // Assassin
          };
          
          const textColors = {
            neutral: "#212529",  // Dark text for neutral
            blue: "#ffffff",     // White text for blue
            red: "#ffffff",      // White text for red
            black: "#ffffff",    // White text for assassin
          };
          
          const state = cellStates[rowIndex]?.[colIndex] || "neutral";
          const backgroundColor = colors[state];
          const color = textColors[state];

          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => onCellClick(rowIndex, colIndex)}
              style={{
                aspectRatio: "4/3",  // Maintain aspect ratio
                minHeight: "80px",
                borderRadius: "8px",
                border: "1px solid #ced4da",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: backgroundColor,
                color: color,
                fontWeight: "bold",
                fontSize: "clamp(14px, 2vw, 18px)", // Responsive font size
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                transition: "all 0.2s ease",
                textAlign: "center",
                padding: "8px",
                wordBreak: "break-word",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
              }}
            >
              {cell}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GridDisplay;