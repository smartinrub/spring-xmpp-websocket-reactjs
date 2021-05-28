import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Logout from "./components/logout/Logout";
import LoginContainer from "./containers/LoginContainer";
import { selectLoggedIn } from "./features/user/userSlice";

const Router = () => {
  const loggedIn = useSelector(selectLoggedIn);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          <LoginContainer />
        </Route>
        <Route exact path="/">
          {loggedIn ? <Redirect to="/home" /> : <Redirect to="/login" />}
        </Route>
        <PrivateRoute exact path="/home" component={Logout} />
      </Switch>
    </BrowserRouter>
  );
};

const PrivateRoute = ({ component: Component, ...args }) => {
  const loggedIn = useSelector(selectLoggedIn);

  return (
    <Route {...args}>
      {loggedIn === true ? <Component /> : <Redirect to="/login" />}
    </Route>
  );
};

export default Router;
