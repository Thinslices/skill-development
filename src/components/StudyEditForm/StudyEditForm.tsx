import { Button, Buttons, QuestionListEdit } from "../../components";

import { useStudyEdit } from "./useStudyEdit";
import { AddQuestionButton } from "./AddQuestionButton";
import { StudyEditTitle } from "./StudyEditTitle";
import type { SimpleStudy } from "./types";

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
    const {
        study,
        addQuestion,
        onTitleChange,
        deleteQuestion,
        onQuestionChange,
    } = useStudyEdit<T>(props.study);

    return (
        <>
            <StudyEditTitle title={study.title} setTitle={onTitleChange} />
            <QuestionListEdit
                addQuestion={addQuestion}
                questions={study.questions}
                deleteQuestion={deleteQuestion}
                onQuestionChange={onQuestionChange}
            />
            <AddQuestionButton
                onClick={() => addQuestion(study.questions.length)}
            />
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
