import { QuestionForm } from "..";
import type { Question } from "../../utils/types";

type QuestionListEditProps = {
    questions: Question[];
    onQuestionChange: (index: number, newQuestion: Question) => void;
    addQuestion: (index: number) => void;
    deleteQuestion: (index: number) => void;
};

export const QuestionListEdit: React.FC<QuestionListEditProps> = props => {
    const { addQuestion, onQuestionChange, deleteQuestion, questions } = props;
    const canDeleteQuestion = questions.length > 1;

    return (
        <>
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
        </>
    );
};
