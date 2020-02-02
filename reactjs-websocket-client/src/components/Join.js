import React, { useState } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { join } from '../store/actions/joinActions';

// https://www.igniterealtime.org/projects/openfire/plugins/1.2.1/websocket/readme.html
export const Join = ({ dispatch }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const validateForm = () => {
    return username.length > 0 && password.length > 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(join(username));
  };

  return (
    <div className="Join">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="text">
          <FormLabel>Username</FormLabel>
          <FormControl
            autoFocus
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            autoFocus
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button block disabled={!validateForm()} type="submit">
          Join
        </Button>
      </form>
    </div>
  );
};

export default Join;
