import { type NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import { Authorize, Header, StudyTable, Wrapper } from '../../components';
import { api } from '../../utils/api';

const Search: NextPage = () => {
  const router = useRouter();
  const { s } = router.query;
  const { data } = api.study.search.useQuery(
    { query: s as string },
    {
      enabled: !!s,
    }
  );

  return (
    <>
      <Header />
      <Wrapper className="py-14">
        <Authorize>
          <h1 className="h1 mb-12">Search: &quot;{s}&quot;</h1>
          <StudyTable data={data} />
        </Authorize>
      </Wrapper>
    </>
  );
};

export default Search;
