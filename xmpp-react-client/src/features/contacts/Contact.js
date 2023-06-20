import React from "react";
import { useSelector } from "react-redux";
import { selectCurrent } from "../current/currentSlice";



const Contact = ({ select, name, eventKey }) => {
  const setCurrent = () => {
    select(name);
  };

  const current = useSelector(selectCurrent);

  return (
    <li
      className={`clearfix ${current === name ? "active" : ""}`}
      key={eventKey}
      onClick={setCurrent}
    >
      <img
        src="https://bootdey.com/img/Content/avatar/avatar3.png"
        alt="avatar"
      />
      <div className="about">
        <div className="name">{name}</div>
        <div className="status">
          <i className="fa fa-circle offline"></i> left 7 mins ago
        </div>
        {/* <div class="status"> <i class="fa fa-circle online"></i> online </div> */}
      </div>
    </li>
  );
};

export default Contact;
