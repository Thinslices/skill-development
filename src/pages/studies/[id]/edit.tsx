import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Breadcrumbs, Layout, StudyEditForm } from "../../../components";
import { useBreadcrumbs } from "../../../hooks";
import { useUpdateStudy } from "../../../hooks/useUpdateStudy/useUpdateStudy";
import { api } from "../../../utils/api";
import { useState } from "react";

const EditStudyView:React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const { data } = api.study.get.useQuery( { id: id as string }, {
        enabled: typeof id === 'string'
    } );

    const [ study, setStudy ] = useState( {
        title: '',
        questions: [ {
            question: '',
            answer: ''
        } ],
    } )

    const updateStudy = useUpdateStudy();

    if ( ! data ) {
        return null;
    }

    return (
        <StudyEditForm study={ data } saveStudy={ updateStudy } />
    );
}

const EditStudy:NextPage = () => {

    const breadcrumbs = useBreadcrumbs();
    
    return (
        <Layout>
            <div className="space-y-8">
                <Breadcrumbs breadcrumbs={ breadcrumbs } />
                <h1 className="h2">Edit Study</h1>
                <EditStudyView />
            </div>
        </Layout>
    )
}

export default EditStudy;