import { GraphQLDateTime } from "graphql-iso-date";
import User from "../models/User.model";

const usersResolvers = {
  Date: GraphQLDateTime,
  Query: {
    users: async () => {
      return await User.find({});
    },
  },
};

export { usersResolvers };
