import React, { useState, useContext } from "react";
import { useMutation, gql } from "@apollo/client";
import { Context } from "../context/authContext";
import { useHistory, Link } from "react-router-dom";

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

const CreateUser = ({ errorInfo }) => {
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
    <div className="m-10 p-6 border-dashed border-2 border-dark">
      <div>PLEASE CREATE A NEW USER</div>
      <form onSubmit={sumbitInput}>
        <label>First Name</label>
        <input
          type="text"
          required
          value={userInput.firstName}
          name="firstName"
          onChange={handleChange}
        ></input>
        <label>Last Name</label>
        <input
          type="text"
          value={userInput.lastName}
          name="lastName"
          onChange={handleChange}
        ></input>
        <label>Username</label>
        <input
          type="text"
          value={userInput.username}
          name="username"
          onChange={handleChange}
        ></input>
        <label>Email</label>
        <input
          type="text"
          value={userInput.email}
          name="email"
          onChange={handleChange}
        ></input>
        <label>Organization</label>
        <input
          type="text"
          value={userInput.organization}
          name="organization"
          onChange={handleChange}
        ></input>
        <label>Password</label>
        <input
          type="password"
          value={userInput.password}
          name="password"
          onChange={handleChange}
        ></input>
        <label>Confirm Password</label>
        <input
          type="password"
          value={userInput.confirmPwd}
          name="confirmPwd"
          onChange={handleChange}
        ></input>
        <label>
          <input
            type="checkbox"
            name="isAdmin"
            checked={userInput.isAdmin}
            value={userInput.isAdmin}
            onChange={handleChange}
          ></input>
          Admin User
        </label>
        <br />
        <button type="submit">ADD NEW USER</button>
      </form>
      <div>
        Already have an account?
        <Link to="/login">
          <span>Login</span>
        </Link>
      </div>
    </div>
  );
};

export default CreateUser;
