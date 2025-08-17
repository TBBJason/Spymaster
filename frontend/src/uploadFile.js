// import React, { useState, useRef } from "react";
// import api from './api';
// import GridDisplay from './GridDisplay';

// function UploadFile() {
//   const [file, setFile] = useState(null);
//   const [result, setResult] = useState(null);
//   const [cellStates, setCellStates] = useState([]);
//   const [isUploading, setIsUploading] = useState(false);
//   const [error, setError] = useState(null);
//   const [comboResults, setComboResults] = useState(null);
//   const [comboSize, setComboSize] = useState(2);
//   const [activeColor, setActiveColor] = useState(null); // <-- track selected color

//   const fileInputRef = useRef(null);

//   const handleUpload = async () => {
//     if (!file) {
//       setError("Please select a file first");
//       return;
//     }

//     try {
//       setIsUploading(true);
//       setError(null);
//       setResult(null);
//       setComboResults(null);

//       const formData = new FormData();
//       formData.append("file", file);

//       const res = await api.post('/process-image', formData);
//       setResult(res.data);

//       // Initialize cell states
//       if (res.data.grid && res.data.grid.length > 0) {
//         setCellStates(
//           res.data.grid.map(row =>
//             row.map(() => "default")
//           )
//         );
//       }
//     } catch (err) {
//       const errorMsg = err.response?.data?.detail ||
//                        err.response?.data?.message ||
//                        "Upload failed. Please try again.";
//       setError(errorMsg);
//     } finally {
//       setIsUploading(false);
//       setFile(null);
//       if (fileInputRef.current) fileInputRef.current.value = "";
//     }
//   };

//   const handleCellClick = (row, col) => {
//     setCellStates(prev => {
//       const newStates = prev.map(r => [...r]);
//       const current = newStates[row][col];
//       if (current === "default") newStates[row][col] = "blue";
//       else if (current === "blue") newStates[row][col] = "red";
//       else if (current === "red") newStates[row][col] = "black";
//       else newStates[row][col] = "default";
//       return newStates;
//     });
//   };

//   const handleCalculate = async (color) => {
//     if (!result || !result.grid) return;

//     // Extract favoured words
//     const favouredWords = [];
//     result.grid.forEach((row, rowIndex) => {
//       row.forEach((cell, colIndex) => {
//         if (cellStates[rowIndex][colIndex] === color) {
//           favouredWords.push(cell);
//         }
//       });
//     });

//     try {
//       const res = await api.get("/calculate-combinations", {
//         params: {
//           n: comboSize,
//           favoured_words: favouredWords,
//         },
//         paramsSerializer: params => {
//           return Object.entries(params)
//             .map(([key, value]) =>
//               Array.isArray(value)
//                 ? value.map(v => `${key}=${encodeURIComponent(v)}`).join("&")
//                 : `${key}=${encodeURIComponent(value)}`
//             )
//             .join("&");
//         }
//       });

//       setComboResults(res.data);
//       setActiveColor(color); // <-- remember which color was used
//     } catch (err) {
//       const errorMsg = err.response?.data?.detail ||
//                        err.response?.data?.message ||
//                        "Calculation failed";
//       setError(errorMsg);
//     }
//   };

//   const handleClear = () => {
//     setFile(null);
//     setResult(null);
//     setError(null);
//     setComboResults(null);
//     setCellStates([]);
//     setActiveColor(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   return (
//     <div>
//       <h2>Upload an Image</h2>

//       <input
//         type="file"
//         ref={fileInputRef}
//         accept="image/png, image/jpeg, image/jpg"
//         onChange={(e) => {
//           if (e.target.files.length > 0) {
//             setFile(e.target.files[0]);
//             setError(null);
//           }
//         }}
//         disabled={isUploading}
//       />

//       <div style={{ margin: "10px 0" }}>
//         <button 
//           onClick={handleUpload} 
//           disabled={isUploading || !file}
//           style={{ marginRight: "10px" }}
//         >
//           {isUploading ? "Processing..." : "Upload"}
//         </button>
        
//         <button 
//           onClick={handleClear} 
//           disabled={isUploading}
//         >
//           Clear
//         </button>
//       </div>

//       {error && <div style={{ color: "red", margin: "10px 0" }}>{error}</div>}

//       {result && result.grid && (
//         <div>
//           <h3>Processing Results</h3>
//           <p><strong>Filename:</strong> {result.filename}</p>
//           <p><strong>Grid Size:</strong> {result.size}</p> {/* fixed mismatch */}

//           <GridDisplay 
//             grid={result.grid} 
//             cellStates={cellStates} 
//             onCellClick={handleCellClick} 
//           />

//           <div style={{ marginTop: "20px" }}>
//             <label>
//               Number of words in combination:{" "}
//               <input
//                 type="number"
//                 min="2"
//                 value={comboSize}
//                 onChange={(e) => setComboSize(parseInt(e.target.value) || 2)}
//               />
//             </label>
//             <div style={{ marginTop: "10px" }}>
//               <button onClick={() => handleCalculate("blue")}>
//                 Blue Combinations
//               </button>
//               <button onClick={() => handleCalculate("red")} style={{ marginLeft: "10px" }}>
//                 Red Combinations
//               </button>
//             </div>
//           </div>

//           {comboResults && (
//             <div style={{ marginTop: "20px" }}>
//               <div style={{
//                 padding: "15px",
//                 marginBottom: "20px",
//                 backgroundColor: "#e6f7ff",
//                 border: "1px solid #91d5ff",
//                 borderRadius: "8px",
//                 textAlign: "center"
//               }}>
//                 <h3 style={{ margin: 0, color: "#1890ff" }}>
//                   Best Word: <span style={{ fontWeight: "bold" }}>{comboResults.bestWord}</span>
//                 </h3>
//               </div>

//               {comboResults.targets && comboResults.targets.length > 0 ? (
//                 <div>
//                   <h4>Target Words:</h4>
//                   <ul style={{ listStyle: "none", padding: 0 }}>
//                     {comboResults.targets.map((word, idx) => (
//                       <li
//                         key={idx}
//                         style={{
//                           marginBottom: "10px",
//                           padding: "10px",
//                           backgroundColor: "#fafafa",
//                           border: "1px solid #ddd",
//                           borderRadius: "6px",
//                           display: "flex",
//                           alignItems: "center"
//                         }}
//                       >
//                         <span style={{ 
//                           display: "inline-block",
//                           width: "24px",
//                           height: "24px",
//                           borderRadius: "50%",
//                           backgroundColor: activeColor === "blue" ? "#1890ff" : "#ff4d4f",
//                           marginRight: "10px",
//                           color: "white",
//                           textAlign: "center",
//                           lineHeight: "24px"
//                         }}>
//                           {idx + 1}
//                         </span>
//                         <span style={{ fontWeight: "bold" }}>{word}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ) : (
//                 <p>No combinations found</p>
//               )}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default UploadFile;
