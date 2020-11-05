import React from "react";
import NewLogin from "../NewLogin";
import NewRegister from "../NewRegister";

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
          <section className="z-10 lg:grid lg:grid-cols-2 w-full lg:w-3/4 h-full mx-4">
            <div className="grid-span-1 container mx-auto px-4 h-full">
              <div className="mt-8 lg:mt-20 ml-6 text-sm lg:text-lg text-accent">
                Existing User? Sign In...
              </div>
              <div className="flex content-center justify-center items-start h-full mt-10">
                <NewLogin errorInfo={errorInfo} />
              </div>
            </div>
            <div className="grid-span-1 container mx-auto px-4 h-full">
              <div className="mt-8 lg:mt-20 ml-6 text-sm lg:text-lg text-accent">
                Don't Have An Account Yet? Please Register...
              </div>
              <div className="flex content-center justify-center items-start h-full mt-10">
                <NewRegister errorInfo={errorInfo} />
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default UserLanding;
