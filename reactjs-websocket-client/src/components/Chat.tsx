import React, { FC } from 'react';
import { Button, Image, Container } from 'react-bootstrap';

import 'font-awesome/css/font-awesome.min.css';

import '../index.css';
import { MessagesListContainer } from '../containers/MessagesListContainer';
import { AddMessageContainer } from '../containers/AddMessageContainer';
import Login from './Login';
import storage from '../utils/storage';

export type ChatProps = {
  wsConnect: (email: string) => void;
  wsDisconnect: (email: string) => void;
  isAuthenticated: boolean;
  noUser: boolean;
};

// https://www.igniterealtime.org/projects/openfire/plugins/1.2.1/websocket/readme.html
const Chat: FC<ChatProps> = ({
  wsConnect,
  wsDisconnect,
  isAuthenticated,
  noUser
}) => {
  const storageUser = storage.get('user');

  return (
    <>
      <Login
        wsConnect={wsConnect}
        wsDisconnect={wsDisconnect}
        noUser={noUser}
        isAuthenticated={isAuthenticated}
        storageUser={storageUser}
      />
      {isAuthenticated ? (
        <Container>
          <div className="messaging">
            <div className="inbox-msg">
              <div className="inbox-people">
                <div className="headind-srch">
                  <div className="srch-bar">
                    <div className="stylish-input-group">
                      <input
                        type="text"
                        className="search-bar"
                        placeholder="Search"
                      />
                      <span className="input-group-addon">
                        <Button type="button">
                          {' '}
                          <i
                            className="fa fa-search"
                            aria-hidden="true"
                          ></i>{' '}
                        </Button>
                      </span>
                    </div>
                  </div>
                </div>
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
                          Test, which is a new approach to have all solutions
                          astrology under one roof.
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
                          Test, which is a new approach to have all solutions
                          astrology under one roof.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mesgs">
                <MessagesListContainer />
                <AddMessageContainer />
              </div>
            </div>
          </div>
        </Container>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Chat;
