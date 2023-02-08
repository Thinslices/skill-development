import type { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Breadcrumbs, Button, Buttons, Header, Wrapper } from "../../components";
import { useBreadcrumbs } from "../../hooks";
import { prisma } from "../../server/db";
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

    const createStudy = api.study.create.useMutation( {
        onSuccess: async ( data ) => {
            await router.push( `/studies/${ data.id }` )
        }
    } );
    const { data: sessionData } = useSession();

    if ( ! sessionData ) {
        return null;
    }

    return (
        <>
            <Header />
            <Wrapper className="py-14">
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
                        { questions.map( ( { question, answer }, index ) => {
                            return (
                                <div key={ index } className="flex flex-col space-y-4">
                                    <div className="h6">Question { index }</div>
                                    <input type="text" className="h2 py-2 border-b border-b-borders focus:outline-0 focus:border-b-black" value={ question } />
                                    <textarea className="border p-2 border-borders focus:outline-0 focus:border-black" name="" id="" cols={ 30 } rows={ 10 } value={ answer } />
                                </div>
                            )
                        } ) }
                    </>
                    <Button style="tertiary" onClick={ () => {
                        const newQuestions = questions.slice();
                        newQuestions.push( { question: '', answer: '' } );
                        setQuestions( newQuestions );
                    } }>Add Question</Button>
                    <div className="pt-8 border-t border-t-borders">
                        <Buttons>
                            <Button onClick={ () => {
                                try {
                                    createStudy.mutate( {
                                        title,
                                        content: 'Altceva',
                                        authorId: sessionData.user?.id
                                    } )
                                } catch {

                                }
                            } }>Publish study</Button>
                            <Button style="secondary">Save draft</Button>
                        </Buttons>
                    </div>
                </div>
            </Wrapper>
        </>
    )
}

export default AddStudy;