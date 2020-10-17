import { gql } from "apollo-server-express";

const bugType = gql`
  scalar Date
  type Bug {
    id: ID!
    title: String!
    description: String!
    platform: String!
    severity: Int!
    releaseBlocker: Boolean!
    createdAt: Date
  }
`;

module.exports = {
  bugType,
};
