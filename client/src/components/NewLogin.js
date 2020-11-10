import React, { useState, useContext } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import { Context } from "../context/authContext";
import { useHistory, Link } from "react-router-dom";
import GithubLogo from "../assets/github.svg";
import GoogleLogo from "../assets/google.svg";
import Button from "./Button";
import ValidationErr from "./ValidationErr";

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
  const [alerts, setAlerts] = useState({
    error: false,
    messages: [],
  });
  const [userInfo, setUserInfo] = useContext(Context);
  const [credsInput, setCredsInput] = useState(defaultFields);
  const [loginUser, { called, loading }] = useLazyQuery(LOGIN_USER, {
    onCompleted: (data) => {
      console.log("user is now logged in. ", data);
      setUserInfo({
        token: data.loginUser.token,
        user: data.loginUser.user,
      });
      localStorage.setItem("token", data.loginUser.token);
      history.push("/bugs");
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
    <div className="w-full lg:mx-8">
      <div className="flex justify-center">
        <div className="relative flex flex-col min-w-0 break-words w-full lg:w-3/4 mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
          <div className="rounded-t mb-0 px-6 py-6">
            <div className="text-center mb-3">
              <h6 className="text-gray-600 text-sm font-bold">Sign in with</h6>
            </div>
            <div className="btn-wrapper text-center">
              <button
                className="bg-white active:bg-gray-100 text-gray-800 px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                type="button"
                style={{ transition: "all .15s ease" }}
              >
                <img alt="..." className="w-5 mr-1" src={GithubLogo} />
                Github
              </button>
              <button
                className="bg-white active:bg-gray-100 text-gray-800 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                type="button"
                style={{ transition: "all .15s ease" }}
              >
                <img alt="..." className="w-5 mr-1" src={GoogleLogo} />
                Google
              </button>
            </div>
            <hr className="mt-6 border-b-1 border-gray-400" />
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div className="text-gray-500 text-center mb-3 font-bold">
              <small>Or sign in with credentials</small>
            </div>
            <form onSubmit={submitCreds}>
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                  placeholder="Email"
                  style={{ transition: "all .15s ease" }}
                  value={credsInput.email}
                  name="email"
                  onChange={handleChange}
                />
              </div>

              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                  placeholder="Password"
                  style={{ transition: "all .15s ease" }}
                  value={credsInput.password}
                  name="password"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    id="customCheckLogin"
                    type="checkbox"
                    className="form-checkbox text-gray-800 ml-1 w-5 h-5"
                    style={{ transition: "all .15s ease" }}
                  />
                  <span className="ml-2 text-sm font-semibold text-gray-700">
                    Remember me
                  </span>
                </label>
              </div>
              <Button label={"Sign In"} />
            </form>
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-2">
        <div className="flex justify-center w-1/2">
          <a
            href="/"
            onClick={(e) => e.preventDefault()}
            className="text-accent"
          >
            <small>Forgot password?</small>
          </a>
        </div>
      </div>
      {alerts.error ? <ValidationErr alerts={alerts.messages} /> : <div></div>}
    </div>
  );
};

export default LoginUser;
