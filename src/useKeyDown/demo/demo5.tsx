import { useState } from 'react';
import { useKeyDown } from '..';

const Demo = () => {
  const [state, setState] = useState<number>();

  const keyCallbackMap: Record<string, any> = {
    c: () => {
      setState(0);
    },
    meta: () => {
      setState(2);
    },
    'ctrl.shift.c': () => {
      setState(3);
    },
    'ctrl.enter': () => {
      setState(4);
    },
  };

  useKeyDown(
    ['c', 'meta', 'ctrl.shift.c', 'ctrl.enter', 'ctrl.alt.0'],
    (event, key) => {
      keyCallbackMap[key]?.();

      if (event.ctrlKey && event.altKey && event.code === 'Digit0') {
        setState(5);
      }
    },
  );

  useKeyDown(['shift.c'], () => {
    setState(1);
  });

  return (
    <div>
      <p>Try pressing the following: </p>
      <div>0. Modifier key [c]: {state === 0 && '✅'}</div>
      <div>1. Modifier key [shift.c]: {state === 1 && '✅'}</div>
      <div>2. Modifier key [meta]: {state === 2 && '✅'}</div>
      <div>3. Modifier key [ctrl.alt.c]: {state === 3 && '✅'}</div>
      <div>4. Modifier key [ctrl.enter]: {state === 4 && '✅'}</div>
      <div>5. Modifier key [ctrl.alt.0]: {state === 5 && '✅'}</div>
    </div>
  );
};
export default Demo;
