import { useEventTarget } from "..";

const Demo = () => {
  // 转换器
  const transformer = (val: string) => val.replace(/[^\d]/g, '');

  const [inputValue, { onChange, reset }] = useEventTarget({
    defaultValue: "",
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
