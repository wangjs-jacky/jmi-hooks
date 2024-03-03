import { FC, useRef } from 'react';
import { EventEmitter, useEventEmitter } from '..';

const MessageBox: FC<{
  eventBus$: EventEmitter<void>;
}> = function (props) {
  const { eventBus$ } = props;
  return (
    <button onClick={() => /* emit 触发事件 */ eventBus$.emit()}>
      {' '}
      点击触发 input 聚焦{' '}
    </button>
  );
};

const InputBox: FC<{
  eventBus$: EventEmitter<void>;
}> = function (props) {
  const inputRef = useRef<any>();
  const { eventBus$ } = props;

  /* on 事件 */
  eventBus$.useOn(() => {
    inputRef.current.focus();
  });
  return <input ref={inputRef} style={{ marginLeft: 10 }} />;
};

const Demo = () => {
  /* 保证单例 */
  const eventBus$ = useEventEmitter();
  return (
    <>
      <MessageBox eventBus$={eventBus$} />
      <InputBox eventBus$={eventBus$} />
    </>
  );
};
export default Demo;
