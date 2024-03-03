import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type DependencyList,
  type EffectCallback,
} from 'react';

const useEffectUpdate = (effect: EffectCallback, deps: DependencyList) => {
  const isFirstMount = useRef(false);
  useEffect(() => {
    if (!isFirstMount.current) {
      isFirstMount.current = true;
    } else {
      effect();
    }
  }, deps);
};

interface UseMergedStateOptionType<T> {
  value?: T;
  onChange?: (value: T, prevValue?: T) => void;
  defaultValue?: T | (() => T);
}

export const useMergedState = <T,>(
  defaultStateValue: T,
  options: UseMergedStateOptionType<T>,
) => {
  const { value, defaultValue, onChange } = options || {};

  /**
   * 初始化：维护内部 innerValue 状态，input 采用完全受控模式
   */
  const [innerValue, setInnerValue] = useState(() => {
    if (value !== undefined) {
      return value;
    } else if (defaultValue !== undefined) {
      return typeof defaultValue === 'function'
        ? (defaultValue as any)()
        : defaultValue;
    } else {
      return typeof defaultStateValue === 'function'
        ? (defaultStateValue as any)()
        : defaultStateValue;
    }
  });

  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInnerValue(inputValue);
    if (onChange) {
      onChange(e);
    }
  };

  const _onChangeFn = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    _onChange(e);
  }, []);

  /* 受控状态：取决于外部 props.value 值 */
  useEffectUpdate(() => {
    if (value !== undefined) {
      setInnerValue(value);
    }
  }, [value]);

  return [innerValue, _onChangeFn];
};
