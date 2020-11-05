import React from "react";

const Button = ({ label }) => {
  return (
    <button className="bg-accent text-xl text-light font-semibold py-2 px-4 rounded shadow my-8">
      {label}
    </button>
  );
};

export default Button;
