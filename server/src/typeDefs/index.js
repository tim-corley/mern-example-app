import { query } from "./query";
import { mutation } from "./mutation";
import { deleteRes } from "./deleteRes";
import { types } from "./types/index";

const typeDefs = [query, mutation, deleteRes, types];

export { typeDefs };
