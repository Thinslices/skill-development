import { Fragment } from 'react';
import type { AnswerType, Question } from '../../utils/types';
import { Editor } from '../Editor/Editor';

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

        const markdown = (() => {
          if (!question.answer) {
            return '';
          }

          try {
            const formattedAnswer = JSON.parse(
              question.answer as unknown as string
            ) as AnswerType;
            return formattedAnswer.markdown ?? formattedAnswer.text ?? '';
          } catch (err) {
            return (question.answer as unknown as string) ?? '';
          }
        })();

        return (
          <Fragment key={index}>
            <div className="space-y-2">
              <div className="h3">{question.question}</div>
              <div>
                <Editor
                  markdown={markdown}
                  onChange={answer =>
                    onQuestionChange(index, {
                      ...question,
                      answer: JSON.stringify(answer),
                    })
                  }
                />
              </div>
            </div>
          </Fragment>
        );
      })}
    </>
  );
};
