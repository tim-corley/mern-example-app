import { query } from "./query";
import { mutation } from "./mutation";
import { types } from "./types/index";

const typeDefs = [query, mutation, types];

export { typeDefs };
