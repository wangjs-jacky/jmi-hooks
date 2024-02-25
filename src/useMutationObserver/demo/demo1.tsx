import { useEffect, useRef, useState } from 'react';

const Demo = () => {
  // 选择需要观察变动的节点
  const ref = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState(200);
  const [count, setCount] = useState(0);

  // 观察器的配置（需要观察什么变动）
  const config: MutationObserverInit = {
    attributes: true,
    childList: true,
    subtree: true,
  };

  // 当观察到变动时执行的回调函数
  const callback: MutationCallback = function (mutationsList, observer) {
    mutationsList.forEach(() => setCount((c) => c + 1));
  };

  useEffect(() => {
    // 创建一个观察器实例并传入回调函数
    const observer = new MutationObserver(callback);
    // 以上述配置开始观察目标节点
    observer.observe(ref.current!, config);
    return () => {
      // 之后，可停止观察
      observer.disconnect();
    };
  }, []);

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
