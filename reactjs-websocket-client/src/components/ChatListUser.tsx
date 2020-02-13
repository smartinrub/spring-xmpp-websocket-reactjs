import React, { FC, useEffect, useState } from 'react';
import { User } from '../types';

export type ChatListUserProps = {
  user: User;
  currentRecipient: string;
  selectRecipient: (userName: string) => void;
};

const ChatListUser: FC<ChatListUserProps> = ({
  user,
  selectRecipient,
  currentRecipient
}) => {
  const [listChatStyle, setListChatStyle] = useState('');

  useEffect(() => {
    if (currentRecipient === user.name) {
      setListChatStyle('chat-list active-chat');
    } else {
      setListChatStyle('chat-list');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRecipient]);

  const selectUser = () => {
    selectRecipient(user.name);
  };

  return (
    <>
      <div className={listChatStyle} onClick={() => selectUser()}>
        <div className="chat-people">
          <div className="chat-ib">
            <h5>
              {user.name}
              <span className="chat-date">{user.timeLastConnected}</span>
            </h5>
            <p>{user.lastMessage}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatListUser;
