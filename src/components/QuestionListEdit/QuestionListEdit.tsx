import { QuestionForm } from '..';
import type { Question } from '../../utils/types';
import type { DragEndEvent } from '@dnd-kit/core';
import { useSensor, useSensors } from '@dnd-kit/core';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { useMemo } from 'react';
import { SmartPointerSensor } from '../../utils/sensors';

type QuestionListEditProps = {
  questions: Question[];
  onQuestionChange: (index: number, newQuestion: Question) => void;
  addQuestion: (index: number) => void;
  deleteQuestion: (index: number) => void;
  setQuestionsInOrder: (questions: Question[]) => void;
};

export const QuestionListEdit: React.FC<QuestionListEditProps> = props => {
  const {
    addQuestion,
    onQuestionChange,
    deleteQuestion,
    setQuestionsInOrder,
    questions,
  } = props;
  const canDeleteQuestion = questions.length > 1;

  const mouseSensor = useSensor(SmartPointerSensor);

  const sensors = useSensors(mouseSensor);

  const questionIds = useMemo(
    //https://stackoverflow.com/a/73936369
    () => questions.map(item => item.index + 1),
    [questions]
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    console.log('???');
    console.log({ active, over });
    if (active.id !== over?.id) {
      const oldIndex = questionIds.indexOf(active.id as number);
      const newIndex = questionIds.indexOf(over?.id as number);

      console.log('questions before', questions);
      const newQuestions = arrayMove(questions, oldIndex, newIndex);
      console.log('questions after', newQuestions);

      setQuestionsInOrder(newQuestions);
    }
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      sensors={sensors}>
      <SortableContext
        items={questionIds}
        strategy={verticalListSortingStrategy}>
        {questions.map((question: Question, index: number) => {
          return (
            <QuestionForm
              key={index}
              index={index}
              data={question}
              onAnswerEnterKeyDown={() => {
                addQuestion(index + 1);
              }}
              onChange={newQuestion => {
                onQuestionChange(index, newQuestion);
              }}
              deleteQuestion={() => {
                deleteQuestion(index);
              }}
              canDeleteQuestion={canDeleteQuestion}
            />
          );
        })}
      </SortableContext>
    </DndContext>
  );
};
