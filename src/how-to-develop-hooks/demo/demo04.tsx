import { useCallback, useEffect, useState } from 'react';

const useXXX = ({ fn }) => {
  // case 1️: 使用 useEffect 时，函数被异步延迟执行，fn 会形成闭包
  useEffect(() => {
    // fn();
  }, []);

  // case 1 - additional : 理由同上，注意此时闭包并非由 setTimeout 引起，每次渲染，setTimeout 会产生一个新的引用地址。
  // 此时 useEffect 起到了类似于 useCallback 的作用
  useEffect(() => {
    setTimeout(() => {
       // fn();
    }, 2000);
  }, []);

  const fn2 = useCallback(() => {
    setTimeout(() => {
      fn();
    }, 0);
  }, []);

  return {
    // case 2： 函数延迟调用, 由于每次都会返回新的引用地址，不存在闭包问题
    fn: () => {
      setTimeout(() => {
        fn();
      }, 0);
    },
    // case 3：使用 useCallback 时，函数被延迟执行，fn 会形成闭包。
    fn2: fn2,
  };
};

const Demo = () => {
  const [count, setCount] = useState(0);
  const { fn, fn2 } = useXXX({
    fn: () => {
      alert(count);
    },
  });
  return (
    <>
      <div>{count}</div>
      <button
        onClick={() => {
          setCount((count) => count + 1);
        }}
      >
        {'修改 count'}
      </button>
      <button onClick={fn}>不会产生闭包</button>
      <button onClick={fn2}>产生闭包</button>
    </>
  );
};

export default Demo;
