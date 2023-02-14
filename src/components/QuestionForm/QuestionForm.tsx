import type { KeyboardEventHandler, RefObject} from "react";
import { useCallback } from "react";
import type { Question } from "../../utils/types";

type QuestionFormProps = {
    index: number,
    data: Question,
    onChange: ( question: Question ) => void,
    onAnswerEnterKeyDown?: () => void,
    questionRef?: RefObject<HTMLInputElement>
}

export const QuestionForm: React.FC<QuestionFormProps> = ( props ) => {
    const { index, data, onChange, onAnswerEnterKeyDown, questionRef } = props;

    const handleEnter = useCallback<KeyboardEventHandler<HTMLInputElement>>( ( event ) => {
        if ( event.key === 'Enter' && onAnswerEnterKeyDown ) {
            onAnswerEnterKeyDown();
        }
    }, [ onAnswerEnterKeyDown ] );

    return (
        <div className="flex flex-col space-y-4">
            <div className="h6">Question { index + 1 }</div>
            <input ref={ questionRef } placeholder={ `Question ${ index + 1 }` } type="text" onKeyDown={ handleEnter } className="h2 py-2 border-b border-b-borders focus:outline-0 focus:border-b-black" value={ data.question } onChange={ e => { 
                const newQuestion = { 
                    ...data,
                    question: e.target.value,
                };
                onChange( newQuestion ) 
            } } />
            <textarea placeholder="Answer" className="border p-2 border-borders focus:outline-0 focus:border-black" name="" id="" cols={ 30 } rows={ 10 } value={ data.answer } onChange={ e => { 
                const newQuestion = { 
                    ...data,
                    answer: e.target.value
                };
                onChange( newQuestion ); 
            } } />
        </div>
    )
}