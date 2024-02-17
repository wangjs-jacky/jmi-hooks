import { ChangeEvent, useState } from "react";

const Demo = () => {
  const defaultValue = "this is initial value";
  const [inputValue, setInputValue] = useState(defaultValue);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const reset = () => {
    setInputValue(defaultValue)
  }

  return (
    <div>
      <input onChange={onChange} value={inputValue} style={{ width: 200, marginRight: 20 }} />
      <button type="button" onClick={reset}>
        reset
      </button>
    </div>
  );
}
export default Demo;
