import { useCallback, useRef, useState } from 'react';
import { useDeepCompareEffectWithTarget } from '../useDeepCompareEffectWithTarget';
import { HTMLTargetType, getTargetEelement } from '../utils/getTargetElement';

export interface UseInViewportOptionsType extends IntersectionObserverInit {
  /** @name 回调函数，当触发显示阈值时触发*/
  fn: (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver,
  ) => void;
  /** @name 监听范围，若为null，默认为全局监听 */
  root?: Element | Document | null;
  /** @name 根周围的边距,默认值为全零。示例："10px 20px 30px 40px"（上、右、下、左)"*/
  rootMargin?: string;
  /** @name 阈值列表：可以提供一个或多个数值，代表目标元素可见度的百分比。 */
  threshold?: number | number[];
}

export const useInViewport = (
  target: HTMLTargetType,
  options: UseInViewportOptionsType,
) => {
  // 注意过滤出 fn
  const { fn, root, ...restOptions } = options || {};

  const fnRef = useRef(fn);
  fnRef.current = fn;

  const [inViewport, setInViewport] = useState(true);
  const [ratio, setRatio] = useState(0);

  const _fn = useCallback(
    (entry: IntersectionObserverEntry, observer: IntersectionObserver) => {
      fnRef.current(entry, observer);
    },
    [],
  );

  useDeepCompareEffectWithTarget(
    () => {
      // 监听多个对象
      const targets = Array.isArray(target) ? target : [target];
      const els = targets
        .map((element) => getTargetEelement(element))
        .filter(Boolean);

      // 调用回调时，系统会接收一个 IntersectionObserverEntry 对象列表，每个观察到的目标都会有一个对象
      const observer = new IntersectionObserver(
        (entries, observer) => {
          for (const entry of entries) {
            setInViewport(entry.isIntersecting);
            setRatio(entry.intersectionRatio);
            _fn?.(entry, observer);
          }
        },
        {
          ...restOptions,
          root: getTargetEelement(root),
        },
      );

      // 开启监听列表
      els.forEach((el) => {
        if (el) {
          observer.observe(el);
        }
      });

      return () => {
        observer.disconnect();
      };
    },
    [restOptions],
    [target, root],
  );

  return [inViewport, ratio] as const;
};
