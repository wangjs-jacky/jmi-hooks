import { ChangeEvent, useCallback, useRef, useState } from "react";

interface useEventTargetProps<T, U = T> {
  /** @name 初始值 */
  defaultValue?: string;
  /** @name 函数转换器 */
  transformer?: (value: U) => T;
}

export const useEventTarget = <T, U>({
  defaultValue = "",
  transformer = (x) => x,
}: useEventTargetProps<T>) => {
  const [inputValue, setInputValue] = useState(defaultValue);

  const transformerRef = useRef(transformer);
  transformerRef.current = transformer;

  const onChange = (event: ChangeEvent<U>) => {
    const _value = event.target.value as U;
    setInputValue(transformerRef.current(_value) as unknown as T)
  }

  const reset = () => {
    setInputValue(defaultValue);
  }

  return [
    inputValue,
    {
      onChange: useCallback((event: ChangeEvent<U>) => {
        onChange(event);
      }, []),
      reset: useCallback(() => {
        reset();
      }, []),
    }
  ] as const;
}
