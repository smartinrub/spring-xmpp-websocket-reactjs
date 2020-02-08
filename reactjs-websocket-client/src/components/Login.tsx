import React, { useState, FC } from 'react';
import { Button, FormControl, FormLabel, Form } from 'react-bootstrap';

export type LoginProps = {
  wsConnect: (email: string) => void;
  noUser: boolean;
};

const Login: FC<LoginProps> = ({ wsConnect, noUser }) => {
  const [username, setUsername] = useState('');

  const validateForm = () => {
    return username.length > 0;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    wsConnect(username);
  };

  return (
    <Form onSubmit={handleSubmit} className="form-signin">
      <FormLabel className="sr-only">Username</FormLabel>
      <FormControl
        autoFocus
        type="text"
        placeholder="username"
        value={username}
        onChange={(e: any) => setUsername(e.target.value)}
        isInvalid={noUser}
        required
      />
      <div className="invalid-feedback" style={{ width: '100%' }}>
        Your username is required.
      </div>
      <Button
        className="btn btn-lg btn-primary btn-block"
        block
        disabled={!validateForm()}
        type="submit"
      >
        Start Chat
      </Button>
    </Form>
  );
};

export default Login;
