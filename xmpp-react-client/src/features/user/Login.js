import React, { useState } from "react";
import {
  Alert,
  Button,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  Jumbotron,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { wsConnect } from "../../common/middleware/websocketActions";
import { selectAlert } from "../alert/alertSlice";

// use rfce to generate component quickly
const Login = ({ dispatch }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validateForm = () => {
    return username.length > 0 && password.length > 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(wsConnect(username, password));
  };

  const alert = useSelector(selectAlert);

  return (
    <div className="login">
      <Jumbotron fluid>
        <Container>
          <h1>Login Here 🚪</h1>
        </Container>
      </Jumbotron>
      <Container>
        <div
          aria-live="polite"
          aria-atomic="true"
          style={{
            position: "relative",
            minHeight: "100px",
          }}
        >
          {alert ? (
            <Alert variant="danger">Invalid password!</Alert>
          ) : (
            <div></div>
          )}
        </div>
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
