require("dotenv").config({ path: require("find-config")(".env") });
import { sign } from "jsonwebtoken";
import { pick } from "lodash";

const userFunctions = {
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
