/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { KeyboardEventHandler, RefObject } from "react";
import { useCallback } from "react";
import type { Question } from "../../utils/types";
import { Editor } from "../Editor/Editor";

type QuestionFormProps = {
    index: number;
    data: Question;
    onChange: (question: Question) => void;
    onAnswerEnterKeyDown?: () => void;
    questionRef?: RefObject<HTMLInputElement>;
};

export const QuestionForm: React.FC<QuestionFormProps> = props => {
    const { index, data, onChange, onAnswerEnterKeyDown, questionRef } = props;

    const handleEnter = useCallback<KeyboardEventHandler<HTMLInputElement>>(
        event => {
            if (event.key === "Enter" && onAnswerEnterKeyDown) {
                onAnswerEnterKeyDown();
            }
        },
        [onAnswerEnterKeyDown]
    );

    return (
        <div className="flex flex-col space-y-4">
            <div className="h6">Question {index + 1}</div>
            <input
                ref={questionRef}
                placeholder={`Question ${index + 1}`}
                type="text"
                onKeyDown={handleEnter}
                className="h2 border-b border-b-borders py-2 focus:border-b-black focus:outline-0"
                value={data.question}
                onChange={e => {
                    const newQuestion = {
                        ...data,
                        question: e.target.value,
                    };
                    onChange(newQuestion);
                }}
            />

            <Editor
                value={data.answer}
                onChange={e => {
                    const newQuestion = {
                        ...data,
                        answer: e.target.value,
                    };
                    onChange(newQuestion);
                }}
            />
        </div>
    );
};
