import { type NextPage } from "next";

import { Layout, StudyTable } from "../../components";
import { api } from "../../utils/api";

const Studies: NextPage = () => {

  const { data } = api.study.getAll.useQuery();

  return (
    <Layout>
      <h1 className="h1 mb-12">All studies</h1>
      <StudyTable data={ data } />
    </Layout>
  );
};

export default Studies;
