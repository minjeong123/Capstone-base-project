import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Redirect, Route } from "react-router-dom";

export default function ChatRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser.email !== props.match.params.chatID ? (
          <Component {...props} />
        ) : (
          <Redirect to="/chat" />
        );
      }}
    ></Route>
  );
}
