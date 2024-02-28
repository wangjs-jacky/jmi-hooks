import { isEqual } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';

const useDeepCompare = (callback: any, deps: any[]) => {
  const firstMountRef = useRef(false);
  const depsRef = useRef(deps);
  //  depsRef.current = deps; 不能写在这里，有问题

  useEffect(() => {
    console.log('触发更新');

    if (!firstMountRef.current) {
      // mount 阶段
      firstMountRef.current = true;
      depsRef.current = deps;
      return;
    } else {
      if (!isEqual(depsRef.current, deps)) {
        // update 阶段 (当 useEffect 中不存在 [] 时，可以不适用 ref 缓存)
        callback();
        depsRef.current = deps;
      }
    }
  });
};

const Demo = () => {
  const [booleanState, setBooleanState] = useState(true);
  const [options, setOptions] = useState({});

  useDeepCompare(() => {
    alert('布尔值更新');
  }, [booleanState]);

  useDeepCompare(() => {
    alert('options 发生变化');
  }, [options]);

  return (
    <div>
      <button onClick={() => setBooleanState((b) => !b)}>更新布尔值类型</button>
      <button onClick={() => setOptions({})}>更新布尔值类型</button>
    </div>
  );
};
export default Demo;
