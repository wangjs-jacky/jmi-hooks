import { useCallback, useEffect, useRef, useState } from 'react';

function Counter() {
  // 闭包变量
  const [count, setCount] = useState(0);

  // useEffect 通过依赖项，锁死函数引用地址了
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log(count);
      setCount(count + 1); // count 永远为 0
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <div>{count}</div>
    </>
  );
}

export default Counter;
