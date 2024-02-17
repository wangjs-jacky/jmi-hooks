import { useCallback, useRef } from 'react';
import { useCounter } from '../../common/useCounter';

const useXXX = ({ fn }: { fn: () => void }) => {
  // 1. 使用 ref 缓存
  const fnRef = useRef(fn);
  fnRef.current = fn;

  // 2. 再包一层，并通过 useCallback 锁死引用地址
  const fn2 = useCallback(() => {
    fnRef.current();
  }, []);

  return {
    fn: fn,
    // ✅ 锁死引用地址，又解决了闭包的问题
    fn2: fn2,
  };
};

const Demo = () => {
  // 测试闭包代码
  const [buttonEle, handleClick] = useCounter();

  // fn: 每次都会返回一个新的引用地址（当绑定在 jsx 元素上时，会引起重复渲染）
  // fn2: 引用地址通过 useCallback 锁死
  const { fn, fn2 } = useXXX({
    fn: handleClick,
  });

  return (
    <>
      {buttonEle}
      <div>
        <button onClick={fn}>无闭包，新的引用地址</button>
        <button onClick={fn2}>无闭包，引用地址不变，也能解决闭包问题</button>
      </div>
    </>
  );
};

export default Demo;
