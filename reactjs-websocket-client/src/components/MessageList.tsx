import React, { useEffect, FC, useRef } from 'react';
import Message from './Message';
import * as types from '../types';

export type MessagesListProps = {
  messages: Array<types.Message>;
};

const MessagesList: FC<MessagesListProps> = ({ messages }) => {
  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      // @ts-ignore:
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);

  return (
    <div className="msg-history">
      <ul>
        {messages.map((message: types.Message) => (
          // @ts-ignore:
          <div ref={ref} key={message.id}>
            <Message {...message} />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default MessagesList;
