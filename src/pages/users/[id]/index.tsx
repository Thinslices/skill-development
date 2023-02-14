/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Layout, StudyTable } from "../../../components";
import { useUserStudies } from "../../../hooks";
import { api } from "../../../utils/api";


const UserPage:NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const { data } = api.user.get.useQuery( { id: id as string }, {
        enabled: !! id
    } );

    const studies = useUserStudies( id as string );

    return (
        <Layout>
            <div className="space-y-16">
                <div className="flex items-center gap-8">
                    <div className="rounded-full border-2 border-text overflow-hidden w-24 h-24">
                        { data?.image && <img src={ data.image } alt={ data?.name ?? '' } /> }
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