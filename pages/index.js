import { useState } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const UserList = styled.ul`
  list-style: none;
  padding: 0;
`;

const UserItem = styled.li`
  margin-bottom: 15px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
`;

const PrintButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ViewDetailsButton = styled.a`
  display: inline-block;
  padding: 8px 15px;
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

const users = [
  { id: '1', fullName: 'John Doe', regNumber: '12345', faculty: 'Engineering', department: 'Computer Science' },
  { id: '2', fullName: 'Jane Smith', regNumber: '54321', faculty: 'Science', department: 'Biology' },
  { id: '3', fullName: 'Alice Johnson', regNumber: '67890', faculty: 'Arts', department: 'History' },
  { id: '4', fullName: 'Bob Williams', regNumber: '13579', faculty: 'Medicine', department: 'Anatomy' },
  { id: '5', fullName: 'Eva Davis', regNumber: '24680', faculty: 'Business', department: 'Marketing' },
  { id: '6', fullName: 'Michael Brown', regNumber: '35791', faculty: 'Law', department: 'Criminal Justice' },
  { id: '7', fullName: 'Sarah Miller', regNumber: '46802', faculty: 'Social Sciences', department: 'Psychology' },
  { id: '8', fullName: 'David Anderson', regNumber: '57913', faculty: 'Education', department: 'English' },
  { id: '9', fullName: 'Laura Garcia', regNumber: '68024', faculty: 'Architecture', department: 'Urban Planning' },
  { id: '10', fullName: 'James Wilson', regNumber: '79135', faculty: 'Design', department: 'Graphic Design' },
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = users.filter((user) =>
      user.fullName.toLowerCase().includes(value.toLowerCase()) ||
      user.regNumber.toLowerCase().includes(value.toLowerCase()) ||
      user.department.toLowerCase().includes(value.toLowerCase()) ||
      user.faculty.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredUsers(filtered);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Container>
      <h1>User List</h1>
      <PrintButton onClick={handlePrint}>Print List</PrintButton>
      <input
        type="text"
        placeholder="Search by Name, Reg Number, Department, or Faculty"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: '20px', padding: '8px', width: '100%' }}
      />
      <UserList>
        {filteredUsers.slice(0, 10).map((user) => (
          <UserItem key={user.id}>
            <strong>Name:</strong> {user.fullName} <br />
            <strong>Reg Number:</strong> {user.regNumber} <br />
            <strong>Faculty:</strong> {user.faculty} <br />
            <strong>Department:</strong> {user.department} <br />
            <Link href={`/user/${user.id}`}>
              <ViewDetailsButton>View Details</ViewDetailsButton>
            </Link>
          </UserItem>
        ))}
      </UserList>
    </Container>
  );
};

export default Home;
