import React, { FC, useEffect } from 'react';
import ChatListUser from './ChatListUser';
import { UsersList, User } from '../types';

export type ChatListProps = {
  usersList: UsersList;
};

const ChatList: FC<ChatListProps> = ({ usersList }) => {
  useEffect(() => {}, [usersList]);
  return (
    <>
      <div className="inbox-chat">
        {usersList.users.map((user: User) => (
          <ChatListUser user={user} />
        ))}
      </div>
    </>
  );
};

export default ChatList;
