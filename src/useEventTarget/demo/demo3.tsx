import { ChangeEvent, useState } from "react";

interface useEventTargetProps<T, U = T> {
  defaultValue?: string;
  transformer: (value: U) => T;
}

const useEventTarget = <T, U>({
  defaultValue = "",
  transformer,
}: useEventTargetProps<T>) => {
  const [inputValue, setInputValue] = useState(defaultValue);

  const onChange = (event: ChangeEvent<U>) => {
    setInputValue(transformer(event.target.value))
  }

  const reset = () => {
    setInputValue(defaultValue);
  }

  return [
    inputValue,
    {
      onChange,
      reset,
    }
  ] as const;
}


const Demo = () => {
  const defaultValue = "";
  // 转换器
  const transformer = (val: string) => val.replace(/[^\d]/g, '');

  const [inputValue, { onChange, reset }] = useEventTarget({
    defaultValue,
    transformer
  })


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
