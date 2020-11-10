import React, { useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import BugOverview from "./BugOverview";
import { Context } from "../context/authContext";

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
  const [userInfo, setUserInfo, login, logout] = useContext(Context);
  console.log(userInfo);
  const { loading, error, data } = useQuery(GET_BUGS);

  if (loading) return <p>Loading Bugs...</p>;
  if (error) return <p>Oops! Something went wrong.</p>;
  return (
    <main>
      <div
        className="relative flex content-center items-center justify-center"
        style={{
          minHeight: "75vh",
        }}
      >
        <div className="w-full h-full bg-center bg-cover bg-primary">
          <div className="my-32 mx-2 flex justify-center">
            <div className="w-full lg:w-1/2">
              {data.bugs.map((bug) => (
                <BugOverview key={bug.id} bug={bug} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BugsList;
