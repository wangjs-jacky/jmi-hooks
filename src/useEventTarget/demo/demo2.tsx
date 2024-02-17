import { ChangeEvent, useState } from "react";

const Demo = () => {
  const defaultValue = "";
  const [inputValue, setInputValue] = useState(defaultValue);

  // 转换器
  const transformer = (val: string) => val.replace(/[^\d]/g, '');

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(transformer(event.target.value))
  }

  const reset = () => {
    setInputValue(defaultValue)
  }

  return (
    <div>
      <input onChange={onChange} value={inputValue} style={{ width: 200, marginRight: 20 }} placeholder="Please type here" />
      <button type="button" onClick={reset}>
        reset
      </button>
    </div>
  );
}
export default Demo;
