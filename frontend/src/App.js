import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function SecretSanta() {
  const [employeeFile, setEmployeeFile] = useState(null);
  const [previousAssignmentsFile, setPreviousAssignmentsFile] = useState(null);
  const [pairs, setPairs] = useState([]);
  const [downloadLink, setDownloadLink] = useState(null);

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!employeeFile) {
      alert('Please select an employee CSV file.');
      return;
    }

    const formData = new FormData();
    formData.append('employeeFile', employeeFile);
    if (previousAssignmentsFile) {
      formData.append('previousAssignmentsFile', previousAssignmentsFile);
    }

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setPairs(response.data.assignedPairs);
      setDownloadLink(`http://localhost:5000/${response.data.filePath}`);
    } catch (error) {
      console.error('Error uploading files:', error.response?.data || error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h1 className="text-center mb-4">Secret Santa</h1>
        <div className="mb-3">
          <label className="form-label">Upload Employee CSV</label>
          <input type="file" className="form-control" onChange={(e) => handleFileChange(e, setEmployeeFile)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Upload Previous Assignments (Optional)</label>
          <input type="file" className="form-control" onChange={(e) => handleFileChange(e, setPreviousAssignmentsFile)} />
        </div>
        <button className="btn btn-primary w-100" onClick={handleUpload}>Upload CSVs</button>
        {downloadLink && (
          <div className="mt-3 text-center">
            <a href={downloadLink} className="btn btn-success" download>Download Results</a>
          </div>
        )}
        <ul className="list-group mt-4">
          {pairs.map((pair, index) => (
            <li key={index} className="list-group-item">
              <strong>{pair.Employee_Name}</strong> → {pair.Secret_Child_Name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SecretSanta;
