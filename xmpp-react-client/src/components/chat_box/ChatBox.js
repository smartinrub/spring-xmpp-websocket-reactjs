import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrent } from "../../features/current/currentSlice";
// import Message from './Message';

const Messages = ({ messages }) => {
  const ref = React.useRef();
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  const currentContact = useSelector(selectCurrent)

  return (
    <div className="msg-history">
      {currentContact != null ? currentContact : ""}
      <div className="type-msg"/>
      <ul>
        {/* {messages.map((message) => (
          <div ref={ref} key={message.id}>
            <Message {...message} />
          </div>
        ))} */}
      </ul>
    </div>
  );
};

export default Messages;
