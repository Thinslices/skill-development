import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { AnswerType, Question } from '../../utils/types';

type QuestionViewProps = Question & {
  expanded?: boolean;
};

export const QuestionView: React.FC<QuestionViewProps> = props => {
  const { question, answer } = props;
  const [expanded, setExpanded] = useState<boolean>(!!props.expanded);
  const [parsedAnswer, setParsedAnswer] = useState<string | undefined>();

  useEffect(() => {
    setExpanded(!!props.expanded);
  }, [props.expanded]);

  useEffect(() => {
    try {
      const parsed = JSON.parse(answer) as AnswerType;
      if (
        parsed &&
        typeof parsed === 'object' &&
        'htmlString' in parsed &&
        'text' in parsed
      ) {
        setParsedAnswer(parsed.htmlString ?? parsed.text);
      } else {
        setParsedAnswer(answer);
      }
    } catch {
      setParsedAnswer(answer);
    }
  }, [answer]);

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
        {expanded && (
          <div
            dangerouslySetInnerHTML={{
              __html: parsedAnswer ?? '',
            }}
          />
        )}
      </div>
    </>
  );
};
