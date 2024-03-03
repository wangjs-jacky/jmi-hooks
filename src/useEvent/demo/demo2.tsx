import React, { useCallback, useState } from 'react';
import { useEvent } from '..';

const Demo: React.FC<any> = React.memo(() => {
  /* 环境变量 */
  const [count, setCount] = useState(0);

  // ❎ 错误案例：存在闭包问题
  const onClick = useCallback(() => {
    alert(count);
  }, []); /* 缺少 count 变量*/

  const onClick2 = useCallback(() => {
    alert(count);
  }, [count]);

  const onClick3 = useEvent(() => {
    alert(count);
  });

  return (
    <>
      <button onClick={() => setCount(count + 1)}>count+1</button>
      <p>{count}</p>
      <button onClick={onClick}>闭包现象</button>
      <button onClick={onClick2}>useCallback 依赖数组</button>
      <button onClick={onClick3}>useEvent</button>
    </>
  );
});

export default Demo;
