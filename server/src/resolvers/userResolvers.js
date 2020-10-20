import { GraphQLDateTime } from "graphql-iso-date";
import { User } from "../models/User.model";

const usersResolvers = {
  Date: GraphQLDateTime,
  Query: {
    users: async () => {
      return await User.find({});
    },
  },
  Mutation: {
    createUser: async (
      _,
      { firstName, lastName, username, organization, password, isAdmin }
    ) => {
      let userData = await User.create({
        firstName,
        lastName,
        username,
        organization,
        password,
        isAdmin,
      });
      return userData;
    },
  },
};

export { usersResolvers };
