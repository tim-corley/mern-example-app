import React, { useState, useContext, useEffect } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import { Context } from "../context/authContext";

const LOGIN_USER = gql`
  query LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      user {
        id
        firstName
        lastName
        username
        email
        organization
        isAdmin
        createdAt
      }
      token
    }
  }
`;

const LoginUser = () => {
  const [userInfo, setUserInfo] = useContext(Context);
  const [credsInput, setCredsInput] = useState({});
  const [loginUser, { called, loading }] = useLazyQuery(LOGIN_USER, {
    onCompleted: (data) => {
      console.log("user is now logged in.", data);
      setUserInfo({
        token: data.loginUser.token,
        user: data.loginUser.user,
      });
    },
    onError: (error) => {
      console.error("ERROR!", error);
    },
  });

  if (called && loading) {
    console.log("Loading...");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredsInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitCreds = (e) => {
    e.preventDefault();
    const { email, password } = credsInput;
    loginUser({
      variables: {
        email,
        password,
      },
    });
  };

  return (
    <div>
      <div>LOGIN USER</div>
      <form onSubmit={submitCreds}>
        <label>Email</label>
        <input
          type="text"
          value={userInfo.email}
          name="email"
          onChange={handleChange}
        ></input>
        <label>Password</label>
        <input
          type="password"
          value={userInfo.password}
          name="password"
          onChange={handleChange}
        ></input>
        <br />
        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
};

export default LoginUser;
