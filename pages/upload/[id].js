import styled from '@emotion/styled';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

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
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setUploadedImage(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleUpload = () => {
    if (selectedOption === 'passport') {
      alert('Passport uploaded successfully');
    } else if (selectedOption === 'portrait') {
      alert('Portrait uploaded successfully');
    } else {
      alert('Please select an option');
    }
  };

  return (
    <Container>
      <h1>Image Upload</h1>
      <OptionSelect value={selectedOption} onChange={handleOptionChange}>
        <OptionOption value="">Select Option</OptionOption>
        <OptionOption value="passport">Passport</OptionOption>
        <OptionOption value="portrait">Portrait</OptionOption>
      </OptionSelect>
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
