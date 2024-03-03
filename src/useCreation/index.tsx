import { useRef, type DependencyList } from 'react';
import { depsAreSame } from '../utils/depsAreSame';

export const useCreation = <T,>(fn: () => T, deps: DependencyList) => {
  const isFirstMount = useRef(false);
  const depsRef = useRef(deps);
  const objRef = useRef<T>();

  // 何时执行：初始化执行 || deps 不同时更新
  if (isFirstMount.current === false || !depsAreSame(depsRef.current, deps)) {
    objRef.current = fn();
    isFirstMount.current = true;
    // 更新依赖数组
    depsRef.current = deps;
  }

  // 这里类型推断错误，objRef 一定为非空
  return objRef as React.MutableRefObject<T>;
};
