import React, { FC } from 'react';
import { User } from '../types';

export type ChatListUserProps = {
  user: User;
  selectRecipient: (userName: string) => void;
};

const ChatListUser: FC<ChatListUserProps> = ({ user, selectRecipient }) => {
  const selectUser = () => {
    selectRecipient(user.name);
  };

  return (
    <div className="chat-list active-chat" onClick={() => selectUser()}>
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
  );
};

export default ChatListUser;
