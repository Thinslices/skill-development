import { Button, Plus } from '..';

type AddQuestionButtonProps = {
  onClick: () => void;
};

export const AddQuestionButton: React.FC<AddQuestionButtonProps> = props => {
  const { onClick } = props;

  return (
    <Button style="tertiary" onClick={onClick}>
      <span>Add Question</span>
      <Plus />
    </Button>
  );
};
