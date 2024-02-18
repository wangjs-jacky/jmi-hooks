import { useRef, useState } from 'react';
import { Block } from '../../common/Block';
import { useEventListener } from '../../useEventListener';
import { HTMLTargetType } from '../../utils/getTargetElement';

interface UseHoverOptionsType {
  target: HTMLTargetType;
}

const useHover = ({ target }: UseHoverOptionsType) => {
  const [isHover, setIsHover] = useState(false);

  useEventListener(
    'mouseenter',
    () => {
      setIsHover(true);
    },
    { target: target },
  );

  // DOM 支持传入 Function 模式
  useEventListener(
    'mouseleave',
    () => {
      setIsHover(false);
    },
    { target: () => document.getElementById('test2') },
  );

  return { isHover };
};

const Demo = () => {
  const blockRef = useRef(null);

  const { isHover } = useHover({
    target: blockRef,
  });

  return (
    <div>
      <Block id="test2" ref={blockRef}>
        {'鼠标悬浮'}
      </Block>
      <div>悬浮状态: {isHover ? 'hover' : 'leaveHover'}</div>
    </div>
  );
};
export default Demo;
