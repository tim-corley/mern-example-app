import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Context } from "../context/authContext";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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

const DELETE_BUG = gql`
  mutation DeleteBug($id: ID!) {
    deleteBug(id: $id) {
      deleteDone
    }
  }
`;

const BugDetails = () => {
  let { id } = useParams();
  const history = useHistory();
  const [userInfo, setUserInfo, login, logout] = useContext(Context);
  const { loading, error, data } = useQuery(GET_DETAILS, {
    variables: { id },
  });
  const [deleteBug] = useMutation(DELETE_BUG, {
    onCompleted: () => {
      console.log("BUG DELETED.");
      history.push("/bugs");
    },
    onError: (error) => {
      console.error("ERR: ", error);
    },
  });

  const submitDelete = (e) => {
    e.preventDefault();
    deleteBug({
      variables: {
        id,
      },
    });
  };

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
                  <div className="flex flex-row w-full">
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
                    <div className="m-auto h-full flex">
                      <div
                        onClick={submitDelete}
                        className="text-white p-3 text-center cursor-pointer inline-flex items-center justify-center w-12 h-12 mb-auto mt-auto shadow-lg rounded-full bg-red-400"
                      >
                        <FontAwesomeIcon icon={faTrash} />
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
