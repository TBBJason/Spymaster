import React from 'react';

const TargetWordItem = ({ word, index, color }) => (
  <li
    style={{
      marginBottom: "10px",
      padding: "10px",
      backgroundColor: "#fafafa",
      border: "1px solid #ddd",
      borderRadius: "6px",
      display: "flex",
      alignItems: "center"
    }}
  >
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
  </li>
);

export default TargetWordItem;