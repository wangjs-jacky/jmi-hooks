/*
  本教程的核心理念对 ahooks 进行源码简析，以最简易的方式讲解清楚 ahooks 工作的原理，并不追求钩子编写的尽善尽美。

  对于 useClickAway 对比 ahooks 仍可改进的点：
  1. 支持 shadow DOM 的支持

  学有余力时，将后续代码补充至仓库的 github issues 中。
*/

import { useRef } from "react";
import { HTMLTargetType, getTargetEelement } from "../utils/getTargetElement";
import { useEffectWithTarget } from "../useEffectWithTarget";

type DocumentEventKey = keyof DocumentEventMap;

interface UseClickAwayPropsType<T> {
  /** @name 回调触发函数 */
  fn: (event?: T) => void,
  /** @name 回调触发函数 */
  target: HTMLTargetType | HTMLTargetType[],
  /** @name 事件名称 */
  eventName: DocumentEventKey | DocumentEventKey[],
}

export const useClickAway = <T extends HTMLTargetType>(options: UseClickAwayPropsType<T>) => {
  const { eventName = "click", fn = () => { }, target } = options;

  const fnRef = useRef(fn);
  fnRef.current = fn;

  const handler = (event: Event) => {
    // 1. 支持处理多个 DOM 对象, 统一转化为数组
    const targets = Array.isArray(target) ? target : [target];

    // 2. 判断是否 event.target 是否在监听范围区域内，只要有一个存在，就跳过
    if (
      targets.some((target) => {
        const targetElement = getTargetEelement(target);
        return targetElement?.contains(event.target);
      })
    ) {
      return;
    }
    fnRef.current(event);
  }

  useEffectWithTarget(() => {
    // 支持绑定多个事件
    const eventNames = Array.isArray(eventName) ? eventName : [eventName];

    eventNames.forEach((eventName) => {
      document.addEventListener(eventName, handler)
    })

    return () => {
      eventNames.forEach((eventName) => {
        document.removeEventListener(eventName, handler)
      })
    }
  },
    Array.isArray(eventName) ? eventName : [eventName],
    target
  )
}


