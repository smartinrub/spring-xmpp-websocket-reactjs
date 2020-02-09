import React, { FC } from 'react';
import { Image } from 'react-bootstrap';

export type ChatListProps = {};
const ChatList: FC<ChatListProps> = () => {
  return (
    <>
      <div className="inbox-chat">
        <div className="chat-list active-chat">
          <div className="chat-people">
            <div className="chat-img">
              {' '}
              <Image
                src="https://ptetutorials.com/images/user-profile.png"
                alt="sunil"
              />{' '}
            </div>
            <div className="chat-ib">
              <h5>
                John Smith <span className="chat-date">Dec 25</span>
              </h5>
              <p>
                Test, which is a new approach to have all solutions astrology
                under one roof.
              </p>
            </div>
          </div>
        </div>
        <div className="chat-list">
          <div className="chat-people">
            <div className="chat-img">
              {' '}
              <Image
                src="https://ptetutorials.com/images/user-profile.png"
                alt="sunil"
              />{' '}
            </div>
            <div className="chat-ib">
              <h5>
                John Smith <span className="chat-date">Dec 25</span>
              </h5>
              <p>
                Test, which is a new approach to have all solutions astrology
                under one roof.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatList;
