import { gql } from "apollo-server-express";

const userType = gql`
  type User {
    id: ID!
    username: String!
  }
`;

module.exports = {
  userType,
};
