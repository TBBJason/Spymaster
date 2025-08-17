import React from 'react';
import TargetWordItem from './TargetWordItem';

const ResultsSection = ({ comboResults, activeColor }) => (
  comboResults && (
    <div style={{ marginTop: "20px" }}>
      <div style={{
        padding: "15px",
        marginBottom: "20px",
        backgroundColor: "#e6f7ff",
        border: "1px solid #91d5ff",
        borderRadius: "8px",
        textAlign: "center"
      }}>
        <h3 style={{ margin: 0, color: "#1890ff" }}>
          Best Word: <span style={{ fontWeight: "bold" }}>{comboResults.bestWord}</span>
        </h3>
      </div>

      {comboResults.targets && comboResults.targets.length > 0 ? (
        <div>
          <h4>Target Words:</h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {comboResults.targets.map((word, idx) => (
              <TargetWordItem 
                key={idx} 
                word={word} 
                index={idx} 
                color={activeColor} 
              />
            ))}
          </ul>
        </div>
      ) : (
        <p>No combinations found</p>
      )}
    </div>
  )
);

export default ResultsSection;