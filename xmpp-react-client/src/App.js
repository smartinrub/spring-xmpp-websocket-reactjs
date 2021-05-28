import React from "react";
import { useSelector } from "react-redux";
import Login from "./components/login/Login";
import Logout from "./components/logout/Logout";
import { selectUsername } from "./features/user/userSlice";

function App() {
  const username = useSelector(selectUsername);

  return <div>{username ? <Logout /> : <Login />}</div>;
}

export default App;
