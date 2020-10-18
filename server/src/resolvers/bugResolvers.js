import { GraphQLDateTime } from "graphql-iso-date";
import { Bug } from "../models/Bug.model";

const bugsResolvers = {
  Date: GraphQLDateTime,
  Query: {
    bugs: async () => {
      return await Bug.find({});
    },
  },
  // TODO: add create createBug mutation resolver
  Mutation: {
    createBug: async (
      _,
      { title, description, platform, severity, releaseBlocker }
    ) => {
      let bugData = await Bug.create({
        title,
        description,
        platform,
        severity,
        releaseBlocker,
      });
      return bugData;
    },
  },
};

export { bugsResolvers };
