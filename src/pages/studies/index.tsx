import { type NextPage } from "next";
import React from "react";

import { Header, StudyList, Wrapper } from "../../components";

const Studies: NextPage = () => {

  return (
    <>
      <Header />
      <Wrapper className="py-14">
        <h1 className="h1 mb-12">All studies</h1>
        <StudyList />
      </Wrapper>
    </>
  );
};

export default Studies;
