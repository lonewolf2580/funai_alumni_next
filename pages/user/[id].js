import styled from '@emotion/styled';
import { useRouter } from 'next/router';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const UserInfo = styled.div`
  margin-top: 20px;
  display: flex;
`;

const UserData = styled.div`
  flex-grow: 1;
`;

const UserImageContainer = styled.div`
  flex-shrink: 0;
  margin-left: 20px;
  position: relative;
`;

const UserImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
  z-index: 1; /* Ensure image is above other elements */
`;

const PassportFrame = styled.div`
  width: 150px;
  height: 150px;
  background-color: #f2f2f2;
  border-radius: 5px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 0; /* Set frame behind the image */
`;

const PrintButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

const User = () => {
  const router = useRouter();
  const { id } = router.query;

  // Fetch user data based on the ID (dummy data for example)
  const userData = {
    id,
    fullName: 'John Doe',
    regNumber: '12345',
    faculty: 'Engineering',
    department: 'Computer Science',
    occupation: 'Software Engineer',
    professionalBody: 'IEEE',
    hobbies: 'Reading, hiking, coding',
  };

  return (
    <Container>
      <h1>Alumni Data</h1>
      <UserInfo>
        <UserData>
          <p>Full Name: {userData.fullName}</p>
          <p>Reg Number: {userData.regNumber}</p>
          <p>Faculty: {userData.faculty}</p>
          <p>Department: {userData.department}</p>
          <p>Occupation: {userData.occupation}</p>
          <p>Member of Professional Body: {userData.professionalBody}</p>
          <p>Hobbies: {userData.hobbies}</p>
          <PrintButton onClick={() => window.print()}>Print</PrintButton>
        </UserData>
        <UserImageContainer>
          <UserImage src="https://media.istockphoto.com/id/916523912/photo/portrait-of-young-african-woman-against-white-background.jpg?s=1024x1024&w=is&k=20&c=GBTpngQxvxXLgr0l8JGwPb_BXMBVgpM668eFN9bnAIk=" alt="Passport" />
          {/* <PassportFrame /> */}
        </UserImageContainer>
      </UserInfo>
    </Container>
  );
};

export default User;
