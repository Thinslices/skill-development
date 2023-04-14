import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { DragOverlay } from '@dnd-kit/core';
import {
  closestCenter,
  DndContext,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import React, { forwardRef, useState, useMemo } from 'react';
import { SmartPointerSensor } from '../../utils/sensors';
import type { Question } from '../../utils/types';
import { QuestionForm } from '../QuestionForm/QuestionForm';

export const QuestionDndContext: React.FC<
  React.PropsWithChildren<{
    questions: Question[];
    setQuestionsInOrder: (questions: Question[]) => void;
  }>
> = ({ questions, setQuestionsInOrder, children }) => {
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);

  const mouseSensor = useSensor(SmartPointerSensor);
  const sensors = useSensors(mouseSensor);

  const questionIds = useMemo(
    // dnd-kit doesn't allow for zero ids: https://stackoverflow.com/a/73936369
    () => questions.map(item => item.index + 1),
    [questions]
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;

    setActiveQuestion(questions[(active.id as number) - 1] ?? null);
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
        {children}
      </SortableContext>
      <DragOverlay>
        {activeQuestion ? (
          <QuestionDragOverlay question={activeQuestion} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

const QuestionDragOverlay: React.FC<{ question: Question }> = forwardRef(
  ({ question }, ref) => {
    return (
      <div ref={ref as React.RefObject<HTMLDivElement>}>
        <QuestionForm data={question} />
      </div>
    );
  }
);

QuestionDragOverlay.displayName = 'QuestionDragOverlay';
