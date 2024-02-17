import { useState } from 'react';

function Counter() {
  // 闭包变量
  const [count, setCount] = useState(0);

  // 直接写会发生内存泄露
  //   setInterval(() => {
  //     setCount(count + 1);
  //   }, 1000);

  // ✅ 符合预期，但存在内存泄露
  let timer: NodeJS.Timeout | null = setInterval(() => {
    setCount(count + 1);
    // 删除每次 setInterval 生成的 timer
    clearInterval(timer!);
    timer = null;
  }, 1000);

  // 🚨 setInterval 的定义逻辑(1s 一个定义)，随时可能被 setState 更新打破

  return (
    <>
      <div>{count}</div>
    </>
  );
}

export default Counter;
