import { useState, useCallback } from "react";
import type { Question } from "../../utils/types";
import type { SimpleStudy } from "./types";

export const useStudyEdit = <T extends SimpleStudy>(initialStudy: T) => {
    const [study, setStudy] = useState<T>(initialStudy);

    const onQuestionChange = useCallback(
        (index: number, newQuestion: Question) => {
            const newQuestions = study.questions.slice();
            newQuestions.splice(index, 1, newQuestion);
            setStudy({
                ...study,
                questions: newQuestions,
            });
        },
        [setStudy, study]
    );

    const onTitleChange = useCallback(
        (newTitle: string) => {
            setStudy({
                ...study,
                title: newTitle,
            });
        },
        [setStudy, study]
    );

    const addQuestion = useCallback(
        (index: number) => {
            const newQuestions = study.questions.slice();
            newQuestions.splice(index, 0, {
                question: "",
                answer: "",
                index: newQuestions.length,
            });
            setStudy({
                ...study,
                questions: newQuestions,
            });
        },
        [setStudy, study]
    );

    const deleteQuestion = useCallback(
        (index: number) => {
            const newQuestions = study.questions.slice();

            newQuestions.splice(index, 1);
            setStudy({
                ...study,
                questions: newQuestions,
            });
        },
        [study]
    );

    return {
        study,
        onQuestionChange,
        addQuestion,
        onTitleChange,
        deleteQuestion,
    };
};
