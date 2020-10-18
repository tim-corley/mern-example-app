// unable to find way to avoid Error: There can be only one type named "Date".
// when trying to use scalar Date in multiple files
//TODO: see if federation can solve - https://www.apollographql.com/docs/federation/value-types/
import { gql } from "apollo-server-express";

const types = gql`
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
  type User {
    id: ID!
    username: String!
    createdAt: Date
  }
`;

export { types };
