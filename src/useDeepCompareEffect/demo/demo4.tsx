import { isEqual } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';

const useDeepCompare = (callback: any, deps: any[]) => {
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

const Demo = () => {
  const [booleanState, setBooleanState] = useState(true);
  const [options, setOptions] = useState({});
  const isFirstMount = useRef(false);
  const isFirstMount2 = useRef(false);

  useDeepCompare(() => {
    if (!isFirstMount.current) {
      isFirstMount.current = true;
    } else {
      alert('布尔值更新');
    }
  }, [booleanState]);

  useDeepCompare(() => {
    if (!isFirstMount2.current) {
      isFirstMount2.current = true;
    } else {
      alert('options 发生变化');
    }
  }, [options]);

  return (
    <div>
      <button onClick={() => setBooleanState((b) => !b)}>更新布尔值类型</button>
      <button onClick={() => setOptions({})}>更新布尔值类型</button>
    </div>
  );
};
export default Demo;
