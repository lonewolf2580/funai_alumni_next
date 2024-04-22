import React, { useState } from 'react';
import { Snackbar } from '@mui/material'; // Remove Button import since it's not used
import styled from '@emotion/styled';
import MuiAlert from '@mui/material/Alert'; // Correct import for MuiAlert
import * as XLSX from 'xlsx'; // Import the xlsx package
import { ID, databases } from '../appwrite/appwrite';

// Styled components for custom styling
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const AlumniPage = () => {
  const [successCount, setSuccessCount] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  let databaseID = "65cdbcb4a423e21700fb";
  let userDataCollection = "65cdbce6a5676da43af8";
  let alumniDataCollection = "65d1c871ec47230031e2";

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      /* Process the Excel file data and create alumni for each row */
      // Example: You can use the 'xlsx' library to parse Excel files
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0]; // Assuming only one sheet in the Excel file
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Now jsonData contains the parsed Excel data in JSON format
      console.log('Parsed Excel data:', jsonData);
      jsonData.forEach(async (value, index)=>{
        var obj = {
            regNumber: value[0],
            fullName: value[1],
            faculty: value[2],
            department: value[3],
        }

        await databases.createDocument(
            databaseID,
            alumniDataCollection,
            ID.unique(),
            obj,
        ).then(()=>{
            console.log('Created New Alumni profile for:', obj)
        })
      })

      // Example: You can process the jsonData and create alumni records
      // Replace this with your actual logic to create alumni from the parsed data

      setSuccessCount(jsonData.length); // Set success count to the number of rows in the Excel file
      setSnackbarOpen(true); // Open the snackbar after processing the file
    };

    reader.readAsArrayBuffer(file);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container>
      <h1>Upload Alumni Data</h1>
      <label htmlFor="fileUpload" style={{ display: 'block', textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ width: '200px', height: '100px', border: '2px dashed #000', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <input
            type="file"
            id="fileUpload"
            accept=".xlsx,.xls"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
          Select Excel File
        </div>
      </label>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <MuiAlert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Created {successCount} alumni records successfully!
        </MuiAlert>
      </Snackbar>
    </Container>
  );  
};

export default AlumniPage;