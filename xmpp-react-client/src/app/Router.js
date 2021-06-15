import React from "react";
import { useSelector } from "react-redux";
import { Router } from "react-router";
import { Redirect, Route, Switch } from "react-router-dom";
import { history } from "./browserhistory";
import HomeContainer from "../features/home/HomeContainer";
import LoginContainer from "../features/user/LoginContainer";
import { selectLoggedIn } from "../features/user/userSlice";

const MyRouter = () => {
  const loggedIn = useSelector(selectLoggedIn);

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/login">
          <LoginContainer />
        </Route>
        <Route exact path="/">
          {loggedIn ? <Redirect to="/home" /> : <Redirect to="/login" />}
        </Route>
        <PrivateRoute exact path="/home" component={HomeContainer} />
      </Switch>
    </Router>
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

export default MyRouter;
