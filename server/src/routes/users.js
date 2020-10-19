import express from "express";
import { User } from "../models/User.model";

const UserRoute = express.Router();

UserRoute.get("/", async (req, res, next) => {
  try {
    const users = await User.find();
    console.log("\n ⛱  Fetched all users");
    res.json(users);
  } catch (error) {
    console.log("\n ❗ Error fetching users\n", error);
    return next(error);
  }
});

UserRoute.post("/add", async (req, res, next) => {
  try {
    const username = req.body.username;
    const newUser = new User({ username });
    const data = await newUser.save();
    console.log("\n 👋 New User Added");
    res.json(`Successfully created. Welcome ${data.username}!`);
  } catch (error) {
    console.log("\n ❗ Error adding new user\n", error);
    return next(error);
  }
});

export default UserRoute;
