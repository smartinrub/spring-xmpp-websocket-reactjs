import React from 'react';
import PropTypes from 'prop-types';
import '../index.css';
import { useState } from 'react';
import { FormControl, Button } from 'react-bootstrap';
import storage from '../utils/storage';

const AddMessage = ({ chat, addMessage }) => {
  const [content, setContent] = useState('');

  const handleMessage = () => {
    const msg = {
      from: storage.get('user'),
      to: 'user2', // TODO: select user from list of users
      content: content,
      type: 'CHAT'
    };
    setContent('');
    addMessage(content);
    chat(msg);
  };

  const onKeyDown = event => {
    if (event.key === 'Enter') {
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
          onChange={e => setContent(e.target.value)}
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
  dispatch: PropTypes.func.isRequired
};

export default AddMessage;
