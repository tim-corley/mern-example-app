import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import Button from "./Button";
import { useHistory } from "react-router-dom";
import ValidationErr from "./ValidationErr";

const ADD_BUG = gql`
  mutation AddBug(
    $title: String!
    $description: String!
    $platform: String!
    $severity: Int!
    $releaseBlocker: Boolean!
  ) {
    addBug(
      title: $title
      description: $description
      platform: $platform
      severity: $severity
      releaseBlocker: $releaseBlocker
    ) {
      id
      title
      description
      platform
      severity
      releaseBlocker
      createdAt
    }
  }
`;

const AddBug = ({ errorInfo }) => {
  const initialState = {
    title: "",
    description: "",
    platform: "",
    severity: 0,
    releaseBlocker: false,
  };
  const history = useHistory();
  const [bugData, setBugData] = useState(initialState);
  const [alerts, setAlerts] = useState({ error: false, messages: [] });
  const [addBug, { loading }] = useMutation(ADD_BUG, {
    onCompleted: (data) => {
      console.log("new bug report created.", data);
      history.push("/bugs");
    },
    onError: (error) => {
      console.error(error);
      console.error(errorInfo);
      setAlerts({ error: true, messages: errorInfo });
    },
  });

  if (loading) {
    console.log("loading");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type == "number") {
      const intValue = parseInt(value);
      setBugData((prevState) => ({
        ...prevState,
        [name]: intValue,
      }));
    } else if (name == "releaseBlocker") {
      const boolValue = value === "true";
      setBugData((prevState) => ({
        ...prevState,
        [name]: boolValue,
      }));
    } else {
      setBugData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const sumbitBug = (e) => {
    e.preventDefault();
    const { title, description, platform, severity, releaseBlocker } = bugData;
    addBug({
      variables: {
        title,
        description,
        platform,
        severity,
        releaseBlocker,
      },
    });
  };

  return (
    <main>
      <div
        className="relative pt-16 pb-32 flex content-center items-center justify-center"
        style={{
          minHeight: "75vh",
        }}
      >
        <div className="absolute top-0 w-full h-full bg-center bg-cover bg-gradient-to-b from-primary to-secondary"></div>
        <section className="z-10 w-full lg:w-3/4 h-full mx-4">
          <div className="mt-10 lg:m-10 lg:p-6 flex justify-center">
            <div className="relative flex flex-col min-w-0 break-words w-full lg:w-3/4 mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-gray-500 text-center my-3 font-bold">
                  <small>Create a New Bug Report</small>
                </div>
                <form onSubmit={sumbitBug}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="title"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      required
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                      style={{ transition: "all .15s ease" }}
                      value={bugData.title}
                      name="title"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="lg:flex flex-row">
                    <div className="relative lg:mr-2 mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="title"
                      >
                        Platform
                      </label>
                      <select
                        type="text"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                        style={{ transition: "all .15s ease" }}
                        value={bugData.platform}
                        name="platform"
                        onChange={handleChange}
                      >
                        <option></option>
                        <option>Web (Desktop & mWeb)</option>
                        <option>Desktop Web Only</option>
                        <option>Mobile Web Only</option>
                        <option>Native Mobile (iOS & Android)</option>
                        <option>iOS Only</option>
                        <option>Android Only</option>
                      </select>
                    </div>
                    <div className="relative lg:ml-2 mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="title"
                      >
                        Severity
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="5"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline"
                        style={{ transition: "all .15s ease" }}
                        value={bugData.severity}
                        name="severity"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="description"
                    >
                      Description
                    </label>
                    <textarea
                      type="textarea"
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                      style={{ transition: "all .15s ease" }}
                      value={bugData.description}
                      name="description"
                      onChange={handleChange}
                      rows={5}
                    />
                  </div>
                  <div className="block uppercase text-gray-700 text-xs font-bold mb-2">
                    Release Blocker?
                  </div>
                  <div className="flex flex-col">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="releaseBlocker"
                        className="mr-1 w-5 h-5"
                        value="false"
                        checked={bugData.releaseBlocker === false}
                        onChange={handleChange}
                      ></input>
                      NO
                    </label>
                    <label className="inline-flex items-center my-2">
                      <input
                        type="radio"
                        name="releaseBlocker"
                        className="mr-1 w-5 h-5"
                        value="true"
                        checked={bugData.releaseBlocker === true}
                        onChange={handleChange}
                      ></input>
                      YES
                    </label>
                  </div>
                  <Button label={"Create New Bug"} />
                </form>
              </div>
            </div>
          </div>
          {alerts.error ? (
            <ValidationErr alerts={alerts.messages} />
          ) : (
            <div></div>
          )}
        </section>
      </div>
    </main>
  );
};

export default AddBug;
