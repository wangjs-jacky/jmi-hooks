import { useState } from 'react';
import { useMergedState } from '..';

/* 保证最后的状态始终受控 */
function fixControlledValue<T>(value: T): string {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }
  return String(value);
}

/* 同时兼容： defaultValue + value + onChange 属性 */
const Input = (props: any) => {
  const { defaultValue, value, onChange, ...restProps } = props;
  const [_value, _onChange] = useMergedState<string>('hello world', {
    defaultValue: defaultValue,
    value: value,
    onChange: onChange,
  });

  /* 改造思路：完全采用受控模式 */
  return <input value={_value} onChange={_onChange} {...restProps} />;
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
          value={fixControlledValue(inputValue)}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      </div>
    </div>
  );
};
export default Demo;
