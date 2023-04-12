import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { Layout, StudyEditForm } from '../../components';
import { useCreateStudy } from '../../hooks';
import type { AnswerType } from '../../utils/types';

const AddStudy: NextPage = () => {
  const { data: sessionData } = useSession();

  const saveStudy = useCreateStudy();
  const emptyAnswer: AnswerType = {
    text: '',
    htmlString: '',
    markdown: '',
  };
  const emptyStudy = {
    title: '',
    questions: [
      {
        question: '',
        answer: JSON.stringify(emptyAnswer),
        index: 0,
      },
    ],
    authorId: sessionData?.user.id ?? '',
  };

  return (
    <Layout>
      <h1 className="h2">Add Study</h1>
      <StudyEditForm
        study={emptyStudy}
        saveStudy={saveStudy}
        publishButtonText={`Publish study`}
        saveAsDraftButtonText={`Save as draft`}
      />
    </Layout>
  );
};

export default AddStudy;
