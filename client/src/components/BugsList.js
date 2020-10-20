import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_BUGS = gql`
  query {
    bugs {
      id
      title
      description
      platform
      severity
      releaseBlocker
    }
  }
`;

const BugsList = () => {
  const { loading, error, data } = useQuery(GET_BUGS);

  if (loading) return <p>Loading Bugs...</p>;
  if (error) return <p>Oops! Something went wrong.</p>;
  return data.bugs.map(
    ({ id, title, description, platform, severity, releaseBlocker }) => (
      <div key={id}>
        <div>{title}</div>
        <div>{description}</div>
        <div>{platform}</div>
        <div>{severity}</div>
        <div>Blocker: {releaseBlocker.toString()}</div>
      </div>
    )
  );
};

export default BugsList;
