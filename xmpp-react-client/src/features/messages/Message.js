import React from "react";

const Message = ({ id, content, type }) => {
  let dateClassName = "message-data text-right";
  let contentClassName = "message other-message float-right";
  if (type === "NEW_MESSAGE") {
    dateClassName = "message-data";
    contentClassName = "message my-message";
  }
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  var today = new Date();
  let minutes =
    today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
  let hours = today.getHours() < 10 ? "0" + today.getHours() : today.getHours();
  let time = hours + ":" + minutes;
  let date =
    days[today.getDay()] +
    " " +
    today.getDate() +
    " " +
    months[today.getMonth()];

  return (
    <li className="clearfix" key={id}>
      <div className={dateClassName}>
        <span className="message-data-time">
          {time}, {date}
        </span>
      </div>
      <div className={contentClassName}>{content}</div>
    </li>
  );
};

export default Message;
