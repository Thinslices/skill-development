import { QuestionForm } from '..';
import type { Question } from '../../utils/types';

type QuestionListEditProps = {
    questions: Question[],
    onQuestionChange: ( index: number, newQuestion: Question ) => void
}

export const QuestionListEdit:React.FC<QuestionListEditProps> = ( props ) => {
    const { questions, onQuestionChange } = props;
    
    return (
        <>
            { questions.map( ( question: Question, index: number ) => {
                return (
                    <QuestionForm key={ index } index={ index } data={ question } onChange={ ( newQuestion ) => {
                        onQuestionChange( index, newQuestion );
                    } } />
                )
            } ) }
        </>
    )
}