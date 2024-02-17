import { useEffect, useRef } from 'react';
import { Block } from '../../common/Block';
import { useCounter } from '../../common/useCounter';

const Demo = () => {
  const blockRef = useRef<HTMLDivElement>(null);

  // 测试闭包代码
  const [buttonEle, handleClick] = useCounter();

  useEffect(() => {
    blockRef.current?.addEventListener('click', handleClick);
    return () => {
      blockRef.current?.removeEventListener('click', handleClick);
    };
  }, []);

  /* 全局注册 click 事件 */
  // useEffect(() => {
  //   document.addEventListener('click', handleClick);
  //   return () => {
  //     document.removeEventListener('click', handleClick);
  //   };
  // }, []);

  return (
    <>
      <Block ref={blockRef}></Block>
      {buttonEle}
    </>
  );
};

export default Demo;
