import React from 'react';

const GridDisplay = ({ grid, cellStates, onCellClick }) => {
  if (!grid || grid.length === 0) return null;

  // Calculate column count for responsive sizing
  const columnCount = grid[0].length;
  const rowCount = grid.length;

  return (
    <div style={{ 
      width: "100%",
      maxWidth: "800px",  // Constrain maximum width
      margin: "20px auto", // Center the grid
      boxSizing: "border-box"
    }}>
      <h4 style={{ textAlign: "center", marginBottom: "15px" }}>Spymaster Grid</h4>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
          gap: "8px",
          width: "100%",
          padding: "12px",
          backgroundColor: "#f5f5f5",
          borderRadius: "10px",
          boxSizing: "border-box"
        }}
      >
        {grid.flat().map((cell, index) => {
          const rowIndex = Math.floor(index / columnCount);
          const colIndex = index % columnCount;
          
          const colors = {
            neutral: "#e9e1d2",  // Light beige/tan - proper neutral color
            blue: "#4a86e8",     // Team blue
            red: "#e06666",      // Team red
            black: "#2d2d2d",    // Assassin
          };
          
          const textColors = {
            neutral: "#333",     // Dark text for neutral
            blue: "#fff",        // White text for blue
            red: "#fff",         // White text for red
            black: "#fff",       // White text for assassin
          };
          
          const state = cellStates[rowIndex]?.[colIndex] || "neutral";
          const backgroundColor = colors[state];
          const color = textColors[state];

          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => onCellClick(rowIndex, colIndex)}
              style={{
                aspectRatio: "1.3",  // Slightly wider than tall
                minHeight: "60px",   // Reduced minimum height
                borderRadius: "6px",
                border: "1px solid #d1d1d1",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: backgroundColor,
                color: color,
                fontWeight: "bold",
                fontSize: "clamp(12px, 1.8vw, 16px)", // Slightly smaller text
                cursor: "pointer",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                transition: "all 0.2s ease",
                textAlign: "center",
                padding: "6px",
                wordBreak: "break-word",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow = "0 3px 6px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
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