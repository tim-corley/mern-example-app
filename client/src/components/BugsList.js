import React, { useEffect } from "react";
import axios from "axios";

const BugsList = () => {
  useEffect(() => {
    axios
      .get("http://localhost:3000/bugs")
      .then((res) => console.log(res.data));
  });
  return (
    <div>
      <p>this is the bugs list component</p>
    </div>
  );
};

export default BugsList;
