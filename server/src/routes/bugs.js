import express from "express";

const BugRoute = express.Router();

BugRoute.get("/", (req, res) => {
  res.send("New Bug Landing Page");
});

BugRoute.get("/create", (req, res) => {
  res.send("Create New Bug Report");
});

export default BugRoute;
