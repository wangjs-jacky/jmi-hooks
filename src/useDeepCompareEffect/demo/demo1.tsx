import { useEffect, useRef, useState } from 'react';

// 仅记录变化信息
const useUpdate = (callback, deps) => {
  const firstMountRef = useRef(false);

  useEffect(() => {
    if (!firstMountRef.current) {
      // mount 阶段
      firstMountRef.current = true;
      return;
    } else {
      // update 阶段
      callback();
    }
  }, deps);
};

const Demo = () => {
  const [booleanState, setBooleanState] = useState(true);
  const [options, setOptions] = useState({});

  useUpdate(() => {
    alert('布尔值更新');
  }, [booleanState]);

  useUpdate(() => {
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
