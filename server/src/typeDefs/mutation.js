import { gql } from "apollo-server-express";

const mutation = gql`
  type Mutation {
    createBug(
      title: String!
      description: String!
      platform: String!
      severity: Int!
      releaseBlocker: Boolean!
    ): Bug!
    createUser(username: String!): User!
  }
`;

export { mutation };
