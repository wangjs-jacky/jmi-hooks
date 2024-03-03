import React, {
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

/* 同时兼容： defaultValue + value + onChange 属性 */
const Input = (props: any) => {
  const {
    /* controlled attribute*/
    value,
    /* uncontrolled attributes */
    defaultValue,
    onChange,
    ...rest
  } = props;

  /**
   * 初始化：维护内部 innerValue 状态，input 采用完全受控模式
   */
  const [innerValue, setInnerValue] = useState(() => {
    if (typeof value !== 'undefined') {
      return value;
    } else {
      // 当 value 为 undefined 时，返回 defaultValue 值
      return defaultValue;
    }
  });

  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    /* 判断当前是否为非受控模式，只有非说受控模式才允许被修改 */
    if (typeof value === 'undefined') {
      setInnerValue(inputValue);
    }
    // setInnerValue(inputValue);

    if (onChange) {
      onChange(e);
    }
  };

  /* 受控状态：取决于外部 props.value 值 */
  useEffectUpdate(() => {
    setInnerValue(value);
  }, [value]);

  /* 保证最后的状态始终受控 */
  function fixControlledValue<T>(value: T): string {
    if (typeof value === 'undefined' || value === null) {
      return '';
    }
    return String(value);
  }

  /* 改造思路：完全采用受控模式 */
  return (
    <input
      value={fixControlledValue(innerValue)}
      onChange={_onChange}
      {...rest}
    />
  );
};

const Demo = () => {
  const [inputValue, setInputValue] = useState<string | undefined>(undefined);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        子组件的输入框: <Input value={inputValue} defaultValue="hello world!" />
      </div>
      <div>
        <button
          onClick={() => {
            setInputValue(undefined);
          }}
        >
          子组件切换为非受控模式
        </button>
      </div>
      <div>
        父组件的输入框:{' '}
        <input
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      </div>
    </div>
  );
};
export default Demo;
