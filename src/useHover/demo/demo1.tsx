import { useRef, useState } from 'react';
import { Block } from '../../common/Block';
import { useEventListener } from '../../useEventListener';

const Demo = () => {
  const blockRef = useRef(null);

  const [isHover, setIsHover] = useState(false);

  useEventListener(
    'mouseenter',
    () => {
      setIsHover(true);
    },
    { target: blockRef },
  );

  // DOM 支持传入 Function 模式
  useEventListener(
    'mouseleave',
    () => {
      setIsHover(false);
    },
    { target: () => document.getElementById('test') },
  );

  return (
    <div>
      <Block id="test" ref={blockRef}>
        {'鼠标悬浮'}
      </Block>
      <div>悬浮状态: {isHover ? 'hover' : 'leaveHover'}</div>
    </div>
  );
};
export default Demo;
