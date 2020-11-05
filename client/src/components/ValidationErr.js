import React from "react";

const ValidationErr = ({ alerts }) => {
  console.log(alerts);
  console.log(typeof alerts);
  return (
    <div>
      {Array.isArray(alerts) ? (
        alerts.map((alert, index) => (
          <div key={index} className="flex justify-center">
            <div className="w-3/4 my-2 rounded border-2 border-accent bg-accent bg-opacity-25">
              <div className="text-accent my-4 mx-2">{alert}</div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center">
          <div className="w-3/4 my-2 rounded border-2 border-accent bg-accent bg-opacity-25">
            <div className="text-accent my-4 mx-2">{alerts}</div>
          </div>
        </div>
      )}
    </div>
  );
};

//   alerts.map((alert, index) => (
//     <div key={index} className="flex justify-center">
//       <div className="w-3/4 my-2 rounded border-2 border-accent bg-accent bg-opacity-25">
//         <div className="text-accent my-4 mx-2">{alert}</div>
//       </div>
//     </div>
//   ));

export default ValidationErr;
