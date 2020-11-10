require("dotenv").config({ path: require("find-config")(".env") });
import { User } from "../models/User.model";
import { verify } from "jsonwebtoken";

const AuthMiddleware = async (req, res, next) => {
  let testing = process.env.SECRET;
  console.log("KEY: ", testing);
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    console.log("No Auth Header");
    return next();
  }
  // extract token
  let token = authHeader.split(" ")[1];
  console.log("TOKEN: ", token);
  if (!token || token === "") {
    req.isAuth = false;
    console.log("No Token");
    return next();
  }
  // verify token
  let decodedToken;
  try {
    decodedToken = verify(token, process.env.SECRET);
  } catch (err) {
    req.isAuth = false;
    console.log(err);
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    console.log("AUTHORIZED?  ", req.isAuth);
    return next();
  }
  // find user from db
  let authUser = await User.findById(decodedToken.user.id);
  if (!authUser) {
    req.isAuth = false;
    console.log("NO USER...");
    return next();
  }
  req.user = authUser;
  req.isAuth = true;
  console.log("AUTHORIZED?  ", req.isAuth);
  console.log("TEST", decodedToken);
  return next();
};

export default AuthMiddleware;
