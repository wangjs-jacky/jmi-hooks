import { useState } from 'react';
import { useEventListener } from '../useEventListener';
import { HTMLTargetType, getTargetEelement } from '../utils/getTargetElement';

export const useMouse = (target?: HTMLTargetType) => {
  const [mouse, setMouse] = useState({
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    screenX: 0,
    screenY: 0,
    elementX: 0,
    elementY: 0,
    elementPosX: 0,
    elementPosY: 0,
    elementW: 0,
    elementH: 0,
  });

  // 监听鼠标移动
  useEventListener('mousemove', (event: MouseEvent) => {
    const { screenX, screenY, clientX, clientY, pageX, pageY } = event;

    const targetElement = getTargetEelement(target) as Element;

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
        screenX,
        screenY,
        clientX,
        clientY,
        pageX,
        pageY,
        elementPosX,
        elementPosY,
        elementX,
        elementY,
        elementW: width,
        elementH: height,
      });
    }
  });

  return mouse;
};
