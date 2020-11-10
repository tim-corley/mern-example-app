import { gql } from "apollo-server-express";

const query = gql`
  type Query {
    bugs: [Bug]
    bugDetails(id: ID!): Bug!
    users: [UserResp]
    currentUser(email: String!): UserResp!
    loginUser(email: String!, password: String!): UserAuth!
  }
`;

export { query };
