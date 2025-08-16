import React, { useState, useRef } from "react";
import api from './api';
import GridDisplay from './GridDisplay';

function UploadFile() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [cellStates, setCellStates] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [comboResults, setComboResults] = useState(null);
  const [comboSize, setComboSize] = useState(2);

  const fileInputRef = useRef(null);

  // Handle upload logic
  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    try {
      setIsUploading(true);
      setError(null);
      setResult(null);
      
      const formData = new FormData();
      formData.append("file", file);

      const res = await api.post('/process-image', formData);

      const formattedResult = {
        filename: res.data.filename,
        gridSize: res.data.grid_size,
        grid: res.data.grid,
        message: res.data.message
      };

      setResult(formattedResult);
      // initialize cell states to "default"
      setCellStates(formattedResult.grid.map(row => row.map(() => "default")));
    } catch (err) {
      const errorMsg = err.response?.data?.detail || 
                       err.response?.data?.message || 
                       "Upload failed. Please try again.";
      setError(errorMsg);
    } finally {
      setIsUploading(false);
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleCellClick = (row, col) => {
    setCellStates(prev => {
      const newStates = prev.map(r => [...r]);
      const current = newStates[row][col];
      if (current === "default") newStates[row][col] = "blue";
      else if (current === "blue") newStates[row][col] = "red";
      else if (current === "red") newStates[row][col] = "black";
      else newStates[row][col] = "default";
      return newStates;
    });
  };

  const handleCalculate = async (color) => {
    if (!result) return;

    // extract favoured words based on state
    const favouredWords = [];
    result.grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cellStates[rowIndex][colIndex] === color) {
          favouredWords.push(cell);
        }
      });
    });

    try {
      const res = await api.get("/calculate-combinations", {
        params: {
          n: comboSize,
          favoured_words: favouredWords.join(",")
        }
      });
      setComboResults(res.data.combinations);
    } catch (err) {
      setError("Failed to fetch combinations");
    }
  };

  return (
    <div>
      <h2>Upload an Image</h2>

      <input
        type="file"
        ref={fileInputRef}
        accept="image/png, image/jpeg, image/jpg"
        onChange={(e) => setFile(e.target.files[0])}
        disabled={isUploading}
      />

      <div style={{ margin: "10px 0" }}>
        <button 
          onClick={handleUpload} 
          disabled={isUploading || !file}
          style={{ marginRight: "10px" }}
        >
          {isUploading ? "Processing..." : "Upload"}
        </button>
        <button onClick={() => { setFile(null); setResult(null); setError(null); }} disabled={isUploading}>
          Clear
        </button>
      </div>

      {error && <div style={{ color: "red", margin: "10px 0" }}>{error}</div>}

      {result && (
        <div>
          <h3>Processing Results</h3>
          <p><strong>Filename:</strong> {result.filename}</p>
          <p><strong>Grid Size:</strong> {result.gridSize}</p>

          <GridDisplay 
            grid={result.grid} 
            cellStates={cellStates} 
            onCellClick={handleCellClick} 
          />

          <div style={{ marginTop: "20px" }}>
            <label>
              Number of words in combination:{" "}
              <input
                type="number"
                min="2"
                value={comboSize}
                onChange={(e) => setComboSize(e.target.value)}
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

          {comboResults && (
            <div style={{ marginTop: "20px" }}>
              <h4>Combinations:</h4>
              <pre style={{ background: "#f5f5f5", padding: "10px" }}>
                {JSON.stringify(comboResults, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UploadFile;
