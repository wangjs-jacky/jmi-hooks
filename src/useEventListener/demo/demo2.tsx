import { useEffect, useRef } from 'react';
import { Block } from '../../common/Block';
import { useCounter } from '../../common/useCounter';

const useEventListener = (
  eventName: string,
  handler: (e: Event) => void,
  options: any = {},
) => {
  const { targetRef = {} } = options;

  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  const useEventListener = (event: Event) => {
    return handlerRef.current(event);
  };

  useEffect(() => {
    const targetElement = 'current' in targetRef ? targetRef.current : window;
    targetElement?.addEventListener(eventName, useEventListener);
    return () => {
      targetElement?.removeEventListener(eventName, useEventListener);
    };
  }, []);
};

const Demo = () => {
  const [buttonEle, handleClick] = useCounter();
  const blockRef = useRef<HTMLDivElement>(null);

  useEventListener('click', handleClick, { targetRef: blockRef });

  return (
    <>
      <Block ref={blockRef} />
      {buttonEle}
    </>
  );
};

export default Demo;
