import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrent } from "../current/currentSlice";
import Message from "./Message";
import { selectMessages } from "./messagesSlice";
import { TypingAreaContainer } from "./TypingAreaContainer";
import { unsubscribe } from "./typingAreaActions.js";

const ChatBox = () => {
  const messages = useSelector(selectMessages);

  const ref = React.useRef();
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  const currentContact = useSelector(selectCurrent);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = {
      to: currentContact,
      messageType: "UNSUBSCRIBE",
    };
    dispatch(unsubscribe(msg));
  };

  return (
    <div className="chat">
      <div className="chat-header clearfix">
        <div className="row">
          <div className="col-lg-6">
            <img
              src="https://bootdey.com/img/Content/avatar/avatar2.png"
              alt="avatar"
            />
            <div className="chat-about">
              <h6 className="m-b-0">{currentContact}</h6>
              <small>Last seen: 2 hours ago</small>
            </div>
            <div><button onClick={(e)=>handleSubmit(e)}>x</button></div>
          </div>
        </div>
      </div>
      <div className="chat-history">
        <ul className="m-b-0">
          {messages.map((message) => (
            <div ref={ref} key={message.id}>
              <Message {...message} />
            </div>
          ))}
        </ul>
      </div>
      <TypingAreaContainer dispatch={dispatch} />
    </div>
  );
};

export default ChatBox;
