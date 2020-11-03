import React, { useState, useContext } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import { Context } from "../context/authContext";
import { useHistory, Link } from "react-router-dom";

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

const LoginUser = ({ errorInfo }) => {
  const history = useHistory();
  const defaultFields = { email: "", password: "" };
  const [alerts, setAlerts] = useState({ error: false, messages: [] });
  const [userInfo, setUserInfo] = useContext(Context);
  const [credsInput, setCredsInput] = useState(defaultFields);
  const [loginUser, { called, loading }] = useLazyQuery(LOGIN_USER, {
    onCompleted: (data) => {
      console.log("user is now logged in. ", data);
      setUserInfo({
        token: data.loginUser.token,
        user: data.loginUser.user,
      });
      history.push("/");
    },
    onError: (error) => {
      console.error(error);
      console.error(errorInfo);
      setAlerts({ error: true, messages: errorInfo });
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
    setCredsInput(defaultFields);
  };

  return (
    <div>
      <div>LOGIN USER</div>
      <form onSubmit={submitCreds}>
        <label>Email</label>
        <input
          type="text"
          value={credsInput.email}
          name="email"
          onChange={handleChange}
        ></input>
        <label>Password</label>
        <input
          type="password"
          value={credsInput.password}
          name="password"
          onChange={handleChange}
        ></input>
        <br />
        <button type="submit">LOGIN</button>
      </form>
      <div>
        Dont already have an account?
        <Link to="/register">
          <span>Sign Up</span>
        </Link>
      </div>
      {alerts.error ? <p>{alerts.messages}</p> : <p>No errors</p>}
    </div>
  );
};

export default LoginUser;
