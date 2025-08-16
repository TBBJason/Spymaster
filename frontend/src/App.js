import React from 'react';
import UploadFile from './uploadFile'; // Make sure import matches file name

function App() {
  return (
    <div className="App">
      <UploadFile /> {/* Fixed: Using PascalCase component name */}
    </div>
  );
}

export default App;