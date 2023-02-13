import { Question } from "../../utils/types";

type QuestionFormProps = {
    index: number,
    data: Question,
    onChange: ( question: { question: string, answer: string } ) => void
}

export const QuestionForm: React.FC<QuestionFormProps> = ( props ) => {
    const { index, data, onChange } = props;

    return (
        <div className="flex flex-col space-y-4">
            <div className="h6">Question { index + 1 }</div>
            <input placeholder={ `Question ${ index + 1 }` } type="text" className="h2 py-2 border-b border-b-borders focus:outline-0 focus:border-b-black" value={ data.question } onChange={ e => { 
                const newQuestion = { 
                    question: e.target.value,
                    answer: data.answer
                };
                onChange( newQuestion ) 
            } } />
            <textarea placeholder="Answer" className="border p-2 border-borders focus:outline-0 focus:border-black" name="" id="" cols={ 30 } rows={ 10 } value={ data.answer } onChange={ e => { 
                const newQuestion = { 
                    question: data.question,
                    answer: e.target.value
                };
                onChange( newQuestion ); 
            } } />
        </div>
    )
}