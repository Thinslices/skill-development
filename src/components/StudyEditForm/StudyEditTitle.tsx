type StudyEditTitleProps = {
  title: string;
  setTitle: (title: string) => void;
};

export const StudyEditTitle: React.FC<StudyEditTitleProps> = ({
  title,
  setTitle,
}) => {
  return (
    <div className="space-y-4">
      <div className="h6">Title</div>
      <div>
        <input
          type="text"
          className="h1 w-full border-b border-b-borders py-2 focus:border-b-black focus:outline-0"
          placeholder="Amazing study regarding amazing things"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </div>
    </div>
  );
};
