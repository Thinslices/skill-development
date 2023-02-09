import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Layout, Breadcrumbs, StudyEditForm } from "../../components";
import { useBreadcrumbs, useCreateStudy } from "../../hooks";

const AddStudy: NextPage = () => {
    const breadcrumbs = useBreadcrumbs();
    const { data: sessionData } = useSession();

    const [ study, setStudy ] = useState( {
        title: '',
        questions: [ {
            question: '',
            answer: ''
        } ]
    } );

    const saveStudy = useCreateStudy();

    if ( ! sessionData?.user.id ) {
        return null
    }

    return (
        <Layout>
            <div className="space-y-8">
                <Breadcrumbs breadcrumbs={ breadcrumbs } />
                <h1 className="h2">Add Study</h1>
                <StudyEditForm study={ {
                    ...study,
                    authorId: sessionData?.user.id
                } } setStudy={ setStudy } saveStudy={ saveStudy } />
            </div>
        </Layout>
    )
}

export default AddStudy;