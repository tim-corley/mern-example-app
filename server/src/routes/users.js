import express from "express";

const UserRoute = express.Router();

UserRoute.get("/", (req, res) => {
  res.send("User Profile Page");
});

UserRoute.get("/edit", (req, res) => {
  res.send("Edit Profile Info");
});

export default UserRoute;
