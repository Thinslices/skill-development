import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Layout, StudyEditForm } from "../../../components";
import { useUpdateStudy } from "../../../hooks/useUpdateStudy/useUpdateStudy";
import { api } from "../../../utils/api";

const EditStudyView:React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const { data } = api.study.get.useQuery( { id: id as string }, {
        enabled: typeof id === 'string'
    } );

    const updateStudy = useUpdateStudy();

    if ( ! data ) {
        return null;
    }

    return (
        <StudyEditForm publishButtonText={ `Update study` } saveAsDraftButtonText={ `Save as draft` } study={ data } saveStudy={ updateStudy } />
    );
}

const EditStudy:NextPage = () => {

    return (
        <Layout>
            <h1 className="h2">Edit Study</h1>
            <EditStudyView />
        </Layout>
    )
}

export default EditStudy;