import { type NextPage } from "next";
import React from "react";
import { Authorize, Header, Wrapper } from "../components";

const Home: NextPage = () => {

  return (
    <>
      <Header />
      <Wrapper className="py-14">
        <Authorize>
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="h1">Welcome</h1>
              <p>Share the knowledge you gathered on a skill by creating a study comprised of a series questions and answers on the subject, or browser and read studies created by your peers.</p>
            </div>
          </div>
        </Authorize>
      </Wrapper>
    </>
  );
};

export default Home;
