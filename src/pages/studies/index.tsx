import { type NextPage } from 'next';
import { get_studies } from '../../store/modules/studies'

import { Layout, StudyTable } from '../../components';
import { api } from '../../utils/api';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

const Studies: NextPage = () => {
  // const { data } = api.study.getAll.useQuery();
  // @ts-ignore
  const data = useSelector(state => state.studies.data)
  const dispatch = useDispatch()

  useEffect(() => {
    // @ts-ignore
    dispatch(get_studies())
  }, [])

  return (
    <Layout>
      <h1 className="h1 mb-12">All studies</h1>
      <StudyTable data={data} />
    </Layout>
  );
};

export default Studies;
