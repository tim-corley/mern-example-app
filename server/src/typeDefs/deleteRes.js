import { gql } from "apollo-server-express";

const deleteRes = gql`
  type DeleteResponse {
    deleteDone: Boolean!
  }
`;

export { deleteRes };
