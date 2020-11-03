require("dotenv").config({ path: require("find-config")(".env") });
import { sign } from "jsonwebtoken";
import { pick } from "lodash";

const userFunctions = {
  inputValidation: ({ username, email, password, confirmPwd }) => {
    const errors = {};
    if (username.trim() === "") {
      errors.username = "Please provide a valid username.";
    }
    if (email.trim() === "") {
      errors.email = "Please provide an email address.";
    } else {
      const emailRegEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
      if (!email.match(emailRegEx)) {
        errors.email = "Provided email is not a valid address.";
      }
    }
    if (password === "") {
      errors.password = "Password cannot be empty";
    } else if (password !== confirmPwd) {
      errors.confirmPwd = "The passwords do not match.";
    }
    return {
      errors,
      valid: Object.keys(errors) < 1,
    };
  },
  issueToken: (user) => {
    let token = sign({ user }, process.env.SECRET, { expiresIn: "24h" });
    return `Bearer ${token}`;
  },
  serializeUser: (user) =>
    pick(user, [
      "id",
      "firstName",
      "lastName",
      "username",
      "email",
      "organization",
      "isAdmin",
      "createdAt",
    ]),
};

export { userFunctions };
