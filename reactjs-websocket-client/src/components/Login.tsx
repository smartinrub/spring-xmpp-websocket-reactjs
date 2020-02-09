import React, { FC, useState, useEffect } from 'react';
import { Button, FormControl, Form, Navbar, InputGroup } from 'react-bootstrap';
import storage from '../utils/storage';

export type LoginProps = {
  wsConnect: (username: string) => void;
  wsDisconnect: (username: string) => void;
  noUser: boolean;
  isAuthenticated: boolean;
  storageUser: string;
};

const Login: FC<LoginProps> = ({
  wsConnect,
  wsDisconnect,
  noUser,
  isAuthenticated,
  storageUser
}) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (storageUser !== null) {
      wsConnect(storageUser);
    }
  }, [wsConnect, storageUser]);

  const validateForm = () => {
    return username.length > 0;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    wsConnect(username);
  };

  const logout = () => {
    wsDisconnect(storage.get('user'));
  };

  return (
    <Navbar className="bg-light justify-content-between">
      {!isAuthenticated && storageUser == null ? (
        <Form inline onSubmit={handleSubmit}>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type="text"
              aria-describedby="basic-addon1"
              aria-label="Username"
              placeholder="Username"
              className=" mr-sm-2"
              value={username}
              onChange={(e: any) => setUsername(e.target.value)}
              isInvalid={noUser}
              required
              autoFocus
            />
            <Form.Control.Feedback type="invalid">
              Invalid username.
            </Form.Control.Feedback>
          </InputGroup>
          <Button type="submit" disabled={!validateForm()}>
            Login
          </Button>
        </Form>
      ) : (
        <Button variant="danger" type="submit" onClick={logout}>
          Logout
        </Button>
      )}
    </Navbar>
  );
};

export default Login;
