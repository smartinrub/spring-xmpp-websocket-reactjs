import React from "react";
import { Button, Image, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { wsDisconnect } from "../../app/websocketActions";
import { AddMessageContainer } from "../../containers/AddMessageContainer";
import { MessagesContainer } from "../../containers/MessagesContainer";
import { selectUsername } from "../../features/user/userSlice";

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

      <div className="messaging">
        <div className="inbox-msg">
          <div className="inbox-people">
            <div className="headind-srch">
              <div className="srch-bar">
                <div className="stylish-input-group">
                  <input
                    type="text"
                    className="search-bar"
                    placeholder="Search"
                  />
                  <span className="input-group-addon">
                    <Button type="button">
                      {" "}
                      <i className="fa fa-search" aria-hidden="true"></i>{" "}
                    </Button>
                  </span>
                </div>
              </div>
            </div>
            <div className="inbox-chat">
              <div className="chat-list active-chat">
                <div className="chat-people">
                  <div className="chat-img">
                    {" "}
                    <Image
                      src="https://ptetutorials.com/images/user-profile.png"
                      alt="sunil"
                    />{" "}
                  </div>
                  <div className="chat-ib">
                    <h5>
                      John Smith <span className="chat-date">Dec 25</span>
                    </h5>
                    <p>
                      Test, which is a new approach to have all solutions
                      astrology under one roof.
                    </p>
                  </div>
                </div>
              </div>
              <div className="chat-list">
                <div className="chat-people">
                  <div className="chat-img">
                    {" "}
                    <Image
                      src="https://ptetutorials.com/images/user-profile.png"
                      alt="sunil"
                    />{" "}
                  </div>
                  <div className="chat-ib">
                    <h5>
                      John Smith <span className="chat-date">Dec 25</span>
                    </h5>
                    <p>
                      Test, which is a new approach to have all solutions
                      astrology under one roof.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mesgs">
            <MessagesContainer />
            <AddMessageContainer dispatch={dispatch} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
