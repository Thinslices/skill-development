import { QuestionForm } from '..';
import { QuestionDndContext } from './QuestionDndContext';
import type { Question } from '../../utils/types';
import { AddQuestionButton } from '../StudyEditForm/AddQuestionButton';

type QuestionListEditProps = {
  questions: Question[];
  onQuestionChange: (index: number, newQuestion: Question) => void;
  addQuestion: (index: number) => void;
  deleteQuestion: (index: number) => void;
  setQuestionsInOrder: (questions: Question[]) => void;
};

export const QuestionListEdit: React.FC<QuestionListEditProps> = props => {
  const {
    addQuestion,
    onQuestionChange,
    deleteQuestion,
    questions,
    setQuestionsInOrder,
  } = props;
  const canDeleteQuestion = questions.length > 1;

  return (
    <div className="space-y-8">
      <div className="text-4xl font-bold">Questions:</div>
      <div className="space-y-16">
        <QuestionDndContext
          questions={questions}
          setQuestionsInOrder={setQuestionsInOrder}>
          {questions.map((question: Question, index: number) => {
            return (
              <QuestionForm
                key={index}
                index={index}
                data={question}
                onAnswerEnterKeyDown={() => {
                  addQuestion(index + 1);
                }}
                onChange={newQuestion => {
                  onQuestionChange(index, newQuestion);
                }}
                deleteQuestion={() => {
                  deleteQuestion(index);
                }}
                canDeleteQuestion={canDeleteQuestion}
              />
            );
          })}
        </QuestionDndContext>
      </div>
      <AddQuestionButton onClick={() => addQuestion(questions.length)} />
    </div>
  );
};
