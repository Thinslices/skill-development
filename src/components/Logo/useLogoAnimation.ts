import type { RefObject } from 'react';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
} from 'react';

type LogoElement = RefObject<HTMLDivElement>;

export const useLogoAnimation = (
  wrapperRef: LogoElement,
  thinslicesRef: LogoElement,
  knowledgeRef: LogoElement,
  iconRef: LogoElement
) => {
  const [source, setSource] = useState<HTMLDivElement>();
  const delay = useRef<number>(0);

  const changeSource = useCallback(() => {
    const nextSource =
      source === thinslicesRef.current
        ? knowledgeRef.current
        : thinslicesRef.current;

    if (nextSource) {
      setSource(nextSource);
    }
  }, [source, knowledgeRef, thinslicesRef]);

  useEffect(() => {
    setTimeout(changeSource, delay.current);
    delay.current = delay.current === 3000 ? 8000 : 3000;
  }, [changeSource]);

  useLayoutEffect(() => {
    if (
      wrapperRef.current &&
      iconRef.current &&
      knowledgeRef.current &&
      thinslicesRef.current &&
      iconRef.current &&
      source
    ) {
      wrapperRef.current.style.width = `${knowledgeRef.current.offsetWidth}px`;
      wrapperRef.current.style.height = `${source.offsetHeight}px`;
      wrapperRef.current.style.clipPath = 'inset(0px 0px 0px 0px)';
      wrapperRef.current.style.transition = 'width .3s ease-out';

      iconRef.current.style.translate = `${
        thinslicesRef.current.offsetWidth - source.offsetWidth
      }px 0`;
      iconRef.current.style.transition =
        'all 1s cubic-bezier(0.68, -0.6, 0.32, 1.6)';

      if (source === thinslicesRef.current) {
        thinslicesRef.current.style.top = `${-1 * source.offsetHeight}px`;
        knowledgeRef.current.style.top = `0px`;
        iconRef.current.style.rotate = '135deg';
        thinslicesRef.current.style.transition = `top 1s cubic-bezier(0.68, -0.6, 0.32, 1.6)`;
        knowledgeRef.current.style.transition = `top 1s cubic-bezier(0.68, -0.6, 0.32, 1.6)`;
      } else {
        knowledgeRef.current.style.top = `${source.offsetHeight}px`;
        thinslicesRef.current.style.top = `0px`;
        iconRef.current.style.rotate = '0deg';
        thinslicesRef.current.style.transition = `top 1s cubic-bezier(0.68, -0.6, 0.32, 1.6)`;
        knowledgeRef.current.style.transition = `top 1s cubic-bezier(0.68, -0.6, 0.32, 1.6)`;
      }
    }
  }, [iconRef, knowledgeRef, source, thinslicesRef, wrapperRef]);
};
