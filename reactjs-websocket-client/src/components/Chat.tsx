import React, { FC } from 'react';
import { Container, Jumbotron, Button } from 'react-bootstrap';

import 'font-awesome/css/font-awesome.min.css';

import '../index.css';
import { MessagesListContainer } from '../containers/MessagesListContainer';
import { AddMessageContainer } from '../containers/AddMessageContainer';
import Login from './Login';
import storage from '../utils/storage';
import SearchBar from './SearchBar';
import ChatListContainer from '../containers/ChatListContainer';

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
      <Container>
        {isAuthenticated ? (
          <div className="messaging">
            <div className="inbox-msg">
              <div className="inbox-people">
                <SearchBar />
                <ChatListContainer />
              </div>
              <div className="mesgs">
                <MessagesListContainer />
                <AddMessageContainer />
              </div>
            </div>
          </div>
        ) : (
          <Jumbotron>
            <h1>Chat App!</h1>
            <p>
              This is a Chat App that uses XMPP as the chat protocol in the
              backend and it is integrated with Spring Boot to provide an easy
              way to handle the XMPP connections with the Openfire server. The
              UI is developed with ReactJS and Bootstrap. We use Redux together
              with React to manage the application state. Also typescript is
              used to get the benefits of a statically typed language for the
              UI, which means more safety and fewer bugs.
            </p>
            <p>
              <Button
                href="https://github.com/smartinrub/spring-xmpp-websocket-reactjs"
                variant="primary"
              >
                Source Code
              </Button>
            </p>
          </Jumbotron>
        )}
      </Container>
    </>
  );
};

export default Chat;
