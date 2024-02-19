import { useState } from 'react';
import { useEventListener } from '../../useEventListener';

const Demo = () => {
  const [mouse, setMouse] = useState({
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    screenX: 0,
    screenY: 0,
  });

  // 监听鼠标移动
  useEventListener('mousemove', (event: MouseEvent) => {
    const { screenX, screenY, clientX, clientY, pageX, pageY } = event;

    setMouse(() => {
      return {
        ...mouse,
        screenX,
        screenY,
        clientX,
        clientY,
        pageX,
        pageY,
      };
    });
  });

  return (
    <div>
      <p>
        Client - x: {mouse.clientX}, y: {mouse.clientY}
      </p>
      <p>
        Page - x: {mouse.pageX}, y: {mouse.pageY}
      </p>
      <p>
        Screen - x: {mouse.screenX}, y: {mouse.screenY}
      </p>
    </div>
  );
};
export default Demo;
