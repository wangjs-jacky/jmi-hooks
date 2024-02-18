import { useState } from 'react';
import { useEventListener } from '../useEventListener';
import { HTMLTargetType } from '../utils/getTargetElement';

interface UseHoverOptionsType {
  /** @name 传入需要监听的元素 */
  target: HTMLTargetType;
  options?: {
    onEnter?: any;
    onLeave?: any;
    onChange?: (isHover: boolean) => void;
  };
}

export const useHover = ({ target, options = {} }: UseHoverOptionsType) => {
  const { onEnter, onLeave, onChange } = options;
  const [isHover, setIsHover] = useState(false);

  useEventListener(
    'mouseenter',
    () => {
      setIsHover(true);
      onEnter?.();
      onChange?.(true);
    },
    { target: target },
  );

  // DOM 支持传入 Function 模式
  useEventListener(
    'mouseleave',
    () => {
      setIsHover(false);
      onLeave?.();
      onChange?.(false);
    },
    { target: target },
  );

  return { isHover };
};
