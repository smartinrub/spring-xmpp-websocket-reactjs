import React, { FC } from 'react';
import { useState } from 'react';
import { FormControl, Button } from 'react-bootstrap';

import storage from '../utils/storage';
import '../index.css';
import { Message } from '../types';

export type AddMessageProps = {
  chat: (message: Message) => void;
  addMessage: (content: string) => void;
};

const AddMessage: FC<AddMessageProps> = ({ chat, addMessage }) => {
  const [content, setContent] = useState('');

  const handleMessage = () => {
    const message: Message = {
      from: storage.get('user'),
      to: 'user2', // TODO: select user from list of users
      content: content,
      type: 'CHAT'
    };
    setContent('');
    addMessage(content);
    chat(message);
  };

  const onKeyDown = (event: any) => {
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
          onChange={(e: any) => setContent(e.target.value)}
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

export default AddMessage;
