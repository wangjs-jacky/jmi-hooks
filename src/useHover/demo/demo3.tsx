import { useRef } from 'react';
import { useHover } from '..';
import { Block } from '../../common/Block';

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
