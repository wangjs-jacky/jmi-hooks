import { MutableRefObject } from 'react';

// 判断是否为 浏览器环境，看是否存在 window.document 全局变量
export const isBrowser = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

// 存在 3 种类型
export type TargetType<T> =
  // 情况1： ref.current
  | MutableRefObject<T>
  // 情况2： HTMLElement
  | T
  // 情况3: ()=> HTMLElement [推荐使用，兼容 SSR 场景]
  | (() => T);

export type HTMLTargetType = TargetType<BaiscTargetType>;

// 兜底类型处理，Target 至少是一个 Element
// target 支持透传为 window 或 window.document 或 <></>
type BaiscTargetType =
  | HTMLElement
  | Element
  | Window
  | Document
  | null
  | undefined;

export const getTargetEelement = <T extends BaiscTargetType>(
  target?: TargetType<T>,
) => {
  // 考虑 SSR 场景
  if (!isBrowser) {
    return undefined;
  }

  // 客户端
  if (!target) {
    return window.document;
  }

  let targetElement: T;
  if ('current' in target) {
    // 情况1： ref.current
    targetElement = target.current;
  } else if (typeof target === 'function') {
    // 情况3: () => HTMLElement
    targetElement = target();
  } else {
    // 情况2: HTMLElement
    targetElement = target;
  }

  return targetElement;
};
