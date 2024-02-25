import { useRef, useState } from 'react';
import { useMutationObserver } from '..';

const Demo = () => {
  // 选择需要观察变动的节点
  const ref = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState(200);
  const [count, setCount] = useState(0);

  // config 此时无需使用 `useMemo`
  const config: MutationObserverInit = {
    attributes: true,
    childList: true,
    subtree: true,
  };
  // 当观察到变动时执行的回调函数
  const callback: MutationCallback = function (mutationsList, observer) {
    mutationsList.forEach(() => setCount((c) => c + 1));
  };

  useMutationObserver(callback, ref, config);

  return (
    <div>
      <div
        ref={ref}
        style={{
          width,
          padding: 12,
          border: '1px solid #000',
          marginBottom: 8,
        }}
      >
        current width：{width}
      </div>
      <button onClick={() => setWidth((w) => w + 10)}>widening</button>
      <p>Mutation count {count}</p>
    </div>
  );
};
export default Demo;
