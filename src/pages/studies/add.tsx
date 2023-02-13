import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { Layout, Breadcrumbs, StudyEditForm } from "../../components";
import { useBreadcrumbs, useCreateStudy } from "../../hooks";

const AddStudy: NextPage = () => {
    const breadcrumbs = useBreadcrumbs();
    const { data: sessionData } = useSession();

    const saveStudy = useCreateStudy();
    const emptyStudy = {
        title: '',
        questions: [ {
            question: '',
            answer: '',
            index: 0,
        } ],
        authorId: sessionData?.user.id ?? ''
    };

    return (
        <Layout>
            <div className="space-y-8">
                <Breadcrumbs breadcrumbs={ breadcrumbs } />
                <h1 className="h2">Add Study</h1>
                <StudyEditForm 
                    study={ emptyStudy } 
                    saveStudy={ saveStudy } 
                    publishButtonText={ `Publish study` } 
                    saveAsDraftButtonText={ `Save as draft` } 
                />
            </div>
        </Layout>
    )
}

export default AddStudy;