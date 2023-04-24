import {
  AnswerListEdit,
  Button,
  Buttons,
  QuestionListEdit,
} from '../../components';

import { useStudyEdit } from './useStudyEdit';
import { AddQuestionButton } from './AddQuestionButton';
import { StudyEditTitle } from './StudyEditTitle';
import type { SimpleStudy } from './types';

type StudyEditFormProps<T> = {
  study: T;
  saveStudy: (study: T, publish?: boolean) => void;
  publishButtonText: string;
  saveAsDraftButtonText: string;
};
const disabledButtonStyle = 'opacity-50 contrast-75 cursor-not-allowed';

export const StudyEditForm = <T extends SimpleStudy>(
  props: StudyEditFormProps<T>
) => {
  const { saveStudy, publishButtonText, saveAsDraftButtonText } = props;
  const {
    study,
    addQuestion,
    onTitleChange,
    deleteQuestion,
    onQuestionChange,
    setQuestionsInOrder,
  } = useStudyEdit<T>(props.study);

  const isEmptyStudy =
    !study.title ||
    study.questions.every(question => !(question.question && question.answer));

  const handleSaveStudy = (publish = false) => {
    if (isEmptyStudy) {
      return;
    }

    const { questions } = study;
    const newQuestions = questions.filter(({ question }) => question);
    saveStudy({ ...study, questions: newQuestions }, publish);
  };

  return (
    <>
      <StudyEditTitle title={study.title} setTitle={onTitleChange} />
      <QuestionListEdit
        addQuestion={addQuestion}
        questions={study.questions}
        deleteQuestion={deleteQuestion}
        onQuestionChange={onQuestionChange}
        setQuestionsInOrder={setQuestionsInOrder}
      />
      <AddQuestionButton onClick={() => addQuestion(study.questions.length)} />
      <div className="space-y-3">
        <div className="h2">Answers:</div>
        <AnswerListEdit
          questions={study.questions}
          onQuestionChange={onQuestionChange}
        />
      </div>
      <div className="border-t border-t-borders pt-8">
        <Buttons>
          <Button
            disabled={isEmptyStudy}
            className={isEmptyStudy ? disabledButtonStyle : ''}
            onClick={() => handleSaveStudy(true)}>
            {publishButtonText}
          </Button>
          <Button
            disabled={isEmptyStudy}
            className={isEmptyStudy ? disabledButtonStyle : ''}
            onClick={() => handleSaveStudy()}
            style="secondary">
            {saveAsDraftButtonText}
          </Button>
        </Buttons>
      </div>
    </>
  );
};
