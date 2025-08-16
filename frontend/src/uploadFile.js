import React, { useState, useRef } from "react";
import api from './api';

function UploadFile() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError(null);
      setResult(null); // Clear previous results
    }
  };

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
      
      // Format results for better display
      const formattedResult = {
        filename: res.data.filename,
        gridSize: res.data.grid_size,
        grid: res.data.grid,
        message: res.data.message
      };
      
      setResult(formattedResult);
    } catch (err) {
      const errorMsg = err.response?.data?.detail || 
                      err.response?.data?.message || 
                      "Upload failed. Please try again.";
      setError(errorMsg);
    } finally {
      setIsUploading(false);
      
      // Clear file selection and reset input
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Clear all state
  const handleClear = () => {
    setFile(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <h2>Upload an Image</h2>
      
      <input 
        type="file"
        ref={fileInputRef}
        accept="image/png, image/jpeg, image/jpg"
        onChange={handleFileChange}
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
        
        <button 
          onClick={handleClear} 
          disabled={isUploading}
        >
          Clear
        </button>
      </div>
      
      {error && <div style={{ color: "red", margin: "10px 0" }}>{error}</div>}
      
      {result && (
        <div>
          <h3>Processing Results</h3>
          <p><strong>Filename:</strong> {result.filename}</p>
          <p><strong>Grid Size:</strong> {result.size}</p>
          
          <h4>Extracted Grid:</h4>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: `repeat(${result.grid[0]?.length || 1}, 1fr)`,
            gap: '5px',
            marginBottom: '20px'
          }}>
            {result.grid.flat().map((cell, index) => (
              <div 
                key={index} 
                style={{
                  padding: '10px',
                  border: '1px solid #ccc',
                  textAlign: 'center'
                }}
              >
                {cell}
              </div>
            ))}
          </div>
          
          <pre style={{ background: "#f5f5f5", padding: "10px" }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default UploadFile;