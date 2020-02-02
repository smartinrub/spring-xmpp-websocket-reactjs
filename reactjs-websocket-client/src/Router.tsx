import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import storage from './utils/storage';
import JoinContainer from './containers/JoinContainer';
import ChatContainer from './containers/ChatContainer';

const PrivateRoute = ({ component: Component, ...args }: any) => (
  <Route {...args}>
    {storage.get('isAuthenticated') === true ? (
      <Component />
    ) : (
      <Redirect to="/" />
    )}
  </Route>
);

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/join" exact>
        <JoinContainer />
      </Route>
      <Route exact path="/">
        {storage.get('isAuthenticated') ? (
          <Redirect to="/chat" />
        ) : (
          <Redirect to="/join" />
        )}
      </Route>
      <PrivateRoute exact path="/join" component={JoinContainer} />
      <PrivateRoute exact path="/chat" component={ChatContainer} />
    </Switch>
  </BrowserRouter>
);

export default Router;
