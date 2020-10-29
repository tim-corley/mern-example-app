import { gql } from "apollo-server-express";

const authRes = gql`
  type AuthResponse {
    user: UserResp!
    token: String!
    tokenExp: Int
  }
`;

export { authRes };
