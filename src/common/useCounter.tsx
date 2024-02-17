import { useState } from 'react';

export const useCounter = () => {
  // 用于测试是否存在闭包现象
  const [number, setNumber] = useState(0);
  const handleClick = () => {
    alert(`number: ${number}`);
  };
  const buttonEle = (
    <>
      <div>
        <span>Number：{number}</span>
      </div>
      <button
        type="button"
        onClick={() => {
          setNumber((x: number) => x + 1);
        }}
      >
        +1
      </button>
    </>
  );

  return [buttonEle, handleClick] as const;
};
