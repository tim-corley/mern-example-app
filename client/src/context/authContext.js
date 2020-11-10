import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";

export const Context = React.createContext({});

const GET_CURRENT_USER = gql`
  query CurrentUser($email: String!) {
    currentUser(email: $email) {
      id
      email
      username
    }
  }
`;

export const ContextController = ({ children }) => {
  let defaultState = {
    token: null,
    user: null,
    login: (token, user) => {},
    logout: () => {},
  };
  const [userInfo, setUserInfo] = useState(defaultState);
  const login = (token, user) => {
    setUserInfo(token, user);
  };

  const logout = () => {
    console.log("LOGGING OUT...");
    window.localStorage.clear();
    // client.resetStore();
    setUserInfo({ token: null, user: null });
  };
  return (
    <Context.Provider value={[userInfo, setUserInfo, login, logout]}>
      {children}
    </Context.Provider>
  );
};
