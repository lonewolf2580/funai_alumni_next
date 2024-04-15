import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from '@emotion/styled';
import { account, databases, Query } from "./appwrite/appwrite";
import Head from 'next/head';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  border-bottom: 2px solid #ccc;
  padding: 12px;
  text-align: left;
`;

const TableCell = styled.td`
  border-bottom: 1px solid #ccc;
  padding: 10px;
  text-align: left;
`;

const Button = styled.button`
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

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
`;

const IndexPage = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();
  let databaseID = "65cdbcb4a423e21700fb";
  let userDataCollection = "65cdbce6a5676da43af8";
  let alumniDataCollection = "65d1c871ec47230031e2";

  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await account.get(); // Check if there is an active session
        // Check if the user has admin label
        const userId = user.$id;
        let promise = await databases.listDocuments(
          databaseID,
          userDataCollection,
          [
              Query.equal('userId', userId)
          ]
        );
        const isAdmin = promise.documents[0].isAdmin;
        if (isAdmin) {
          setLoggedIn(true);
          fetchData();
        } else {
          // Log out and redirect to login
          await account.deleteSession('current');
          router.push('/login');
        }
      } catch (error) {
        console.error('Error checking session:', error);
        setLoggedIn(false);
        router.push('/login'); // Redirect to the login page if an error occurs
      }
    };

    checkSession();

    const fetchData = async () => {
      try {
        let promise = databases.listDocuments(
          databaseID,
          userDataCollection,
        );
        promise.then((response)=> {
            setStudents(response.documents);
        })
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

  }, [databaseID, userDataCollection, alumniDataCollection, router]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.regNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.userId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Head>
        <title>AE-FUNAI Alumni Records</title>
      </Head>
      <Container>
        <h1 style={{ marginBottom: '20px' }}>Alumni Data Table</h1>
        <Input
          type="text"
          placeholder="Search by Name, Reg Number, Email"
          value={searchTerm}
          onChange={handleSearch}
        />
        <Button onClick={handlePrint} style={{ marginLeft: '20px' }}>
          Print List
        </Button>
        <Link href="/record">
          <Button style={{ marginLeft: '20px' }}>
            View Records By Faculty/Department
          </Button>
        </Link>
        <Table>
          <thead>
            <tr>
              <TableHeader>Full Name</TableHeader>
              <TableHeader>Reg Number</TableHeader>
              <TableHeader>Email</TableHeader>
              {/* <TableHeader>Department</TableHeader> */}
              <TableHeader>Actions</TableHeader>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.regNumber}</TableCell>
                <TableCell>{student.email}</TableCell>
                {/* <TableCell>{student.department}</TableCell> */}
                <TableCell>
                  <Link href={`/user/${student.userId}`}>
                    <Button>View Details</Button>
                  </Link>
                </TableCell>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default IndexPage;
