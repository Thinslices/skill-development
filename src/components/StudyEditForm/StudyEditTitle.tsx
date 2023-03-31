type StudyEditTitleProps = {
  title: string;
  setTitle: (title: string) => void;
};

export const StudyEditTitle: React.FC<StudyEditTitleProps> = ({
  title,
  setTitle,
}) => {
  return (
    <div className="flex flex-col space-y-4">
      <label className="h6">Title</label>
      <input
        type="text"
        className="h1 border-b border-b-borders py-2 focus:border-b-black focus:outline-0"
        placeholder="Amazing study regarding amazing things"
        value={title}
        onChange={event => setTitle(event.target.value)}
      />
    </div>
  );
};
