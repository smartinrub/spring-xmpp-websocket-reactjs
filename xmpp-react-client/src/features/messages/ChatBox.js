import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Message from "./Message";
import { selectMessages } from "./messagesSlice";

const ChatBox = () => {
  const messages = useSelector(selectMessages);

  const ref = React.useRef();
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  return (
    <div className="msg-history">
      <div className="type-msg" />
      <ul>
        {messages.map((message) => (
          <div ref={ref} key={message.id}>
            <Message {...message} />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ChatBox;
