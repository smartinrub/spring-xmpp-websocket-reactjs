import React, { FC, useEffect } from 'react';
import ChatListUser from './ChatListUser';
import { UsersList, User } from '../types';

export type ChatListProps = {
  usersList: UsersList;
  currentRecipient: string;
  selectRecipient: (userName: string) => void;
};

const ChatList: FC<ChatListProps> = ({
  usersList,
  selectRecipient,
  currentRecipient
}) => {
  useEffect(() => {}, [usersList]);
  return (
    <>
      <div className="inbox-chat">
        {usersList.users.map((user: User, i) => (
          <ChatListUser
            key={i}
            user={user}
            selectRecipient={selectRecipient}
            currentRecipient={currentRecipient}
          />
        ))}
      </div>
    </>
  );
};

export default ChatList;
