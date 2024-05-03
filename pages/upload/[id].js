import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ID, Query, databases, storage } from "../appwrite/appwrite";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Head from 'next/head';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const ImageContainer = styled.div`
  margin-top: 20px;
`;

const UploadedImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
`;

const SelectImageButton = styled.label`
  display: block;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  text-align: center;
  margin-bottom: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

const OptionSelect = styled.select`
  padding: 8px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const OptionOption = styled.option`
  padding: 8px;
`;

const UploadButton = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

const Upload = () => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedOption, setSelectedOption] = useState('');
  const [photo, setPhoto] = useState('');
  const [docID, setDocId] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isClient, setIsClient] = useState(false); // Track if the component is rendered on the client
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  let databaseID = "65cdbcb4a423e21700fb";
  let userDataCollection = "65cdbce6a5676da43af8";
  let alumniDataCollection = "65d1c871ec47230031e2";
  const bucketID = "661908b8a46d76ab984a";

  useEffect(() => {
    setIsClient(true); // Set isClient to true when the component mounts on the client side
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setUploadedImage(e.target.result);
    };

    reader.readAsDataURL(file);

    if (selectedOption === 'passport') {
      handlePassportUpload(file);
    } else if (selectedOption === 'portrait') {
      handlePortraitUpload(file);
    } else {
      setSnackbarMessage('Please select an option');
      setSnackbarOpen(true);
    }
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handlePassportUpload = async (file) => {
    await uploadFileAndUpdateDocument(file, 'Passport photo uploaded successfully');
  };

  const handlePortraitUpload = async (file) => {
    await uploadFileAndUpdateDocument(file, 'Portrait uploaded successfully');
  };

  const uploadFileAndUpdateDocument = async (file, successMessage) => {
    await storage.createFile(
      bucketID,
      ID.unique(),
      file,
    ).then(async (response) => {
      setPhoto(response.$id)
      console.log("File created in bucket");
      await databases.listDocuments(
        databaseID,
        userDataCollection,
        [
          Query.equal('userId', id)
        ]
      ).then(async (response) => {
        await databases.listDocuments(
          databaseID,
          alumniDataCollection,
          [
            Query.equal('regNumber', response.documents[0].regNumber)
          ]
        ).then(async (res) => {
          console.log(`Alumni data retrieved - ${res.documents[0].$id}`);
          setDocId(res.documents[0].$id);
          var pass = {passport_photo : photo, portrait : res.documents[0].portrait,}
          var port = {passport_photo : res.documents[0].passport_photo, portrait : photo,}
          var data = selectedOption == "portrait" ? port : pass ;

          selectedOption == "passport" ?
          await databases.updateDocument(
            databaseID,
            alumniDataCollection,
            docID,
            data
          ).then((v) => {
            console.log("Document Updated - Passport ", v.passport_photo)
            // router.push(`../user/${id}`);
          })
          :
          await databases.updateDocument(
            databaseID,
            alumniDataCollection,
            docID,
            data
          ).then((v) => {
            console.log("Document Updated - Portrait", v.portrait)
            // router.push(`../user/${id}`);
          })

        });
      });
      setSnackbarMessage(successMessage);
      setSnackbarOpen(true);
    }).catch((error) => {
      console.log(error);
      setSnackbarMessage('Error uploading file');
      setSnackbarOpen(true);
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Head>
          <title>AE-FUNAI Alumni Image Upload</title>
      </Head>
      <Container>
        <h1>Image Upload</h1>
        {/* Conditionally render OptionSelect only on the client side */}
        {isClient && (
          <OptionSelect id='uploader' value={selectedOption} onChange={handleOptionChange}>
            <OptionOption value="">Select Option</OptionOption>
            <OptionOption value="passport">Passport</OptionOption>
            <OptionOption value="portrait">Portrait</OptionOption>
          </OptionSelect>
        )}
        <h1>Allowed Extensions(PNG, JPEG, JPG) and files size must be less than 5MB</h1>
        <input type="file" onChange={handleImageUpload} style={{ display: 'none' }} id="uploadInput" accept="image/*" />
        <SelectImageButton htmlFor="uploadInput">Select Image</SelectImageButton>
        {uploadedImage && (
          <ImageContainer>
            <UploadedImage src={uploadedImage} alt="Uploaded" />
          </ImageContainer>
        )}
        <p>Record ID: {id}</p>
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="success">
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
        {/* <UploadButton onClick={handleUpload}>Upload</UploadButton> */}
      </Container>
    </>
  );
};

export default Upload;
