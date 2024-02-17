import { useEffect, useRef, useState } from 'react';
import { useEventListener } from '../../useEventListener';

const Demo = () => {
  const [counter, setCounter] = useState(0);

  const blockRef = useRef<HTMLElement>(null);

  const addCounter = () => {
    setCounter((counter) => counter + 1);
  };

  useEventListener(
    'click',
    (event: Event) => {
      // 跳过的条件, 点击区域不能在限定范围内，可以通过 contains 这个 api 判定 dom 结构的嵌套关系
      if (event.target === blockRef.current || blockRef.current?.contains(event.target as HTMLElement)) {
        return;
      }
      addCounter();
    },
    { target: window },
  );

  return (
    <div>
      <button ref={blockRef}>box</button>
      <div>counter: {counter}</div>
    </div>
  );
};
export default Demo;
