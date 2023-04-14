import type { ChangeEvent, KeyboardEventHandler, RefObject } from 'react';
import { useCallback } from 'react';
import type { Question } from '../../utils/types';
import { Button } from '../Button/Button';
import { QuestionSortable } from './QuestionSortable';

type QuestionFormProps = {
  index?: number;
  data: Question;
  onChange?: (question: Question) => void;
  onAnswerEnterKeyDown?: () => void;
  questionRef?: RefObject<HTMLInputElement>;
  deleteQuestion?: () => void;
  canDeleteQuestion?: boolean;
  isDragOverlay?: boolean;
};

export const QuestionForm: React.FC<QuestionFormProps> = props => {
  const {
    index,
    data,
    onChange,
    onAnswerEnterKeyDown,
    deleteQuestion,
    questionRef,
    canDeleteQuestion,
    isDragOverlay,
  } = props;

  const handleEnter = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    event => {
      if (event.key === 'Enter' && onAnswerEnterKeyDown) {
        onAnswerEnterKeyDown();
      }
    },
    [onAnswerEnterKeyDown]
  );

  const QuestionSortableShard: React.FC<React.PropsWithChildren> = ({
    children,
  }) =>
    index !== undefined ? (
      <QuestionSortable index={index}>{children}</QuestionSortable>
    ) : (
      <>{children}</>
    );

  const onQuestionAskChange = onChange
    ? (e: ChangeEvent<HTMLInputElement>) => {
        const newQuestion = {
          ...data,
          question: e.target.value,
        };
        onChange(newQuestion);
      }
    : undefined;

  const onQuestionAnswerChange = onChange
    ? (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newQuestion = {
          ...data,
          answer: e.target.value,
        };
        onChange(newQuestion);
      }
    : undefined;

  return (
    <QuestionSortableShard>
      <div className="flex flex-col space-y-4">
        {index !== undefined ? (
          <div className="align flex items-center gap-3">
            <div className="h6">Question {index + 1}</div>
            {canDeleteQuestion && (
              <Button style="primary" onClick={deleteQuestion}>
                Delete
              </Button>
            )}
          </div>
        ) : null}
        <input
          ref={questionRef}
          placeholder={index ? `Question ${index + 1}` : 'Question'}
          type="text"
          onKeyDown={handleEnter}
          className="h2 border-b border-b-borders py-2 focus:border-b-black focus:outline-0"
          value={data.question}
          onChange={onQuestionAskChange}
          disabled={isDragOverlay}
        />
        <textarea
          placeholder="Answer"
          className="border border-borders p-2 focus:border-black focus:outline-0"
          name=""
          id=""
          cols={30}
          rows={10}
          value={data.answer}
          onChange={onQuestionAnswerChange}
          disabled={isDragOverlay}
        />
      </div>
    </QuestionSortableShard>
  );
};
