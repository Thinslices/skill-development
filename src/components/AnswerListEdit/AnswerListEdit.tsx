import { Fragment } from 'react';
import type { Question } from '../../utils/types';

type AnswerListEditProps = {
  questions: Question[];
  onQuestionChange: (index: number, newQuestion: Question) => void;
};

export const AnswerListEdit: React.FC<AnswerListEditProps> = props => {
  const { onQuestionChange, questions } = props;

  return (
    <>
      {questions.map((question: Question, index: number) => {
        if (!question.question) {
          return null;
        }

        return (
          <Fragment key={index}>
            <div className="space-y-2">
              <div className="h3">{question.question}</div>
              <div>
                <textarea
                  placeholder="Answer"
                  className="block w-full border border-borders p-2 focus:border-black focus:outline-0"
                  name=""
                  id=""
                  cols={30}
                  rows={10}
                  value={question.answer}
                  onChange={e => {
                    const newQuestion = {
                      ...question,
                      answer: e.target.value,
                    };
                    onQuestionChange(index, newQuestion);
                  }}
                />
              </div>
            </div>
          </Fragment>
        );
      })}
    </>
  );
};
