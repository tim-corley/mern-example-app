import { gql } from "apollo-server-express";

const query = gql`
  type Query {
    bugs: [Bug]
    users: [UserResp]
    demo(email: String!): UserResp!
    loginUser(email: String!, password: String!): UserAuth!
  }
`;

export { query };
