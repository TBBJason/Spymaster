import React from 'react';
import UploadFile from './uploadFile'; // Make sure import matches file name
import GridDisplay from './GridDisplay'; // Import the new component

function App() {
  return (
    <div className="App">
      <UploadFile /> {/* Fixed: Using PascalCase component name */}
    </div>
  );
}

export default App;