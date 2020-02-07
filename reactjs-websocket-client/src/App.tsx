import React from 'react';
import { Provider } from 'react-redux';

import store from './store/store';
import ChatContainer from './containers/ChatContainer';

const App = () => {
  return (
    <Provider store={store}>
      <ChatContainer/>
    </Provider>
  );
};

export default App;
