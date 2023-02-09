import { type NextPage } from "next";
import React from "react";

import { Header, StudyTable, Wrapper } from "../../components";
import { api } from "../../utils/api";

const Studies: NextPage = () => {

  const { data } = api.study.getAll.useQuery();

  return (
    <>
      <Header />
      <Wrapper className="py-14">
        <h1 className="h1 mb-12">All studies</h1>
        <StudyTable data={ data } />
      </Wrapper>
    </>
  );
};

export default Studies;
