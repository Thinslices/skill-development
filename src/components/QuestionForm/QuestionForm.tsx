import type { ChangeEvent, KeyboardEventHandler, RefObject } from 'react';
import { useCallback } from 'react';
import type { AnswerType, Question } from '../../utils/types';
import { Button } from '../Button/Button';
import { Editor } from '../Editor/Editor';

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

  const markdown = (() => {
    if (!data.answer) {
      return '';
    }

    try {
      const formattedAnswer = JSON.parse(data.answer) as AnswerType;
      return formattedAnswer.markdown ?? formattedAnswer.text ?? '';
    } catch (err) {
      return data.answer ?? '';
    }
  })();

  const handleChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuestion = {
      ...data,
      question: e.target.value,
    };
    onChange(newQuestion);
  };

  const handleChangeAnswer = (answer: AnswerType) => {
    const newAnswer = {
      ...data,
      answer: JSON.stringify(answer),
    };
    onChange(newAnswer);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="align flex items-center gap-3">
        <div className="h6">Question {index + 1}</div>
        {canDeleteQuestion && (
          <Button style="primary" onClick={deleteQuestion}>
            Delete
          </Button>
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
      <Editor markdown={markdown} onChange={handleChangeAnswer} />
    </div>
  );
};
