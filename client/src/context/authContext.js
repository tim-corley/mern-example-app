import React, { useState } from "react";

export const Context = React.createContext({});

export const ContextController = ({ children }) => {
  let defaultState = {
    token: null,
    user: null,
    login: (token, user) => {},
    logout: () => {},
  };
  const [loginData, setLoginData] = useState(defaultState);
  const login = (token, user) => {
    setLoginState(token, user);
  };
  const logout = () => {
    setLoginState({ token: null, user: null });
  };
  return (
    <Context.Provider value={[loginData, setLoginData]}>
      {children}
    </Context.Provider>
  );
};
