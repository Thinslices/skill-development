import { QueriesObserver } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { Authorize, Breadcrumbs, Button, Buttons, Header, Plus, QuestionForm, Wrapper } from "../../components";
import { useBreadcrumbs } from "../../hooks";
import { api } from "../../utils/api";
import type { Question } from "../../utils/types"; 



const AddStudy = () => {
    const breadcrumbs = useBreadcrumbs();
    const router = useRouter();
    const [ title, setTitle ] = useState<string>( '' );
    const [ questions, setQuestions ] = useState<Array<Question>>( [ {
        question: '',
        answer: ''    
    } ] );

    const onQuestionChange = useCallback( ( index: number, newQuestion: Question ) => {
        const newQuestions = questions.slice();
        newQuestions.splice( index, 1, newQuestion );
        setQuestions( newQuestions );
    }, [ questions ] )

    const addQuestion = useCallback( () => {
        const newQuestions = questions.slice();
        newQuestions.push( { question: '', answer: '' } );
        setQuestions( newQuestions );
    }, [ questions ] );

    const { data: sessionData } = useSession();

    const createStudy = api.study.create.useMutation( {
        onSuccess: async ( data ) => {
            await router.push( `/studies/${ data.id }` )
        },
    } );

    const saveStudy = useCallback( ( publish?: boolean ) => {

        if ( sessionData?.user?.id ) {

                try {
                    createStudy.mutate( {
                        title,
                        authorId: sessionData.user?.id,
                        questions,
                        published: publish
                } )
            } catch {
                
            }
        }
    }, [ title, createStudy, questions, sessionData ] )

    return (
        <>
            <Header />
            <Wrapper className="py-14">
                <Authorize>
                <div className="space-y-8">
                    <Breadcrumbs breadcrumbs={ breadcrumbs } />
                    <h1 className="h2">Add Study</h1>
                    <div className="flex flex-col space-y-4">
                        <label className="h6">Title</label>
                        <input type="text" className="h1 py-2 border-b border-b-borders focus:outline-0 focus:border-b-black" placeholder="Amazing study regarding amazing things" value={ title } onChange={ ( event ) => { 
                            setTitle( event.target.value );
                        } } />
                    </div>
                    <>
                        { questions.map( ( question: Question, index: number ) => {
                            return (
                                <QuestionForm key={ index } index={ index } data={ question } onChange={ ( newQuestion ) => {
                                    onQuestionChange( index, newQuestion );
                                } } />
                            )
                        } ) }
                    </>
                    <Button style="tertiary" onClick={ addQuestion }>
                        <span>Add Question</span><Plus />
                    </Button>
                    <div className="pt-8 border-t border-t-borders">
                        <Buttons>
                            <Button onClick={ () => { saveStudy( true ) } }>Publish study</Button>
                            <Button onClick={ () => { saveStudy() } } style="secondary">Save draft</Button>
                        </Buttons>
                    </div>
                </div>
                </Authorize>
            </Wrapper>
        </>
    )
}

export default AddStudy;