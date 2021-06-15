import PropTypes from "prop-types";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { newMessage } from "./typingAreaActions";
import { selectCurrent } from "../current/currentSlice";
import { addMessage } from "./messagesSlice";
import { selectUsername } from "../user/userSlice";

const TypingArea = ({ dispatch }) => {
  const [content, setContent] = useState("");

  const user = useSelector(selectUsername);

  const currentContact = useSelector(selectCurrent);

  const handleMessage = () => {
    const msg = {
      from: user.username,
      to: currentContact,
      content: content,
      messageType: "NEW_MESSAGE",
    };
    const msgSent = {
      from: user.username,
      to: currentContact,
      content: content,
    };
    setContent("");
    dispatch(addMessage(msgSent));
    dispatch(newMessage(msg));
  };

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      handleMessage();
    }
  };

  const validateForm = () => {
    return content.length > 0;
  };

  return (
    <div className="type-msg">
      <div className="input-msg-write">
        <input
          type="text"
          className="write-msg"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type a message"
          onKeyDown={onKeyDown}
        />
        <button
          className="msg-send-btn"
          type="button"
          onClick={handleMessage}
          disabled={!validateForm()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

TypingArea.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default TypingArea;
