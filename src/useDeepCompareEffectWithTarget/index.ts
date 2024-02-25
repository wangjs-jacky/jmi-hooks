// 函数技巧：
// 直接基于 useEffectWithTarget 即可 useDeepCompareEffectWithTarget

import { isEqual } from 'lodash-es';
import { DependencyList, EffectCallback, useRef } from 'react';
import { useEffectWithTarget } from '../useEffectWithTarget';
import { HTMLTargetType } from '../utils/getTargetElement';

// 直接使用 loadash 进行深比较
const depsEqual = (oldDeps: DependencyList, newDeps: DependencyList) => {
  return isEqual(oldDeps, newDeps);
};

export const useDeepCompareEffectWithTarget = (
  effect: EffectCallback,
  deps: DependencyList,
  // 支持监听多个 DOM 结构
  target: HTMLTargetType | HTMLTargetType[] = [],
) => {
  const depsRef = useRef<DependencyList>([]);
  // 用于触发更新，内部使用 Object.is 判断，只需引用不同即可。
  const signalRef = useRef({});

  if (!depsEqual(deps, depsRef.current)) {
    // 更新函数
    depsRef.current = deps;
    signalRef.current = {};
  }

  useEffectWithTarget(effect, [signalRef.current], target);
};
