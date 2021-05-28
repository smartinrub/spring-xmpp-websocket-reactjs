import PropTypes from "prop-types";
import React, { useState } from "react";
import { Button, FormControl } from "react-bootstrap";
// import { newMessage } from "../store/actions/chatActions";
// import { messageSent } from "../store/actions/messagesListActions";
// import storage from "../utils/storage";

const AddMessage = ({ dispatch }) => {
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
        <FormControl
          type="text"
          className="write-msg"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type a message"
          onKeyDown={onKeyDown}
        />
        <Button
          className="msg-send-btn"
          type="button"
          onClick={handleMessage}
          disabled={!validateForm()}
        >
          <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
        </Button>
      </div>
    </div>
  );
};

AddMessage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default AddMessage;
