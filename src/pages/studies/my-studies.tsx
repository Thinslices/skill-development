import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';

import { Layout, StudyTable } from '../../components';
import { api } from '../../utils/api';

const useMyStudies = () => {
  const { data: sessionData } = useSession();
  const userId = sessionData?.user?.id ?? '';

  const query = api.study.getAllUserStudies.useQuery(
    {
      id: userId,
    },
    {
      enabled: !!userId,
    }
  );

  const studies = (query?.data ?? []).map(study => {
    const isDraft = !study.published;
    const newTitle = isDraft ? `${study.title} (Draft)` : study.title;

    return {
      ...study,
      title: newTitle,
    };
  });

  return studies;
};

const MyStudies: NextPage = () => {
  const studies = useMyStudies();

  return (
    <Layout>
      <h1 className="h1 mb-12">My studies</h1>
      <StudyTable data={studies} />
    </Layout>
  );
};

export default MyStudies;
