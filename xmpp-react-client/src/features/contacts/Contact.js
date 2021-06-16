import React from "react";
import { Image } from "react-bootstrap";

const Contact = ({ selectCurrent, name, eventKey }) => {
  const setCurrent = () => {
    selectCurrent(name);
  };

  return (
    <div className={"chat-list active-chat"} key={eventKey}>
      <div className="chat-people" onClick={setCurrent}>
        <div className="chat-img">
          {" "}
          <Image
            src="https://ptetutorials.com/images/user-profile.png"
            alt="sunil"
          />{" "}
        </div>
        <div className="chat-ib">
          <h5>
            {name}
            {/* <span className="chat-date">Dec 25</span> */}
          </h5>
          {/* <p>
            Test, which is a new approach to have all solutions astrology under
            one roof.
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Contact;
