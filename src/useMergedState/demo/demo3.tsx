import { useState } from 'react';

const Demo: React.FC<any> = () => {
  const [value, setValue] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <input value={value} onChange={onChange} defaultValue={'hello world'} />
  );
};

export default Demo;
