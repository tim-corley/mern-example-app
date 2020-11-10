import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { Context } from "../context/authContext";

const GET_DETAILS = gql`
  query BugDetails($id: ID!) {
    bugDetails(id: $id) {
      title
      description
      platform
      severity
      releaseBlocker
      createdAt
      updatedAt
    }
  }
`;

const BugDetails = () => {
  const [userInfo, setUserInfo, login, logout] = useContext(Context);
  let { id } = useParams();
  const { loading, error, data } = useQuery(GET_DETAILS, {
    variables: { id },
  });

  if (loading) return <p>Loading Bug Details...</p>;
  if (error) return <p>Oops! Something went wrong.</p>;
  return (
    <main>
      <div
        className="relative flex content-center items-center justify-center"
        style={{
          minHeight: "75vh",
        }}
      >
        <div className="w-full h-screen bg-center bg-cover bg-primary">
          <div className="my-32 mx-2 flex justify-center">
            <div className="w-full lg:w-1/2">
              <div className="flex mb-8 shadow-lg rounded-lg bg-gray-300 border-0">
                {userInfo.user ? (
                  <div className="my-4 mx-2 p-2">
                    <div className="text-xl">{data.bugDetails.title}</div>
                    <div className="text-md my-2">
                      {data.bugDetails.description}
                    </div>
                    <div className="flex flex-row">
                      <div className="mr-2">
                        <span className="font-bold">PLATFORM:</span>{" "}
                        {data.bugDetails.platform}
                      </div>
                      <div className="mr-2">
                        <span className="font-bold">SEVERITY:</span>{" "}
                        {data.bugDetails.severity}
                      </div>
                      <div className="mr-2">
                        <span className="font-bold">RELEASE BLOCKER:</span>{" "}
                        {data.bugDetails.releaseBlocker.toString()}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="my-4 mx-2 p-2">
                    <div className="text-xl">Login Required</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BugDetails;
