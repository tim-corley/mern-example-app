import React from "react";
import { useQuery, gql } from "@apollo/client";

// TODO: add to /user route
// user page should: show list of all user for an org (accordian)
// create new user w/ modal prompt
// abilty to delete a user

const GET_USERS = gql`
  query {
    users {
      id
      username
      email
      isAdmin
    }
  }
`;

const UserList = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading Users...</p>;
  if (error) return <p>Oops! Something went wrong.</p>;
  return data.users.map(({ id, username, email, isAdmin }) => (
    <div key={id}>
      <div>{username}</div>
      <div>{email}</div>
      <div>Admin? {isAdmin.toString()}</div>
    </div>
  ));
};

export default UserList;
