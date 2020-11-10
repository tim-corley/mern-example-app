import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { isEmail } from "validator";

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
    email: {
      type: String,
      required: true,
      validate: [isEmail, "invalid email address"],
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

userSchema.pre("save", async function (next) {
  const user = this;
  // if password field is being touched, hash the contents
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});
// check input value (plain text) vs. db field (hash)
userSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};

export const User = mongoose.model("User", userSchema);
