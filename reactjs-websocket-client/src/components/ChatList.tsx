import React, { FC, useEffect } from 'react';
import ChatListUser from './ChatListUser';
import { UsersList, User } from '../types';

export type ChatListProps = {
  usersList: UsersList;
  selectRecipient: (userName: string) => void;
};

const ChatList: FC<ChatListProps> = ({ usersList, selectRecipient }) => {
  useEffect(() => {}, [usersList]);
  return (
    <>
      <div className="inbox-chat">
        {usersList.users.map((user: User) => (
          <ChatListUser user={user} selectRecipient={selectRecipient} />
        ))}
      </div>
    </>
  );
};

export default ChatList;
