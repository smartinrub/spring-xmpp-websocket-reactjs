import React, { FC } from 'react';
import { User } from '../types';

export type ChatListUserProps = {
  user: User;
};

const ChatListUser: FC<ChatListUserProps> = ({ user }) => {
  return (
    <div className="chat-list active-chat">
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
