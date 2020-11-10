import { GraphQLDateTime } from "graphql-iso-date";
import { Bug } from "../models/Bug.model";

const bugsResolvers = {
  Date: GraphQLDateTime,
  Query: {
    bugs: async () => {
      return await Bug.find({});
    },
    bugDetails: async (_, { id }) => {
      return await Bug.findById(id);
    },
  },
  Mutation: {
    addBug: async (
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
    editBug: async (
      _,
      { id, title, description, platform, severity, releaseBlocker }
    ) => {
      let bug = await Bug.findById(id);
      if (!bug) {
        throw new Error(`\n ❗ Unable to find bug with ID: ${id}`);
      }
      // PARTIAL UPDATES
      if (title !== undefined) {
        bug.title = title;
      }
      if (description !== undefined) {
        bug.description = description;
      }
      if (platform !== undefined) {
        bug.platform = platform;
      }
      if (severity !== undefined) {
        bug.severity = severity;
      }
      if (releaseBlocker !== undefined) {
        bug.releaseBlocker = releaseBlocker;
      }
      const updatedBug = await Bug.findByIdAndUpdate(id, bug, { new: true });
      return updatedBug;
    },
    // TODO: check for approach to confirm deletion
    deleteBug: async (_, { id }) => {
      const result = await Bug.findByIdAndDelete(id);
      const deleteDone = Boolean(result);
      return { deleteDone };
    },
  },
};

export { bugsResolvers };
