import React, { useState } from "react";
import api from './api'; // Import the API instance

function UploadFile() {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("file", file);
        

        try {
            setIsUploading(true);
            setError(null);
            const res = await api.post('/process-image', formData);
            setResult(res.data);
            } catch (err) {
            console.error(err);
        }
    };

  return (
    <div>
      <h2>Upload an Image</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>{isUploading ? "Uploading ..." : "Upload"}</button>
      {result && (
        <pre>{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
}

export default UploadFile;