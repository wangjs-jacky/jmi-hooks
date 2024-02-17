/*
  本教程的核心理念对 ahooks 进行源码简析，以最简易的方式讲解清楚 ahooks 工作的原理，并不追求钩子编写的尽善尽美。

  对于 useEventListen而 对比 ahooks 仍可改进的点：
  1. useEventListener 的多类型定义。
  2. targetElement 的获取方式改进
  3. addEventListener 支持透传第三个参数

  学有余力时，将后续代码补充至仓库的 github issues 中
*/

import { useRef } from 'react';
import { useEffectWithTarget } from '../useEffectWithTarget';
import { HTMLTargetType, getTargetEelement } from '../utils/getTargetElement';

type DocumentEventKey = keyof DocumentEventMap;

export const useEventListener = (
  eventName: DocumentEventKey,
  handler: (e: Event) => void,
  options: UseEventListenerOptionsType = {},
) => {
  const { target = window } = options;

  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  const useEventListener = (event: Event) => {
    return handlerRef.current(event);
  };

  useEffectWithTarget(
    () => {
      const targetElement = getTargetEelement(target);
      targetElement?.addEventListener(eventName, useEventListener);
      return () => {
        targetElement?.removeEventListener(eventName, useEventListener);
      };
    },
    [eventName],
    target,
  );
};

export interface UseEventListenerOptionsType {
  /** @name 监听的DOM元素 */
  target?: HTMLTargetType;
}

export interface UseEventListener2OptionsType {
  /** @name 事件名 */
  eventName: string,
  /** @name 回调函数 */
  fn: (e: Event) => void,
  options: UseEventListenerOptionsType,
}

export const useEventListener2 = (
  { eventName, fn = () => { }, options = {} }: UseEventListener2OptionsType
) => {
  const { target } = options;

  const handlerRef = useRef(fn);
  handlerRef.current = fn;

  const useEventListener = (event: Event) => {
    return handlerRef.current(event);
  };

  useEffectWithTarget(
    () => {
      // 兼容 3 种 target 获取方式
      const targetElement = getTargetEelement(target);

      // 考虑 ssr 场景，不存在 window
      targetElement?.addEventListener(eventName, useEventListener);
      return () => {
        targetElement?.removeEventListener(eventName, useEventListener);
      };
    },
    [eventName],
    target,
  );
};
