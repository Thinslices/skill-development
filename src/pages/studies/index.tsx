import { type NextPage } from "next";

import { Header, StudyTable, Wrapper } from "../../components";
import { api } from "../../utils/api";


const useStudiesActions = () => {

  const utils = api.useContext();
  const deleteStudy = api.study.delete.useMutation( {
      onSuccess() {
          void utils.study.getAll.invalidate()
      },
  } );

  const actions = {
      view: true,
      edit: true,
      onDeleteClick: ( id: string ) => {
          deleteStudy.mutate( { id } );
      }
  };

  return actions;
}

const Studies: NextPage = () => {

  const { data } = api.study.getAll.useQuery();
  const actions = useStudiesActions();

  return (
    <>
      <Header />
      <Wrapper className="py-14">
        <h1 className="h1 mb-12">All studies</h1>
        <StudyTable data={ data } actions={ actions } />
      </Wrapper>
    </>
  );
};

export default Studies;
