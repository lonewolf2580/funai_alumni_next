import styled from '@emotion/styled';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import { ID, Query, databases, storage } from "../appwrite/appwrite";

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
  const [uploadedImage, setUploadedImage] = useState(null);
  let databaseID = "65cdbcb4a423e21700fb";
  let userDataCollection = "65cdbce6a5676da43af8";
  let alumniDataCollection = "65d1c871ec47230031e2";
  const bucketID = "661908b8a46d76ab984a";

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setUploadedImage(e.target.result);
    };

    reader.readAsDataURL(file);

    if (selectedOption === 'passport') {
        await storage.createFile(
          bucketID,
          ID.unique(),
          file,
        ).then(async function (response) {
          setPhoto(response.$id)
          console.log("File created in bucket")
          await databases.listDocuments(
            databaseID,
            userDataCollection,
            [
                Query.equal('userId', id)
            ]
          ).then(async (response)=> {
              console.log(response.documents[0].regNumber);
              await databases.listDocuments(
                databaseID,
                alumniDataCollection,
                [
                    Query.equal('regNumber', response.documents[0].regNumber)
                ]
              ).then(async (res)=>{
                console.log("Alumni deta retrieved")
                const docID = res.documents[0].$id
                await databases.updateDocument(
                  databaseID,
                  alumniDataCollection,
                  docID,
                  {
                    "passport_photo" : photo,
                  }
                ).then(()=>{
                  console.log("Document Updated")
                  router.push(`../user/${id}`);
                })
              })
          })
          }, function (error) {
              console.log(error); // Failure
        });
      } else if (selectedOption === 'portrait') {
        await storage.createFile(
          bucketID,
          ID.unique(),
          file,
        ).then(async function (response) {
          setPhoto(response.$id)
          console.log("File created in bucket")
          await databases.listDocuments(
            databaseID,
            userDataCollection,
            [
                Query.equal('userId', id)
            ]
          ).then(async (response)=> {
              console.log(response.documents[0].regNumber);
              await databases.listDocuments(
                databaseID,
                alumniDataCollection,
                [
                    Query.equal('regNumber', response.documents[0].regNumber)
                ]
              ).then(async (res)=>{
                console.log("Alumni deta retrieved")
                const docID = res.documents[0].$id
                await databases.updateDocument(
                  databaseID,
                  alumniDataCollection,
                  docID,
                  {
                    "portrait" : photo,
                  }
                ).then(()=>{
                  console.log("Document Updated")
                  router.push(`../user/${id}`);
                })
              })
              
          })
          }, function (error) {
              console.log(error); // Failure
        });
        
      } else {
        alert('Please select an option');
      }
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleUpload = async (e) => {
      
  };

  return (
    <Container>
      <h1>Image Upload</h1>
      {/* Conditionally render OptionSelect only on the client side */}
      {typeof window !== 'undefined' && (
        <OptionSelect id='uploader' value={selectedOption} onChange={handleOptionChange}>
          <OptionOption value="">Select Option</OptionOption>
          <OptionOption value="passport">Passport</OptionOption>
          <OptionOption value="portrait">Portrait</OptionOption>
        </OptionSelect>
      )}
      <input type="file" onChange={handleImageUpload} style={{ display: 'none' }} id="uploadInput" accept="image/*" />
      <SelectImageButton htmlFor="uploadInput">Select Image</SelectImageButton>
      {uploadedImage && (
        <ImageContainer>
          <UploadedImage src={uploadedImage} alt="Uploaded" />
        </ImageContainer>
      )}
      <p>ID: {id}</p>
      <UploadButton onClick={handleUpload}>Upload</UploadButton>
    </Container>
  );
};

export default Upload;
