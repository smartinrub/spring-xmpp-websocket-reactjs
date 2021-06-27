import PropTypes from "prop-types";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrent } from "../current/currentSlice";
import { selectUsername } from "../user/userSlice";
import { addMessage } from "./messagesSlice";
import { newMessage } from "./typingAreaActions";

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
    <div className="chat-message clearfix">
      <div className="input-group mb-0">
        <div className="input-group-prepend">
          <button
            className="input-group-text btn btn-outline-primary"
            type="button"
            onClick={handleMessage}
            disabled={!validateForm()}
          >
            <i className="fa fa-send"></i>
          </button>
        </div>
        <input
          type="text"
          className="form-control"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Enter text here..."
        />
      </div>
    </div>
  );
};

TypingArea.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default TypingArea;
