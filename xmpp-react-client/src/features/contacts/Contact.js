import React from "react";
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectCurrent } from "../current/currentSlice";


const Contact = ({ select, name, eventKey }) => {
  const setCurrent = () => {
    select(name);
  };

  const current  = useSelector(selectCurrent)

  return (
    <div className={`chat-list ${current === name ? "active-chat" : ""}`} key={eventKey}>
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
