import { useCallback, useRef } from 'react';
import { useDeepCompareEffectWithTarget } from '../useDeepCompareEffectWithTarget';
import { getTargetEelement, type TargetType } from '../utils/getTargetElement';

export const useMutationObserver = (
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

  useDeepCompareEffectWithTarget(
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
