import { useState, useRef } from 'react';
import { useClickAway } from '..';

export default () => {
  const [counter, setCounter] = useState(0);
  const ref1 = useRef<HTMLButtonElement>(null);
  const ref2 = useRef<HTMLButtonElement>(null);
  useClickAway<HTMLButtonElement>({
    eventName: ["mousemove", "click"],
    fn: () => {
      setCounter((s) => s + 1);
    },
    target: [ref1, ref2]
  });

  return (
    <div>
      <button type="button" ref={ref1}>
        box1
      </button>
      <button type="button" ref={ref2} style={{ marginLeft: 16 }}>
        box2
      </button>
      <p>counter: {counter}</p>
    </div>
  );
};
