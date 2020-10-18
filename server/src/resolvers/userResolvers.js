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
    createUser: async (_, { username }) => {
      let userData = await User.create({ username });
      return userData;
    },
  },
};

export { usersResolvers };
