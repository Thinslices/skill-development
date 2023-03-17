export const VerticalEllipsis: React.FC = () => {
  return (
    <div className="flex flex-col gap-0.5">
      {new Array(3).fill(undefined).map((value, index) => {
        return (
          <div key={index} className="h-1.5 w-1.5 rounded-full bg-black"></div>
        );
      })}
    </div>
  );
};
