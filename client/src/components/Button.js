import React from "react";

const Button = ({ label }) => {
  return (
    <button className="w-full transition-all duration-500 ease-in bg-accent uppercase text-light font-semibold py-3 px-6 rounded hover:shadow-lg my-8 outline-none focus:outline-none">
      {label}
    </button>
  );
};

export default Button;
