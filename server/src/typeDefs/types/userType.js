import { gql } from "apollo-server-express";

const userType = gql`
  scalar Date
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    username: String!
    organization: String!
    password: String!
    isAdmin: Boolean!
    createdAt: Date
  }
`;

export { userType };
