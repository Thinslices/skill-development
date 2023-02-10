import { useCallback, useState } from "react";
import { Button, Buttons, Plus, QuestionListEdit } from "../../components";
import type { Question, Study } from "../../utils/types"; 

type SimpleStudy = Omit<Study, 'id'>;

type StudyEditFormProps<T> = {
    study: T,
    saveStudy: ( study: T, publish?: boolean ) => void
}

export const StudyEditForm = <T extends SimpleStudy>( props: StudyEditFormProps<T> ) => { 
    const { saveStudy } = props;
    const [ study, setStudy ] = useState( props.study )

    const onQuestionChange = useCallback( ( index: number, newQuestion: Question ) => {
        const newQuestions = study.questions.slice();
        newQuestions.splice( index, 1, newQuestion );
        setStudy( {
            ...study,
            questions: newQuestions
        } );
    }, [setStudy, study] );

    const onTitleChange = useCallback( ( newTitle: string ) => {
        setStudy( {
            ...study,
            title: newTitle,
        } );
    }, [setStudy, study] )

    const addQuestion = useCallback( () => {
        const newQuestions = study.questions.slice();
        newQuestions.push( { question: '', answer: '' } );
        setStudy( {
            ...study,
            questions: newQuestions
        } );
    }, [setStudy, study] );

    return (
        <>
            <div className="flex flex-col space-y-4">
                <label className="h6">Title</label>
                <input type="text" className="h1 py-2 border-b border-b-borders focus:outline-0 focus:border-b-black" placeholder="Amazing study regarding amazing things" value={ study.title } onChange={ ( event ) => { 
                    onTitleChange( event.target.value );
                } } />
            </div>
            <QuestionListEdit questions={ study.questions } onQuestionChange={ onQuestionChange } />
            <Button style="tertiary" onClick={ addQuestion }>
                <span>Add Question</span><Plus />
            </Button>
            <div className="pt-8 border-t border-t-borders">
                <Buttons>
                    <Button onClick={ () => { saveStudy( study, true ) } }>Publish study</Button>
                    <Button onClick={ () => { saveStudy( study ) } } style="secondary">Save draft</Button>
                </Buttons>
            </div>
        </>
    )
}