import { useSortable } from '@dnd-kit/sortable';

export const QuestionSortable: React.FC<
  React.PropsWithChildren<{ index: number }>
> = ({ index, children }) => {
  const { attributes, listeners, setNodeRef, transition } = useSortable({
    // dnd-kit doesn't allow for zero ids: https://stackoverflow.com/a/73936369
    id: index + 1,
  });

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={{ transition }}>
      {children}
    </div>
  );
};
