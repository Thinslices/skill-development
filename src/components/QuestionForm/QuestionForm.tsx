import type { ChangeEvent, KeyboardEventHandler, RefObject } from 'react';
import { useCallback } from 'react';
import Image from 'next/image';
import type { Question } from '../../utils/types';

type QuestionFormProps = {
  index: number;
  data: Question;
  onChange: (question: Question) => void;
  onAnswerEnterKeyDown?: () => void;
  questionRef?: RefObject<HTMLInputElement>;
  deleteQuestion: () => void;
  canDeleteQuestion: boolean;
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
  } = props;

  const handleEnter = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    event => {
      if (event.key === 'Enter' && onAnswerEnterKeyDown) {
        onAnswerEnterKeyDown();
      }
    },
    [onAnswerEnterKeyDown]
  );

  const handleChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuestion = {
      ...data,
      question: e.target.value,
    };
    onChange(newQuestion);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="align flex items-center gap-3">
        <div className="h6">Question {index + 1}</div>
        {canDeleteQuestion && (
          <div
            onClick={deleteQuestion}
            className="cursor-pointer opacity-20 hover:opacity-100">
            <Image src="/delete.svg" alt="delete icon" width={24} height={24} />
          </div>
        )}
      </div>

      <input
        ref={questionRef}
        placeholder={`Question ${index + 1}`}
        type="text"
        onKeyDown={handleEnter}
        className="h2 border-b border-b-borders py-2 focus:border-b-black focus:outline-0"
        value={data.question}
        onChange={handleChangeQuestion}
      />
    </div>
  );
};
