import { useState, useEffect } from "react";
import { account } from "../appwrite/appwrite";
import styled from "@emotion/styled";
import Link from "next/link"; // Import Link from Next.js

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 10px 20px;
  margin-bottom: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const LoginPage = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await account.get(); // Check if there is an active session
        // Check if the user has admin label
        setLoggedInUser(user);
      } catch (error) {
        console.error('Error checking session:', error);
      }
    };

    checkSession();
  }, []);

  const login = async (email, password) => {
    const session = await account.createEmailSession(email, password);
    setLoggedInUser(await account.get());
  };

  const logout = async () => {
    await account.deleteSession("current");
    setLoggedInUser(null);
  };

  if (loggedInUser) {
    return (
      <Container>
        <p>Logged in as {loggedInUser.name}</p>
        <Button type="button" onClick={logout}>
          Logout
        </Button>
        <Link href="../">
          <Button>View Record with Details</Button>
        </Link>
        
        <Link href="/record">
          <Button>Search Record By Faculty/Department</Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container>
      <p>Not logged in</p>
      <form>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /> */}
        <Button type="button" onClick={() => login(email, password)}>
          Login
        </Button>
        {/* <Button type="button" onClick={register}>
          Register
        </Button> */}
      </form>
    </Container>
  );
};

export default LoginPage;
