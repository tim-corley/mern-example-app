import React from "react";
import NewLogin from "../NewLogin";

const UserLanding = ({ errorInfo }) => {
  return (
    <>
      <main>
        <div
          className="relative pt-16 pb-32 flex content-center items-center justify-center"
          style={{
            minHeight: "75vh",
          }}
        >
          <div className="absolute top-0 w-full h-full bg-center bg-cover bg-gradient-to-b from-primary to-secondary"></div>
          <section className="w-full h-full">
            <div className="container mx-auto px-4 h-full">
              <div className="flex content-center items-center justify-center h-full my-24">
                <NewLogin errorInfo={errorInfo} />
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default UserLanding;
