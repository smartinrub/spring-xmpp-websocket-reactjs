import PropTypes from "prop-types";
import React, { useState } from "react";
// import { newMessage } from "../store/actions/chatActions";
// import { messageSent } from "../store/actions/messagesListActions";
// import storage from "../utils/storage";

const TypingArea = ({ dispatch }) => {
  const [content, setContent] = useState("");

  const handleMessage = () => {
    const msg = {
      //   from: storage.get("user"),
      to: "user2",
      content: content,
      messageType: "NEW_MESSAGE",
    };
    setContent("");
    // dispatch(messageSent(content));
    // dispatch(newMessage(msg));
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
