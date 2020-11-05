import React, { useState, useContext } from "react";
import { useMutation, gql } from "@apollo/client";
import { Context } from "../context/authContext";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import Button from "./Button";

const CREATE_USER = gql`
  mutation CreateUser(
    $firstName: String!
    $lastName: String!
    $username: String!
    $email: String!
    $organization: String!
    $password: String!
    $confirmPwd: String!
    $isAdmin: Boolean!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      organization: $organization
      password: $password
      confirmPwd: $confirmPwd
      isAdmin: $isAdmin
    ) {
      user {
        id
        username
        email
        isAdmin
        createdAt
      }
      token
    }
  }
`;

const NewRegister = ({ errorInfo }) => {
  const defaultFields = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    organization: "",
    password: "",
    confirmPwd: "",
    isAdmin: false,
  };
  const history = useHistory();
  const [userInfo, setUserInfo] = useContext(Context);
  const [userInput, setUserInput] = useState(defaultFields);
  const [alerts, setAlerts] = useState({ error: false, messages: [] });
  const [createUser, { loading }] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      console.log("new user created. ", data);
      setUserInfo({
        token: data.createUser.token,
        user: data.createUser.user,
      });
      history.push("/");
    },
    onError: (error) => {
      console.error(error);
      console.error(errorInfo);
      setAlerts({ error: true, messages: errorInfo });
      setUserInput(defaultFields);
    },
  });

  if (loading) {
    console.log("loading");
  }

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name == "isAdmin") {
      setUserInput((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else {
      setUserInput((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const sumbitInput = (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      username,
      email,
      organization,
      password,
      confirmPwd,
      isAdmin,
    } = userInput;
    createUser({
      variables: {
        firstName,
        lastName,
        username,
        email,
        organization,
        password,
        confirmPwd,
        isAdmin,
      },
    });
  };
  return (
    <div className="w-full lg:mx-8">
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
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
              <FontAwesomeIcon icon={faGithub} />
              Github
            </button>
            <button
              className="bg-white active:bg-gray-100 text-gray-800 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
              type="button"
              style={{ transition: "all .15s ease" }}
            >
              <FontAwesomeIcon icon={faGoogle} />
              Google
            </button>
          </div>
          <hr className="mt-6 border-b-1 border-gray-400" />
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <div className="text-gray-500 text-center mb-3 font-bold">
            <small>Or Create a New Account</small>
          </div>
          <form onSubmit={sumbitInput}>
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-firstName"
              >
                First Name
              </label>
              <input
                type="text"
                className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                placeholder="Jamie"
                style={{ transition: "all .15s ease" }}
                value={userInput.firstName}
                name="firstName"
                onChange={handleChange}
              />
            </div>
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-lastName"
              >
                Last Name
              </label>
              <input
                type="text"
                className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                placeholder="Smith"
                style={{ transition: "all .15s ease" }}
                value={userInput.lastName}
                name="lastName"
                onChange={handleChange}
              />
            </div>
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-userName"
              >
                Username
              </label>
              <input
                type="text"
                className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                placeholder="j.smith"
                style={{ transition: "all .15s ease" }}
                value={userInput.username}
                name="username"
                onChange={handleChange}
              />
            </div>
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-email"
              >
                Email
              </label>
              <input
                type="email"
                className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                placeholder="jsmith@email.com"
                style={{ transition: "all .15s ease" }}
                value={userInput.email}
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-email"
              >
                Organization
              </label>
              <input
                type="text"
                className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                placeholder="Foo Corp."
                style={{ transition: "all .15s ease" }}
                value={userInput.organization}
                name="organization"
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
                value={userInput.password}
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Confirm Password
              </label>
              <input
                type="password"
                className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                placeholder="Password"
                style={{ transition: "all .15s ease" }}
                value={userInput.confirmPwd}
                name="confirmPwd"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  id="adminUserCheck"
                  type="checkbox"
                  name="isAdmin"
                  checked={userInput.isAdmin}
                  value={userInput.isAdmin}
                  onChange={handleChange}
                  className="form-checkbox text-gray-800 ml-1 w-5 h-5"
                  style={{ transition: "all .15s ease" }}
                />
                <span className="ml-2 text-sm font-semibold text-gray-700">
                  Admin User?
                </span>
              </label>
            </div>
            <Button label={"Create Account"} />
          </form>
        </div>
        {alerts.error ? <p>{alerts.messages}</p> : <p>No errors</p>}
      </div>
    </div>
  );
};

export default NewRegister;
