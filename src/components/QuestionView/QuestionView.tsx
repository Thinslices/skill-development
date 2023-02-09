import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { Question } from '../../utils/types';

type QuestionViewProps = Question & {
    expanded?: boolean
}

export const QuestionView: React.FC<QuestionViewProps> = ( props ) => {
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
