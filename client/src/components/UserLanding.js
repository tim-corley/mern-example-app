import React from "react";
import UserList from "./UserList";
import { Link } from "react-router-dom";
import logo from "../assets/jar.png";

const UserLanding = () => {
  return (
    <div className="flex flex-col my-20 m-auto w-1/2 py-10 shadow-md">
      <div className="flex m-6 justify-center">
        <div className="mt-6 text-2xl">Glass Jar</div>
        <img src={logo} className="transform rotate-6 h-20" />
      </div>
      <div className="flex m-auto w-3/4 justify-center">
        <Link to="/login">
          <button className="bg-secondary text-bright p-4 text-xl mx-4 rounded-sm flex ">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="bg-secondary text-bright p-4 text-xl mx-4 rounded-sm flex">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserLanding;
