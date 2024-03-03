import { useCallback, useRef } from 'react';

/* 非受控组件使用 */
const UnControlInput: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('e.target.value', e.target.value);
  }, []);

  const getInstanceValue = () => {
    if (inputRef.current) {
      alert(inputRef.current.value);
    }
  };

  return (
    <div>
      <input ref={inputRef} onChange={onChange} defaultValue={'hello world'} />
      <button onClick={() => getInstanceValue()}>获取input中的值</button>
    </div>
  );
};

export default UnControlInput;
