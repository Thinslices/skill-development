import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Breadcrumbs, Header, Wrapper } from "../../components";
import { api } from "../../utils/api";
import { useBreadcrumbs } from "../../hooks";

import type { Question } from '../../utils/types';

type QuestionProps = Question & {
    expanded?: boolean
}

const QuestionItem: React.FC<QuestionProps> = ( props ) => {
    const { question, answer } = props;
    const [ expanded, setExpanded ] = useState<boolean>( !! props.expanded );

    useEffect( () => {
        setExpanded( !! props.expanded );
    }, [ props.expanded ] )

    return (
        <>
            <div className="py-4 border-t border-t-borders">
                <div className="flex items-center justify-between">
                    <div className="h2 mb-2">{ question }</div>
                    <div className="cursor-pointer" onClick={ () => {
                        setExpanded( wasExpanded => ! wasExpanded )
                    } }>
                        { expanded && <Image className="rotate-180" src="/arrow.svg" width={ 17 } height={ 12 } alt="arrow" /> }
                        { ! expanded && <Image src="/arrow.svg" width={ 17 } height={ 12 } alt="arrow" /> }
                    </div>
                </div>
                { expanded && <div>{ answer }</div> }
            </div>
        </>
    )
}

const Study = () => {
    const router = useRouter();
    const { id } = router.query;    
    const { data, isLoading } = api.study.get.useQuery( { id: id as string } ); 
    const questions: Array<any> = [];
    const [ expanded, setExpanded ] = useState<boolean>( false );
    const breadcrumbs = useBreadcrumbs();

    if ( ! data ) {
        return;
    }

    return (
        <>
            <Header />
            <Wrapper className="py-14">
                <Breadcrumbs breadcrumbs={ breadcrumbs } />
                <div className="flex gap-8 mb-12 items-center justify-between">
                    <h1 className="h1">{ data && data.title }</h1>
                    <div className="flex gap-4">
                        <div className="cursor-pointer" onClick={ () => { setExpanded( true ) } }>Expand all</div>
                        <div className="cursor-pointer" onClick={ () => { setExpanded( false ) } }>Collapse all</div>
                    </div>
                </div>
                <>
                    { questions.map( ( data, index ) => {
                        return (
                            <QuestionItem key={ index } { ...data } expanded={ expanded } />
                        )
                    } ) }
                </>
            </Wrapper>
        </>
    )
}

export default Study;