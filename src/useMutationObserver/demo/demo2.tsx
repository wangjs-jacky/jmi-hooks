import { useCallback, useMemo, useRef, useState } from 'react';
import { useEffectWithTarget } from '../../useEffectWithTarget';
import {
  getTargetEelement,
  type TargetType,
} from '../../utils/getTargetElement';

const useMutationObserver = (
  fn: MutationCallback,
  // 不支持绑定在 Window | Document 类型上
  target: TargetType<HTMLElement | Element | null | undefined>,
  options: MutationObserverInit = {},
) => {
  const fnRef = useRef<MutationCallback>(fn);
  fnRef.current = fn;

  // 此时没有必要使用 fn 进行缓存，因为不会透传给 useEffect 的依赖数组
  const _fn = useCallback<MutationCallback>((mutationsList, observer) => {
    fnRef.current?.(mutationsList, observer);
  }, []);

  useEffectWithTarget(
    () => {
      const targetElement = getTargetEelement(target);
      if (!targetElement) {
        return;
      }
      // 创建一个观察器实例并传入回调函数
      const observer = new MutationObserver(_fn);
      // 以上述配置开始观察目标节点
      observer.observe(targetElement, options);
      return () => {
        // 停止观察
        observer.disconnect();
      };
    },
    [options],
    target,
  );
};

const Demo = () => {
  // 选择需要观察变动的节点
  const ref = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState(200);
  const [count, setCount] = useState(0);

  // 观察器的配置(由于当前属于浅比较模式，需要改造 useMutationObserver 模式才可以，临时使用 useMemo 控制一下)
  const config: MutationObserverInit = useMemo(() => {
    return { attributes: true, childList: true, subtree: true };
  }, []);

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
