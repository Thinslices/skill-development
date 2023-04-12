import { forwardRef } from 'react';

const QuestionDragOverlay: React.FC<{ question: string }> = forwardRef(
  ({ question, ...props }, ref) => {
    return (
      <div {...props} ref={ref as React.RefObject<HTMLDivElement>}>
        {question}
      </div>
    );
  }
);

QuestionDragOverlay.displayName = 'QuestionDragOverlay';

export { QuestionDragOverlay };
