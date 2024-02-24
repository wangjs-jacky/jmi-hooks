import { useState } from 'react';
import { useEventListener } from '../../useEventListener';

const Demo = () => {
  const [state, setState] = useState<number>();

  // 组合键监听
  useEventListener('keydown', (event: KeyboardEvent) => {
    console.log('event', event.shiftKey, event.code, event.key, event.keyCode);

    if (event.shiftKey && event.code === 'KeyC') {
      setState(1);
    }

    if (event.metaKey) {
      setState(2);
    }

    if (event.ctrlKey && event.altKey && event.code === 'KeyC') {
      setState(3);
    }

    if (event.code === 'Enter') {
      setState(4);
    }

    if (event.ctrlKey && event.altKey && event.code === 'Digit0') {
      setState(5);
    }
  });

  // 开启严格模式，排除【修饰键】
  useEventListener('keydown', (event: KeyboardEvent) => {
    if (
      event.code === 'KeyC' &&
      !event.shiftKey &&
      !event.ctrlKey &&
      !event.altKey &&
      !event.metaKey
    ) {
      setState(0);
    }
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
