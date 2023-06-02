import React from "react";
import { Button, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { wsDisconnect } from "../../common/middleware/websocketActions";
import { ContactsBoxContainer } from "../contacts/ContactsBoxContainer";
import { ChatBoxContainer } from "../messages/ChatBoxContainer";
import { selectUsername } from "../user/userSlice";

const Home = () => {
  const user = useSelector(selectUsername);

  const capitalize = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(wsDisconnect());
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Welcome {capitalize(user.username)}</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Button variant="outline-warning" onClick={(e) => handleLogout(e)}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Navbar>

      <div className="container">
        <div className="row clearfix">
          <div className="col-lg-12">
            <div className="card chat-app">
              <ContactsBoxContainer />
              <ChatBoxContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
