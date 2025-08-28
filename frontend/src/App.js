import React, { useState, useRef } from "react";
import api from './api';
import UploadSection from './components/UploadSection';
import GridSection from './components/GridSection';
import CalculationSection from './components/CalculationSection';
import ResultsSection from './components/ResultsSection';

function UploadFile() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [cellStates, setCellStates] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [comboResults, setComboResults] = useState(null);
  const [comboSize, setComboSize] = useState(2);
  const [activeColor, setActiveColor] = useState(null);

  const fileInputRef = useRef(null);

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    try {
      setIsUploading(true);
      setError(null);
      setResult(null);
      setComboResults(null);

      const formData = new FormData();
      formData.append("file", file);

      const res = await api.post('/process-image', formData);
      setResult(res.data);

      // Initialize cell states
      if (res.data.grid && res.data.grid.length > 0) {
        setCellStates(
          res.data.grid.map(row =>
            row.map(() => "default")
          )
        );
      }
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
    if (!result || !result.grid) return;

    // Extract favoured words
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
          favoured_words: favouredWords,
        },
        paramsSerializer: params => {
          return Object.entries(params)
            .map(([key, value]) =>
              Array.isArray(value)
                ? value.map(v => `${key}=${encodeURIComponent(v)}`).join("&")
                : `${key}=${encodeURIComponent(value)}`
            )
            .join("&");
        }
      });

      setComboResults(res.data);
      setActiveColor(color);
    } catch (err) {
      const errorMsg = err.response?.data?.detail ||
                       err.response?.data?.message ||
                       "Calculation failed";
      setError(errorMsg);
    }
  };

  const handleClear = () => {
    setFile(null);
    setResult(null);
    setError(null);
    setComboResults(null);
    setCellStates([]);
    setActiveColor(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <UploadSection
        fileInputRef={fileInputRef}
        isUploading={isUploading}
        file={file}
        handleUpload={handleUpload}
        handleClear={handleClear}
        error={error}
        setFile={setFile}
      />

      <GridSection 
        result={result} 
        cellStates={cellStates} 
        handleCellClick={handleCellClick} 
      />

      {result && result.grid && (
        <>
          <CalculationSection
            comboSize={comboSize}
            setComboSize={setComboSize}
            handleCalculate={handleCalculate}
          />
          
          <ResultsSection 
            comboResults={comboResults} 
            activeColor={activeColor} 
          />
        </>
      )}
    </div>
  );
}
// In your App.js or main component
console.log("API URL:", process.env.REACT_APP_API_URL);

// Test the connection on component mount
useEffect(() => {
  const testConnection = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/test`);
      console.log("Connection test:", response);
    } catch (error) {
      console.error("Connection failed:", error);
    }
  };
  testConnection();
}, []);
export default UploadFile;