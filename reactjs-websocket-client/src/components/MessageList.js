import React, { useEffect } from 'react';
import Message from './Message';

const MessagesList = ({ messages }) => {
  const ref = React.useRef();
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);

  return (
    <div className="msg-history">
      <ul>
        {messages.map(message => (
          <div ref={ref} key={message.id}>
            <Message {...message} />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default MessagesList;
