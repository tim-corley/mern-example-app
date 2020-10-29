import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const CREATE_USER = gql`
  mutation CreateUser(
    $firstName: String!
    $lastName: String!
    $username: String!
    $email: String!
    $organization: String!
    $password: String!
    $isAdmin: Boolean!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      organization: $organization
      password: $password
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

const CreateUser = () => {
  const initialState = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    organization: "",
    password: "",
    isAdmin: false,
  };

  const [userData, setUserData] = useState(initialState);
  const [createUser, { loading, error, data }] = useMutation(CREATE_USER);

  if (data) {
    console.log("DATA: ", data);
  }

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name == "isAdmin") {
      setUserData((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else {
      setUserData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const sumbitUser = (e) => {
    e.preventDefault();
    console.log("\n 📬 SENDING NEW USER DATA TO SERVER...");
    const {
      firstName,
      lastName,
      username,
      email,
      organization,
      password,
      isAdmin,
    } = userData;
    createUser({
      variables: {
        firstName,
        lastName,
        username,
        email,
        organization,
        password,
        isAdmin,
      },
    });
    console.log("\n ✅ SUCCESS!");
    setUserData(initialState);
  };

  return (
    <div className="m-10 p-6 border-dashed border-2 border-dark">
      <div>PLEASE CREATE A NEW USER</div>
      <form onSubmit={sumbitUser}>
        <label>First Name</label>
        <input
          type="text"
          required
          value={userData.firstName}
          name="firstName"
          onChange={handleChange}
        ></input>
        <label>Last Name</label>
        <input
          type="text"
          value={userData.lastName}
          name="lastName"
          onChange={handleChange}
        ></input>
        <label>Username</label>
        <input
          type="text"
          value={userData.username}
          name="username"
          onChange={handleChange}
        ></input>
        <label>Email</label>
        <input
          type="text"
          value={userData.email}
          name="email"
          onChange={handleChange}
        ></input>
        <label>Organization</label>
        <input
          type="text"
          value={userData.organization}
          name="organization"
          onChange={handleChange}
        ></input>
        <label>Password</label>
        <input
          type="password"
          value={userData.password}
          name="password"
          onChange={handleChange}
        ></input>
        <label>
          <input
            type="checkbox"
            name="isAdmin"
            checked={userData.isAdmin}
            value={userData.isAdmin}
            onChange={handleChange}
          ></input>
          Admin User
        </label>
        <br />
        <button type="submit">ADD NEW USER</button>
      </form>
    </div>
  );
};

export default CreateUser;
