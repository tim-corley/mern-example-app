import { query } from "./query";
import { mutation } from "./mutation";
import { deleteRes } from "./deleteRes";
import { authRes } from "./authRes";
import { types } from "./types/index";

const typeDefs = [query, mutation, deleteRes, authRes, types];

export { typeDefs };
