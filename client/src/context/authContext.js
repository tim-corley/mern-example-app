import React, { useState } from "react";

export const Context = React.createContext({});

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
    window.sessionStorage.clear();
    // client.resetStore();
    setUserInfo({ token: null, user: null });
  };
  return (
    <Context.Provider value={[userInfo, setUserInfo, login, logout]}>
      {children}
    </Context.Provider>
  );
};
