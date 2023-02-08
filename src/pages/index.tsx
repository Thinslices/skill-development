import { type NextPage } from "next";
import { signIn } from "next-auth/react";
import React from "react";
import { Buttons, Button, Header, Wrapper } from "../components";

const Home: NextPage = () => {

  return (
    <>
      <Header />
      <Wrapper className="py-14">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="h1">Share your knowledge</h1>
            <p>Share the knowledge you gathered on a skill by creating a study comprised of a series questions and answers on the subject, or browser and read studies created by your peers.</p>
          </div>
          <Buttons>
          <Button style="tertiary" onClick={ () => void signIn( 'google' ) }>Sign in</Button>
          </Buttons>
        </div>
      </Wrapper>
    </>
  );
};

export default Home;
