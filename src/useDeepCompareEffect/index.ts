import { isEqual } from 'lodash-es';
import { useEffect, useRef } from 'react';

export const useDeepCompare = (callback: any, deps: any[]) => {
  const depsRef = useRef(deps);
  const updateRef = useRef({});

  // 更新条件：
  // 情况一：deps 不存在值，不去进行深比较，直接出触发 effect 的 callback
  // 情况二：deps 存在值，则使用深比较判断
  if (deps === undefined || !isEqual(deps, depsRef.current)) {
    depsRef.current = deps;
    updateRef.current = {};
  }

  // 使用 updateRef 去触发 useEffect 的更新机制
  useEffect(callback, [updateRef.current]);
};
