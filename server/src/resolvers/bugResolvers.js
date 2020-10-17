import { GraphQLDateTime } from "graphql-iso-date";
import Bug from "../models/Bug.model";

const bugsResolvers = {
  Date: GraphQLDateTime,
  Query: {
    bugs: async () => {
      return await Bug.find({});
    },
  },
};

export { bugsResolvers };
