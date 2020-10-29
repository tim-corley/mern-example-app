import React from "react";
import UserList from "./UserList";
import { Link } from "react-router-dom";

const UserLanding = () => {
  return (
    <div>
      <div>Welcome</div>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/register">
        <button>Register</button>
      </Link>
      <UserList />
    </div>
  );
};

export default UserLanding;
