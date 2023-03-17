import { type NextPage } from 'next';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import {
    Authorize,
    Breadcrumbs,
    Header,
    StudyTable,
    Wrapper,
} from '../../../components';
import { useUserStudies } from '../../../hooks';
import { api } from '../../../utils/api';

const UserStudies: NextPage = () => {
    const router = useRouter();
    const { userId } = router.query;
    const studies = useUserStudies(userId as string);
    const { data } = api.user.get.useQuery({ id: userId as string });
    const title = useMemo(() => {
        return data?.name ? `${data.name}'s studies` : <>&nbsp;</>;
    }, [data]);

    return (
        <>
            <Header />
            <Wrapper className="py-14">
                <Authorize>
                    <div className="space-y-8">
                        <Breadcrumbs />
                        <h1 className="h1 mb-12">{title}</h1>
                        <StudyTable data={studies} />
                    </div>
                </Authorize>
            </Wrapper>
        </>
    );
};

export default UserStudies;
