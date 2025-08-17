import React from 'react';

const TargetWordItem = ({ word, index, color, similarity }) => (
  <li
    style={{
      marginBottom: "10px",
      padding: "10px",
      backgroundColor: "#fafafa",
      border: "1px solid #ddd",
      borderRadius: "6px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }}
  >
    <div style={{ display: "flex", alignItems: "center" }}>
      <span style={{ 
        display: "inline-block",
        width: "24px",
        height: "24px",
        borderRadius: "50%",
        backgroundColor: color === "blue" ? "#1890ff" : "#ff4d4f",
        marginRight: "10px",
        color: "white",
        textAlign: "center",
        lineHeight: "24px"
      }}>
        {index + 1}
      </span>
      <span style={{ fontWeight: "bold" }}>{word}</span>
    </div>
    
    {/* Changed condition to check for null/undefined instead of falsy */}
    {similarity !== null && similarity !== undefined && (
      <div style={{
        backgroundColor: "#f0f0f0",
        padding: "4px 8px",
        borderRadius: "12px",
        fontSize: "0.9em",
        fontWeight: "bold",
        color: "#555"
      }}>
        Score: {similarity}
      </div>
    )}
  </li>
);

export default TargetWordItem;