import React, { useState } from "react";

export const Context = React.createContext({});

export const ContextController = ({ children }) => {
  let defaultState = {
    user: null,
    login: (token, user) => {},
    logout: () => {},
  };
  const [userInfo, setUserInfo] = useState(defaultState);
  const login = (user) => {
    setUserInfo(user);
  };

  const logout = () => {
    console.log("LOGGING OUT...");
    window.sessionStorage.clear();
    // client.resetStore();
    setUserInfo({ user: null });
  };
  return (
    <Context.Provider value={[userInfo, setUserInfo, login, logout]}>
      {children}
    </Context.Provider>
  );
};
