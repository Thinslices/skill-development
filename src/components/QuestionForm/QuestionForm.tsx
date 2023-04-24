import type { ChangeEvent, KeyboardEventHandler, RefObject } from 'react';
import { useCallback } from 'react';
import Image from 'next/image';
import type { Question } from '../../utils/types';
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

  return (
    <QuestionSortableShard>
      <div className="flex flex-col space-y-4">
        {index !== undefined ? (
          <div className="relative flex items-center gap-3">
            <div className="absolute right-full mr-3">
              <DragHandle />
            </div>
            <div className="h6">Question {index + 1}</div>
            {canDeleteQuestion && (
              <div
                onClick={deleteQuestion}
                className="cursor-pointer opacity-20 hover:opacity-100">
                <Image
                  src="/delete.svg"
                  alt="delete icon"
                  width={24}
                  height={24}
                />
              </div>
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
      </div>
    </QuestionSortableShard>
  );
};

const DragHandle = () => {
  return (
    <div className="cursor-grab rounded-md p-2 text-borders shadow-black hover:opacity-100 hover:shadow-md">
      <div className="pointer-events-none">
        <Image
          className="block max-w-none"
          src="/drag-handle.svg"
          alt="drag handle"
          width={24}
          height={24}
        />
      </div>
    </div>
  );
};
