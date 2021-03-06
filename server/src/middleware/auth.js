require("dotenv").config({ path: require("find-config")(".env") });
import { User } from "../models/User.model";
import { verify } from "jsonwebtoken";

const AuthMiddleware = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    console.log("NO AUTH HEADER ON THE REQUEST");
    return next();
  }
  // extract token
  let token = authHeader.split(" ")[1];
  if (!token || token === "") {
    req.isAuth = false;
    console.log("NO AUTH TOKEN FOUND");
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
    return next();
  }
  // find user from db
  let authUser = await User.findById(decodedToken.user.id);
  if (!authUser) {
    req.isAuth = false;
    console.log("USER NOT IN DB");
    return next();
  }
  req.user = authUser;
  req.isAuth = true;
  console.log("AUTHORIZED USER MADE REQUEST");
  return next();
};

export default AuthMiddleware;
