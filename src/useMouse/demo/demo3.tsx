import { useRef } from 'react';
import { useMouse } from '..';
import { Block } from '../../common/Block';

const Demo = () => {
  const blockRef = useRef<HTMLDivElement>(null);
  const mouse = useMouse(blockRef);
  return (
    <div>
      <Block ref={blockRef} style={{ width: '300px', height: '300px' }}>
        {'获取鼠标在元素内的定位'}
      </Block>
      <p>
        Client - x: {mouse.clientX}, y: {mouse.clientY}
      </p>
      <p>
        Page - x: {mouse.pageX}, y: {mouse.pageY}
      </p>
      <p>
        Screen - x: {mouse.screenX}, y: {mouse.screenY}
      </p>
      <p>
        鼠标相对于 Element 的位置 - x: {mouse.elementX}, y: {mouse.elementY}
      </p>
      <p>
        Element 相对 Page 的位置 - x: {mouse.elementPosX}, y:{' '}
        {mouse.elementPosY}
      </p>
      <p>
        Element 尺寸 - width: {mouse.elementW}, height: {mouse.elementH}
      </p>
    </div>
  );
};
export default Demo;
