import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

const BugOverview = (data) => {
  const { id, title, platform, severity, releaseBlocker } = data.bug;
  return (
    <div className="flex mb-8 shadow-lg rounded-lg bg-gray-300 border-0">
      <div className="my-4 mx-2 p-2">
        <div className="text-xl">{title}</div>
        <div className="flex flex-row">
          <div className="mr-2">
            <span className="font-bold">PLATFORM:</span> {platform}
          </div>
          <div className="mr-2">
            <span className="font-bold">SEVERITY:</span> {severity}
          </div>
          <div className="mr-2">
            <span className="font-bold">RELEASE BLOCKER:</span>{" "}
            {releaseBlocker.toString()}
          </div>
        </div>
        <Link to={`/details/${id}`}>
          <Button label={"View Details"} />
        </Link>
      </div>
    </div>
  );
};

export default BugOverview;
