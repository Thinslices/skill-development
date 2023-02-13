import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Breadcrumbs, Layout, StudyTable } from "../../../components";
import { useBreadcrumbs, useUserStudies } from "../../../hooks";
import { api } from "../../../utils/api";


const UserPage:NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const { data } = api.user.get.useQuery( { id: id as string }, {
        enabled: !! id
    } );
    const breadcrumbs = useBreadcrumbs();
    const studies = useUserStudies( id as string );

    return (
        <Layout>
            <div className="space-y-16">
                <Breadcrumbs breadcrumbs={ breadcrumbs } />
                <div className="flex items-center gap-8">
                    <div className="rounded-full border-2 border-text overflow-hidden">
                        { data?.image && <img src={ data.image } alt={ data?.name ?? '' } width={ 100 } height={ 100 } /> }
                    </div>
                    <div>
                        <h1 className="h1" >{ data?.name }</h1>
                        <div>{ data?.email }</div>
                    </div>
                </div>
                <div className="space-y-8">
                    <h2 className="h2">Studies</h2>
                    <StudyTable data={ studies } />
                </div>
            </div>

        </Layout>
    )
}

export default UserPage;