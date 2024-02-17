import { useRef, useState } from 'react';
import { useEventListener } from '..';
import { Block } from '../../common/Block';
import { useCounter } from '../../common/useCounter';

const Demo = () => {
  const [buttonEle, handleClick] = useCounter();
  const blockRef = useRef<HTMLDivElement>(null);
  const blockRef2 = useRef<HTMLDivElement>(null);

  // 测试切换 target 对象
  const [target, setTarget] = useState(blockRef);

  useEventListener('click', handleClick, { target: target });

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Block ref={blockRef} showText={target === blockRef} />
        <Block
          ref={blockRef2}
          style={{ backgroundColor: '#f60' }}
          showText={target === blockRef2}
        />
      </div>

      {buttonEle}
      <div>
        <button
          onClick={() => {
            if (target === blockRef) {
              setTarget(blockRef2);
            } else {
              setTarget(blockRef);
            }
          }}
        >
          切换 target 对象
        </button>
      </div>
    </>
  );
};

export default Demo;
