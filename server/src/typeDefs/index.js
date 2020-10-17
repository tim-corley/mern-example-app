import { query } from "./query";
import { mutation } from "./mutation";
import { userType, bugType } from "./types/index";

const typeDefs = [query, mutation, userType, bugType];

export { typeDefs };
