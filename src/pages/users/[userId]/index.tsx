/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Layout, StudyTable } from '../../../components';
import { useUserStudies } from '../../../hooks';
import { api } from '../../../utils/api';

const UserPage: NextPage = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { data } = api.user.get.useQuery(
    { id: userId as string },
    {
      enabled: !!userId,
    }
  );

  const studies = useUserStudies(userId as string);

  return (
    <Layout>
      <div className="space-y-16">
        <div className="flex items-center gap-8">
          <div className="border-text h-24 w-24 overflow-hidden rounded-full border-2">
            {data?.image && <img src={data.image} alt={data?.name ?? ''} />}
          </div>
          <div>
            <h1 className="h1">{data?.name}</h1>
            <div>{data?.email}</div>
          </div>
        </div>
        <div className="space-y-8">
          <h2 className="h2">Studies</h2>
          <StudyTable data={studies} />
        </div>
      </div>
    </Layout>
  );
};

export default UserPage;
