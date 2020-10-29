import { ApolloError } from "apollo-server-express";
import { GraphQLDateTime } from "graphql-iso-date";
import { User } from "../models/User.model";
import { userFunctions } from "../functions/userFunctions";

const usersResolvers = {
  Date: GraphQLDateTime,
  Query: {
    // protected query example
    demo: async (_, { email }, context) => {
      if (!context.isAuth) {
        throw new Error("Cannot Access Without Valid Token!");
      }
      console.log(context);
      return await User.findOne({ email });
    },
    users: async () => {
      return await User.find({});
    },
    loginUser: async (_, { email, password }) => {
      try {
        let user = await User.findOne({ email });
        if (!user) throw new Error("Email not found.");
        let isMatch = await user.validatePassword(password);
        if (!isMatch) throw new Error("Invalid Password");
        user = userFunctions.serializeUser(user);
        let token = userFunctions.issueToken(user);
        return { user, token };
      } catch (err) {
        throw new ApolloError(err.message, 403);
      }
    },
  },
  Mutation: {
    createUser: async (
      _,
      { firstName, lastName, username, email, organization, password, isAdmin }
    ) => {
      try {
        let user;
        user = await User.findOne({ username });
        if (user) throw new Error("This username is already taken.");
        user = await User.findOne({ email });
        if (user)
          throw new Error("This email address belongs to an existing user.");
        user = await User.create({
          firstName,
          lastName,
          username,
          email,
          organization,
          password,
          isAdmin,
        });
        // issue json web token
        let serializedUser = userFunctions.serializeUser(user);
        let token = userFunctions.issueToken(serializedUser);
        return { user, token };
      } catch (err) {
        throw new ApolloError(err.message, 400);
      }
    },
  },
};

export { usersResolvers };
