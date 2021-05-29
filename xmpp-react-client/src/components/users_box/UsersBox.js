import React from "react";
import { Image } from "react-bootstrap";
import AddPeopleBoxContainer from "../../containers/AddPeopleBoxContainer";

const UsersBox = () => {
  return (
    <div className="inbox-people">
      <AddPeopleBoxContainer />
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
                Test, which is a new approach to have all solutions astrology
                under one roof.
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
                Test, which is a new approach to have all solutions astrology
                under one roof.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersBox;
