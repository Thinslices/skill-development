import { QuestionForm } from "..";
import type { Question } from "../../utils/types";

type QuestionListEditProps = {
    questions: Question[];
    onQuestionChange: (index: number, newQuestion: Question) => void;
    addQuestion: (index: number) => void;
};

export const QuestionListEdit = ({
    addQuestion,
    onQuestionChange,
    questions,
}: QuestionListEditProps) => {
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
                    />
                );
            })}
        </>
    );
};
