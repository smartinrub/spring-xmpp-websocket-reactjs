import React, { useState } from "react";
import {
  Button,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  Jumbotron,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { login } from "../../features/user/userSlice";

// use rfce to generate component quickly
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validateForm = () => {
    return username.length > 0 && password.length > 0;
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      login({
        username: username,
        password: password,
        loggedIn: true,
      })
    );
  };

  return (
    <div className="login">
      <Jumbotron fluid>
        <Container>
          <h1>Login Here 🚪</h1>
        </Container>
      </Jumbotron>
      <Container>
        <form onSubmit={(e) => handleSubmit(e)}>
          <FormGroup controlId="username">
            <FormLabel>Username</FormLabel>
            <FormControl
              autoFocus
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="password">
            <FormLabel>Password</FormLabel>
            <FormControl
              autoFocus
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <Button block disabled={!validateForm()} type="submit">
            Login
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default Login;
