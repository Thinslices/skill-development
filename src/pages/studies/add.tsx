import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { Layout, StudyEditForm } from "../../components";
import { useCreateStudy } from "../../hooks";

const AddStudy: NextPage = () => {
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
            <h1 className="h2">Add Study</h1>
            <StudyEditForm 
                study={ emptyStudy } 
                saveStudy={ saveStudy } 
                publishButtonText={ `Publish study` } 
                saveAsDraftButtonText={ `Save as draft` } 
            />
        </Layout>
    )
}

export default AddStudy;