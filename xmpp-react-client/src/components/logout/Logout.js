import React from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUsername } from "../../features/user/userSlice";

const Logout = () => {
  const user = useSelector(selectUsername)

  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div>
      <Container>
        <h1>
          Welcome <span>{user.username}</span>
        </h1>
        <Button onClick={(e) => handleLogout(e)}>Logout</Button>
      </Container>
    </div>
  );
};

export default Logout;
