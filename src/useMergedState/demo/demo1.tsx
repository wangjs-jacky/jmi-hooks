import { useCallback, useState } from 'react';

/* 受控组件示例用法 */
const ControlInput: React.FC = () => {
  /* 注：此时 value 不能为 undefined */
  const [value, setValue] = useState('');
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  return <input value={value} onChange={onChange} />;
};

export default ControlInput;
