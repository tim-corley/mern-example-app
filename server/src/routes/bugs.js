import express from "express";
import { Bug } from "../models/Bug.model";

const BugRoute = express.Router();

BugRoute.get("/", async (req, res, next) => {
  try {
    const bugs = await Bug.find();
    console.log("\n 🔎 Fetched all bugs");
    res.json(bugs);
  } catch (error) {
    console.log("\n ❗ Error fetching bugs\n", error);
    return next(error);
  }
});

BugRoute.get("/:id", async (req, res, next) => {
  try {
    const bug = await Bug.findById(req.params.id);
    console.log(`\n 🔎 Fetched bug w/ ID: ${req.params.id}`);
    res.json(bug);
  } catch (error) {
    console.log("\n ❗ Error fetching bug\n", error);
    return next(error);
  }
});

BugRoute.post("/add", async (req, res, next) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const platform = req.body.platform;
    const severity = Number(req.body.severity);
    const releaseBlocker = Boolean(req.body.releaseBlocker);
    const newBug = new Bug({
      title,
      description,
      platform,
      severity,
      releaseBlocker,
    });
    await newBug.save();
    console.log("\n 🐛 New Bug Added");
    res.json("New Bug Successfully Added");
  } catch (error) {
    console.log("\n ❗ Error adding new bug\n", error);
    return next(error);
  }
});

BugRoute.delete("/:id", async (req, res, next) => {
  try {
    await Bug.findByIdAndDelete(req.params.id);
    console.log(`\n 🔎 Deleted bug [ID: ${req.params.id}]`);
    res.json("Successfully Deleted Bug");
  } catch (error) {
    console.log("\n ❗ Error deleting bug\n", error);
    return next(error);
  }
});

BugRoute.post("/update/:id", async (req, res, next) => {
  try {
    const bugUpdate = {
      title: req.body.title,
      description: req.body.description,
      platform: req.body.platform,
      severity: req.body.severity,
      releaseBlocker: req.body.releaseBlocker,
    };
    await Bug.findByIdAndUpdate(req.params.id, bugUpdate);
    console.log(`\n 🔎 Updated bug [ID: ${req.params.id}]`);
    res.json("Bug Successfully Updated");
  } catch (error) {
    console.log("\n ❗ Error updating bug\n", error);
    return next(error);
  }
});

export default BugRoute;
