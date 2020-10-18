import { gql } from "apollo-server-express";

const userType = gql`
  scalar Date
  type User {
    id: ID!
    username: String!
    createdAt: Date
  }
`;

export { userType };
