import React from 'react';

const UploadSection = ({ 
  fileInputRef, 
  isUploading, 
  file, 
  handleUpload, 
  handleClear, 
  error,
  setFile
}) => (
  <div>
    <h2>Upload an Image</h2>
    <input
      type="file"
      ref={fileInputRef}
      accept="image/png, image/jpeg, image/jpg"
      onChange={(e) => {
        if (e.target.files.length > 0) {
          setFile(e.target.files[0]);
        }
      }}
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
  </div>
);

export default UploadSection;