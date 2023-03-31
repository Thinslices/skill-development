import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { Question } from '../../utils/types';

type QuestionViewProps = Question & {
  expanded?: boolean;
};

export const QuestionView: React.FC<QuestionViewProps> = props => {
  const { question, answer } = props;
  const [expanded, setExpanded] = useState<boolean>(!!props.expanded);

  useEffect(() => {
    setExpanded(!!props.expanded);
  }, [props.expanded]);

  return (
    <>
      <div className="border-t border-t-borders py-4">
        <div
          className="flex cursor-pointer items-center justify-between"
          onClick={() => {
            setExpanded(wasExpanded => !wasExpanded);
          }}>
          <div className="h2 mb-2">{question}</div>
          <div>
            {expanded && (
              <Image
                className="rotate-180"
                src="/arrow.svg"
                width={17}
                height={12}
                alt="arrow"
              />
            )}
            {!expanded && (
              <Image src="/arrow.svg" width={17} height={12} alt="arrow" />
            )}
          </div>
        </div>
        {expanded && <div dangerouslySetInnerHTML={{ __html: answer }} />}
      </div>
    </>
  );
};
