import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrent } from "../current/currentSlice";
import Message from "./Message";
import { selectMessages } from "./messagesSlice";
import { TypingAreaContainer } from "./TypingAreaContainer";

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

  return (
    <div class="chat">
      <div class="chat-header clearfix">
        <div class="row">
          <div class="col-lg-6">
            <img
              src="https://bootdey.com/img/Content/avatar/avatar2.png"
              alt="avatar"
            />
            <div class="chat-about">
              <h6 class="m-b-0">{currentContact}</h6>
              <small>Last seen: 2 hours ago</small>
            </div>
          </div>
        </div>
      </div>
      <div className="chat-history">
        <ul class="m-b-0">
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
