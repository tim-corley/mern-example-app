import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minlength: 2,
    },
    lastName: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minlength: 2,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    organization: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minlength: 8,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
