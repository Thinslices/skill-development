import { useCallback, useState } from "react";
import { Button, Buttons, Plus, QuestionListEdit } from "../../components";
import type { Question, Study } from "../../utils/types";

type SimpleStudy = Omit<Study, "id">;

type StudyEditFormProps<T> = {
    study: T;
    saveStudy: (study: T, publish?: boolean) => void;
    publishButtonText: string;
    saveAsDraftButtonText: string;
};

export const StudyEditForm = <T extends SimpleStudy>(
    props: StudyEditFormProps<T>
) => {
    const { saveStudy, publishButtonText, saveAsDraftButtonText } = props;
    const [study, setStudy] = useState(props.study);

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

    const addQuestion = useCallback(() => {
        const newQuestions = study.questions.slice();
        newQuestions.push({
            question: "",
            answer: "",
            index: newQuestions.length,
        });
        setStudy({
            ...study,
            questions: newQuestions,
        });
    }, [setStudy, study]);

    return (
        <>
            <div className="flex flex-col space-y-4">
                <label className="h6">Title</label>
                <input
                    type="text"
                    className="h1 border-b border-b-borders py-2 focus:border-b-black focus:outline-0"
                    placeholder="Amazing study regarding amazing things"
                    value={study.title}
                    onChange={event => {
                        onTitleChange(event.target.value);
                    }}
                />
            </div>
            <QuestionListEdit
                questions={study.questions}
                onQuestionChange={onQuestionChange}
            />
            <Button style="tertiary" onClick={addQuestion}>
                <span>Add Question</span>
                <Plus />
            </Button>
            <div className="border-t border-t-borders pt-8">
                <Buttons>
                    <Button
                        onClick={() => {
                            saveStudy(study, true);
                        }}
                    >
                        {publishButtonText}
                    </Button>
                    <Button
                        onClick={() => {
                            saveStudy(study);
                        }}
                        style="secondary"
                    >
                        {saveAsDraftButtonText}
                    </Button>
                </Buttons>
            </div>
        </>
    );
};
