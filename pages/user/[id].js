import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { databases, Query } from "../appwrite/appwrite";
import Head from 'next/head';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  position: relative;
`;

const Heading = styled.h1`
  margin-bottom: 20px;
`;

const UserData = styled.div`
  margin-bottom: 20px;
`;

const UserDetail = styled.div`
  margin-bottom: 10px;
`;

const UserImage = styled.img`
  max-width: 200px;
  height: auto;
  margin-bottom: 20px;
  position: absolute;
  top: 0;
  right: 0;
`;

const PrintButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const UserPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [userData, setUserData] = useState(null);
  
  let databaseID = "65cdbcb4a423e21700fb";
  let userDataCollection = "65cdbce6a5676da43af8";
  let alumniDataCollection = "65d1c871ec47230031e2";
  const [passport, setPassport] = useState("")

  useEffect(() => {
    const fetchUserData = async (id) => {
      try {
        let promise = databases.listDocuments(
          databaseID,
          userDataCollection,
          [
              Query.equal('userId', id)
          ]
        );
        promise.then((response)=> {
            console.log(response.documents[0].regNumber);
            let promise2 = databases.listDocuments(
              databaseID,
              alumniDataCollection,
              [
                  Query.equal('regNumber', response.documents[0].regNumber)
              ]
            );
            promise2.then((res)=>{
              setUserData(res.documents[0])
              setPassport(`https://cloud.appwrite.io/v1/storage/buckets/661908b8a46d76ab984a/files/${res.documents[0].passport_photo ? res.documents[0].passport_photo : '66190a8e7c091182a0bf'}/view?project=65cdbc3b42063b794d4e&mode=admin`)
            })
        })
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (id) {
      fetchUserData(id);
    }
  }, [id, databaseID, userDataCollection, alumniDataCollection]);

  const handlePrint = () => {
    window.print();
  };

  if (!userData) {
    return <Container>Loading...</Container>;
  }

  return (
    <>
      <Head>
        <title>AE-FUNAI Alumni Information</title>
      </Head>
      {userData.completed?
      <Container>
        <Heading>AE-FUNAI Alumni Information</Heading>
        <UserImage src={passport} alt="Passport" />
        <UserData>
          <UserDetail>
            <strong>Alumni ID:</strong> {id}
          </UserDetail>
          <UserDetail>
            <strong>Full Name:</strong> {userData.fullName}
          </UserDetail>
          <UserDetail>
            <strong>Reg Number:</strong> {userData.regNumber}
          </UserDetail>
          <UserDetail>
            <strong>Faculty:</strong> {userData.faculty}
          </UserDetail>
          <UserDetail>
            <strong>Department:</strong> {userData.department}
          </UserDetail>
          <UserDetail>
            <strong>L.G.A:</strong> {userData.lga}
          </UserDetail>
          <UserDetail>
            <strong>State of Origin:</strong> {userData.stateOfOrigin}
          </UserDetail>
          <UserDetail>
            <strong>Nationality:</strong> {userData.nationality}
          </UserDetail>
          <UserDetail>
            <strong>Contact Address:</strong> {userData.contactAddress}
          </UserDetail>
          <UserDetail>
            <strong>Permanent Address:</strong> {userData.permAddress}
          </UserDetail>
          <UserDetail>
            <strong>Phone Number:</strong> {userData.phoneNumber}
          </UserDetail>
          <UserDetail>
            <strong>Year of Entry:</strong> {userData.yearOfEntry}
          </UserDetail>
          <UserDetail>
            <strong>Year of Graduation:</strong> {userData.yearOfGraduation}
          </UserDetail>
          <UserDetail>
            <strong>Degree:</strong> {userData.degree}
          </UserDetail>
          <UserDetail>
            <strong>Diploma:</strong> {userData.diploma}
          </UserDetail>
          <UserDetail>
            <strong>Certificate:</strong> {userData.certificate}
          </UserDetail>
          <UserDetail>
            <strong>Present Employer:</strong> {userData.presentEmployer}
          </UserDetail>
          <UserDetail>
            <strong>Present Post:</strong> {userData.presentPost}
          </UserDetail>
          <UserDetail>
            <strong>Member of Professional Body:</strong> {userData.memOfProfBodies}
          </UserDetail>
          <UserDetail>
            <strong>Student Activities:</strong> {userData.studentActivities}
          </UserDetail>
          <UserDetail>
            <strong>Hobbies:</strong> {userData.hobbies}
          </UserDetail>
          <UserDetail>
            <strong>Additional Information:</strong> {userData.anyOtherRelevantInfo}
          </UserDetail>
          <UserDetail>
            <strong>Email:</strong> {userData.email}
          </UserDetail>
          {/* Add more user details as needed */}
        </UserData>
        <PrintButton onClick={handlePrint}>Print</PrintButton>
        
        {userData.portrait && (
          <PrintButton>
            <Link target='_blank' href={`https://cloud.appwrite.io/v1/storage/buckets/661908b8a46d76ab984a/files/${userData.portrait}/view?project=65cdbc3b42063b794d4e&mode=admin`} passHref>
              View Portrait
            </Link>
          </PrintButton>
        )}
      </Container> :
      <Container>
        <Heading>Alumni Haven't Updated their Data</Heading>
      </Container>}
    </>
  )
};

export default UserPage;
