import { useRef, useState } from 'react';
import { Block } from '../../common/Block';
import { useEventListener } from '../../useEventListener';
import { getTargetEelement } from '../../utils/getTargetElement';

const Demo = () => {
  const blockRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({
    elementX: 0,
    elementY: 0,
    elementPosX: 0,
    elementPosY: 0,
    elementW: 0,
    elementH: 0,
  });

  // 监听鼠标移动
  useEventListener('mousemove', (event: MouseEvent) => {
    const { pageX, pageY } = event;

    const targetElement = getTargetEelement(blockRef) as Element;

    if (targetElement) {
      const {
        /* element 元素左上角坐标 */
        left,
        top,
        /* element 尺寸元素 */
        width,
        height,
      } = targetElement.getBoundingClientRect();

      // 计算两个位置：
      // 1、鼠标相对于 page 的距离
      const elementPosX =
        left +
        window.scrollX; /* 使用 scrollX 获取水平滚动距离，其中 pageXOffset 被废弃了 */
      const elementPosY =
        top +
        window.scrollY; /* 使用 scrollX 获取水平滚动距离，其中 pageXOffset 被废弃了 */

      // 2. 鼠标相对于 element 的位置
      const elementX = pageX - elementPosX;
      const elementY = pageY - elementPosY;
      setMouse({
        ...mouse,
        elementPosX,
        elementPosY,
        elementX,
        elementY,
        elementW: width,
        elementH: height,
      });
    }
  });

  return (
    <div>
      <Block ref={blockRef} style={{ width: '300px', height: '300px' }}>
        {'获取鼠标在元素内的定位'}
      </Block>
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
