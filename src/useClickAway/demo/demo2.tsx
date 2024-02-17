import { useRef, useState } from 'react';
import { useEventListener } from '../../useEventListener';
import { TargetType } from '../../utils/getTargetElement';

interface UseClickAwayPropsType<T> {
  fn: (event?: T) => void,
  target: TargetType<T> | TargetType<T>[],
  eventName: 'click',
}

const useClickAway = <T,>(options: UseClickAwayPropsType<T>) => {
  const { eventName = "click", fn = () => { }, target } = options;

  const fnRef = useRef(fn);
  fnRef.current = fn;

  useEventListener(
    eventName,
    (event: Event) => {
      // 跳过的条件, 点击区域不能在限定范围内，可以通过 contains 这个 api 判定 dom 结构的嵌套关系
      if (event.target === target.current || target.current?.contains(event.target as HTMLElement)) {
        return;
      }
      fnRef.current();
    },
    { target: window },
  );
}

const Demo = () => {
  const [counter, setCounter] = useState(0);

  // useRef(null) 创建的类型是 RefObject 其中，current 为只读属性无法修改
  const blockRef = useRef<HTMLButtonElement>(null);

  const addCounter = () => {
    setCounter((counter) => counter + 1);
  };

  useClickAway({
    eventName: 'click',
    fn: addCounter,
    target: blockRef,
  })

  return (
    <div>
      <button ref={blockRef}>box</button>
      <div>counter: {counter}</div>
    </div>
  );
};
export default Demo;

