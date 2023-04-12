import { QuestionForm } from '..';
import type { Question } from '../../utils/types';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { DragOverlay } from '@dnd-kit/core';
import { useSensor, useSensors } from '@dnd-kit/core';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { useMemo, useState } from 'react';
import { SmartPointerSensor } from '../../utils/sensors';
import { QuestionDragOverlay } from './QuestionDragOverlay';

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
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);

  const mouseSensor = useSensor(SmartPointerSensor);
  const sensors = useSensors(mouseSensor);

  const questionIds = useMemo(
    // dnd-kit doesn't allow for zero ids: https://stackoverflow.com/a/73936369
    () => questions.map(item => item.index + 1),
    [questions]
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;

    setActiveQuestion(questions[(active.id as number) - 1]?.question ?? null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = questionIds.indexOf(active.id as number);
      const newIndex = questionIds.indexOf(over?.id as number);

      const newQuestions = arrayMove(questions, oldIndex, newIndex);

      setQuestionsInOrder(
        newQuestions.map((question, index) => ({ ...question, index }))
      );
    }
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
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
      <DragOverlay>
        {activeQuestion ? (
          <QuestionDragOverlay question={activeQuestion} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
