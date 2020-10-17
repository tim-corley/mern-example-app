import { gql } from "apollo-server-express";

const query = gql`
  type Query {
    bugs: [Bug]
    users: [User]
  }
`;

export { query };
