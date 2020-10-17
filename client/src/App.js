import React from "react";
import "./styles.css";

const App = () => {
  return (
    <div className="bg-gray-200 my-10">
      <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-2xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-3xl sm:leading-10">
          Welcome to a super simple React Application!
          <br />
          <span className="text-indigo-600 text-xl font-bold">
            Use this starter project to quickly get started with a new React
            project.
          </span>
        </h2>
        <div className="mt-8 flex lg:flex-shrink-0 lg:mt-0">
          <div className="inline-flex rounded-md shadow">
            <a
              href="https://github.com/tim-corley/javascript-concepts/tree/master/React/scratch-starter-app"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
            >
              Code
            </a>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <a
              href="https://github.com/tim-corley/foamy/blob/master/javascript-concepts/react/react-app-starter.md"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-600 bg-white hover:text-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
            >
              Notes
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
