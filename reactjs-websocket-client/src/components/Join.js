import React, { useState } from "react";
import { Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { history } from "../browserhistory";
import { wsConnect } from "../store";
import storage from "../utils/storage";

// https://www.igniterealtime.org/projects/openfire/plugins/1.2.1/websocket/readme.html
export const Join = ({ dispatch }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validateForm = () => {
    return username.length > 0 && password.length > 0;
  };

  const connectAndJoin = (e) => {
    e.preventDefault();
    dispatch(wsConnect(username));
    storage.set("isAuthenticated", true);
    storage.set("user", username);
    history.push("/chat");
  };

  return (
    <div className="Join">
      <form onSubmit={connectAndJoin}>
        <FormGroup controlId="text">
          <FormLabel>Username</FormLabel>
          <FormControl
            autoFocus
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            autoFocus
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
