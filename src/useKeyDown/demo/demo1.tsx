import { useState } from 'react';
import { useEventListener } from '../../useEventListener';

const Demo = () => {
  const [count, setCount] = useState(0);

  useEventListener('keydown', (event: KeyboardEvent) => {
    // 通过 code 管理键盘
    if (event.code === 'ArrowUp') {
      setCount((c) => c + 1);
    }

    if (event.code === 'ArrowDown') {
      setCount((c) => c - 1);
    }
  });

  return (
    <div>
      <p>Try pressing the following: </p>
      <div>1. Press ArrowUp by key to increase</div>
      <div>2. Press ArrowDown by keyCode to decrease</div>
      <div>
        counter: <span style={{ color: '#f00' }}>{count}</span>
      </div>
    </div>
  );
};
export default Demo;
