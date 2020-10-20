import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

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

const AddBug = () => {
  const initialState = {
    title: "",
    description: "",
    platform: "",
    severity: 0,
    releaseBlocker: false,
  };
  const [bugData, setBugData] = useState(initialState);
  const [addBug] = useMutation(ADD_BUG);

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
    console.log("\n 📬 SENDING NEW BUG DATA TO SERVER...");
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
    console.log("\n ✅ SUCCESS!");
  };

  return (
    <div className="m-10 p-6 border-dashed border-2 border-dark">
      <form onSubmit={sumbitBug}>
        <label>Title</label>
        <input
          type="text"
          required
          value={bugData.title}
          name="title"
          onChange={handleChange}
        ></input>
        <label>Description</label>
        <input
          type="text"
          value={bugData.description}
          name="description"
          onChange={handleChange}
        ></input>
        <label>Platform</label>
        <input
          type="text"
          value={bugData.platform}
          name="platform"
          onChange={handleChange}
        ></input>
        <label>Severity (1-5)</label>
        <input
          type="number"
          value={bugData.severity}
          name="severity"
          onChange={handleChange}
        ></input>
        <div>Release Blocker?</div>
        <label>
          <input
            type="radio"
            name="releaseBlocker"
            value="false"
            checked={bugData.releaseBlocker === false}
            onChange={handleChange}
          ></input>
          NO
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="releaseBlocker"
            value="true"
            checked={bugData.releaseBlocker === true}
            onChange={handleChange}
          ></input>
          YES
        </label>
        <br />
        <button type="submit">CREATE</button>
      </form>
    </div>
  );
};

export default AddBug;
