import { gql } from "apollo-server-express";

const mutation = gql`
  type Mutation {
    addBug(
      title: String!
      description: String!
      platform: String!
      severity: Int!
      releaseBlocker: Boolean!
    ): Bug!
    editBug(
      id: ID!
      title: String
      description: String
      platform: String
      severity: Int
      releaseBlocker: Boolean
    ): BugUpdate!
    deleteBug(id: ID!): BugDelete!
    createUser(
      firstName: String!
      lastName: String!
      username: String!
      email: String!
      organization: String!
      password: String!
      isAdmin: Boolean!
    ): UserAuth!
  }
`;

export { mutation };
