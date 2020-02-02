import React from 'react';
import { Button, Image } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';

import '../index.css';
import { useState, useEffect } from 'react';
import { wsConnect } from '../store/actions/websocketActions';
import { MessagesListContainer } from '../containers/MessagesListContainer';
import { AddMessageContainer } from '../containers/AddMessageContainer';

const Chat = ({ dispatch }) => {
  // const [from, setFrom] = useState('');
  // const [to, setTo] = useState('');
  // const [messageType, setMessageType] = useState('');

  useEffect(() => {
    dispatch(wsConnect('user1'));
  }, [dispatch]);

  return (
    <div className="container">
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
                      <i className="fa fa-search" aria-hidden="true"></i>{' '}
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
            <AddMessageContainer dispatch={dispatch} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
