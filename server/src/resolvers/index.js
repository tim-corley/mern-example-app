import { bugsResolvers } from "./bugResolvers";
import { usersResolvers } from "./userResolvers";

const resolvers = [bugsResolvers, usersResolvers];

export { resolvers };
